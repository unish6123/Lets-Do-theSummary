
export const validateEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailPattern.test(email);
};

export const validatePassword = (password) => {
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return passwordPattern.test(password);
};

export const validateName = (name) => {
  return name.length >= 3;
};

export const validateRequired = (value) => {
  return value.trim() !== '';
};

export const validatePasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

export const validateRegisterForm = (name, email, password, confirmPassword) => {
  if (!validateName(name)) {
    return 'name must be at least 3 characters long';
  }
  if (!validateEmail(email)) {
    return 'Please enter a valid email address';
  }
  if (!validatePassword(password)) {
    return 'Password must be at least 6 characters long and contain both letters and numbers';
  }
  if (!validatePasswordMatch(password, confirmPassword)) {
    return 'Passwords do not match';
  }
  return null; 
};

// utils/validations.js
export const validateLoginForm = (email, password) => {
  const errors = { email: '', password: '' };

  // Email validation
  if (!email.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = 'Email is not valid';
  }

  // Password validation
  if (!password.trim()) {
    errors.password = 'Password is required';
  }

  return errors;
};


export const validateForgotPasswordForm = (email) => {
  if (!validateEmail(email)) {
    return 'Please enter a valid email address';
  }
  return null; 
};

export const validateResendOTPForm = (email) => {
  if (!validateEmail(email)) {
    return 'Please enter a valid email address';
  }
  return null; 
};
