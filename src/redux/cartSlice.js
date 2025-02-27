import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");


export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/cart/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy giỏ hàng:", error);
    return { products: [], totalAmount: 0 };
  }
});

export const addToCart1 = createAsyncThunk(
  "cart/addToCart1",
  async ({ userId, product, quantity }, { dispatch }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/cart/add", {
        userId,
        productId: product._id,
        name: product.title,
        price: product.price,
        quantity: quantity, //  Truyền số lượng do người dùng chọn
      });

      if (response.status === 201) {
        socket.emit("updateCartCount", userId);
        dispatch(fetchCart(userId)); 
        return { ...product, quantity }; //  Đảm bảo Redux nhận đúng số lượng
      }
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      throw error;
    }
  }
);


export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, product }, { dispatch }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/cart/add", {
        userId,
        productId: product._id,
        name: product.title,
        price: product.price,
        quantity: 1,
      });

      if (response.status === 201) {
        socket.emit("updateCartCount", userId); 
        dispatch(fetchCart(userId)); 
        return product;
      }
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      throw error;
    }
  }
);


export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ userId, productId, action }, { dispatch }) => {
    try {
      await axios.put("http://localhost:5000/api/cart/update", {
        userId,
        productId,
        action,
      });

      socket.emit("updateCartCount", userId);
      dispatch(fetchCart(userId));

      return { productId, action };
    } catch (error) {
      console.error(" Lỗi khi cập nhật số lượng:", error);
      throw error;
    }
  }
);


export const removeCartItem = createAsyncThunk("cart/removeCartItem", async ({ userId, productId }) => {
  try {
    await axios.delete(`http://localhost:5000/api/cart/delete/${userId}/${productId}`);
    socket.emit("updateCartCount", userId); 
    return productId;
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
    throw error;
  }
});


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalAmount: 0,
    cartCount: 0,
  },
  reducers: {
    setCartCount: (state, action) => {
      state.cartCount = action.payload;
    },
    // New action to update totalAmount
    updateTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.products;
        state.totalAmount = action.payload.totalAmount;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.cartCount += 1;
      })
      .addCase(addToCart1.fulfilled, (state, action) => {
        const product = action.payload;
        const existingProduct = state.items.find((item) => item.productId === product.productId);

        if (existingProduct) {
        
          existingProduct.quantity += product.quantity;
        } else {
         
          state.items.push(product);
        }

        state.cartCount += product.quantity; // Cập nhật số lượng giỏ hàng
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        const { productId, action: updateAction } = action.payload;
        const product = state.items.find((item) => item.productId === productId);
        if (product) {
          product.quantity = updateAction === "increase" ? product.quantity + 1 : Math.max(product.quantity - 1, 1);
        }
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.productId !== action.payload);
      });
  },
});

export const { setCartCount, updateTotalAmount } = cartSlice.actions;
export default cartSlice.reducer;

export const listenForCartUpdates = (userId) => (dispatch) => {
  if (!userId) return;

  socket.emit("updateCartCount", userId);

  socket.on("cartCountUpdated", (newCount) => {
    dispatch(setCartCount(newCount));
    console.log(`🛒 Giỏ hàng cập nhật: ${newCount} sản phẩm`);
  });

  return () => {
    socket.off("cartCountUpdated");
  };
};
