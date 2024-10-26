"use client";

import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
// import apiService from '@/app/services/apiService';
import useSearchModal from "@/app/hooks/useSearchModal";

export type ItemType = {
  id: string;
  title: string;
  image_url: string;
  price: number;
  is_favorite: boolean;
};

interface ItemListProps {
  seller_id?: string | null;
  favorites?: boolean | null;
}

const ItemList: React.FC<ItemListProps> = ({ seller_id, favorites }) => {
  const params = useSearchParams();
  const searchModal = useSearchModal();
  const location = searchModal.query.location;
  const pickUpDate = searchModal.query.startDate;
  const returnDate = searchModal.query.endDate;
  const condition = searchModal.query.condition;
  const priceMin = searchModal.query.priceMin;
  const priceMax = searchModal.query.priceMax;
  const category = searchModal.query.category;
  const [items, setItems] = useState<ItemType[]>([]);

  console.log("searchQuery: ", searchModal.query);

  const markFavorite = (id: string, is_favorite: boolean) => {
    const tmpItems = items.map((item: ItemType) => {
      if (item.id == id) {
        item.is_favorite = is_favorite;

        if (is_favorite) {
          console.log("added to list of favorited items");
        } else {
          console.log("removed from list");
        }
      }

      return item;
    });

    setItems(tmpItems);
  };

  const getItems = async () => {
    let url = "/api/items/";

    if (seller_id) {
      url += `?seller_id=${seller_id}`;
    } else if (favorites) {
      url += "?is_favorites=true";
    } else {
      let urlQuery = "";

      if (location) {
        urlQuery += "&location=" + location;
      }

      if (pickUpDate) {
        urlQuery += "&startDate=" + format(pickUpDate, "yyyy-MM-dd");
      }

      if (returnDate) {
        urlQuery += "&endDate=" + format(returnDate, "yyyy-MM-dd");
      }

      if (condition) {
        urlQuery += "&condition=" + condition;
      }

      if (priceMin !== undefined) {
        urlQuery += `&priceMin=${priceMin}`;
      }

      if (priceMax !== undefined) {
        urlQuery += `&priceMax=${priceMax}`;
      }

      if (category) {
        urlQuery += "&category=" + category;
      }

      if (urlQuery.length) {
        console.log("Query:", urlQuery);

        urlQuery = "?" + urlQuery.substring(1);
        url += urlQuery;
      }
    }

    // const tmpItems = await apiService.get(url)

    // setItems(tmpItems.data.map((item: ItemType) => {
    //   if (tmpItems.favorites.includes(item.id)) {
    //     item.is_favorite = true;
    //   } else {
    //     item.is_favorite = false;
    //   }
    //   return item;
    // }));
  };

  useEffect(() => {
    getItems();
  }, [category, searchModal.query, params]);

  return (
    <>
      {items.map((item) => {
        return (
          <ItemCard
            key={item.id}
            item={item}
            markFavorite={(is_favorite: any) =>
              markFavorite(item.id, is_favorite)
            }
          />
        );
      })}
    </>
  );
};

export default ItemList;
