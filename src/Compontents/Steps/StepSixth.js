import React from "react";
import { useContactFormState } from "../ContactFormContext";
import "./Steps.css";

export function StepSixth({ moveNext }) {
  const {
    state: { SixthAnswer },
    dispatch
  } = useContactFormState();

  const Step = {
    question: "Do you need to manage recurring bills and invoices?",
    subtitle:
      "Save time and hassle by making recurring transactions automatic.",
    Options: [
      {
        title: "I pay recurring bills",
        value: "yes"
      },
      {
        title: "This doesn’t apply to my business",
        value: "No"
      }
      // {
      //   title: "I don’t use estimates or invoices",
      //   value: "NA"
      // }
    ]
  };

  const handleOnclick = (value) => {
    dispatch({ type: "SIXTH_ANSWER", payload: value });
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
                  SixthAnswer === opt.value ? "selected-option" : ""
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
