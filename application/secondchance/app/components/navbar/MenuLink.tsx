'use client';

interface MenuLinkProps {
  label: string;
  onClick: () => void;
}

const MenuLink: React.FC<MenuLinkProps> = ({ label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-lg px-4 py-2 text-gray-700 transition hover:bg-gray-100"
    >
      {label}
    </div>
  );
};

export default MenuLink;
