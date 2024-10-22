"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { PlusCircle, Users, Building } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient';

interface Goal {
  id: number;
  name: string;
  target: string;
  current: string;
}

interface Division {
  id: number;
  name: string;
}

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
}

export default function Dashboard() {
  const [companyGoals, setCompanyGoals] = useState<Goal[]>([]);
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

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

  async function addGoal() {
    const { error } = await supabase
      .from('goals')
      .insert([{ name: 'New Goal', target: '0', current: '0', level: 'company' }]);

    if (error) {
      console.error('Error adding goal:', error);
    } else {
      fetchGoals(); // Refresh goals after adding
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
      fetchGoals(); // Refresh goals after deleting
    }
  }

  async function addDivision() {
    const { error } = await supabase
      .from('divisions')
      .insert([{ name: 'New Division' }]);

    if (error) {
      console.error('Error adding division:', error);
    } else {
      fetchDivisions(); // Refresh divisions after adding
    }
  }

  async function deleteDivision(id: number) {
    const { error } = await supabase
      .from('divisions')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting division:', error);
    } else {
      fetchDivisions(); // Refresh divisions after deleting
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

        <TabsContent value="overview" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Company Goals</h2>
            <Button onClick={addGoal}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Goal
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {companyGoals.map((goal) => (
              <Card key={goal.id}>
                <CardHeader>
                  <CardTitle>{goal.name}</CardTitle>
                  <CardDescription>Target: {goal.target}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{goal.current}</p>
                  <p className="text-sm text-muted-foreground">Current Progress</p>
                  <Button onClick={() => deleteGoal(goal.id)} variant="destructive">Delete Goal</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="divisions" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Divisions</h2>
            <Button onClick={addDivision}>
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
                  <Button onClick={() => deleteDivision(division.id)} variant="destructive">Delete Division</Button>
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
    </div>
  );
}
