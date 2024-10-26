import Image from "next/image";
import Link from "next/link";
import apiService from "../services/apiService";

const MyRentalsPage = async () => {
  const rentals = await apiService.get("/api/auth/myrentals/");

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <h1 className="my-6 text-2xl">My Rentals</h1>

      <div className="space-y-4">
        {rentals.map((rental: any) => {
          return (
            <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl">
              <div className="col-span-1">
                <div className="relative overflow-hidden aspect-square rounded-xl">
                  <Image
                    fill
                    src={rental.item.image_url}
                    className="hover:scale-110 object-cover transition h-full w-full"
                    alt={rental.item.title}
                  />
                </div>
              </div>

              <div className="col-span-1 md:col-span-3">
                <h2 className="mb-4 text-xl">{rental.item.title}</h2>

                <p className="mb-2">
                  <strong>Pick-up Date:</strong> {rental.start_date}
                </p>
                <p className="mb-2">
                  <strong>Return Date:</strong> {rental.end_date}
                </p>

                <p className="mb-2">
                  <strong>Number of days:</strong> {rental.number_of_days}
                </p>
                <p className="mb-2">
                  <strong>Total price:</strong> ${rental.total_price}
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
