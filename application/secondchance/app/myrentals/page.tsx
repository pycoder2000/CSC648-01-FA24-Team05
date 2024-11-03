import Image from "next/image";

const MyRentalPage = () => {
    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <h1 className="my-6 text-2xl"> My Rentals</h1>
            
            <div className="space-y-4">
                <div className ="p-5 grid gird-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl">
                    <div className="col-span-1">
                        <div className="relative overflow-hidden aspect-square rounded-xl">
                            <Image
                                fill
                                src="/camera_1.jpg" //Example image TODO
                                className="hover:scale-110 object-cover transition h-full w-full"
                                alt ="Camera"
                            />
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-3">
                        <h2 className="mb-4 text-xl">Item name</h2>

                        <p className="mb-2"><strong>Pick up date:</strong> 12/2/2024</p>
                        <p className="mb-2"><strong>Return date</strong> 18/10/2024</p>

                        <p className="mb-2"><strong>Number of date:</strong> 240</p>
                        <p className="mb-2"><strong>Total price:</strong> 500</p>

                        <div className="mt-6 inline-block cursor-pointer py-4 px-6 bg-red-500 text-white rounded-xl border border-red-500">Go to property</div>
                    </div>
                </div>
                <div className ="p-5 grid gird-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl">
                    <div className="col-span-1">
                        <div className="relative overflow-hidden aspect-square rounded-xl">
                            <Image
                                fill
                                src="/camera_1.jpg" //Example image TODO
                                className="hover:scale-110 object-cover transition h-full w-full"
                                alt ="Camera"
                            />
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-3">
                        <h2 className="mb-4 text-xl">Item name</h2>

                        <p className="mb-2"><strong>Pick up date:</strong> 12/2/2024</p>
                        <p className="mb-2"><strong>Return date</strong> 18/10/2024</p>

                        <p className="mb-2"><strong>Number of date:</strong> 240</p>
                        <p className="mb-2"><strong>Total price:</strong> 500</p>

                        <div className="mt-6 inline-block cursor-pointer py-4 px-6 bg-red-500 text-white rounded-xl border border-red-500">Go to property</div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default MyRentalPage