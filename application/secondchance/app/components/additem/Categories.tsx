import Image from 'next/image';

interface CategoriesProps {
    dataCategory: string;
    setCategory: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({
    dataCategory,
    setCategory
}) => {
    return (
        <>
            <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">
                <div
                    onClick={() => setCategory('furniture')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'furniture' ? 'border-gray-800' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}
                >
                    <Image
                        src="/icn_category_furniture.jpeg"
                        alt="Category - Furniture"
                        width={20}
                        height={20}
                    />

                    <span className='text-xs'>Furniture</span>
                </div>

                <div
                    onClick={() => setCategory('electronics')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'electronics' ? 'border-gray-800' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}
                >
                    <Image
                        src="/icn_category_electronics.jpeg"
                        alt="Category - Electronics"
                        width={20}
                        height={20}
                    />

                    <span className='text-xs'>Electronics</span>
                </div>

                <div
                    onClick={() => setCategory('clothing')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'clothing' ? 'border-gray-800' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}
                >
                    <Image
                        src="/icn_category_clothing.jpeg"
                        alt="Category - Clothing"
                        width={20}
                        height={20}
                    />

                    <span className='text-xs'>Clothing</span>
                </div>

                <div
                    onClick={() => setCategory('books')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'books' ? 'border-gray-800' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}
                >
                    <Image
                        src="/icn_category_books.jpeg"
                        alt="Category - Books"
                        width={20}
                        height={20}
                    />

                    <span className='text-xs'>Books</span>
                </div>
            </div>
        </>
    )
}

export default Categories;