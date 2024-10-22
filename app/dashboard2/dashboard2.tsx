// app/dashboard2/dashboard2.tsx

import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../components/Modal';
import { fetchGoals, fetchEmployees, fetchKPIs } from '../../api/goalsApi';
import { Goal, Employee, KPI } from '../../types/apiTypes'; // Adjust imports according to your types

const Dashboard2 = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', owner: '', progress: 0 }); // Adjust as needed

  useEffect(() => {
    const loadData = async () => {
      const goalsData = await fetchGoals();
      const employeesData = await fetchEmployees();
      const kpisData = await fetchKPIs();
      setGoals(goalsData);
      setEmployees(employeesData);
      setKpis(kpisData);
    };

    loadData();
  }, []);

  const handleAddGoal = async (data: any) => {
    try {
      const newGoal = await fetch('/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Use the data passed from the modal
      });
      if (newGoal.ok) {
        const goalData = await newGoal.json();
        setGoals([...goals, goalData]);
        toast.success('Goal added successfully!');
        setModalOpen(false);
      } else {
        throw new Error('Failed to add goal');
      }
    } catch (error) {
      toast.error('Error adding goal: ' + error.message);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={() => setModalOpen(true)}>Add New Goal</button>
      </header>

      <Modal
        isOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
        onSubmit={handleAddGoal}
        title="Add New Goal"
        fields={[
          { label: 'Goal Title', placeholder: 'Enter goal title', name: 'title' },
          { label: 'Owner', placeholder: 'Enter owner ID', name: 'owner' },
          { label: 'Progress', placeholder: 'Enter progress percentage', name: 'progress' },
        ]}
      />

      <ToastContainer />
    </div>
  );
};

export default Dashboard2;
