import Image from "next/image";
import ProductList from "./components/properties/ProductList";
import Categories from "./components/categories/Categories";

export default function Home() {
  return (
    <main className="bg-black">

      {/*categories */}
      <div className="max-w-[1500px] mx-auto px-6">
        <Categories />
      </div>

      {/* Display products on home page */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <ProductList />
      </div>

      
    </main>
    

  );
}
  