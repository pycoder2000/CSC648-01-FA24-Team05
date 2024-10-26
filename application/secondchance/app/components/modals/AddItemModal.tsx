"use client";

import CustomButton from "@/app/components/buttons/CustomButton";
import useAddItemModal from "@/app/hooks/useAddItemModal";
import apiService from "@/app/services/apiService";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import Categories from "../additem/Categories";
import SelectCountry, { SelectCountryValue } from "../forms/SelectCountry";
import Modal from "./Modal";

const AddItemModal = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<string[]>([]);
  const [dataCategory, setDataCategory] = useState("");
  const [dataTitle, setDataTitle] = useState("");
  const [dataDescription, setDataDescription] = useState("");
  const [dataPrice, setDataPrice] = useState("");
  const [dataCondition, setDataCondition] = useState("");
  const [dataCountry, setDataCountry] = useState<SelectCountryValue>();
  const [dataImage, setDataImage] = useState<File | null>(null);

  const addItemModal = useAddItemModal();
  const router = useRouter();

  const setCategory = (category: string) => {
    setDataCategory(category);
  };

  const setImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const tmpImage = event.target.files[0];
      setDataImage(tmpImage);
    }
  };

  const submitForm = async () => {
    console.log("submitForm");

    if (
      dataCategory &&
      dataTitle &&
      dataDescription &&
      dataPrice &&
      dataCountry &&
      dataImage
    ) {
      const formData = new FormData();
      formData.append("category", dataCategory);
      formData.append("title", dataTitle);
      formData.append("description", dataDescription);
      formData.append("price_per_day", dataPrice);
      formData.append("condition", dataCondition);
      formData.append("country", dataCountry.label);
      formData.append("country_code", dataCountry.value);
      formData.append("image", dataImage);

      const response = await apiService.post("/api/items/create/", formData);

      if (response.success) {
        console.log("SUCCESS :-D");
        router.push("/?added=true");
        addItemModal.close();
      } else {
        console.log("Error");
        const tmpErrors: string[] = Object.values(response).map(
          (error: any) => error
        );
        setErrors(tmpErrors);
      }
    }
  };

  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h2 className="mb-6 text-2xl">Choose Category</h2>
            <Categories dataCategory={dataCategory} setCategory={setCategory} />
            <div className="mt-6 flex flex-row gap-4">
              <CustomButton label="Next ->" onClick={() => setCurrentStep(2)} />
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h2 className="mb-6 text-2xl">Describe Your Item</h2>
            <div className="pt-3 pb-6 space-y-4">
              <div className="flex flex-col space-y-2">
                <label>Title</label>
                <input
                  type="text"
                  value={dataTitle}
                  onChange={(e) => setDataTitle(e.target.value)}
                  className="w-full p-4 border border-gray-600 rounded-xl"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label>Description</label>
                <textarea
                  value={dataDescription}
                  onChange={(e) => setDataDescription(e.target.value)}
                  className="w-full h-[200px] p-4 border border-gray-600 rounded-xl"
                ></textarea>
              </div>
            </div>
            <div className="mt-6 flex flex-row gap-4">
              <CustomButton
                label="<- Previous"
                className="bg-black hover:bg-gray-800"
                onClick={() => setCurrentStep(1)}
              />
              <CustomButton label="Next ->" onClick={() => setCurrentStep(3)} />
            </div>
          </>
        );

      case 3:
        return (
          <>
            <h2 className="mb-6 text-2xl">Details</h2>
            <div className="pt-3 pb-6 space-y-4">
              <div className="flex flex-col space-y-2">
                <label>Price per day</label>
                <input
                  type="number"
                  value={dataPrice}
                  onChange={(e) => setDataPrice(e.target.value)}
                  className="w-full p-4 border border-gray-600 rounded-xl"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label>Condition</label>
                <select
                  value={dataCondition}
                  onChange={(e) => setDataCondition(e.target.value)}
                  className="w-full p-4 border border-gray-600 rounded-xl"
                >
                  <option value="">Select condition</option>
                  <option value="new">New</option>
                  <option value="like new">Like New</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex flex-row gap-4">
              <CustomButton
                label="<- Previous"
                className="bg-black hover:bg-gray-800"
                onClick={() => setCurrentStep(2)}
              />
              <CustomButton label="Next ->" onClick={() => setCurrentStep(4)} />
            </div>
          </>
        );

      case 4:
        return (
          <>
            <h2 className="mb-6 text-2xl">Location</h2>
            <div className="pt-3 pb-6 space-y-4">
              <SelectCountry
                value={dataCountry}
                onChange={(value) =>
                  setDataCountry(value as SelectCountryValue)
                }
              />
            </div>
            <div className="mt-6 flex flex-row gap-4">
              <CustomButton
                label="<- Previous"
                className="bg-black hover:bg-gray-800"
                onClick={() => setCurrentStep(3)}
              />
              <CustomButton label="Next ->" onClick={() => setCurrentStep(5)} />
            </div>
          </>
        );

      case 5:
        return (
          <>
            <h2 className="mb-6 text-2xl">Image</h2>
            <div className="pt-3 pb-6 space-y-4">
              <div className="py-4 px-6 bg-gray-600 text-white rounded-xl">
                <input type="file" accept="image/*" onChange={setImage} />
              </div>

              {dataImage && (
                <div className="w-[200px] h-[150px] relative">
                  <Image
                    fill
                    alt="Uploaded image"
                    src={URL.createObjectURL(dataImage)}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              )}
            </div>

            {errors.map((error, index) => (
              <div
                key={index}
                className="p-5 mb-4 bg-secondchance text-white rounded-xl opacity-80"
              >
                {error}
              </div>
            ))}

            <div className="mt-6 flex flex-row gap-4">
              <CustomButton
                label="<- Previous"
                className="bg-black hover:bg-gray-800"
                onClick={() => setCurrentStep(4)}
              />
              <CustomButton label="Submit" onClick={submitForm} />
            </div>
          </>
        );

      default:
        return (
          <div className="p-4">
            <p>Step not recognized. Please go back and try again.</p>
          </div>
        );
    }
  };

  return (
    <Modal
      isOpen={addItemModal.isOpen}
      close={addItemModal.close}
      label="Add Item"
      content={renderContent()}
    />
  );
};

export default AddItemModal;
