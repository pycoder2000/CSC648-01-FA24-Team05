import ContactButton from '@/app/components/buttons/ContactButton';
import ItemList from '@/app/components/items/ItemList';
import { getUserId } from '@/app/lib/actions';
import apiService from '@/app/services/apiService';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import { FaMapMarkerAlt } from 'react-icons/fa';

const SellerDetailPage = async ({ params }: { params: { id: string } }) => {
  const seller = await apiService.get(`/api/auth/${params.id}`);
  const userId = await getUserId();
  const daysSinceJoined = formatDistanceToNow(new Date(seller.date_joined), {
    addSuffix: false,
  });

  return (
    <main className="mx-auto w-full p-6 px-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <aside className="col-span-2 mb-4">
          <div className="flex flex-col items-center rounded-xl border border-gray-300 bg-white p-6 shadow-xl">
            <div className="relative h-40 w-40 overflow-hidden">
              <Image
                src={seller.avatar_url}
                width={200}
                height={200}
                alt="Seller"
                className="h-full w-full rounded-full border-4 border-green-400 object-cover"
              />
              <span className="absolute right-4 top-4 h-4 w-4 rounded-full border-2 border-white bg-green-400"></span>
            </div>

            <h2 className="mt-4 text-2xl font-semibold text-gray-800">{seller.name}</h2>
            <div className="mt-1 inline-flex items-center text-gray-500">
              <FaMapMarkerAlt className="mr-1" />
              <span>
                {seller.city}, {seller.state}, {seller.country}
              </span>
            </div>

            <ContactButton userId={userId} sellerId={params.id} />

            <div className="mx-auto mt-6 w-full max-w-2xl rounded-xl border border-gray-200 bg-white shadow-lg">
              <div className="divide-y divide-gray-200">
                <h3 className="p-6 py-3 text-center text-xl font-medium text-[#071537]">
                  Seller Info
                </h3>

                {[
                  ['Name', seller.name],
                  [
                    'Availability',
                    <span className="inline-block rounded-md border-2 border-[#C8F3D2] bg-[#EAFEF1] px-3 py-1 text-sm text-[#16C653]">
                      Available Now
                    </span>,
                  ],
                  ['Email', seller.email],
                  ['Phone', seller.phone || 'N/A'],
                  ['Joined', `${daysSinceJoined} ago`],
                  ['Birthday', seller.birthday || 'N/A'],
                  ['Location', `${seller.city}, ${seller.state}` || 'N/A'],
                  ['Sustainability Score', seller.sustainability_score || 'N/A'],
                ].map(([label, value], index) => (
                  <div key={index} className="grid grid-cols-3 items-center gap-4 p-6 py-3">
                    <div className="pl-2 text-sm text-[#78829D]">{label}</div>
                    <div className="col-span-2 text-sm font-light text-[#252F4A]">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="col-span-1 pl-0 md:col-span-3 md:pl-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <ItemList seller_id={params.id} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default SellerDetailPage;
