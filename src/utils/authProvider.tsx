// authProvider.ts
const authProvider = {
  login: ({ username, password }) => {
    // Appel API à ton backend pour vérifier les identifiants
    if (username === "admin" && password === "password") {
      localStorage.setItem("role", "admin");
      return Promise.resolve();
    }
    if (username === "user" && password === "password") {
      localStorage.setItem("role", "user");
      return Promise.resolve();
    }
    return Promise.reject("Invalid credentials");
  },
  logout: () => {
    localStorage.removeItem("role");
    return Promise.resolve();
  },
  checkAuth: (params) => {
    return localStorage.getItem("role") ? Promise.resolve() : Promise.reject();
  },
  checkError: (error) => Promise.resolve(),
  getPermissions: () => {
    const role = localStorage.getItem("role");
    return Promise.resolve(role);
  },
};

export default authProvider;
