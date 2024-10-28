"use client";

interface MenuLinkProps {
  label: string;
  onClick: () => void;
}

const MenuLink: React.FC<MenuLinkProps> = ({ label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition rounded-lg text-gray-700"
    >
      {label}
    </div>
  );
};

export default MenuLink;
