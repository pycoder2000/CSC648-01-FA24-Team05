interface CustomButtonProps {
  label: string;
  className?: string;
  onClick: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, className, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`w-full cursor-pointer rounded-xl bg-secondchance py-4 text-center text-white transition hover:bg-secondchance-dark ${className}`}
    >
      {label}
    </div>
  );
};

export default CustomButton;
