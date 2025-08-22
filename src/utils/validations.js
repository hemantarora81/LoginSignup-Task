export const validateName = (name) => /^[A-Za-z\s]+$/.test(name);
export const validateUsername = (username) =>  /^[a-zA-Z0-9._-]+$/.test(username);
export const validatePassword = (password, username) => {
  if (password === username) return false;
  return /^[a-zA-Z0-9._-]+$/.test(password);
};
export const validateEmail = (email) =>  /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
export const validatePhone = (phone) =>  /^\+\d{1,3}\d{10}$/.test(phone);
