import React, { createContext, useReducer, useContext } from "react";

function formReducer(state, action) {
  switch (action.type) {
    case "FIRST_ANSWER":
      return { ...state, FirstAnswer: action.payload };
    case "SECOND_ANSWER":
      return { ...state, SecondAnswer: action.payload };
    case "THIRD_ANSWER":
      return { ...state, ThirdAnswer: action.payload };
    case "FOURTH_ANSWER":
      return { ...state, FourthAnswer: action.payload };
    case "FIFTH_ANSWER":
      return { ...state, FifthAnswer: action.payload };
    case "SIXTH_ANSWER":
      return { ...state, SixthAnswer: action.payload };
    case "SEVENTH_ANSWER":
      return { ...state, SeventhAnswer: action.payload };

    case "SUBMIT":
      return { ...state, isSubmitLoading: true };
    case "SUBMISSION_RECEIVED":
      return { ...state, isSubmitLoading: false, isSubmissionReceived: true };
    default:
      throw new Error();
  }
}

const ContactFormContext = createContext();

const initialState = {
  FirstAnswer: "",
  SecondAnswer: "",
  ThirdAnswer: "",
  FourthAnswer: "",
  FifthAnswer: "",
  SixthAnswer: "",
  SeventhAnswer: "",
  isSubmitLoading: false,
  isSubmissionReceived: false
};

export const ContactFormProvider = function ({ children }) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <ContactFormContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactFormContext.Provider>
  );
};

export function useContactFormState() {
  const context = useContext(ContactFormContext);

  if (context === undefined) {
    throw new Error(
      "useContactFormState must be used within a ContactFormProvider"
    );
  }

  return context;
}
