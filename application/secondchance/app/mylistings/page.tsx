import ItemList from "@/app/components/items/ItemList";
import { getUserId } from "../lib/actions";

const MyListingsPage = async () => {
  const userId = await getUserId();

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <h1 className="my-6 text-2xl">My Listings</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ItemList seller_id={userId} />
      </div>
    </main>
  );
};

export default MyListingsPage;
