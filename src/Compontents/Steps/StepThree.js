import React from "react";
import { useContactFormState } from "../ContactFormContext";
import "./Steps.css";

export function StepThree({ moveNext }) {
  const {
    state: { ThirdAnswer },
    dispatch
  } = useContactFormState();

  const Step = {
    question: "Is your business a corporation or sole proprietorship?",
    subtitle:
      "If you’re a sole proprietor, you’re the sole owner of your business. If you’re incorporated, your business operates as its own legal entity.",
    Options: [
      {
        title: "My business is incorporated",
        value: "yes"
      },
      {
        title: "My business is a sole proprietorship",
        value: "No"
      },
      {
        title: "I'm not sure'",
        value: "NA"
      }
    ]
  };

  const handleOnclick = (value) => {
    dispatch({ type: "THIRD_ANSWER", payload: value });
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
                  ThirdAnswer === opt.value ? "selected-option" : ""
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
