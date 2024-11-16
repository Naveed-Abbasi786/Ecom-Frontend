import { Icon } from "@iconify/react";
import { Card, CardHeader, Typography, CardBody, Avatar, CardFooter } from "@material-tailwind/react";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const TABLE_HEAD = ["Product Name", "Category", "Subcategory", "Price", "Status", "Actions"];

export default function ProductsTable() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrders, setSortOrders] = useState({
    name: "asc",
    price: "asc",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [viewAll, setViewAll] = useState(false);
    const [status,setStatus]=useState(false)

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://192.168.100.106:4000/api/cat/products");
        const activeProducts = response.data.products.filter((product) => !product.isDeleted);
        setAllProducts(activeProducts);
        setFilteredProducts(activeProducts.slice(0, itemsPerPage));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

 const hanldeEdit=(_id)=>{
  alert(_id)
 }
     const handleDelete =async (_id) => {
        try {
          const response = await axios.post("http://192.168.100.106:4000/api/cat/product/soft-delete", { productId:_id });
          console.log('succusfult delete')
        } catch (error) {
          console.log(error)
        }  
        if (window.confirm("Are you sure you want to delete this item?")) {
          const updatedProducts = filteredProducts.filter(product => product?._id !== _id);
          setFilteredProducts(updatedProducts);
          setAllProducts(allProducts.filter(product => product?._id !== _id));
          alert("Product deleted successfully!");
        } else {
            alert("Deletion cancelled.");
        }
      };
      const [statusMap, setStatusMap] = useState({});

const handleStatus = async (_id) => {
  setStatusMap((prevStatusMap) => {
    const newStatus = !prevStatusMap[_id];  // Toggle the status for specific product ID
    return { ...prevStatusMap, [_id]: newStatus }; // Update only the status of the specific product ID
  });

  try {
    const response = await axios.post("http://192.168.100.106:4000/api/cat/product/toggle-visibility", { 
      productId: _id,
      isPublic: statusMap[_id]  // Send the updated status for the specific product
    });
    console.log('Successfully toggled visibility for product ID:', _id);
  } catch (error) {
    console.log('Error:', error);
  }
};


  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(viewAll ? filtered : filtered.slice(startIndex, endIndex));
  }, [searchTerm, currentPage, allProducts, viewAll]);

  const sortProducts = (column) => {
    const newSortOrder = sortOrders[column] === "asc" ? "desc" : "asc";
    const sorted = [...allProducts].sort((a, b) => {
      if (column === "price") {
        return newSortOrder === "asc" ? +a[column] - +b[column] : +b[column] - +a[column];
      }
      return newSortOrder === "asc" ? (a[column] > b[column] ? 1 : -1) : a[column] < b[column] ? 1 : -1;
    });
  
    setFilteredProducts(sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
    setSortOrders((prev) => ({
      ...prev,
      [column]: newSortOrder,
    }));
  };
  

  return (
    <div className="w-full flex flex-col items-center">
      <Card className="w-full max-w-[100%]">
      <CardHeader floated={false} shadow={false} className="rounded-none flex justify-between items-center">
  <div className="relative w-72 ml-2">
    <div className="absolute inset-y-0 left-3 flex items-center">
      <Icon icon="mdi:magnify" className="text-gray-500" />
    </div>
    <input
      className="peer h-full w-full pl-10 rounded-[7px] border border-blue-gray-200 px-3 py-2.5 text-sm font-normal text-blue-gray-700 placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-none"
      placeholder="Search"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
  <div>
    <Icon
      icon={sortOrders.name === "asc" ? "mdi:sort-ascending" : "mdi:sort-descending"}
      className="text-gray-600 text-2xl cursor-pointer"
      onClick={() => sortProducts("name")}
    />
  </div>
</CardHeader>

        <CardBody className="overflow-auto px-0 h-[400px]">
  <table className="mt-4 w-full text-left">
    <thead>
      <tr>
        {TABLE_HEAD.map((head, index) => (
          <th
            key={head}
            className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-gray-800 font-normal"
          >
            {head}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {loading ? (
        <tr>
          <td colSpan={TABLE_HEAD.length} className="text-center p-4">
            <div className="flex items-center justify-center items-center  h-full">
              <div className="mx-auto mt-36"><CircularProgress/></div>
            </div>
          </td>
        </tr>
      ) : filteredProducts.length > 0 ? (
        filteredProducts.map((product, index) => (
          <tr key={index}>
            <td className="p-4 border-b flex items-center gap-4 border-blue-gray-50">
              <Avatar
                src={`http://192.168.100.106:4000${product.imageUrls[0]}`}
                alt={product.name}
                className="w-12 h-12"
              />
              {product.name}
            </td>
            <td className="p-4 border-b border-blue-gray-50">{product.subCategory?.category?.name}</td>
            <td className="p-4 border-b border-blue-gray-50">{product.subCategory?.name}</td>
            <td className="p-4 border-b border-blue-gray-50">{product.price}</td>
            <td className="p-4 border-b border-blue-gray-50">
              {product.quantity > 0 ? `Available: ${product.quantity}` : "Out of Stock"}
            </td>
            <td className="p-4 border-b  border-blue-gray-50">
                      <div className='flex gap-2'>

                      <Icon icon="ic:round-edit" className="text-[20px] cursor-pointer hover:text-red-800"  onClick={() => hanldeEdit(product._id)}/>
                      <Icon
  icon={`${statusMap[product._id] ? "mdi-light:lock" : "mdi-light:lock-open"}`} 
  className="text-[20px] cursor-pointer hover:text-sky-700"
  onClick={() => handleStatus(product._id)}
/>

                        <Icon icon="mdi:delete-outline" className="text-[20px] cursor-pointer hover:text-red-500" onClick={() => handleDelete(product._id)}/>
                      </div>

                      </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="6" className="p-4 mt-40 text-center">
            No products available
          </td>
        </tr>
      )}
    </tbody>
  </table>
</CardBody>

        {!viewAll && (
         <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
         <button
           disabled={currentPage === 1}
           className={`px-4 py-2 bg-gray-200 text-gray-800 rounded-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
         >
           Previous
         </button>
         <Typography variant="small" color="blue-gray" className="font-normal">
           Page {currentPage} of {Math.ceil(allProducts.length / itemsPerPage)}
         </Typography>
         <button
           disabled={currentPage === Math.ceil(allProducts.length / itemsPerPage)}
           className={`px-4 py-2 bg-gray-200 text-gray-800 rounded-md ${currentPage === Math.ceil(allProducts.length / itemsPerPage) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
           onClick={() => setCurrentPage((prev) => prev + 1)}
         >
           Next
         </button>
       </CardFooter>
       
        )}
      </Card>
    </div>
  );
}











// import { Icon } from '@iconify/react';
// import { Card, CardHeader, Input, Typography, Button, CardBody, Avatar, IconButton, CardFooter } from "@material-tailwind/react";
// import SearchIcon from '@mui/icons-material/Search';
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const TABLE_HEAD = [
//   "Product Name Image",
//   "Category",
//   "Subcategory",
//   "Price",
//   "Status",
//   "Actions",
// ];

// export default function ProductsTable() {
//   const [allProducts, setAllProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [sortOrders, setSortOrders] = useState({
//     name: 'asc',
//     price: 'asc',
//   });
//   const [activeSort, setActiveSort] = useState(""); 
//   const [searchTerm, setSearchTerm] = useState(""); 
//   const [currentPage, setCurrentPage] = useState(1);
//   const [status,setStatus]=useState(false)
//   const [loading,setLoading]=useState(false)
//   const [viewAll, setViewAll] = useState(false);

//   const navigate=useNavigate()
//   const itemsPerPage = 5;

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("http://192.168.100.106:4000/api/cat/products");
  
//         const activeProducts = response.data.products.filter(product => !product.isDeleted);
  
//         setAllProducts(activeProducts);
//         setFilteredProducts(activeProducts.slice(0, itemsPerPage)); 
  
//         console.log("Filtered Products:", activeProducts);
//       } catch (error) {
//         setLoading(false);
//         console.error("Error fetching categories:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchCategories();
//   }, []);
  

//   // const  AddProduct=()=>{
//   //   navigate('/dashboard/AddProducts')
//   // }
//   useEffect(() => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const filtered = allProducts.filter(product =>
//       product.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
    
//     if (viewAll) {
//       setFilteredProducts(filtered); 
//     } else {
//       setFilteredProducts(filtered.slice(startIndex, endIndex)); 
//     }
//   }, [searchTerm, currentPage, allProducts, viewAll]);

//   const sortProducts = (column) => {
//     const newSortOrder = sortOrders[column] === 'asc' ? 'desc' : 'asc';
//     const sorted = [...filteredProducts].sort((a, b) => {
//       if (column === 'price') {
//         return newSortOrder === 'asc' ? +a[column] - +b[column] : +b[column] - +a[column];
//       }
//       return newSortOrder === 'asc' ? a[column] > b[column] ? 1 : -1 : a[column] < b[column] ? 1 : -1;
//     });

//     setFilteredProducts(sorted);
//     setSortOrders((prev) => ({
//       ...prev,
//       [column]: newSortOrder,
//     }));
//     setActiveSort(column); 
//   };


//   const handleDelete =async (_id) => {
//     alert(_id)
//     try {
//       const response = await axios.post("http://192.168.100.106:4000/api/cat/product/soft-delete", { productId:_id });
//       console.log('succusfult delete')
//     } catch (error) {
//       console.log(error)
//     }  
//     if (window.confirm("Are you sure you want to delete this item?")) {
//       const updatedProducts = filteredProducts.filter(product => product?._id !== _id);
//       setFilteredProducts(updatedProducts);
//       setAllProducts(allProducts.filter(product => product?._id !== _id));
//       alert("Product deleted successfully!");
//     } else {
//         alert("Deletion cancelled.");
//     }
//   };
  

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   // const hanldeEdit=(_id)=>{
//   //    alert()
//   // }

  // const handleStatus=async(_id)=>{
  //   setStatus((prevStatus) => !prevStatus); 
  //   try {
  //     const response = await axios.post("http://192.168.100.106:4000/api/cat/product/toggle-visibility", { productId:_id ,isPublic:status });
  //     console.log('succusfult lock')
  //   } catch (error) {
  //     console.log(error)
  //   }  
  // }
//   const handleViewToggle = () => {
//     setViewAll(!viewAll); 
//     setCurrentPage(1); 
//   };

//   return (
//     <div className="w-full overflow-auto flex items-center">
//       <Card className="w-full max-w-[100%] overflow-hidden">
//         <CardHeader floated={false} shadow={false} className="rounded-none">
//           <div className="mb-8 flex items-center justify-between gap-8">
//             <div>
//             {/* <Link to="/dashboard/AddProducts">Go to Add Products</Link> */}

//               <Typography variant="h5" color="blue-gray">
//                 Products List
//               </Typography>
//               <Typography color="gray" className="mt-1 font-normal">
//                 Manage your products here
//               </Typography>
//             </div>
//             <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
//               <Button variant="outlined" size="sm" onClick={handleViewToggle}>
//                 {viewAll ? "View 5" : "View All"}
//               </Button>
//               {/* <Button onClick={AddProduct} className="flex items-center text-[14px] gap-2" size="sm">
//                 <Icon icon="ri:add-line" className="text-[20px] text-white" />
//                 Add Product
//               </Button> */}
//             </div>
//           </div>
//           <div class="relative h-10 w-72 min-w-[200px]">
//           <div class="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
//               stroke="currentColor" aria-hidden="true" class="w-5 h-5">
//               <path stroke-linecap="round" stroke-linejoin="round"
//                 d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
//             </svg>
//           </div>
//           <input
//             class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
//             placeholder=" " value={searchTerm}  onChange={(e) => setSearchTerm(e.target.value)}/>
//           <label
//             class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
//             Search
//           </label>
//         </div>
      
        
//           {/* <div className="w-full flex md:w-72">
//             <Input
//               placeholder="Search Products"
//               className="px-16 py-3"
//               icon={<SearchIcon className="text-[20px] mt-2 ml-4" />}
//               value={searchTerm} 
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div> */}
//         </CardHeader>
//         <CardBody className="overflow-auto px-0 h-[400px]">
//           <table className="mt-4 w-full text-left">
//           <thead>
//   <tr>
//     {TABLE_HEAD.map((head, index) => (
//       <th
//         key={head}
//         className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
//         onClick={() => index === 0 && sortProducts(head.toLowerCase().replace(" ", ""))} 
//       >
//         <Typography
//           variant="small"
//           color="blue-gray"
//           className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
//         >
//             <Icon
//               icon={
//                 activeSort === head.toLowerCase().replace(" ", "") &&
//                 sortOrders[head.toLowerCase().replace(" ", "")] === 'asc'
//                   ? 'prime:sort-up'
//                   : 'prime:sort-down'
//               }
//               strokeWidth={2}
//               className="h-4 w-4"
//             />
//         </Typography>
//       </th>
//     ))}
//   </tr>
// </thead>

//             <tbody>
              
//               {filteredProducts.length > 0 ? (
              
              
//                 filteredProducts.map((val, index) => (
//                   <tr key={index}>
//                     <td className="p-4 border-b flex items-center border-blue-gray-50">
//                       <Avatar src={`http://192.168.100.106:4000${val.imageUrls[0]}`} alt={val.name || "No Image"} className="w-16 h-16" />
//                     </td>
//                     <td className="p-4 border-b border-blue-gray-50">{val.name}</td>
//                     <td className="p-4 border-b border-blue-gray-50">{val.subCategory?.category?.name}</td>
//                     <td className="p-4 border-b border-blue-gray-50">{val.subCategory?.name}</td>
//                     <td className="p-4 border-b border-blue-gray-50">{val.price}</td>
//                     <td className="p-4 border-b border-blue-gray-50">
//   {val.quantity > 0 
//     ? `Available: ${val.quantity}` 
//     : "Out of Stock"}
// </td>

//                     <td className="p-4 border-b  border-blue-gray-50">
//                       <div className='flex gap-2'>

//                       <Icon icon="ic:round-edit" className="text-[20px] cursor-pointer hover:text-red-800"  onClick={() => hanldeEdit(val._id)}/>
//                       <Icon
//   icon={`${status ? "mdi-light:lock" : "mdi-light:lock-open"}`}   
//   className="text-[20px] cursor-pointer hover:text-sky-700"
//   onClick={() => handleStatus(val._id)}
// />
//                         <Icon icon="mdi:delete-outline" className="text-[20px] cursor-pointer hover:text-red-500" onClick={() => handleDelete(val._id)}/>
//                       </div>

//                       </td>
                   
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7" className="p-4 text-center">
//                     No products available
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </CardBody>
//         {!viewAll && (
//           <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
//             <Typography variant="small" color="blue-gray" className="font-normal">
//               Page {currentPage} of {Math.ceil(allProducts.length / itemsPerPage)}
//             </Typography>
//             <div className="flex gap-2">
//               <Button
//                 variant="outlined"
//                 size="sm"
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//               >
//                 Previous
//               </Button>
//               <Button
//                 variant="outlined"
//                 size="sm"
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === Math.ceil(allProducts.length / itemsPerPage)}
//               >
//                 Next
//               </Button>
//             </div>
//           </CardFooter>
//         )}
//       </Card>
//     </div>
//   );
// }
