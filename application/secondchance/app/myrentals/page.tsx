import apiService from "@/app/services/apiService";
import Image from "next/image";
import Link from "next/link";

const MyRentalsPage = async () => {
  const rentals = await apiService.get("/api/auth/myrentals/");

  return (
    <main className="w-full max-w-7xl mx-auto px-6 pb-12">
      <div className="flex justify-between items-center my-8">
        <h1 className="text-3xl font-bold text-gray-800">My Rentals</h1>
      </div>

      <div className="space-y-6">
        {rentals.map((rental: any) => {
          return (
            <div
              key={rental.id}
              className="p-5 grid grid-cols-1 md:grid-cols-4 gap-6 shadow-lg border border-gray-200 rounded-lg bg-white hover:shadow-xl transition"
            >
              <div className="col-span-1">
                <div
                  className="relative overflow-hidden rounded-lg"
                  style={{ aspectRatio: "1 / 1" }}
                >
                  <Image
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={rental.item.image_url}
                    className="hover:scale-105 object-cover transition duration-300 ease-in-out w-full h-full"
                    alt={rental.item.title}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>

              <div className="col-span-1 md:col-span-3">
                <h2 className="mb-4 text-xl">{rental.item.title}</h2>

                <p className="mb-2 text-gray-600">
                  <strong className="font-medium">Pick-up Date:</strong>{" "}
                  {rental.start_date}
                </p>
                <p className="mb-2 text-gray-600">
                  <strong className="font-medium">Return Date:</strong>{" "}
                  {rental.end_date}
                </p>
                <p className="mb-2 text-gray-600">
                  <strong className="font-medium">Number of Days:</strong>{" "}
                  {rental.number_of_days}
                </p>
                <p className="mb-2 text-gray-600">
                  <strong className="font-medium">Total Price:</strong> $
                  {rental.total_price}
                </p>

                <Link
                  href={`/items/${rental.item.id}`}
                  className="mt-6 inline-block cursor-pointer py-4 px-6 bg-secondchance text-white rounded-xl"
                >
                  Go to item
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default MyRentalsPage;
