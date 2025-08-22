import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input/Input";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import Button from "../components/Button/Button";
import Toast from "../components/Toast/Toast";
import { validateUsername, validatePassword } from "../utils/validations";

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });

    let fieldError = "";

    if (field === "username") {
      if (!value) {
        fieldError = "Username is required";
      } else if (!validateUsername(value)) {
        fieldError = "Invalid username";
      }
    }

    if (field === "password") {
      if (!value) {
        fieldError = "Password is required";
      } else if (!validatePassword(value, form.username)) {
        fieldError = "Invalid password or same as username";
      }
    }

    setErrors((prev) => {
      const newErrors = { ...prev };
      if (fieldError) {
        newErrors[field] = fieldError;
      } else {
        delete newErrors[field];
      }
      return newErrors;
    });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!form.username) {
      newErrors.username = "Username is required";
    } else if (!validateUsername(form.username)) {
      newErrors.username = "Invalid username";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(form.password, form.username)) {
      newErrors.password = "Invalid password or same as username";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateForm()) {
      Toast.success("Login Successful 🎉");
      navigate("/login");
    } else {
      Toast.error("Please fix the errors");
    }
  };

  return (
    <AuthLayout title="Login" subtitle="Sign in to continue">
      <form onSubmit={handleLogin}>
        <Input
          label="Username"
          type="text"
          value={form.username}
          onChange={(v) => handleChange("username", v)}
          error={errors.username}
        />
        <Input
          label="New Password"
          type="password"
          value={form.password}
          onChange={(v) => handleChange("password", v)}
          error={errors.password}
        />
        <Button text="Login" type="submit" />
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Don’t have an Account? <Link to="/signup">SignUp</Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
