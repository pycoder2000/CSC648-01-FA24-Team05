"use client";

import CustomButton from "@/app/components/buttons/CustomButton";
import Modal from "@/app/components/modals/Modal";
import useSignupModal from "@/app/hooks/useSignupModal";
import { handleLogin } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import { City, Country, State } from "country-state-city";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Select from "react-select";

const SignupModal = () => {
  const router = useRouter();
  const signupModal = useSignupModal();
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<string[]>([]);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleNextStep = () => {
    const validationErrors: string[] = [];

    if (!name) validationErrors.push("Name is required.");
    if (!email) validationErrors.push("Email is required.");
    else if (!validateEmail(email))
      validationErrors.push("Invalid email format.");
    if (!password1) validationErrors.push("Password is required.");
    if (!password2) validationErrors.push("Please confirm your password.");
    if (password1 !== password2)
      validationErrors.push("Passwords do not match.");

    setErrors(validationErrors);

    if (validationErrors.length === 0) {
      setStep(2);
    }
  };

  const submitSignup = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password1", password1);
    formData.append("password2", password2);
    formData.append("phone", phone);
    formData.append("birthday", birthday);
    formData.append("country", country);
    formData.append("state", state);
    formData.append("city", city);

    if (profilePicture) {
      formData.append("profile_picture", profilePicture);
    }

    const response = await apiService.postWithoutToken(
      "/api/auth/register/",
      formData
    );

    if (response.access) {
      handleLogin(response.user.pk, response.access, response.refresh);

      signupModal.close();
      router.push("/");
    } else {
      const tmpErrors: string[] = Object.values(response).map(
        (error: any) => error
      );
      setErrors(tmpErrors);
    }
  };

  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const stateOptions = State.getStatesOfCountry(country).map((state) => ({
    value: state.isoCode,
    label: state.name,
  }));

  const cityOptions = City.getCitiesOfState(country, state).map((city) => ({
    value: city.name,
    label: city.name,
  }));

  const renderError = (error: string, index: number) => (
    <div
      key={`error_${index}`}
      className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
      role="alert"
    >
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{error}</span>
      <span
        className="absolute top-0 bottom-0 right-0 px-4 py-3"
        role="button"
        onClick={() => {
          const newErrors = errors.filter((_, i) => i !== index);
          setErrors(newErrors);
        }}
      >
        <svg
          className="fill-current h-6 w-6 text-red-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
        </svg>
      </span>
    </div>
  );

  const StepOneContent = (
    <>
      <input
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        type="text"
        value={name}
        className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        required
      />
      <input
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        type="email"
        value={email}
        className="w-full h-[54px] px-4 border border-gray-300 rounded-xl mt-4"
        required
      />
      <input
        onChange={(e) => setPassword1(e.target.value)}
        placeholder="Your password"
        type="password"
        value={password1}
        className="w-full h-[54px] px-4 border border-gray-300 rounded-xl mt-4"
        required
      />
      <input
        onChange={(e) => setPassword2(e.target.value)}
        placeholder="Repeat password"
        type="password"
        value={password2}
        className="w-full h-[54px] px-4 border border-gray-300 rounded-xl mt-4"
        required
      />

      {errors.map(renderError)}

      <CustomButton
        label="Next"
        onClick={handleNextStep}
        className="w-full mt-4"
      />
    </>
  );

  const StepTwoContent = (
    <>
      <div className="mb-6">
        <label
          className="block text-gray-700 font-medium mb-2"
          htmlFor="country"
        >
          Select Your Country
        </label>
        <Select
          id="country"
          options={countryOptions}
          placeholder="Choose country"
          onChange={(selectedOption) => setCountry(selectedOption?.value || "")}
          className="w-full"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="state">
          Select Your State
        </label>
        <Select
          id="state"
          options={stateOptions}
          placeholder="Choose state"
          onChange={(selectedOption) => setState(selectedOption?.value || "")}
          className="w-full"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="city">
          Select Your City
        </label>
        <Select
          id="city"
          options={cityOptions}
          placeholder="Choose city"
          onChange={(selectedOption) => setCity(selectedOption?.value || "")}
          className="w-full"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
          Phone Number
        </label>
        <input
          id="phone"
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Your phone number"
          type="text"
          value={phone}
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />
      </div>

      <div className="mb-6">
        <label
          className="block text-gray-700 font-medium mb-2"
          htmlFor="birthday"
        >
          Birthday
        </label>
        <input
          id="birthday"
          onChange={(e) => setBirthday(e.target.value)}
          placeholder="Your birthday (YYYY-MM-DD)"
          type="date"
          value={birthday}
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />
      </div>

      <div className="mb-6">
        <label
          className="block text-gray-700 font-medium mb-2"
          htmlFor="profile_picture"
        >
          Upload Profile Picture
        </label>
        <div className="flex justify-center">
          <input
            id="profile_picture"
            type="file"
            accept="image/*"
            className="block text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
            onChange={(e) =>
              setProfilePicture(e.target.files ? e.target.files[0] : null)
            }
          />
        </div>
      </div>

      <div className="flex justify-between mt-4 gap-4">
        <CustomButton label="Back" onClick={() => setStep(1)} />
        <CustomButton label="Submit" onClick={submitSignup} />
      </div>
    </>
  );

  const content = step === 1 ? StepOneContent : StepTwoContent;

  return (
    <Modal
      isOpen={signupModal.isOpen}
      close={signupModal.close}
      label="Sign up"
      content={content}
    />
  );
};

export default SignupModal;
