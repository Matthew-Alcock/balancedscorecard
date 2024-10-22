// app/dashboard2/dashboard2.tsx

import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../components/Modal';
import { fetchGoals, fetchEmployees, fetchKPIs } from '../../api/goalsApi';
import { Goal, Employee, KPI } from '../../types/apiTypes';

const Dashboard2 = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [formData, setFormData] = useState({ title: '', owner: '', progress: 0 });

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

  const handleAddGoal = async () => {
    // Implementation for adding a goal
  };

  const handleDeleteGoal = async (goalId: string) => {
    try {
      const response = await fetch(`/api/goals?id=${goalId}`, { method: 'DELETE' });
      if (response.ok) {
        setGoals(goals.filter(goal => goal.id !== goalId));
        toast.success('Goal deleted successfully!');
      } else {
        throw new Error('Failed to delete goal');
      }
    } catch (error) {
      toast.error('Error deleting goal: ' + error.message);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={() => setModalOpen(true)}>Add New Goal</button>
      </header>

      <div className="dashboard-content">
        {/* Your sections for Goals, Employees, and KPIs */}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedGoal ? 'Edit Goal' : 'Add New Goal'}
      >
        <form onSubmit={(e) => { e.preventDefault(); handleAddGoal(); }}>
          {/* Your form fields */}
        </form>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default Dashboard2;
