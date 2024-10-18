import Image from "next/image";
import ProductList from "./components/properties/ProductList";

export default function Home() {
  return (
    <main className="bg-black">
      <p>
        Server Sucessfully running
      </p>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <ProductList />
      </div>
    </main>
    

  );
}
