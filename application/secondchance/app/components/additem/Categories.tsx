import Image from 'next/image';

interface CategoriesProps {
  dataCategory: string;
  setCategory: (category: string) => void;
}

/**
 * A React functional component for displaying a list of categories.
 * Users can click on a category to select it, visually indicated by styling changes.
 *
 * Props:
 * - dataCategory: The currently selected category ID.
 * - setCategory: A function to update the selected category when a user clicks on a category.
 *
 * Features:
 * - Displays a grid of categories, each with an icon and label.
 * - Highlights the currently selected category with distinct styles.
 * - Applies hover effects to enhance user interactivity.
 */
const Categories: React.FC<CategoriesProps> = ({ dataCategory, setCategory }) => {
  const categories = [
    {
      id: 'electronics',
      label: 'Electronics',
      icon: '/category-icons/icn_category_electronics.png',
    },
    { id: 'furniture', label: 'Furniture', icon: '/category-icons/icn_category_furniture.png' },
    { id: 'clothing', label: 'Clothing', icon: '/category-icons/icn_category_clothing.png' },
    { id: 'books', label: 'Books', icon: '/category-icons/icn_category_books.png' },
    { id: 'appliances', label: 'Appliances', icon: '/category-icons/icn_category_appliances.png' },
    { id: 'sports', label: 'Sports', icon: '/category-icons/icn_category_sports.png' },
    { id: 'toys', label: 'Toys', icon: '/category-icons/icn_category_toys.png' },
    { id: 'tools', label: 'Tools', icon: '/category-icons/icn_category_tools.png' },
    { id: 'vehicles', label: 'Vehicles', icon: '/category-icons/icn_category_vehicles.png' },
    { id: 'party', label: 'Party', icon: '/category-icons/icn_category_party.png' },
    { id: 'music', label: 'Music', icon: '/category-icons/icn_category_music.png' },
    {
      id: 'photography',
      label: 'Photography',
      icon: '/category-icons/icn_category_photography.png',
    },
    { id: 'gardening', label: 'Gardening', icon: '/category-icons/icn_category_gardening.png' },
    { id: 'office', label: 'Office', icon: '/category-icons/icn_category_office.png' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 space-y-2 overflow-x-auto">
      {categories.map((cat) => (
        <div
          key={cat.id}
          onClick={() => setCategory(cat.id)}
          className={`flex flex-col items-center space-y-2 rounded p-2 transition-all duration-300 ${
            dataCategory === cat.id
              ? 'border-b-4 border-gray-600 opacity-100'
              : 'border-b-4 border-transparent opacity-70'
          } cursor-pointer hover:border-gray-400 hover:opacity-100 hover:shadow`}
        >
          <Image
            src={cat.icon}
            alt={`${cat.label} icon`}
            width={35}
            height={35}
            className="transition-transform duration-300 hover:scale-110"
          />
          <span className="text-sm font-medium text-gray-700">{cat.label}</span>{' '}
        </div>
      ))}
    </div>
  );
};

export default Categories;
