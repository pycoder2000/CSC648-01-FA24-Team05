'use client';

import { useCallback, useEffect, useState } from 'react';

interface ModalProps {
  label: string;
  close: () => void;
  content: React.ReactElement;
  isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({ label, content, isOpen, close }) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);

    setTimeout(() => {
      close();
    }, 300);
  }, [close]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative mx-auto my-6 h-auto w-[90%] md:w-[80%] lg:w-[700px]">
        <div
          className={`translate duration-600 h-full ${showModal ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-10'}`}
        >
          <div className="relative flex h-auto w-full flex-col rounded-xl bg-white">
            <header className="relative flex h-[60px] items-center justify-center rounded-t border-b p-6">
              <div
                onClick={handleClose}
                className="absolute left-3 cursor-pointer rounded-full p-3 hover:bg-gray-300"
              >
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </div>

              <h2 className="text-lg font-bold">{label}</h2>
            </header>

            <section className="p-6">{content}</section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
