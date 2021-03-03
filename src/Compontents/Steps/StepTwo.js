import React from "react";
import { useContactFormState } from "../ContactFormContext";
import "./Steps.css";

export function StepTwo({ moveNext }) {
  const {
    state: { SecondAnswer },
    dispatch
  } = useContactFormState();

  const Options = [
    {
      title: "Question 2 I want to prepare estimates in QuickBooks",
      value: "yes"
    },
    {
      title: "Question 2 I only send invoices",
      value: "No"
    },
    {
      title: "Question 2 I don’t use estimates or invoices",
      value: "N/A"
    }
  ];

  const handleOnclick = (value) => {
    dispatch({ type: "SECOND_ANSWER", payload: value });
    moveNext();
  };

  return (
    <>
      <div className="question-slide">
        <div className="questions">
          <h1>Do you send estimates to your customers?</h1>
          <h2>
            You get customer approval on an estimate before you send an invoice.
          </h2>
          <p>first answer = {SecondAnswer}</p>
        </div>
        <div className="options">
          {Options.map((opt) => {
            return (
              <div
                className={`single-option ${
                  SecondAnswer === opt.value ? "selected-option" : ""
                }`}
                onClick={() => {
                  handleOnclick(opt.value);
                }}
              >
                {opt.title}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
