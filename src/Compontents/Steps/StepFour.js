import React from "react";
import { useContactFormState } from "../ContactFormContext";
import "./Steps.css";

export function StepFour({ moveNext }) {
  const {
    state: { FourthAnswer },
    dispatch
  } = useContactFormState();

  const Step = {
    question: "Do you want to connect QuickBooks to other apps?",
    subtitle:
      "Sync with apps like PayPal, Shopify, and Square to bring all your data together.",
    Options: [
      {
        title: "I want to QuickBooks to sync with other apps",
        value: "yes"
      },
      {
        title: "I don’t need to sync QuickBooks with other apps",
        value: "No"
      },
      {
        title: "I'm not sure",
        value: "NA"
      }
    ]
  };

  const handleOnclick = (value) => {
    dispatch({ type: "FOURTH_ANSWER", payload: value });
    moveNext();
  };

  return (
    <>
      <div className="question-slide">
        <div className="questions">
          <h1>{Step.question}</h1>
          <h2>{Step.subtitle}</h2>
        </div>
        <div className="options">
          {Step.Options.map((opt) => {
            return (
              <div
                className={`single-option ${
                  FourthAnswer === opt.value ? "selected-option" : ""
                }`}
                onClick={() => {
                  handleOnclick(opt.value);
                }}
              >
                {opt.value !== "NA" && <div>{opt.value}</div>}
                <div>{opt.title}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
