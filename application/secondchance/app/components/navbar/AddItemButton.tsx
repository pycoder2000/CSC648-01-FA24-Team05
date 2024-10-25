"use client";

// import useLoginModal from "@/app/hooks/useLoginModal";
// import useAddItemModal from "@/app/hooks/useAddItemModal";

interface AddItemButtonProps {
  userId?: string | null;
}

const AddItemButton: React.FC<AddItemButtonProps> = ({ userId }) => {
  // const loginModal = useLoginModal();
  // const addItemModal = useAddItemModal();

  const addRentalItem = () => {
    if (userId) {
      // addItemModal.open()
    } else {
      // loginModal.open();
    }
  };

  return (
    <div
      onClick={addRentalItem}
      className="cursor-pointer h-[48px] lg:h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100 border"
    >
      <p className="text-xs font-semibold">List Your Item</p>
      <p className="text-sm">Start selling now</p>
    </div>
  );
};

export default AddItemButton;
