import ProductList from "../components/properties/ProductList"
import Image from "next/image"

// currently a static page 

const MyListingsPage = () => {
    return (
        <main className="max-w-[1500px] mx-auto px-6 pd-6">
            <h1 className="my-6 text-2xl">My Listings</h1>

            {/* Different formatting from landing page to differentiate both interfaces */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ProductList/>
            </div>

        </main>

    )

    

}

export default MyListingsPage;