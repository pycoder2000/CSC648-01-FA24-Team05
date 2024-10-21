'use client';

import Image from 'next/image';
import { useState } from 'react';
import useSearchModal, { SearchQuery } from '../hooks/useSearchModal';

const Categories = () => {
    const searchModal = useSearchModal();
    const [category, setCategory] = useState('');

    const _setCategory = (_category: string) => {
        setCategory(_category);

        const query: SearchQuery = {
            country: searchModal.query.country,
            checkIn: searchModal.query.checkIn,
            checkOut: searchModal.query.checkOut,
            priceMin: searchModal.query.priceMin,
            priceMax: searchModal.query.priceMax,
            condition: searchModal.query.condition,
            category: _category
        };

        searchModal.setQuery(query);
    }

    return (
        <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">
            <div
                onClick={() => _setCategory('')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == '' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <Image
                    src="/icn_category_all.png"
                    alt="Category - All"
                    width={30}
                    height={30}
                />

                <span className='text-xs'>All</span>
            </div>

            <div
                onClick={() => _setCategory('electronics')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == 'electronics' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <Image
                    src="/icn_category_electronics.png"
                    alt="Category - Electronics"
                    width={30}
                    height={30}
                />

                <span className='text-xs'>Electronics</span>
            </div>

            <div
                onClick={() => _setCategory('furniture')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == 'furniture' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <Image
                    src="/icn_category_furniture.png"
                    alt="Category - Furniture"
                    width={30}
                    height={30}
                />

                <span className='text-xs'>Furniture</span>
            </div>

            <div
                onClick={() => _setCategory('clothing')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == 'clothing' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <Image
                    src="/icn_category_clothing.png"
                    alt="Category - Clothing"
                    width={30}
                    height={30}
                />

                <span className='text-xs'>Clothing</span>
            </div>

            <div
                onClick={() => _setCategory('books')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == 'books' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <Image
                    src="/icn_category_books.png"
                    alt="Category - Books"
                    width={30}
                    height={30}
                />

                <span className='text-xs'>Books</span>
            </div>
        </div>
    );
}

export default Categories;
