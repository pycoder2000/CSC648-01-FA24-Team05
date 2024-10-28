import FavoriteButton from "@/app/components/buttons/FavoriteButton";
import { ItemType } from "@/app/components/items/ItemList";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ItemProps {
  item: ItemType;
  markFavorite?: (is_favorite: boolean) => void;
}

const ItemCard: React.FC<ItemProps> = ({ item, markFavorite }) => {
  const router = useRouter();

  return (
    <div
      className="cursor-pointer shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300 bg-white"
      onClick={() => router.push(`/items/${item.id}`)}
    >
      <div
        className="relative overflow-hidden rounded-t-xl"
        style={{ height: "200px", width: "100%" }}
      >
        <Image
          fill
          src={item.image_url}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="hover:scale-105 object-cover transition duration-300 ease-in-out w-full h-full"
          alt={item.title}
          style={{ objectFit: "cover" }}
        />

        {markFavorite && (
          <div className="absolute top-3 right-3">
            <FavoriteButton
              id={item.id}
              is_favorite={item.is_favorite}
              markFavorite={(is_favorite) => markFavorite(is_favorite)}
            />
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-lg font-semibold text-gray-800 truncate">
          {item.title}
        </p>
        <p className="mt-2 text-gray-500">
          <strong className="text-lg text-gray-900">
            ${item.price_per_day}
          </strong>{" "}
          <span className="text-sm">per day</span>
        </p>
      </div>
    </div>
  );
};

export default ItemCard;
