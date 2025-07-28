// utils/api.js
import axios from 'axios';

export const updateSession = async (id, data) => {
  const token = localStorage.getItem('token');
  return axios.put(`http://localhost:5000/api/session/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
