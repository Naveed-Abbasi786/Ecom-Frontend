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
  const [userId, setUserId] = useState(null);
  const [fetchloading, setFetchLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const API_URL = "http://192.168.100.106:4000/api/auth";

  const addToCart = async (product, user_id,productQuantity,isLoggedIn) => {
    if (!isLoggedIn) {
      alert("Please login");
      return;
    }

    const cart = {
      productId: product._id,
      userId: user_id,
      quantity: productQuantity,
    };

    try {
      setFetchLoading(true);

      const response = await axios.post(
        "http://192.168.100.106:4000/api/cart/add",
        cart
      );

      fetchUserData();
      toast.success("Added to cart successfully 👌");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add to cart 🤯");
    } finally {
      setFetchLoading(false);
    }
  };

  const fetchUserData = useCallback(async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    try {
      setFetchLoading(true);
      const response = await axios.get(`${API_URL}/user-details`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserId(response.data._id);
      setIsLoggedIn(true);

      if (response.data._id) {
        const cartResponse = await axios.post(
          `http://192.168.100.106:4000/api/cart/getcart`,
          { userId: response.data._id }
        );
        setCartItems(cartResponse.data.cart.items);
      }
    } catch (error) {
      setIsLoggedIn(false);
      console.log(error);
    } finally {
      setFetchLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

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
        `http://192.168.100.106:4000/api/cart/updatecart`,
        cartItem
      );
      fetchUserData();

      if (response.data.success) {
        setCartItems((prevCart) =>
          prevCart.map((item) =>
            item._id === productId ? { ...item, quantity: newQuantity } : item
          )
        );
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
        `http://192.168.100.106:4000/api/cart/remove`,
        cartItemdelete
      );

      fetchUserData();
      // setTimeout(() => {
      //   notifySuccess("You successfully deleted");
      // }, 1000);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        fetchUserData,
        fetchloading,
        cartItems,
        incrementQuantity,
        decrementQuantity,
        handleDelete,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access Cart Context
export const useCart = () => useContext(CartContext);
