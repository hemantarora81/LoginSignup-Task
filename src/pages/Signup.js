import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  validateName,
  validateUsername,
  validatePassword,
  validateEmail,
  validatePhone,
} from "../utils/validations";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import Toast from "../components/Toast/Toast";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    confirm: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // ✅ handleChange also validates that single field
  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });

    let fieldError = "";

    switch (field) {
      case "name":
        if (!validateName(value)) fieldError = "Only alphabets allowed";
        break;
      case "username":
        if (!validateUsername(value)) fieldError = "Invalid username";
        break;
      case "password":
        if (!validatePassword(value, form.username))
          fieldError = "Invalid password or same as username";
        // also check confirm password live
        if (form.confirm && form.confirm !== value) {
          setErrors((prev) => ({ ...prev, confirm: "Passwords must match" }));
        } else {
          setErrors((prev) => {
            const { confirm, ...rest } = prev;
            return rest;
          });
        }
        break;
      case "confirm":
        if (value !== form.password) fieldError = "Passwords must match";
        break;
      case "email":
        if (!validateEmail(value)) fieldError = "Must be a valid Gmail";
        break;
      case "phone":
        if (!validatePhone(value)) fieldError = "Invalid phone number";
        break;
      default:
        break;
    }

    // update error state
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
    if (!validateName(form.name)) newErrors.name = "Only alphabets allowed";
    if (!validateUsername(form.username))
      newErrors.username = "Invalid username";
    if (!validatePassword(form.password, form.username))
      newErrors.password = "Invalid password or same as username";
    if (form.confirm !== form.password)
      newErrors.confirm = "Passwords must match";
    if (!validateEmail(form.email)) newErrors.email = "Must be a valid Gmail";
    if (!validatePhone(form.phone)) newErrors.phone = "Invalid phone number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (validateForm()) {
      Toast.success("Signup Successful!");
      navigate("/login");
    }
  };

  return (
    <AuthLayout title="Create new Account">
      <form onSubmit={handleSignup} className="signup-form">
        <div className="row">
          <Input
            label="Name"
            value={form.name}
            onChange={(e) => handleChange("name", e)}
            error={errors.name}
          />
          <Input
            label="Username"
            value={form.username}
            onChange={(e) => handleChange("username", e)}
            error={errors.username}
          />
        </div>
        <div className="row">
          <Input
            label="Email"
            value={form.email}
            onChange={(e) => handleChange("email", e)}
            error={errors.email}
          />
          <Input
            label="Phone No. "
            placeholder="With Country Code (+911234567890)"
            value={form.phone}
            onChange={(e) => handleChange("phone", e)}
            error={errors.phone}
          />
        </div>
        <div className="row">
          <Input
            type="password"
            label="New Password"
            value={form.password}
            onChange={(e) => handleChange("password", e)}
            error={errors.password}
          />
          <Input
            type="password"
            label="Confirm New Password"
            value={form.confirm}
            onChange={(e) => handleChange("confirm", e)}
            error={errors.confirm}
          />
        </div>
        <Button text="Sign Up" type="submit" />
      </form>
    </AuthLayout>
  );
};

export default Signup;
