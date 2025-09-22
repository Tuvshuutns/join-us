"use client";
import { FormInput } from "../_components/form-input";
import { useState, useRef, useEffect } from "react";

export const StepTwo = ({ handleNextStep, handleBackStep }) => {
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);
  const continueBtnRef = useRef(null);

  const [formData, setFormData] = useState({
    email: "",
    phonenumber: "",
    password: "",
    confirmpassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    phonenumber: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please provide a valid email address.";
    }

    if (!formData.phonenumber) {
      newErrors.phonenumber = "Phone number is required.";
    } else if (!/^\d{8}$/.test(formData.phonenumber)) {
      newErrors.phonenumber = "Please enter a valid phone number.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must include letters and numbers.";
    }

    if (!formData.confirmpassword) {
      newErrors.confirmpassword = "Confirm Password is required.";
    } else if (formData.password !== formData.confirmpassword) {
      newErrors.confirmpassword = "Passwords do not match. Please try again.";
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
            ref={emailRef}
            label="Email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={errors.email}
            onKeyDown={(e) => handleEnterFocus(e, phoneRef)}
          />

          <FormInput
            ref={phoneRef}
            label="Phone number"
            value={formData.phonenumber}
            onChange={(e) => handleChange("phonenumber", e.target.value)}
            error={errors.phonenumber}
            onKeyDown={(e) => handleEnterFocus(e, passwordRef)}
          />

          <FormInput
            ref={passwordRef}
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            error={errors.password}
            onKeyDown={(e) => handleEnterFocus(e, confirmRef)}
          />

          <FormInput
            ref={confirmRef}
            label="Confirm password"
            type="password"
            value={formData.confirmpassword}
            onChange={(e) => handleChange("confirmpassword", e.target.value)}
            error={errors.confirmpassword}
            onKeyDown={(e) => handleEnterFocus(e, continueBtnRef)}
          />
        </div>
      </div>

      <div className="buttons">
        <button className="Back" onClick={handleBackStep}>
          <img src="Vector1.png" alt="Arrow" /> Back
        </button>
        <button
          ref={continueBtnRef}
          className="Continue"
          onClick={handleContinue}
        >
          Continue 2/3 <img src="Vector.png" alt="Arrow" />
        </button>
      </div>
    </div>
  );
};
