import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct, IProductsState } from "../../type/index";

const initialState: IProductsState = {
  products: [],
  loading: false,
  error: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<IProduct>) {
      state.products.push(action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const { addProduct, setLoading, setError } = productsSlice.actions;

export default productsSlice.reducer;
