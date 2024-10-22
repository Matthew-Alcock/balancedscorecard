// app/dashboard2/dashboard2.tsx

import { useEffect, useState } from 'react';
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
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
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

  const handleAddGoal = async () => {
    try {
      const newGoal = await fetch('/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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

      <div className="dashboard-content">
        <section className="goals-section">
          <h2>Goals</h2>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Owner</th>
                <th>Progress</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {goals.map((goal) => (
                <tr key={goal.id}>
                  <td>{goal.title}</td>
                  <td>{goal.ownerId}</td>
                  <td>{goal.progress}%</td>
                  <td>
                    <button onClick={() => {
                      setSelectedGoal(goal);
                      setModalOpen(true);
                    }}>
                      Edit
                    </button>
                    <button onClick={/* add delete function here */}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="employees-section">
          <h2>Employees</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Division</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.division}</td>
                  <td>{employee.role}</td>
                  <td>
                    <button onClick={/* Link to employee profile */}>View Profile</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="kpis-section">
          <h2>KPIs</h2>
          <table>
            <thead>
              <tr>
                <th>KPI Title</th>
                <th>Description</th>
                <th>Current Value</th>
                <th>Target Value</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {kpis.map((kpi) => (
                <tr key={kpi.id}>
                  <td>{kpi.title}</td>
                  <td>{kpi.description}</td>
                  <td>{kpi.currentValue}</td>
                  <td>{kpi.targetValue}</td>
                  <td>
                    <button onClick={/* add edit function */}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedGoal ? 'Edit Goal' : 'Add New Goal'}
      >
        <form onSubmit={(e) => { e.preventDefault(); handleAddGoal(); }}>
          <label>
            Goal Title:
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </label>
          <label>
            Owner:
            <input
              type="text"
              value={formData.owner}
              onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
              required
            />
          </label>
          <label>
            Progress:
            <input
              type="number"
              value={formData.progress}
              onChange={(e) => setFormData({ ...formData, progress: Number(e.target.value) })}
              required
              min="0"
              max="100"
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default Dashboard2;

