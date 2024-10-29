import ItemList from "@/app/components/items/ItemList";
import { getUserId } from "@/app/lib/actions";

const MyListingsPage = async () => {
  const userId = await getUserId();

  return (
    <main className="w-full mx-auto px-6 pb-12">
      <div className="flex justify-between items-center my-8">
        <h1 className="text-3xl font-bold text-gray-800">My Listings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ItemList seller_id={userId} />
      </div>
    </main>
  );
};

export default MyListingsPage;
