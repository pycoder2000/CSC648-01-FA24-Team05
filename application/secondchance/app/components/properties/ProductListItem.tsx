import Image from "next/image"

const ProductListItem = () => { 
    // return (<p> test item </p>) 
    let placeHolderImg = "https://upload.wikimedia.org/wikipedia/commons/8/84/Question_Mark_Icon.png"

    return (
        
        // change user's cursor to indicate interaction
        <div className="cursor-pointer"> 
            <div className="relative overflow-hidden aspect-w-1 aspect-h-1 rounded-xl"> 
                <Image 
                fill
                src={placeHolderImg}
                alt="Product Image"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="hover:scale-110 object-cover transition bg-white"
                />
            </div>

            <p className="mt-3 ml-1 font-bold text-teal-600 text-xl">
                Product Name
            </p>

            <p className="mt-1 ml-2">
                Price: $10
            </p>

            

        </div>


    )


} 




export default ProductListItem // create package of item within the list
