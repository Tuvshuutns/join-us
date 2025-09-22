"use client";
import { useState, useRef, useEffect } from "react";

export const StepThree = ({ handleNextStep, handleBackStep }) => {
  const dateRef = useRef(null);
  const fileRef = useRef(null);
  const continueBtnRef = useRef(null);

  const [formData, setFormData] = useState({
    dateOfBirth: "",
    profileImage: null,
  });

  const [errors, setErrors] = useState({
    dateOfBirth: "",
    profileImage: "",
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
      }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Please select a date.";
    }

    if (!formData.profileImage) {
      newErrors.profileImage = "Image cannot be blank";
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

  useEffect(() => {
    const savedData = localStorage.getItem("preview");
    if (savedData) {
      setPreview(JSON.parse(savedData));
    }
  }, []);

  const handleContinue = () => {
    if (validateForm()) {
      localStorage.setItem("formData", JSON.stringify(formData));
      localStorage.setItem("preview", JSON.stringify(preview));
      handleNextStep();
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
          <p>
            Date of Birth <span className="required">*</span>
          </p>
          <input
            ref={dateRef}
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleChange("dateOfBirth", e.target.value)}
            className={errors.dateOfBirth ? "error" : "form-input"}
          />
          {errors.dateOfBirth && (
            <p className="error-message">{errors.dateOfBirth}</p>
          )}
          <p>
            Profile Image <span className="required">*</span>
          </p>
          <div className="s">
            <div className="file">
              <input
                className="filePic"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {preview ? (
                <img src={preview} className="preview" />
              ) : (
                <div className="fileContent">
                  <div className="fileContentpic">
                    <img src="pic.png" />
                  </div>
                  <p>Add Image</p>
                </div>
              )}
            </div>
          </div>

          {errors.profileImage && (
            <p className="error-message">{errors.profileImage}</p>
          )}
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
          Submit 3/3 <img src="Vector.png" alt="Arrow" />
        </button>
      </div>
    </div>
  );
};
