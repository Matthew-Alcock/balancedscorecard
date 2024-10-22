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

interface Company {
  id: number;
  name: string;
}

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
}

interface KPI {
  id: number;
  name: string;
  current_value: number;
  target_value: number;
  unit: string;
}

export default function Dashboard() {
  const [companyGoals, setCompanyGoals] = useState<Goal[]>([]);
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [activeTab, setActiveTab] = useState<string>('overview');

  useEffect(() => {
    fetchData();

    const goalsSubscription = supabase
      .channel('public:goals')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'goals' }, fetchGoals)
      .subscribe();

    const divisionsSubscription = supabase
      .channel('public:divisions')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'divisions' }, fetchDivisions)
      .subscribe();

    return () => {
      goalsSubscription.unsubscribe();
      divisionsSubscription.unsubscribe();
    };
  }, []);

  async function fetchData() {
    await Promise.all([
      fetchGoals(),
      fetchDivisions(),
      fetchCompanies(),
      fetchEmployees(),
      fetchKpis(),
    ]);
  }

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

  async function fetchCompanies() {
    const { data, error } = await supabase
      .from('companies')
      .select('*');

    if (error) {
      console.error('Error fetching companies:', error);
    } else {
      setCompanies(data || []);
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

  async function fetchKpis() {
    const { data, error } = await supabase
      .from('kpis')
      .select('*');

    if (error) {
      console.error('Error fetching KPIs:', error);
    } else {
      setKpis(data || []);
    }
  }

  async function addGoal() {
    const { error } = await supabase
      .from('goals')
      .insert([{ name: 'New Goal', target: '0', current: '0', level: 'company' }]);

    if (error) {
      console.error('Error adding goal:', error);
    } else {
      fetchGoals();
    }
  }

  async function addDivision() {
    const { error } = await supabase
      .from('divisions')
      .insert([{ name: 'New Division' }]);

    if (error) {
      console.error('Error adding division:', error);
    } else {
      fetchDivisions();
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Company Balanced Scorecard</h1>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="divisions">Divisions</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="kpis">KPIs</TabsTrigger>
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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {employees.map((employee) => (
              <Card key={employee.id}>
                <CardHeader>
                  <CardTitle>{employee.first_name} {employee.last_name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Link href={`/employees/${employee.id}`}>
                    <Button variant="outline" className="w-full">View Details</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="companies" className="space-y-4">
          <h2 className="text-2xl font-semibold">Companies</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              <Card key={company.id}>
                <CardHeader>
                  <CardTitle>{company.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Link href={`/companies/${company.id}`}>
                    <Button variant="outline" className="w-full">View Details</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="kpis" className="space-y-4">
          <h2 className="text-2xl font-semibold">KPIs</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {kpis.map((kpi) => (
              <Card key={kpi.id}>
                <CardHeader>
                  <CardTitle>{kpi.name}</CardTitle>
                  <CardDescription>{kpi.current_value} / {kpi.target_value} {kpi.unit}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Current Value: {kpi.current_value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
