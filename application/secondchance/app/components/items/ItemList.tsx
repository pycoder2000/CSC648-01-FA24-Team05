'use client';

import useSearchModal from '@/app/hooks/useSearchModal';
import apiService from '@/app/services/apiService';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ListSingleItem from "./ListSingleItem";

export type ItemType = {
    id: string;
    title: string;
    image_url: string;
    rental_price: number;
    is_favorite: boolean;
    category: string;
    condition: string;
    location: string;
};

interface ItemListProps {
    owner_id?: string | null;
    favorites?: boolean | null;
}

const ItemList: React.FC<ItemListProps> = ({
    owner_id,
    favorites
}) => {
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const country = searchModal.query.country;
    const category = searchModal.query.category;
    const priceMin = searchModal.query.priceMin;
    const priceMax = searchModal.query.priceMax;
    const condition = searchModal.query.condition;

    const [items, setItems] = useState<ItemType[]>([]);

    console.log('searchQuery:', searchModal.query);

    const markFavorite = (id: string, is_favorite: boolean) => {
        const updatedItems = items.map((item: ItemType) => {
            if (item.id === id) {
                item.is_favorite = is_favorite;
                console.log(is_favorite ? 'Added to favorites' : 'Removed from favorites');
            }
            return item;
        });

        setItems(updatedItems);
    };

    const getItems = async () => {
        let url = '/api/items/';

        if (owner_id) {
            url += `?owner_id=${owner_id}`;
        } else if (favorites) {
            url += '?is_favorites=true';
        } else {
            let urlQuery = '';

            if (country) {
                urlQuery += `&country=${encodeURIComponent(country)}`;
            }

            if (category) {
                urlQuery += `&category=${encodeURIComponent(category)}`;
            }

            if (priceMin !== undefined) {
                urlQuery += `&priceMin=${priceMin}`;
            }

            if (priceMax !== undefined) {
                urlQuery += `&priceMax=${priceMax}`;
            }

            if (condition) {
                urlQuery += `&condition=${encodeURIComponent(condition)}`;
            }

            if (urlQuery.length) {
                console.log('Query:', urlQuery);
                urlQuery = '?' + urlQuery.substring(1);
                url += urlQuery;
            }
        }

        try {
            const response = await apiService.get(url);
            const fetchedItems = response.data.map((item: ItemType) => {
                item.is_favorite = response.favorites.includes(item.id);
                return item;
            });
            setItems(fetchedItems);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    useEffect(() => {
        getItems();
    }, [category, country, priceMin, priceMax, condition, searchModal.query, params]);

    return (
        <>
            {items.map((item) => (
                <ListSingleItem
                    key={item.id}
                    item={item}
                    markFavorite={(is_favorite: boolean) => markFavorite(item.id, is_favorite)}
                />
            ))}
        </>
    );
};

export default ItemList;
