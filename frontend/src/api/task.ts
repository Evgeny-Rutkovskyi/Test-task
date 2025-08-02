import axios from 'axios';
import { Task, StatusTask } from '../types';

export const getAllTasks = async (): Promise<Task[]> => {
  const res = await axios.get('http://localhost:3001/task');
  if (res.data.tasks) return res.data.tasks;
  return [];
};

export const createTask = async (task: { title: string; description: string; status: StatusTask }) => {
  const res = await axios.post('http://localhost:3001/task/create', task);
  return res.data.newTask;
};

export const updateTask = async (task: Partial<Task> & { id: number }) => {
  const res = await axios.patch('http://localhost:3001/task/update', task);
  return res.data.task;
};

export const deleteTask = async (id: number) => {
  return await axios.delete(`http://localhost:3001/task/delete/${id}`);
};

export const getTasksByStatus = async (status: StatusTask) => {
  const res = await axios.get(`http://localhost:3001/task/by?status=${status}`);
  return res.data.tasks || [];
};

export const searchTasks = async (search: string) => {
  const res = await axios.get(`http://localhost:3001/task/filter?search=${search}`);
  return res.data.tasks || [];
};


