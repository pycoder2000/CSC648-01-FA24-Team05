import RentalSidebar from "@/app/components/items/RentalSidebar";
import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import Image from "next/image";
import Link from "next/link";
import { FaClipboardCheck, FaMapMarkerAlt, FaTag } from "react-icons/fa";

const ItemDetailPage = async ({ params }: { params: { id: string } }) => {
  const item = await apiService.get(`/api/items/${params.id}`);
  const userId = await getUserId();

  console.log("userId", userId);

  return (
    <main className="w-full max-w-7xl mx-auto px-6 pb-6">
      <div className="w-full h-[60vh] mb-8 overflow-hidden rounded-lg relative border border-gray-300 shadow-lg">
        <Image
          fill
          src={item.image_url}
          className="object-cover w-full h-full"
          alt={item.title}
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="col-span-3 mt-6">
          <div className="shadow-lg border border-gray-300 rounded-xl bg-white p-8 shadow-xl">
            <h1 className="mb-4 text-4xl font-bold text-gray-800">
              {item.title}
            </h1>

            <div className="mb-6 p-4 rounded-lg border border-gray-200 bg-gray-50">
              <div className="flex items-center mb-2">
                <FaMapMarkerAlt className="text-blue-600 mr-2" />
                <p className="text-lg text-gray-700">
                  <strong>Location:</strong> {item.location}
                </p>
              </div>

              <div className="flex items-center mb-2">
                <FaClipboardCheck className="text-green-600 mr-2" />
                <p className="text-lg text-gray-700">
                  <strong>Condition:</strong> {item.condition}
                </p>
              </div>

              <div className="flex items-center">
                <FaTag className="text-yellow-600 mr-2" />
                <p className="text-lg text-gray-700">
                  <strong>Category:</strong> {item.category}
                </p>
              </div>
            </div>

            <hr className="my-6" />

            <Link
              href={`/sellers/${item.seller.id}`}
              className="flex items-center space-x-4 hover:bg-gray-100 p-4 rounded-lg transition"
            >
              {item.seller.avatar_url && (
                <div className="w-[60px] h-[60px] border border-gray-300 rounded-full overflow-hidden">
                  <Image
                    src={item.seller.avatar_url}
                    width={60}
                    height={60}
                    className="object-cover w-full h-full"
                    alt="Seller Avatar"
                  />
                </div>
              )}

              <p className="text-lg text-gray-800">
                <strong>{item.seller.name}</strong> is offering this item
              </p>
            </Link>

            <hr className="my-6" />

            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>

        <RentalSidebar item={item} userId={userId} />
      </div>
    </main>
  );
};

export default ItemDetailPage;
