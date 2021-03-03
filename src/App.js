import MultiForm from "./Compontents/Form";
import { ContactFormProvider } from "./Compontents/ContactFormContext";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>MultiStep Form</h1>
      <ContactFormProvider>
        <MultiForm />
      </ContactFormProvider>
    </div>
  );
}
