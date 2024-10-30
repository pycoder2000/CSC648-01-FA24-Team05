import ItemList from '@/app/components/items/ItemList';
import { getUserId } from '@/app/lib/actions';

const MyListingsPage = async () => {
  const userId = await getUserId();

  return (
    <main className="mx-auto w-full px-6 pb-12">
      <div className="my-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">My Listings</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ItemList seller_id={userId} />
      </div>
    </main>
  );
};

export default MyListingsPage;
