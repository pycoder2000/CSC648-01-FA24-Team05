import ProductList from "../components/properties/ProductList"
import Image from "next/image"

// currently a static page 

const MyListingsPage = () => {
    return (
        <main className="max-w-[1500px] mx-auto px-6 pd-6">
            <h1 className="my-6 text-2xl"></h1>

            {/* list uses same formatting as landing page */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <ProductList/>
            </div>

        </main>

    )

    

}

export default MyListingsPage;