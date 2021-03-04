import React, { useState, useEffect } from "react";
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
  function restart() {
    setCurrentStep(0);
  }

  return [currentStep, goForward, goBack, restart];
}

export default function MultiForm() {
  const [recommendation, setRecommendation] = useState("easystart");
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [productTitle, setProductTitle] = useState("");
  const { dispatch, state } = useContactFormState();

  // Simulated network request :)
  function handleSubmit() {
    dispatch({ type: "SUBMIT" });
    setTimeout(() => {
      dispatch({ type: "SUBMISSION_RECEIVED" });
    }, 1500);
  }

  const [currentStep, goForward, goBack, restart] = useFormProgress();
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

  //Reset
  const resetState = () => {
    dispatch({ type: "RESET" });
    restart();
  };

  //Set package
  const doAnswerEasyStart = () => {
    setProductTitle("EASY START");
    setShowRecommendation(true);
  };
  const doAnswerEssentials = () => {
    setProductTitle("ESSENTIALS");
    setShowRecommendation(true);
  };
  const doAnswerPlus = () => {
    setProductTitle("PLUS");
    setShowRecommendation(true);
  };
  const doAnswerSelfEmployed = () => {
    setProductTitle("SELF EMPLOYED");
    setShowRecommendation(true);
  };

  // Check the Answer
  const showAnswer = () => {
    if (state.SeventhAnswer === "yes") {
      console.log("I am at plus");
      setRecommendation("plus");
      doAnswerPlus();
    } else {
      if (state.FifthAnswer === "yes" || state.SixthAnswer === "yes") {
        console.log("I am at essentials");
        setRecommendation("essentials");
        doAnswerEssentials();
      } else {
        console.log("I am at easy start");
        setRecommendation("easystart");
        doAnswerEasyStart();
      }
    }
    if (
      state.FirstAnswer === "No" &&
      state.SecondAnswer === "No" &&
      state.ThirdAnswer === "No" &&
      state.FourthAnswer === "No" &&
      state.FifthAnswer === "No" &&
      state.SixthAnswer === "No" &&
      state.SeventhAnswer === "No"
    )
      console.log("I am at selfemployed");
    setRecommendation("selfemployed");
    doAnswerSelfEmployed();
  };
  const checkAnswer = () => {
    if (
      state.FirstAnswer !== "" &&
      state.SecondAnswer !== "" &&
      state.ThirdAnswer !== "" &&
      state.FourthAnswer !== "" &&
      state.FifthAnswer !== "" &&
      state.SixthAnswer !== "" &&
      state.SeventhAnswer !== ""
    )
      showAnswer();
  };

  useEffect(() => {
    if (state.isSubmitLoading) {
      checkAnswer();
    } else {
      console.log(`its not working`);
    }
  });

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
        {showRecommendation && (
          <>
            <h2>This is Recommendation: {recommendation}</h2>
            <h2>This is Title: {productTitle}</h2>
          </>
        )}
        <pre style={{ textAlign: "left" }}>
          {JSON.stringify(state, null, 2)}
        </pre>
        <button onClick={resetState}>Start Over</button>
      </>
    );
  }
  return (
    <>
      {/* {JSON.stringify(state, null, 2)} */}
      <div>
        {steps[currentStep]}
        <div>{!isFirst && <button onClick={goBack}>Go Back</button>}</div>
        <div>
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>
      <>
        <h2>This is Initial Recommendation: {recommendation}</h2>
        <h2>This is Initial Title: {productTitle}</h2>
      </>
    </>
  );
}
