"use client";

import useSuccessModal from "@/app/hooks/useSuccessModal";
import { useRouter } from "next/navigation";

const SuccessModal = () => {
  const successModal = useSuccessModal();
  const router = useRouter();

  const handleRedirect = () => {
    successModal.close();
    router.push("/myrentals");
  };

  if (!successModal.isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 shadow-xl">
        <h2 className="text-xl font-bold mb-4">Booking Successful!</h2>
        <p className="mb-6">Your booking has been completed successfully.</p>
        <button
          onClick={handleRedirect}
          className="px-4 py-2 bg-secondchance text-white rounded-lg hover:bg-secondchance-dark transition"
        >
          View Booking Details
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
