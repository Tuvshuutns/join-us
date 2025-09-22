"use client";
import { FormInput } from "../_components/form-input";
import { useState, useRef, useEffect } from "react";

export const StepOne = ({ handleNextStep }) => {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const usernameRef = useRef(null);
  const continueBtnRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    let newErrors = {};
    const regex = /^[A-Za-z]+$/;

    if (!formData.firstName) {
      newErrors.firstName = "First name is required.";
    } else if (!regex.test(formData.firstName)) {
      newErrors.firstName =
        "First name cannot contain special characters or numbers.";
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last name is required.";
    } else if (!regex.test(formData.lastName)) {
      newErrors.lastName =
        "Last name cannot contain special characters or numbers.";
    }

    if (!formData.username) {
      newErrors.username = "Username is required.";
    } else if (!regex.test(formData.username)) {
      newErrors.username =
        "Username cannot contain special characters or numbers.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleContinue = () => {
    if (validateForm()) {
      localStorage.setItem("formData", JSON.stringify(formData));
      handleNextStep();
    }
  };

  const handleEnterFocus = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef?.current?.focus();
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <img className="logo" src="pine.svg" alt="Join Us" />
          <h1>Join Us! 😎</h1>
          <p>Please provide all current information accurately.</p>
        </div>

        <div className="form">
          <FormInput
            ref={firstNameRef}
            label="First name"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            error={errors.firstName}
            onKeyDown={(e) => handleEnterFocus(e, lastNameRef)}
          />

          <FormInput
            ref={lastNameRef}
            label="Last name"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            error={errors.lastName}
            onKeyDown={(e) => handleEnterFocus(e, usernameRef)}
          />

          <FormInput
            ref={usernameRef}
            label="Username"
            value={formData.username}
            onChange={(e) => handleChange("username", e.target.value)}
            error={errors.username}
            onKeyDown={(e) => handleEnterFocus(e, continueBtnRef)}
          />
        </div>
      </div>

      <button
        ref={continueBtnRef}
        className="Continue"
        onClick={handleContinue}
      >
        Continue 1/3 <img src="Vector.png" alt="Arrow" />
      </button>
    </div>
  );
};
