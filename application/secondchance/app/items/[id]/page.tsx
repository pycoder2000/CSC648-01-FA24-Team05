import RentalSidebar from '@/app/components/items/RentalSidebar';
import { getUserId } from '@/app/lib/actions';
import apiService from '@/app/services/apiService';
import Image from 'next/image';
import Link from 'next/link';
import { FaClipboardCheck, FaMapMarkerAlt, FaTag } from 'react-icons/fa';

const ItemDetailPage = async ({ params }: { params: { id: string } }) => {
  const item = await apiService.get(`/api/items/${params.id}`);
  const userId = await getUserId();

  console.log('userId', userId);

  return (
    <main className="mx-auto w-full max-w-7xl px-6 pb-6">
      <div className="relative mb-8 h-[60vh] w-full overflow-hidden rounded-lg border border-gray-300 shadow-lg">
        <Image
          fill
          src={item.image_url}
          className="h-full w-full object-cover"
          alt={item.title}
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
        <div className="col-span-3 mt-6">
          <div className="rounded-xl border border-gray-300 bg-white p-8 shadow-xl">
            <h1 className="mb-4 text-4xl font-bold text-gray-800">{item.title}</h1>

            <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div className="mb-2 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-blue-600" />
                <p className="text-lg text-gray-700">
                  <strong>Location:</strong> {item.country}
                </p>
              </div>

              <div className="mb-2 flex items-center">
                <FaClipboardCheck className="mr-2 text-green-600" />
                <p className="text-lg text-gray-700">
                  <strong>Condition:</strong> {item.condition}
                </p>
              </div>

              <div className="flex items-center">
                <FaTag className="mr-2 text-yellow-600" />
                <p className="text-lg text-gray-700">
                  <strong>Category:</strong> {item.category}
                </p>
              </div>
            </div>

            <hr className="my-6" />

            <Link
              href={`/sellers/${item.seller.id}`}
              className="flex items-center space-x-4 rounded-lg p-4 transition hover:bg-gray-100"
            >
              {item.seller.avatar_url && (
                <div className="h-[60px] w-[60px] overflow-hidden rounded-full border border-gray-300">
                  <Image
                    src={item.seller.avatar_url}
                    width={60}
                    height={60}
                    className="h-full w-full object-cover"
                    alt="Seller Avatar"
                  />
                </div>
              )}

              <p className="text-lg text-gray-800">
                <strong>{item.seller.name}</strong> is offering this item
              </p>
            </Link>

            <hr className="my-6" />

            <p className="mt-6 text-lg leading-relaxed text-gray-700">{item.description}</p>
          </div>
        </div>

        <RentalSidebar item={item} userId={userId} />
      </div>
    </main>
  );
};

export default ItemDetailPage;
