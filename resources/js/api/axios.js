import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",  
   withCredentials: true,
  headers: {

    Accept: "application/json",
    "Content-Type": "application/json",
  },
 
});

api.interceptors.request.use((config) => {
  const url = config.url || "";
  if (url.startsWith("/admin/") || url === "/staff-login") {
    const admin_token = 
      localStorage.getItem('admin_token') ||
      sessionStorage.getItem('admin_token');

    if (admin_token) {
      config.headers.Authorization = `Bearer ${admin_token}`;
    }
  }else{
    const token = 
      localStorage.getItem('token') ||
      sessionStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {

    const url = error.config?.url || "";
    const status = error.response?.status;
    if ([401, 403].includes(status)) {
      if (url.startsWith("/admin/") || url === "/staff-login") {
        localStorage.removeItem("admin_token");
        sessionStorage.removeItem("admin_token");
        if (window.location.pathname.startsWith("/admin")) {
          window.location.href = "/admin/login";
        }
      }else{
        const isAuthRoute = 
              window.location.pathname === '/login' ||
              window.location.pathname === '/register';

            if (error.response?.status === 401 && !isAuthRoute) {
              localStorage.removeItem("token");
              sessionStorage.removeItem("token");
              if (!window.location.pathname.startsWith("/admin")) {
                window.location.href = "/login";
              }
            }
      }

    }
   
    return Promise.reject(error);
  }
);

export default api;
