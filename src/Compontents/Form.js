import React, { useState } from "react";
import { StepOne } from "./Steps/StepOne";
import { StepTwo } from "./Steps/StepTwo";
import { StepThree } from "./Steps/StepThree";

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
  const steps = [<StepOne />, <StepTwo />, <StepThree />];
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  if (state.isSubmitLoading) {
    return (
      <div className="App">
        <p>Loading...</p>
      </div>
    );
  }

  if (state.isSubmissionReceived) {
    return (
      <div className="App">
        <h1>Thanks for your submission!</h1>
        <pre style={{ textAlign: "left" }}>
          {JSON.stringify(state, null, 2)}
        </pre>
        <button>Start Over</button>
      </div>
    );
  }

  return (
    <>
      <div>
        {steps[currentStep]}
        <div>
          {!isFirst && <button onClick={() => goBack()}>Go Back</button>}

          <button
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
          </button>
        </div>
        <div>
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>
    </>
  );
}
