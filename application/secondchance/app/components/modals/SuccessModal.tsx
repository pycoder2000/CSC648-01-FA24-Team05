'use client';

import useSuccessModal from '@/app/hooks/useSuccessModal';
import { useRouter } from 'next/navigation';

const SuccessModal = () => {
  const successModal = useSuccessModal();
  const router = useRouter();

  const handleRedirect = () => {
    successModal.close();
    router.push('/myrentals');
  };

  if (!successModal.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-white p-8 shadow-xl">
        <h2 className="mb-4 text-xl font-bold">Booking Successful!</h2>
        <p className="mb-6">Your booking has been completed successfully.</p>
        <button
          onClick={handleRedirect}
          className="rounded-lg bg-secondchance px-4 py-2 text-white transition hover:bg-secondchance-dark"
        >
          View Booking Details
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
