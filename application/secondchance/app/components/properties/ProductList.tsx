import ProductListItem from "./PropertyListItem"

const ProductList = () => { 
    return (
        // replaced div tag with react fragment
        // wrapping it in a div caused it to not be properly formatted
        <>  
            <ProductListItem />
            <ProductListItem />
            <ProductListItem />
            
        </>
         
    ) 
    } 

export default ProductList // create package
