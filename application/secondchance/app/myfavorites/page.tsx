import ItemList from '@/app/components/items/ItemList';
import { getUserId } from '@/app/lib/actions';

const MyFavoritesPage = async () => {
  const userId = await getUserId();

  if (!userId) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Access Denied</h2>
        <p className="mt-4 text-gray-600">
          You need to be authenticated to view your favorite items.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full px-6 pb-12">
      <div className="my-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">My Favorite Items</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ItemList favorites={true} />
      </div>
    </main>
  );
};

export default MyFavoritesPage;
