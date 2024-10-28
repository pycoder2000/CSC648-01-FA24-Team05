"use client";

import ItemCard from "@/app/components/items/ItemCard";
import useSearchModal from "@/app/hooks/useSearchModal";
import apiService from "@/app/services/apiService";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export type ItemType = {
  id: string;
  title: string;
  image_url: string;
  price_per_day: number;
  is_favorite: boolean;
};

interface ItemListProps {
  seller_id?: string | null;
  favorites?: boolean | null;
}

const ItemList: React.FC<ItemListProps> = ({ seller_id, favorites }) => {
  const params = useSearchParams();
  const searchModal = useSearchModal();
  const country = searchModal.query.country;
  const pickUpDate = searchModal.query.startDate;
  const returnDate = searchModal.query.endDate;
  const condition = searchModal.query.condition;
  const priceMin = searchModal.query.priceMin;
  const priceMax = searchModal.query.priceMax;
  const category = searchModal.query.category;
  const [items, setItems] = useState<ItemType[]>([]);

  console.log("searchQuery: ", searchModal.query);

  const markFavorite = (id: string, is_favorite: boolean) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        item.is_favorite = is_favorite;
      }
      return item;
    });
    setItems(updatedItems);
  };

  const getItems = async () => {
    let url = "/api/items/";

    if (seller_id) {
      url += `?seller_id=${seller_id}`;
    } else if (favorites) {
      url += "?is_favorites=true";
    } else {
      const queryParams = new URLSearchParams();

      if (country) {
        queryParams.append("country", country);
      }

      if (pickUpDate) {
        queryParams.append(
          "startDate",
          format(new Date(pickUpDate), "yyyy-MM-dd")
        );
      }

      if (returnDate) {
        queryParams.append(
          "endDate",
          format(new Date(returnDate), "yyyy-MM-dd")
        );
      }

      if (condition) {
        queryParams.append("condition", condition);
      }

      if (priceMin !== undefined) {
        queryParams.append("priceMin", String(priceMin));
      }

      if (priceMax !== undefined) {
        queryParams.append("priceMax", String(priceMax));
      }

      if (category) {
        queryParams.append("category", category);
      }

      if (queryParams.toString()) {
        url += `?${queryParams.toString()}`;
      }
    }

    try {
      const response = await apiService.get(url);
      const tmpItems = response.data || [];
      const favoritesList = response.favorites || [];

      const updatedItems = tmpItems.map((item: ItemType) => ({
        ...item,
        is_favorite: favoritesList.includes(item.id),
      }));

      setItems(updatedItems);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    getItems();
  }, [category, searchModal.query, params]);

  return (
    <>
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          markFavorite={(is_favorite) => markFavorite(item.id, is_favorite)}
        />
      ))}
    </>
  );
};

export default ItemList;
