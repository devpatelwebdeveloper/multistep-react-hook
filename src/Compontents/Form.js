import React, { useState } from "react";
import { StepOne } from "./Steps/StepOne";
import { StepTwo } from "./Steps/StepTwo";
import { StepThree } from "./Steps/StepThree";
import { StepFour } from "./Steps/StepFour";
import { StepFifth } from "./Steps/StepFifth";
import { StepSixth } from "./Steps/StepSixth";
import { StepSeventh } from "./Steps/StepSeventh";

import { useContactFormState } from "./ContactFormContext";

function useFormProgress() {
  const [currentStep, setCurrentStep] = useState(0);

  function goForward() {
    setCurrentStep(currentStep + 1);
  }

  function goBack() {
    setCurrentStep(currentStep - 1);
  }

  return [currentStep, goForward, goBack];
}

export default function MultiForm() {
  const { dispatch, state } = useContactFormState();
  function handleSubmit() {
    dispatch({ type: "SUBMIT" });

    // Simulated network request :)
    setTimeout(() => {
      dispatch({ type: "SUBMISSION_RECEIVED" });
    }, 1500);
  }

  const [currentStep, goForward, goBack] = useFormProgress();
  const isFirst = currentStep === 0;
  const isLast = currentStep === 6;

  const steps = [
    <StepOne moveNext={isLast ? handleSubmit : goForward} />,
    <StepTwo moveNext={isLast ? handleSubmit : goForward} />,
    <StepThree moveNext={isLast ? handleSubmit : goForward} />,
    <StepFour moveNext={isLast ? handleSubmit : goForward} />,
    <StepFifth moveNext={isLast ? handleSubmit : goForward} />,
    <StepSixth moveNext={isLast ? handleSubmit : goForward} />,
    <StepSeventh moveNext={isLast ? handleSubmit : goForward} />
  ];
  // const isFirst = currentStep === 0;
  // const isLast = currentStep === steps.length - 1;

  //Submission in progress
  if (state.isSubmitLoading) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }

  //After Submission Screen
  if (state.isSubmissionReceived) {
    return (
      <>
        <h1>Thanks for your submission!</h1>
        <pre style={{ textAlign: "left" }}>
          {JSON.stringify(state, null, 2)}
        </pre>
        <button>Start Over</button>
      </>
    );
  }

  return (
    <>
      <div>
        {steps[currentStep]}
        <div>
          {!isFirst && <button onClick={() => goBack()}>Go Back</button>}
          {/* Step Buttons Starts */}
          {/* <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();

              if (isLast) {
                handleSubmit();
              } else {
                goForward();
              }
            }}
          >
            {isLast ? "Submit" : "Next"}
          </button> */}
          {/* Step Buttons Ends */}
        </div>
        <div>
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>
    </>
  );
}
