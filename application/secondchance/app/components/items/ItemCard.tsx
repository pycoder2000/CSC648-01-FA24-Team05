import FavoriteButton from '@/app/components/buttons/FavoriteButton';
import { ItemType } from '@/app/components/items/ItemList';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ItemProps {
  item: ItemType;
  markFavorite?: (is_favorite: boolean) => void;
}

const ItemCard: React.FC<ItemProps> = ({ item, markFavorite }) => {
  const router = useRouter();

  return (
    <div
      className="cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg transition duration-300 hover:shadow-2xl"
      onClick={() => router.push(`/items/${item.id}`)}
    >
      <div
        className="relative overflow-hidden rounded-t-xl"
        style={{ height: '200px', width: '100%' }}
      >
        <Image
          fill
          src={item.image_url}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="h-full w-full object-cover transition duration-300 ease-in-out hover:scale-105"
          alt={item.title}
          style={{ objectFit: 'cover' }}
        />

        {markFavorite && (
          <div className="absolute right-3 top-3">
            <FavoriteButton
              id={item.id}
              is_favorite={item.is_favorite}
              markFavorite={(is_favorite) => markFavorite(is_favorite)}
            />
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="truncate text-lg font-semibold text-gray-800">{item.title}</p>
        <p className="mt-2 text-gray-500">
          <strong className="text-lg text-gray-900">${item.price_per_day}</strong>{' '}
          <span className="text-sm">per day</span>
        </p>
      </div>
    </div>
  );
};

export default ItemCard;
