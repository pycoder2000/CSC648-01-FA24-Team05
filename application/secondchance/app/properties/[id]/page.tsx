import RentalSidebar from "@/app/components/items/RentalSidebar";
import Image from "next/image";
import Link from "next/link";

// import apiService from "@/app/services/apiService";
// import { getUserId } from "@/app/lib/actions";

const ItemDetailPage = async ({ params }: { params: { id: string } }) => {
  const item = await apiService.get(`/api/items/${params.id}`);
  // const userId = await getUserId();

  console.log("userId", userId);

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <div className="w-full h-[64vh] mb-4 overflow-hidden rounded-xl relative">
        <Image
          fill
          src={item.image_url}
          className="object-cover w-full h-full"
          alt={item.title}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="py-6 pr-6 col-span-3">
          <h1 className="mb-4 text-4xl">{item.title}</h1>

          <span className="mb-6 block text-lg text-gray-600">
            Location: {item.location} - Condition: {item.condition} - Category:{" "}
            {item.category}
          </span>

          <hr />

          <Link
            href={`/sellers/${item.seller.id}`}
            className="py-6 flex items-center space-x-4"
          >
            {item.seller.avatar_url && (
              <Image
                src={item.seller.avatar_url}
                width={50}
                height={50}
                className="rounded-full"
                alt="Seller Avatar"
              />
            )}

            <p>
              <strong>{item.seller.name}</strong> is offering this item
            </p>
          </Link>

          <hr />

          <p className="mt-6 text-lg">{item.description}</p>
        </div>

        <RentalSidebar item={item} userId={userId} />
      </div>
    </main>
  );
};

export default ItemDetailPage;
