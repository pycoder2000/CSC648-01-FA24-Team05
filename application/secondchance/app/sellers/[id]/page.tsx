import ContactButton from "@/app/components/buttons/ContactButton";
import ItemList from "@/app/components/items/ItemList";
import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { FaMapMarkerAlt } from "react-icons/fa";

const SellerDetailPage = async ({ params }: { params: { id: string } }) => {
  const seller = await apiService.get(`/api/auth/${params.id}`);
  const userId = await getUserId();
  const daysSinceJoined = formatDistanceToNow(new Date(seller.date_joined), {
    addSuffix: false,
  });

  return (
    <main className="w-full mx-auto px-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <aside className="col-span-2 mb-4">
          <div className="flex flex-col items-center p-6 rounded-xl border border-gray-300 shadow-xl bg-white">
            <div className="w-40 h-40 relative overflow-hidden">
              <Image
                src={seller.avatar_url}
                width={200}
                height={200}
                alt="Seller"
                className="rounded-full object-cover w-full h-full border-4 border-green-400"
              />
              <span className="absolute top-4 right-4 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></span>
            </div>

            <h2 className="mt-4 text-2xl font-semibold text-gray-800">
              {seller.name}
            </h2>
            <div className="inline-flex items-center mt-1 text-gray-500">
              <FaMapMarkerAlt className="mr-1" />
              <span>
                {seller.city}, {seller.state}
              </span>
            </div>

            <ContactButton userId={userId} sellerId={params.id} />

            <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-200 w-full max-w-2xl mx-auto">
              <div className="divide-y divide-gray-200">
                <h3 className="text-xl font-medium text-[#071537] py-3 text-center p-6">
                  Seller Info
                </h3>

                {[
                  ["Name", seller.name],
                  [
                    "Availability",
                    <span className="inline-block bg-[#EAFEF1] text-[#16C653] border-[#C8F3D2] border-2 text-sm px-3 py-1 rounded-md">
                      Available Now
                    </span>,
                  ],
                  ["Email", seller.email],
                  ["Phone", seller.phone || "N/A"],
                  ["Joined", `${daysSinceJoined} ago`],
                  ["Birthday", seller.birthday || "N/A"],
                  ["Location", `${seller.city}, ${seller.state}` || "N/A"],
                  [
                    "Sustainability Score",
                    seller.sustainability_score || "N/A",
                  ],
                ].map(([label, value], index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 gap-4 py-3 items-center p-6"
                  >
                    <div className="pl-2 text-[#78829D] text-sm">{label}</div>
                    <div className="col-span-2 font-light text-[#252F4A] text-sm">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="col-span-1 md:col-span-3 pl-0 md:pl-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ItemList seller_id={params.id} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default SellerDetailPage;
