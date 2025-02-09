export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  return users.some((user) => user.token === token);
};

export const logout = () => {
  localStorage.removeItem("token");
};
