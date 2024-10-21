"use client"; // Add this line to enable client-side rendering

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Dashboard() {
  const [companies, setCompanies] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [goals, setGoals] = useState([]);
  const [kpis, setKpis] = useState([]);

  // Fetch data from Supabase
  const fetchData = async () => {
    const { data: companiesData, error: companiesError } = await supabase
      .from('companies')
      .select('*');

    const { data: divisionsData, error: divisionsError } = await supabase
      .from('divisions')
      .select('*');

    const { data: employeesData, error: employeesError } = await supabase
      .from('employees')
      .select('*');

    const { data: goalsData, error: goalsError } = await supabase
      .from('goals')
      .select('*');

    const { data: kpisData, error: kpisError } = await supabase
      .from('kpis')
      .select('*');

    if (companiesError || divisionsError || employeesError || goalsError || kpisError) {
      console.error('Error fetching data', {
        companiesError,
        divisionsError,
        employeesError,
        goalsError,
        kpisError,
      });
      return;
    }

    setCompanies(companiesData);
    setDivisions(divisionsData);
    setEmployees(employeesData);
    setGoals(goalsData);
    setKpis(kpisData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Balanced Scorecard Dashboard</h1>

      <section>
        <h2>Companies</h2>
        <ul>
          {companies.map(company => (
            <li key={company.id}>{company.name}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Divisions</h2>
        <ul>
          {divisions.map(division => (
            <li key={division.id}>{division.name}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Employees</h2>
        <ul>
          {employees.map(employee => (
            <li key={employee.id}>{employee.first_name} {employee.last_name}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Goals</h2>
        <ul>
          {goals.map(goal => (
            <li key={goal.id}>{goal.name} - {goal.status}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>KPIs</h2>
        <ul>
          {kpis.map(kpi => (
            <li key={kpi.id}>{kpi.name}: {kpi.current_value} / {kpi.target_value} {kpi.unit}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
