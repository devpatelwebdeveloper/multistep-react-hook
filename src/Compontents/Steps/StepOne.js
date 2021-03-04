import React from "react";
import { useContactFormState } from "../ContactFormContext";
import "./Steps.css";

export function StepOne({ moveNext }) {
  const {
    state: { FirstAnswer },
    dispatch
  } = useContactFormState();

  const Step = {
    question: "Do you send estimates to your customers?",
    subtitle:
      "You get customer approval on an estimate before you send an invoice.",
    Options: [
      {
        title: "I want to prepare estimates in QuickBooks",
        value: "yes"
      },
      {
        title: "I only send invoices",
        value: "No"
      },
      {
        title: "I don’t use estimates or invoices",
        value: "NA"
      }
    ]
  };
  const handleOnclick = (value) => {
    dispatch({ type: "FIRST_ANSWER", payload: value });
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
                  FirstAnswer === opt.value ? "selected-option" : ""
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
