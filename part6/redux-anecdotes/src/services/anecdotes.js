import axios from 'axios';
const baseUrl = '/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createAnecdote = async (data) => {
  const response = await axios.post(baseUrl, data);
  return response.data;
};

const updateAnecdote = async (id, data) => {
  const response = await axios.put(`${baseUrl}/${id}`, data);
  return response.data;
};

export { getAll, createAnecdote, updateAnecdote };
