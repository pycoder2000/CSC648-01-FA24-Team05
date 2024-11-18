interface CustomButtonProps {
  /**
   * The text to display on the button.
   */
  label: string;

  /**
   * Additional CSS classes to customize the button's appearance (optional).
   */
  className?: string;

  /**
   * Function to handle the button click event.
   */
  onClick: () => void;
}

/**
 * CustomButton Component
 *
 * A reusable button component with customizable label, style, and click behavior.
 *
 * Props:
 * - label: The text displayed on the button.
 * - className: Optional CSS classes to extend or override default styles.
 * - onClick: Callback function executed when the button is clicked.
 *
 * Features:
 * - Fully customizable with additional class names.
 * - Includes hover effects for improved user interactivity.
 */
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
