"use client";
import { StepFour } from "./_feature/StepFour";
import { StepOne } from "./_feature/StepOne";
import { StepThree } from "./_feature/StepThree";
import { StepTwo } from "./_feature/StepTwo";

import "./index.css";
import { useState, useRef } from "react";

export default function Home() {
  const [step, setStep] = useState(1);
  const handleNextStep = () => {
    setStep(step + 1);
  };
  const handleBackStep = () => {
    if (step === 1) {
      return;
    } else setStep(step - 1);
  };
  return (
    <>
      {step === 1 && <StepOne handleNextStep={handleNextStep} />}
      {step === 2 && (
        <StepTwo
          handleNextStep={handleNextStep}
          handleBackStep={handleBackStep}
        />
      )}
      {step === 3 && (
        <StepThree
          handleNextStep={handleNextStep}
          handleBackStep={handleBackStep}
        />
      )}

      {step === 4 && <StepFour />}
    </>
  );
}
