import React from "react";
import { useContactFormState } from "../ContactFormContext";
import "./Steps.css";

export function StepFifth({ moveNext }) {
  const {
    state: { FifthAnswer },
    dispatch
  } = useContactFormState();

  const Step = {
    question: "Do your team members need to use QuickBooks?",
    subtitle:
      "You and your accountant get access automatically, but you need to add additional users.",
    Options: [
      {
        title: "I have team members who need access to QuickBooks",
        value: "yes"
      },
      {
        title: "Only my accountant and I need access",
        value: "No"
      }
      // {
      //   title: "I don’t use estimates or invoices",
      //   value: "NA"
      // }
    ]
  };

  const handleOnclick = (value) => {
    dispatch({ type: "FIFTH_ANSWER", payload: value });
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
                  FifthAnswer === opt.value ? "selected-option" : ""
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
