// src/services/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api";

export const getArticles = async () => {
  const response = await axios.get(`${API_BASE_URL}/articles`);
  return response.data;
};

export const getCategory = async () => {
  const response = await axios.get(`${API_BASE_URL}/articles/category`);
  return response.data;
};

export const getArticleById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/articles/${id}`);
  return response.data;
};
export const getJournalist = async () => {
  const response = await axios.get(`${API_BASE_URL}/articles/journalist`);
  return response.data;
};
export const getArticlesByJournalistId = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/articles/journalists/${id}/articles`);
  return response.data;
};


export const createArticle = async (article) => {
  const response = await axios.post(`${API_BASE_URL}/articles`, article);
  return response.data;
};

export const updateArticle = async (id, updatedData) => {
  const response = await axios.put(`${API_BASE_URL}/articles/${id}`, updatedData);
  return response.data;
};

export const removeArticle = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/articles/${id}`);
  return response.data;
};