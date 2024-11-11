'use client';

import useAddItemModal from '@/app/hooks/useAddItemModal';
import useLoginModal from '@/app/hooks/useLoginModal';

interface AddItemButtonProps {
  userId?: string | null;
}

const AddItemButton: React.FC<AddItemButtonProps> = ({ userId }) => {
  const loginModal = useLoginModal();
  const addItemModal = useAddItemModal();

  const addRentalItem = () => {
    if (userId) {
      addItemModal.open();
    } else {
      loginModal.open();
    }
  };

  return (
    <div
      onClick={addRentalItem}
      className="flex h-[64px] cursor-pointer flex-col justify-center rounded-full border px-8 hover:bg-gray-100 lg:h-[64px]"
    >
      <p className="text-xs font-semibold">List Your Item</p>
      <p className="text-sm">Start selling now</p>
    </div>
  );
};

export default AddItemButton;
