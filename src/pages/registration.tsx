import { updateDoc } from "firebase/firestore";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Registration() {
  const auth = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const [registrationForm, setRegistrationForm] = useState({
    name: "",
    email: "",
    tShirtSize: "",
    diet: "",
    iceName: "",
    iceNumber: "",
  });

  const completeRegistration = async () => {
    setSubmitting(true);
    if (auth.profileDocRef && auth.profile) {
      let profileUpdate = { ...auth.profile };
      profileUpdate.progress.registered = true;
      profileUpdate.name = registrationForm.name;
      profileUpdate.tShirtSize = registrationForm.tShirtSize;
      profileUpdate.dietaryRestrictions = registrationForm.diet;
      profileUpdate.iceName = registrationForm.iceName;
      profileUpdate.iceNumber = registrationForm.iceNumber;
      await updateDoc(auth.profileDocRef, profileUpdate);
    }
    await setTimeout(() => setSubmitting(false), 300);
    navigate("/");
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRegistrationForm({ ...registrationForm, name: event.target.value });
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRegistrationForm({ ...registrationForm, email: event.target.value });
  };

  const handleTShirtChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRegistrationForm({
      ...registrationForm,
      tShirtSize: event.target.value,
    });
  };

  const handleDietChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setRegistrationForm({ ...registrationForm, diet: event.target.value });
  };

  const handleIceNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRegistrationForm({ ...registrationForm, iceName: event.target.value });
  };

  const handleIceNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRegistrationForm({ ...registrationForm, iceNumber: event.target.value });
  };

  return (
    <>
      <h1>Registration</h1>
      <div className="nes-field">
        <label htmlFor="name_field">Your name</label>
        <input
          type="text"
          id="name_field"
          className="nes-input"
          value={registrationForm.name}
          onChange={handleNameChange}
        />
      </div>
      <div className="nes-field">
        <label htmlFor="email_field">Email</label>
        <input
          type="text"
          id="email_field"
          className="nes-input"
          value={registrationForm.email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="nes-field">
        <label htmlFor="tshirt_field">T-Shirt Size</label>
        <input
          type="text"
          id="tshirt_field"
          className="nes-input"
          value={registrationForm.tShirtSize}
          onChange={handleTShirtChange}
        />
      </div>
      <div className="nes-field">
        <label htmlFor="diet_field">Dietary Restrictions</label>
        <textarea
          id="diet_field"
          className="nes-textarea"
          value={registrationForm.diet}
          onChange={handleDietChange}
        />
      </div>
      <div className="nes-field">
        <label htmlFor="ice_name_field">Emergency Contact Name</label>
        <input
          type="text"
          id="ice_name_field"
          className="nes-input"
          value={registrationForm.iceName}
          onChange={handleIceNameChange}
        />
      </div>
      <div className="nes-field">
        <label htmlFor="ice_number_field">Emergency Contact Phone Number</label>
        <input
          type="text"
          id="ice_number_field"
          className="nes-input"
          value={registrationForm.iceNumber}
          onChange={handleIceNumberChange}
        />
      </div>
      <button
        className={"nes-btn " + (submitting ? "is-disabled" : "")}
        onClick={() => {
          if (!submitting) {
            completeRegistration();
          }
        }}
      >
        {submitting && "Submitting..."}
        {!submitting && "Submit"}
      </button>
    </>
  );
}

export default Registration;
