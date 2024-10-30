import Categories from '@/app/components/categories/Categories';
import ItemList from '@/app/components/items/ItemList';

export default function Home() {
  return (
    <main className="mx-auto w-full px-6">
      <Categories />

      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5">
        <ItemList />
      </div>
    </main>
  );
}
