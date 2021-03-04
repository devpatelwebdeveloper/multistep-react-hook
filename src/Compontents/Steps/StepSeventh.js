import React from "react";
import { useContactFormState } from "../ContactFormContext";
import "./Steps.css";

export function StepSeventh({ moveNext }) {
  const {
    state: { SeventhAnswer },
    dispatch
  } = useContactFormState();

  const Step = {
    question: "Does your business have inventory?",
    subtitle: "You need to keep track of product quantity and cost of goods.",
    Options: [
      {
        title: "I want to track inventory in QuickBooks",
        value: "yes"
      },
      {
        title: "I don’t need to track inventory",
        value: "No"
      },
      {
        title: "I currently have an inventory system I’m happy with",
        value: "NA"
      }
    ]
  };

  const handleOnclick = (value) => {
    dispatch({ type: "SEVENTH_ANSWER", payload: value });
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
                  SeventhAnswer === opt.value ? "selected-option" : ""
                }`}
                onClick={() => {
                  handleOnclick(opt.value);
                }}
              >
                <div>{opt.value}</div>
                <div>{opt.title}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
