import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "app/api/productApi";
import { openErrorNofificationDialog } from "./dialogSlice";
import { startLoading, stopLoading } from "./loadingSlice";
import { toast } from "react-toastify";

const initialState = {
  listProduct: [],
  productToEdit: null,
  currentProduct: null,
};

export const fetchListProduct = createAsyncThunk(
  "product/fetchListProduct",
  async (payload, thunkApi) => {
    if (payload !== null) {
    }
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    try {
      const response = await productApi.getListProduct();
      console.log(response);
      switch (response.status) {
        case 200:
          dispatch(stopLoading());
          return response.data;
        case 401:
          throw new Error("Unauthorize");
        case 400:
          console.log("hi");
          throw new Error("");
        default:
          throw new Error("Error");
      }
    } catch (error) {
      dispatch(stopLoading());
      return null;
    }
  }
);
export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (payload, thunkApi) => {
    if (payload !== null) {
    }
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    try {
      const response = await productApi.getProductById(payload);
      console.log(response);
      switch (response.status) {
        case 200:
          dispatch(stopLoading());
          return response.data;
        case 401:
          throw new Error("Unauthorize");
        case 400:
          console.log("hi");
          throw new Error("");
        default:
          throw new Error("Error");
      }
    } catch (error) {
      dispatch(stopLoading());
      return null;
    }
  }
);
export const fetchListProductInCategory = createAsyncThunk(
  "product/fetchListProductByCategory",
  async (payload, thunkApi) => {
    if (payload !== null) {
    }
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    try {
      const response = await productApi.getListProductByCategory(payload);
      console.log(response);
      switch (response.status) {
        case 200:
          dispatch(stopLoading());
          return response.data;
        case 401:
          throw new Error("Unauthorize");
        case 400:
          console.log("hi");
          throw new Error("");
        default:
          throw new Error("Error");
      }
    } catch (error) {
      dispatch(stopLoading());
      return null;
    }
  }
);
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    console.log(payload);
    dispatch(startLoading());
    try {
      const response = await productApi.postProduct(payload);
      switch (response.status) {
        case 200:
          toast.success("Tạo sản phẩm mới thành công!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          dispatch(stopLoading());
          return { newProduct: payload, responseData: response.data };
        case 401:
          throw new Error("Unauthorize");
        case 400:
          throw new Error("");
        default:
          throw new Error("Error");
      }
    } catch (error) {
      dispatch(
        openErrorNofificationDialog({
          title: "Thêm sản phẩm mới thất bại",
        })
      );
      console.log(error);
      dispatch(stopLoading());
      return null;
    }
  }
);
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    console.log(payload);
    dispatch(startLoading());
    try {
      const response = await productApi.postProduct(payload);
      switch (response.status) {
        case 200:
          dispatch(stopLoading());
          return { newProduct: payload, responseData: response.data };
        case 401:
          throw new Error("Unauthorize");
        case 400:
          throw new Error("");
        default:
          throw new Error("Error");
      }
    } catch (error) {
      dispatch(
        openErrorNofificationDialog({
          title: "Cập nhập sản phẩm thất bại",
        })
      );
      dispatch(stopLoading());
      return null;
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    console.log(payload);
    dispatch(startLoading());
    try {
      const response = await productApi.deleteProduct(payload);
      switch (response.status) {
        case 200:
          // dispatch(notify({ message: "Đăng nhập thành công", options: { variant: 'success' } }));
          dispatch(stopLoading());
          return { id: payload, responseData: response.data };
        case 401:
          throw new Error("Unauthorize");
        case 400:
          throw new Error("");
        default:
          throw new Error("Error");
      }
    } catch (error) {
      dispatch(
        openErrorNofificationDialog({
          title: "Xóa sản phẩm thất bại",
        })
      );
      dispatch(stopLoading());
      return null;
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListProduct.fulfilled, (state, action) => {
        if (action.payload === null) return;
        const { listProduct } = action.payload;
        state.listProduct = listProduct;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        if (action.payload === null) return;
        const { productDetail } = action.payload;
        state.currentProduct = productDetail;
      })
      .addCase(fetchListProductInCategory.fulfilled, (state, action) => {
        if (action.payload === null) return;
        const { listProduct } = action.payload;
        state.listProduct = listProduct;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        if (action.payload === null) return;
        console.log("create product fullfilled: data response", action.payload);
        let { newProduct, responseData } = action.payload;

        newProduct = { ...newProduct, id: responseData.id };

        let newListProduct = state.listProduct;
        newListProduct.push(newProduct);

        state.productToEdit = newProduct;
        state.listProduct = newListProduct;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        if (action.payload === null) return;
        let { newProduct } = action.payload;

        let newListProduct = [...state.listProduct];

        let index = newListProduct.findIndex(
          (productSystem) => productSystem.id === newProduct.id
        );
        newListProduct[index] = newProduct;
        console.log(newListProduct);

        state.listProduct = newListProduct;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        if (action.payload === null) return;
        let { id } = action.payload;

        state.listProduct = state.listProduct.filter(
          (productSystem) => productSystem.id !== id
        );
      });
  },
});

export const {} = productSlice.actions;

export default productSlice.reducer;
