"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { PlusCircle, Users, Building } from 'lucide-react';
import Link from 'next/link';

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

interface Kpi {
  id: number;
  name: string;
  current_value: number;
  target_value: number;
  unit: string;
}

export default function Dashboard() {
  const [companyGoals, setCompanyGoals] = useState<Goal[]>([]);
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [kpis, setKpis] = useState<Kpi[]>([]);

  const fetchData = async () => {
    const [goalsRes, divisionsRes, employeesRes, kpisRes] = await Promise.all([
      fetch('/api/goals'),
      fetch('/api/divisions'),
      fetch('/api/employees'),
      fetch('/api/kpis'),
    ]);
    const [goals, divisions, employees, kpis] = await Promise.all([
      goalsRes.json(),
      divisionsRes.json(),
      employeesRes.json(),
      kpisRes.json(),
    ]);
    setCompanyGoals(goals);
    setDivisions(divisions);
    setEmployees(employees);
    setKpis(kpis);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addGoal = async () => {
    // Implement adding a new goal
  };

  const updateGoal = async (id: number, updateData: Partial<Goal>) => {
    const response = await fetch('/api/goals', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, ...updateData }),
    });

    if (response.ok) {
      fetchData(); // Refresh data after update
    }
  };

  const deleteGoal = async (id: number) => {
    const response = await fetch('/api/goals', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      fetchData(); // Refresh data after delete
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Tabs defaultValue="goals" className="w-full">
        <TabsList>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="divisions">Divisions</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="kpis">KPIs</TabsTrigger>
        </TabsList>

        <TabsContent value="goals">
          <div>
            <Button onClick={addGoal}>
              <PlusCircle /> Add Goal
            </Button>
            {companyGoals.map(goal => (
              <Card key={goal.id}>
                <CardHeader>
                  <CardTitle>{goal.name}</CardTitle>
                  <CardDescription>
                    Target: {goal.target}, Current: {goal.current}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => updateGoal(goal.id, { /* new values */ })}>Edit</Button>
                  <Button onClick={() => deleteGoal(goal.id)}>Delete</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="divisions">
          <div>
            <Button onClick={() => {/* Add Division Logic */}}>Add Division</Button>
            {divisions.map(division => (
              <Card key={division.id}>
                <CardHeader>
                  <CardTitle>{division.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => {/* Update Division Logic */}}>Edit</Button>
                  <Button onClick={() => {/* Delete Division Logic */}}>Delete</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="employees">
          <div>
            <Button onClick={() => {/* Add Employee Logic */}}>Add Employee</Button>
            {employees.map(employee => (
              <Card key={employee.id}>
                <CardHeader>
                  <CardTitle>{employee.first_name} {employee.last_name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => {/* Update Employee Logic */}}>Edit</Button>
                  <Button onClick={() => {/* Delete Employee Logic */}}>Delete</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="kpis">
          <div>
            <Button onClick={() => {/* Add KPI Logic */}}>Add KPI</Button>
            {kpis.map(kpi => (
              <Card key={kpi.id}>
                <CardHeader>
                  <CardTitle>{kpi.name}</CardTitle>
                  <CardDescription>
                    Current: {kpi.current_value} {kpi.unit}, Target: {kpi.target_value} {kpi.unit}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => {/* Update KPI Logic */}}>Edit</Button>
                  <Button onClick={() => {/* Delete KPI Logic */}}>Delete</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
