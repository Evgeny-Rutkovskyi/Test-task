import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

export enum StatusTask {
  DONE = 'Completed',
  NOT_DONE = 'Not fulfilled'
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: StatusTask;
}

const API = 'http://localhost:3001/task';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState<string>('');
  const [status, setStatus] = useState<StatusTask | ''>('');
  const [form, setForm] = useState<Partial<Task>>({ id: undefined, title: '', description: '', status: StatusTask.NOT_DONE });
  const [editMode, setEditMode] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [tab, setTab] = useState<'create' | 'tasks'>('create');

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API);
      setTasks(res.data.tasks || []);
    } catch {
      setTasks([]);
      setError('Error loading tasks');
    }
  };

  const handleFilter = async (selectedStatus: StatusTask) => {
    try {
      const res = await axios.get(`${API}/by?status=${selectedStatus}`);
      setTasks(res.data.tasks || []);
      setStatus(selectedStatus);
    } catch {
      setTasks([]);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(`${API}/filter?search=${search}`);
      setTasks(res.data.tasks || []);
    } catch {
      setTasks([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editMode && form.id !== undefined) {
        await axios.patch(`${API}/update`, form);
      } else {
        await axios.post(`${API}/create`, form);
      }
      setForm({ id: undefined, title: '', description: '', status: StatusTask.NOT_DONE });
      setEditMode(false);
      fetchTasks();
    } catch {
      setError('Error saving task');
    }
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`${API}/delete/${id}`);
    fetchTasks();
  };

  const handleEdit = (task: Task) => {
    setForm(task);
    setEditMode(true);
    setTab('create');
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <div className="tabs">
        <button onClick={() => setTab('create')} className={tab === 'create' ? 'active' : ''}>Create</button>
        <button onClick={() => setTab('tasks')} className={tab === 'tasks' ? 'active' : ''}>Tasks</button>
      </div>

      {tab === 'create' && (
        <form className="task-form" onSubmit={handleSubmit}>
          <h2>{editMode ? 'Edit task' : 'New task'}</h2>
          <input
            type="text"
            placeholder="Title"
            value={form.title || ''}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={form.description || ''}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          ></textarea>
          <select
            title='Status'
            value={form.status || StatusTask.NOT_DONE}
            onChange={(e) => setForm({ ...form, status: e.target.value as StatusTask })}
          >
            <option value={StatusTask.NOT_DONE}>Not fulfilled</option>
            <option value={StatusTask.DONE}>Completed</option>
          </select>
          <button type="submit">{editMode ? 'Save' : 'Create'}</button>
        </form>
      )}

      {tab === 'tasks' && (
        <>
          <div className="controls">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>

          <div className="filters">
            <button onClick={() => { fetchTasks(); setStatus(''); }}>All</button>
            <button onClick={() => handleFilter(StatusTask.DONE)}>Completed</button>
            <button onClick={() => handleFilter(StatusTask.NOT_DONE)}>Not fulfilled</button>
          </div>

          <div className="task-list">
            {tasks.length === 0 ? (
              <p>Create your first task</p>
            ) : (
              tasks.map((task: Task) => (
                <div key={task.id} className="task">
                  <div>
                    <strong>{task.title}</strong>
                    <p>{task.description}</p>
                    <span className={task.status === StatusTask.DONE ? 'done' : 'not-done'}>
                      {task.status === StatusTask.DONE ? 'Completed' : 'Not fulfilled'}
                    </span>
                  </div>
                  <div>
                    <button onClick={() => handleEdit(task)}>✏️</button>
                    <button onClick={() => handleDelete(task.id)}>🗑</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default App;
