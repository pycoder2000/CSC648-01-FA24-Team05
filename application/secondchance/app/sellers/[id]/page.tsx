import Image from "next/image";
import ContactButton from "@/app/components/ContactButton";
import ProductList from "@/app/components/properties/ProductList";

const SellerDetailPage = () => { 
    return (
      <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <div className="grid grid-cols-01 md:grid-cols-4 gap-4">
                <aside className="cols-span-1 mb-4">
                    <div className="flex flex-col items-center p-6 rounded-xl border border-gray shadow-xl">
                        <Image
                            src='/profile_pic_1.jpg'
                            width={200}
                            height={200}
                            alt="Seller name"
                            className="rounded-full"
                            />

                            <h1 className="mt-6 text-2xl">Seller Name</h1>

                            <ContactButton />
                    </div>
                </aside>

                <div className="col-span-1 md:col-span-3 pl-0 md:pl-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <ProductList />
                    </div>
                </div>
            </div>
      </main>
    )
}

export default SellerDetailPage;