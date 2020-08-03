import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const createData = (data) => {
  return axios.post(baseUrl, data).then((response) => response.data);
};

const deleteData = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

const updateData = (id, newData) => {
  return axios
    .put(`${baseUrl}/${id}`, newData)
    .then((response) => response.data);
};

export default {
  getAll,
  createData,
  deleteData,
  updateData,
};
