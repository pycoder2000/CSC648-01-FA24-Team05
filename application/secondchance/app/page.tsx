import Categories from "@/app/components/categories/Categories";
import ItemList from "@/app/components/items/ItemList";

export default function Home() {
  return (
    <main className="w-full mx-auto px-6">
      <Categories />

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <ItemList />
      </div>
    </main>
  );
}
