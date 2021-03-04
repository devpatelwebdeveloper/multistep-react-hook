import React from "react";
import { useContactFormState } from "../ContactFormContext";
import "./Steps.css";

export function StepTwo({ moveNext }) {
  const {
    state: { SecondAnswer },
    dispatch
  } = useContactFormState();

  const Step = {
    question: "Do you pay employees or contract workers?",
    subtitle: "You need a way to run payroll that’s accurate and on time.",
    Options: [
      {
        title: "I want to pay employees in QuickBooks",
        value: "yes"
      },
      {
        title: "I don’t have employees",
        value: "No"
      },
      {
        title: "I currently have a payroll solution I’m happy with",
        value: "NA"
      }
    ]
  };

  const handleOnclick = (value) => {
    dispatch({ type: "SECOND_ANSWER", payload: value });
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
                  SecondAnswer === opt.value ? "selected-option" : ""
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
