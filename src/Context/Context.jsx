import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";
import axios from "axios";
// Context Setup
import { toast } from "react-hot-toast";
export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState([]);
  const [userId, setUserId] = useState(null);
  const [subcategory, setSubCategories] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [fetchloading, setFetchLoading] = useState(false);
  const [wishlistProducts, setWishlistProduct] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("authToken");
  const API_URL = import.meta.env.VITE_BACKEND_API_URL;

  useEffect(() => {
    const fetchUsersData = async () => {
      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/auth/user-details`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserId(response?.data?._id);
        setIsLoggedIn(true);
        setUser(response?.data);
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setIsLoggedIn(true);
      }
    };

    fetchUsersData();
  }, [isLoggedIn]);

  const addToCart = async (product, user_id, productQuantity) => {
    if (!user) {
      alert("Please login");
      return;
    }

    const cart = {
      productId: product._id,
      userId: user_id,
      quantity: productQuantity,
    };

    // Using toast.promise
    toast
      .promise(
        (async () => {
          setFetchLoading(true);
          const response = await axios.post(`${API_URL}/api/cart/add`, cart);
          fetchCartData();
        })(),
        {
          loading: "Adding to cart...",
          success: "Added to cart successfully 👌",
          error: "Failed to add to cart 🤯",
        }
      )
      .finally(() => {
        setFetchLoading(false);
      });
  };

  const addToWishlist = async (product, user_id) => {
    if (!token) {
      alert("Please login");
      return;
    }

    const cart = {
      productId: product._id,
      userId: user_id,
    };

    try {
      setFetchLoading(true);
      const response = await axios.post(
        `${API_URL}/api/cat/product/like`,
        cart
      );
      fetchWishlistProducts();
      toast.success(
        response?.data?.message || "Added to wishlist successfully 👌"
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to add to wishlist 🤯");
    } finally {
      setFetchLoading(false);
    }
  };

  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchHomeCategoryData = async () => {
      try {
        setCategoryLoading(true);
        const response = await axios.get(`${API_URL}/api/cat/categories`);
        const fetchedCategories = response?.data?.categories?.slice(0, 4);
        setCategories(fetchedCategories);
      } catch (error) {
        setCategoryLoading(false);
        console.error("Error fetching categories:", error);
      } finally {
        setCategoryLoading(false);
      }
    };

    fetchHomeCategoryData();
  }, []);

  const fetchCartData = async () => {
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    try {
      setFetchLoading(true);

      if (userId) {
        const cartResponse = await axios.post(`${API_URL}/api/cart/getcart`, {
          userId: userId,
        });
        setCartItems(cartResponse?.data?.cart.items || []);
      }
    } catch (error) {
      setIsLoggedIn(false);
      console.log(error);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [token, userId]);

  const fetchWishlistProducts = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/cat/product/liked`, {
        userId: userId,
      });

      const activeProducts = response?.data.filter(
        (product) => !product.isDeleted && product.isPublic
      );
      console.log("Fetched wishlist products:", response?.data);
      setWishlistProduct(activeProducts);
    } catch (error) {
      console.error("Error fetching wishlist products:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchWishlistProducts();
    }
  }, [userId]);

  const updateCart = async (productId, newQuantity) => {
    try {
      if (!isLoggedIn) {
        alert("Please login");
        return;
      }

      const cartItem = {
        productId,
        userId: userId,
        quantity: newQuantity,
      };

      const response = await axios.post(
        `${API_URL}/api/cart/updatecart`,
        cartItem
      );
      // fetchCartData();
      setCartItems(response.data.cart.items);
      if (response?.data.success) {
        // setCartItems((prevCart) =>
        //   prevCart.map((item) =>
        //     item._id === productId ? { ...item, quantity: newQuantity } : item
        //   )
        // );
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating cart 🤯");
    }
  };

  const incrementQuantity = (id, currentQuantity) => {
    const newQuantity = currentQuantity + 1;
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
    updateCart(id, newQuantity);
  };

  const decrementQuantity = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      setCartItems((prevCart) =>
        prevCart.map((item) =>
          item._id === id ? { ...item, quantity: newQuantity } : item
        )
      );
      updateCart(id, newQuantity);
    } else {
      alert("Quantity cannot be less than 1.");
    }
  };

  const handleDelete = async (id) => {
    const cartItemdelete = {
      productId: id,
      userId: userId,
    };
    try {
      const response = await axios.post(
        `${API_URL}/api/cart/remove`,
        cartItemdelete
      );

      fetchCartData();
      // setTimeout(() => {
      //   notifySuccess("You successfully deleted");
      // }, 1000);
    } catch (error) {
      alert(error);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/subcategories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response?.data.subCategorirs);
      setSubCategories(response?.data.subCategorirs);
      setFilteredData(response?.data.subCategorirs);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        fetchCartData,
        fetchloading,
        addToWishlist,
        cartItems,
        incrementQuantity,
        decrementQuantity,
        handleDelete,
        wishlistProducts,
        subcategory,
        fetchWishlistProducts,
        fetchSubCategories,
        userId,
        user,
        token,
        categoryLoading,
        categories,
        filteredData,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access Cart Context
export const useCart = () => useContext(CartContext);
