import Image from "next/image";
import PropertyList from "./components/properties/PropertyList";

export default function Home() {
  return (
    <main>
      <p>
        Server Sucessfully running
      </p>
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <PropertyList />
      </div>
    </main>
    

  );
}
