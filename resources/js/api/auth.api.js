import api from './axios';

export const loginApi = async (data) => {
  await api.get('/sanctum/csrf-cookie');
  return api.post('/login', data);

};
export const registerApi = (data) => api.post('/register', data);
export const logoutApi = () => api.post('/logout');

export const getToken = () => {
  return (
    localStorage.getItem("token") ||
    sessionStorage.getItem("token") || 
    ""
  );
};

export const isLoggedIn = () => {
  return !!getToken();
};