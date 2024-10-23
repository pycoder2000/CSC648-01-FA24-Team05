import Image from "next/image";
import ProductSidebar from "@/app/components/properties/ProductSidebar";

const PropertyDetailPage = () => { 
  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <div className="w-full h-[64vh] overflow-hidden rounded-xl relative">
        <Image
          fill
          src="/SecondChance.jpg"
          className="object-cover w-full h-full"
          alt="SecondChance"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="py-6 pr-6 col-span-3">
          <h1 className="mb-4 text-4xl">Product name</h1>
          
          <span className="mb-6 block text-lg text-gray-600">
            Product Details
          </span>
          
          <hr />
          
          <div className="py-6 flex items-center space-x-4">
            <Image
              src="/SecondChance.jpg"  // Ensure this path is correct
              width={50}
              height={50}
              className="rounded-full"
              alt="SecondChance"
            />
            <p>
              <strong>John Doe</strong> is your host
            </p>
          </div>
          
          <hr />
          
          <p className="mt-6 text-lg">
            12345
          </p>
        </div>

        {/* Sidebar Component */}
        <div className="col-span-2">
          <ProductSidebar />
        </div>
        
      </div>
    </main>
  );
};

export default PropertyDetailPage;
