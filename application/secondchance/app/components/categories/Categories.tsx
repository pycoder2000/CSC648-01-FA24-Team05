"use client";

import useSearchModal, { SearchQuery } from "@/app/hooks/useSearchModal";
import Image from "next/image";
import { useState } from "react";

const Categories = () => {
  const searchModal = useSearchModal();
  const [category, setCategory] = useState<string>("");

  const _setCategory = (_category: string) => {
    setCategory(_category);

    const query: SearchQuery = {
      country: searchModal.query.country,
      startDate: searchModal.query.startDate,
      endDate: searchModal.query.endDate,
      condition: searchModal.query.condition,
      priceMin: searchModal.query.priceMin,
      priceMax: searchModal.query.priceMax,
      category: _category,
    };

    searchModal.setQuery(query);
  };

  const categories = [
    {
      id: "",
      label: "All",
      icon: "/category-icons/icn_category_all.png",
    },
    {
      id: "electronics",
      label: "Electronics",
      icon: "/category-icons/icn_category_electronics.png",
    },
    {
      id: "furniture",
      label: "Furniture",
      icon: "/category-icons/icn_category_furniture.png",
    },
    {
      id: "clothing",
      label: "Clothing",
      icon: "/category-icons/icn_category_clothing.png",
    },
    {
      id: "books",
      label: "Books",
      icon: "/category-icons/icn_category_books.png",
    },
    {
      id: "appliances",
      label: "Appliances",
      icon: "/category-icons/icn_category_appliances.png",
    },
    {
      id: "sports",
      label: "Sports",
      icon: "/category-icons/icn_category_sports.png",
    },
    {
      id: "toys",
      label: "Toys",
      icon: "/category-icons/icn_category_toys.png",
    },
    {
      id: "tools",
      label: "Tools",
      icon: "/category-icons/icn_category_tools.png",
    },
    {
      id: "vehicles",
      label: "Vehicles",
      icon: "/category-icons/icn_category_vehicles.png",
    },
    {
      id: "party",
      label: "Party",
      icon: "/category-icons/icn_category_party.png",
    },
    {
      id: "music",
      label: "Music",
      icon: "/category-icons/icn_category_music.png",
    },
    {
      id: "photography",
      label: "Photography",
      icon: "/category-icons/icn_category_photography.png",
    },
    {
      id: "gardening",
      label: "Gardening",
      icon: "/category-icons/icn_category_gardening.png",
    },
    {
      id: "office",
      label: "Office",
      icon: "/category-icons/icn_category_office.png",
    },
  ];

  return (
    <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">
      {categories.map((cat) => (
        <div
          key={cat.id}
          onClick={() => _setCategory(cat.id)}
          className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
            category === cat.id ? "border-black" : "border-white"
          } opacity-60 hover:border-gray-200 hover:opacity-100`}
        >
          <Image
            src={cat.icon}
            alt={`Category - ${cat.label}`}
            width={30}
            height={30}
          />

          <span className="text-xs">{cat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Categories;
