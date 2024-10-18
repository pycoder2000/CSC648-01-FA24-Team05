import PropertyListItem from "./PropertyListItem"

const PropertyList = () => { 
    return (
        // replaced div tag with react fragment
        // wrapping it in a div caused it to not be properly formatted
        <>  
            <PropertyListItem />
            <PropertyListItem />
            <PropertyListItem />
            
        </>
         
    ) 
    } 

export default PropertyList // create package
