import Image from "next/image";

import ContactButton from "@/app/components/buttons/ContactButton";
import ItemList from "@/app/components/items/ItemList";
import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";

const SellerDetailPage = async ({ params }: { params: { id: string } }) => {
  const seller = await apiService.get(`/api/auth/${params.id}`);
  const userId = await getUserId();

  return (
    <main className="w-full mx-auto px-6 pb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <aside className="col-span-1 mb-4">
          <div className="flex flex-col items-center p-6 rounded-xl border border-gray-300 shadow-xl">
            <Image
              src={seller.avatar_url}
              width={200}
              height={200}
              alt="Seller"
              className="rounded-full"
            />

            <h1 className="mt-6 text-2xl">{seller.name}</h1>

            {userId != params.id && (
              <ContactButton userId={userId} sellerId={params.id} />
            )}
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
