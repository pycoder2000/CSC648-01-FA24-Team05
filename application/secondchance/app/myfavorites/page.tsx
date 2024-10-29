import ItemList from "@/app/components/items/ItemList";
import { getUserId } from "@/app/lib/actions";

const MyFavoritesPage = async () => {
  const userId = await getUserId();

  if (!userId) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Access Denied</h2>
        <p className="mt-4 text-gray-600">
          You need to be authenticated to view your favorite items.
        </p>
      </main>
    );
  }

  return (
    <main className="w-full mx-auto px-6 pb-12">
      <div className="flex justify-between items-center my-8">
        <h1 className="text-3xl font-bold text-gray-800">My Favorite Items</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ItemList favorites={true} />
      </div>
    </main>
  );
};

export default MyFavoritesPage;
