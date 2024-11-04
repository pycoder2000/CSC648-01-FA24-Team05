import apiService from '@/app/services/apiService';
import Image from 'next/image';
import Link from 'next/link';

const MyRentalsPage = async () => {
  const rentals: any[] = await apiService.get('/api/auth/myrentals/');

  const today = new Date();
  const upcomingRentals = rentals.filter((rental) => new Date(rental.end_date) >= today);
  const pastRentals = rentals.filter((rental) => new Date(rental.end_date) < today);

  return (
    <main className="mx-auto w-full max-w-7xl px-6 pb-12">
      <div className="my-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">My Rentals</h1>
      </div>

      <section>
        <h2 className="my-4 text-2xl font-semibold text-gray-700">Upcoming Rentals</h2>
        {upcomingRentals.length > 0 ? (
          <div className="space-y-6">
            {upcomingRentals.map((rental) => (
              <div
                key={rental.id}
                className="grid grid-cols-1 gap-6 rounded-lg border border-gray-200 bg-white p-5 shadow-lg transition hover:shadow-xl md:grid-cols-4"
              >
                <div className="col-span-1">
                  <div
                    className="relative overflow-hidden rounded-lg"
                    style={{ aspectRatio: '1 / 1' }}
                  >
                    <Image
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      src={rental.item.image_url}
                      className="h-full w-full object-cover transition duration-300 ease-in-out hover:scale-105"
                      alt={rental.item.title}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
                <div className="col-span-1 md:col-span-3">
                  <h2 className="mb-4 text-xl font-semibold">{rental.item.title}</h2>
                  <p className="mb-2 text-gray-600">
                    <strong>Pick-up Date:</strong> {rental.start_date}
                  </p>
                  <p className="mb-2 text-gray-600">
                    <strong>Return Date:</strong> {rental.end_date}
                  </p>
                  <p className="mb-2 text-gray-600">
                    <strong>Number of Days:</strong> {rental.number_of_days}
                  </p>
                  <p className="mb-2 text-gray-600">
                    <strong>Total Price:</strong> ${rental.total_price}
                  </p>
                  <Link
                    href={`/items/${rental.item.id}`}
                    className="mt-6 inline-block rounded-xl bg-secondchance px-6 py-4 text-white"
                  >
                    Go to item
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No upcoming rentals.</p>
        )}
      </section>

      <section className="mt-12">
        <h2 className="my-4 text-2xl font-semibold text-gray-700">Past Rentals</h2>
        {pastRentals.length > 0 ? (
          <div className="space-y-6">
            {pastRentals.map((rental) => (
              <div
                key={rental.id}
                className="grid grid-cols-1 gap-6 rounded-lg border border-gray-200 bg-gray-100 p-5 shadow-lg transition hover:shadow-xl md:grid-cols-4"
              >
                <div className="col-span-1">
                  <div
                    className="relative overflow-hidden rounded-lg"
                    style={{ aspectRatio: '1 / 1' }}
                  >
                    <Image
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      src={rental.item.image_url}
                      className="h-full w-full object-cover opacity-75 transition duration-300 ease-in-out hover:scale-105"
                      alt={rental.item.title}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
                <div className="col-span-1 md:col-span-3">
                  <h2 className="mb-4 text-xl font-semibold text-gray-700">{rental.item.title}</h2>
                  <p className="mb-2 text-gray-600">
                    <strong>Pick-up Date:</strong> {rental.start_date}
                  </p>
                  <p className="mb-2 text-gray-600">
                    <strong>Return Date:</strong> {rental.end_date}
                  </p>
                  <p className="mb-2 text-gray-600">
                    <strong>Number of Days:</strong> {rental.number_of_days}
                  </p>
                  <p className="mb-2 text-gray-600">
                    <strong>Total Price:</strong> ${rental.total_price}
                  </p>
                  <Link
                    href={`/items/${rental.item.id}`}
                    className="mt-6 inline-block rounded-xl bg-gray-500 px-6 py-4 text-white hover:bg-gray-600"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No past rentals.</p>
        )}
      </section>
    </main>
  );
};

export default MyRentalsPage;
