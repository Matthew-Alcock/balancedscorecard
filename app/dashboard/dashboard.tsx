"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { PlusCircle, Users, Building } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient';
import Modal from '../components/Modal';
import { toast } from 'react-toastify'; // Add this import for toast notifications

interface Goal {
  id: number;
  name: string;
  target: string;
  current: string;
  owner: string; // Assuming owner is part of the goal
  progress: number; // Assuming progress is a percentage or similar
}

interface Division {
  id: number;
  name: string;
}

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  divisionId: number; // Assuming division is related
}

export default function Dashboard() {
  const [companyGoals, setCompanyGoals] = useState<Goal[]>([]);
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  
  const [isGoalModalOpen, setGoalModalOpen] = useState(false);
  const [isDivisionModalOpen, setDivisionModalOpen] = useState(false);
  const [isEmployeeModalOpen, setEmployeeModalOpen] = useState(false); // State for employee modal

  useEffect(() => {
    fetchGoals();
    fetchDivisions();
    fetchEmployees();
  }, []);

  async function fetchGoals() {
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .eq('level', 'company');

    if (error) {
      console.error('Error fetching goals:', error);
    } else {
      setCompanyGoals(data || []);
    }
  }

  async function fetchDivisions() {
    const { data, error } = await supabase
      .from('divisions')
      .select('*');

    if (error) {
      console.error('Error fetching divisions:', error);
    } else {
      setDivisions(data || []);
    }
  }

  async function fetchEmployees() {
    const { data, error } = await supabase
      .from('employees')
      .select('*');

    if (error) {
      console.error('Error fetching employees:', error);
    } else {
      setEmployees(data || []);
    }
  }

  async function addGoal(data: { name: string; target: string; current: string; owner: string; progress: number }) {
    const { error } = await supabase
      .from('goals')
      .insert([{ ...data, level: 'company' }]);

    if (error) {
      console.error('Error adding goal:', error);
    } else {
      toast.success('Goal added successfully!'); // Show success message
      fetchGoals();
    }
  }

  async function deleteGoal(id: number) {
    const { error } = await supabase
      .from('goals')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting goal:', error);
    } else {
      toast.success('Goal deleted successfully!'); // Show success message
      fetchGoals();
    }
  }

  async function addDivision(data: { name: string }) {
    const { error } = await supabase
      .from('divisions')
      .insert([{ ...data }]);

    if (error) {
      console.error('Error adding division:', error);
    } else {
      toast.success('Division added successfully!'); // Show success message
      fetchDivisions();
    }
  }

  async function addEmployee(data: { first_name: string; last_name: string; divisionId: number }) {
    const { error } = await supabase
      .from('employees')
      .insert([{ ...data }]);

    if (error) {
      console.error('Error adding employee:', error);
    } else {
      toast.success('Employee added successfully!'); // Show success message
      fetchEmployees();
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Company Balanced Scorecard</h1>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="divisions">Divisions</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 overflow-y-auto"> {/* Make this section scrollable */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Company Goals</h2>
            <Button onClick={() => setGoalModalOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Goal
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {companyGoals.map((goal) => (
              <Card key={goal.id} onClick={() => { /* Handle click */ }}>
              <CardHeader>
                <CardTitle>{goal.name}</CardTitle>
                <p>Target: {goal.target}</p>
                <p>Owner: {goal.owner}</p>
                <p>Progress: {goal.progress}%</p>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{goal.current}</p>
                <Button onClick={(e) => { 
                  e.stopPropagation(); // Prevent triggering the card click event
                  deleteGoal(goal.id);
                }} variant="destructive">Delete Goal</Button>
              </CardContent>
            </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="divisions" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Divisions</h2>
            <Button onClick={() => setDivisionModalOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Division
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {divisions.map((division) => (
              <Card key={division.id}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="mr-2 h-4 w-4" />
                    {division.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Link href={`/divisions/${division.id}`}>
                    <Button variant="outline" className="w-full">View Scorecard</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="employees" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Employees</h2>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Employee
            </Button>
          </div>
          <div className="grid gap-4">
            {employees.map((employee) => (
              <Card key={employee.id}>
                <CardHeader>
                  <CardTitle>{employee.first_name} {employee.last_name}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals for adding data */}
      <Modal
        isOpen={isGoalModalOpen}
        closeModal={() => setGoalModalOpen(false)}
        onSubmit={addGoal}
        title="Add New Goal"
        fields={[
          { label: 'Goal Name', placeholder: 'Enter goal name', name: 'name', type: 'text' },
          { label: 'Description', placeholder: 'Enter goal description', name: 'description', type: 'text' },
          {
            label: 'Level',
            name: 'level',
            type: 'dropdown',
            options: [
              { label: 'Company', value: 'company' },
              { label: 'Division', value: 'division' }
            ]
          },
          { label: 'Target', placeholder: 'Enter target', name: 'target', type: 'text' },
          { label: 'Due Date', name: 'due_date', type: 'date' },
        ]}
        initialValues={{ start_date: new Date().toISOString().split('T')[0], status: 'Not Started' }}
      />
      <Modal
        isOpen={isDivisionModalOpen}
        closeModal={() => setDivisionModalOpen(false)}
        onSubmit={addDivision}
        title="Add New Division"
        fields={[
          { label: 'Division Name', placeholder: 'Enter division name', name: 'name' },
        ]}
      />
      <Modal
        isOpen={isEmployeeModalOpen}
        closeModal={() => setEmployeeModalOpen(false)}
        onSubmit={addEmployee}
        title="Add New Employee"
        fields={[
          { label: 'First Name', placeholder: 'Enter first name', name: 'first_name' },
          { label: 'Last Name', placeholder: 'Enter last name', name: 'last_name' },
          { label: 'Division ID', placeholder: 'Enter division ID', name: 'divisionId' }, // Assuming division relation
        ]}
      />
    </div>
  );
}
