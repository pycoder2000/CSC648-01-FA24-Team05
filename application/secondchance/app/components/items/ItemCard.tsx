import Image from "next/image";
import { useRouter } from "next/navigation";
import { ItemType } from "@/app/components/items/ItemList";
// import FavoriteButton from "@/app/components/buttons/FavoriteButton";

interface ItemProps {
  item: ItemType;
  markFavorite?: (is_favorite: boolean) => void;
}

const ItemCard: React.FC<ItemProps> = ({ item, markFavorite }) => {
  const router = useRouter();

  return (
    <div
      className="cursor-pointer"
      onClick={() => router.push(`/items/${item.id}`)}
    >
      <div className="relative overflow-hidden aspect-square rounded-xl">
        <Image
          fill
          src={item.image_url}
          sizes="(max-width: 768px) 768px, (max-width: 1200px): 768px, 768px"
          className="hover:scale-110 object-cover transition h-full w-full"
          alt="Item image"
        />

        {/* {markFavorite && (
          <FavoriteButton
            id={item.id}
            is_favorite={item.is_favorite}
            markFavorite={(is_favorite) => markFavorite(is_favorite)}
          />
        )} */}
      </div>

      <div className="mt-2">
        <p className="text-lg font-bold">{item.title}</p>
      </div>

      <div className="mt-2">
        <p className="text-sm text-gray-500">
          <strong>${item.price_per_day}</strong> per day
        </p>
      </div>
    </div>
  );
};

export default ItemCard;