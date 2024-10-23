const ProductSidebar = () => {
    return (
      <aside className="mt-6 p-6 col-span-2 rounded-xl border border-gray-300 shadow-xl">
        
        <h2 className="mb-5 text-2xl">
          Test
        </h2>
        
        <div className="mb-6 p-3 border border-gray-400 rounded-xl">
          
          <label className="mb-2 block font-bold text-xs">
            Number Of Items
          </label>
          
          <select className="w-full -ml-1 text-sm">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        
        </div>
    
        <div className="w-full mb-6 py-6 text-center text-white bg-secondchance hover:bg-secondchance-dark rounded-xl">
          test
        </div>
  
        <div className="mb-4 flex justify-between items-center">
          <p>$10 Product</p>
          <p>$10</p>
        </div>
  
        <div className="mb-4 flex justify-between items-center">
          <p>Secondchance fee</p>
          <p>$1</p>
        </div>
  
        <div className="mb-4 flex justify-between items-center">
          <p>Total</p>
          <p>$11</p>
        </div>
      
      </aside>
    );
  }
  
  export default ProductSidebar;
  