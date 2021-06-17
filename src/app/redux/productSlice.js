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
      switch (response.status) {
        case 200:
          dispatch(stopLoading());
          return response.data;
        case 401:
          throw new Error("Unauthorize");
        case 400:
          throw new Error("");
        default:
          throw new Error("Error");
      }
    } catch (error) {
      toast.error("Mất kết nối đến máy chủ, kiểm tra lại internet của bạn", {
        position: toast.POSITION.TOP_RIGHT,
      });
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
      switch (response.status) {
        case 200:
          dispatch(stopLoading());
          return response.data;
        case 401:
          throw new Error("Unauthorize");
        case 400:
          throw new Error("");
        default:
          throw new Error("Error");
      }
    } catch (error) {
      toast.error("Mất kết nối đến máy chủ, kiểm tra lại internet của bạn", {
        position: toast.POSITION.TOP_RIGHT,
      });
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
      switch (response.status) {
        case 200:
          dispatch(stopLoading());
          return response.data;
        case 401:
          throw new Error("Unauthorize");
        case 400:
          throw new Error("");
        default:
          throw new Error("Error");
      }
    } catch (error) {
      toast.error("Mất kết nối đến máy chủ, kiểm tra lại internet của bạn", {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(stopLoading());
      return null;
    }
  }
);
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
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
      dispatch(stopLoading());
      return null;
    }
  }
);
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (payload, thunkApi) => {
    const { dispatch, getState } = thunkApi;
    // let originalImages = getState().product.productToEdit.images;
    // let newImages = payload.images;

    dispatch(startLoading());
    try {
      const response = await productApi.patchProduct(payload);
      switch (response.status) {
        case 200:
          toast.success("Cập nhật sản phẩm thành công!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          dispatch(stopLoading());
          return { newProduct: payload, responseData: response.data };
        case 401:
          dispatch(stopLoading());
          return null;
        case 400:
          dispatch(stopLoading());
          return null;
        default:
          dispatch(stopLoading());
          return null;
      }
    } catch (error) {
      toast.error("Cập nhật sản phẩm thất bại!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log("update product: ", error);
      dispatch(stopLoading());
      return null;
    }
  }
);
export const addImageToProduct = createAsyncThunk(
  "product/addImageToProduct",
  async (payload, thunkApi) => {
    const { dispatch, getState } = thunkApi;
    dispatch(startLoading());
    try {
      const response = await productApi.postProductImage(payload);
      switch (response.status) {
        case 200:
          toast.success("Thêm hình ảnh thành công", {
            position: toast.POSITION.TOP_RIGHT,
          });
          dispatch(stopLoading());
          return payload;
        case 401:
          dispatch(stopLoading());
          return null;

        case 400:
          dispatch(stopLoading());
          return null;

        default:
          dispatch(stopLoading());
          return null;
      }
    } catch (error) {
      toast.error("Thêm hình ảnh thất bại!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log("update product: ", error);
      dispatch(stopLoading());
      return null;
    }
  }
);
export const removeImageFromProduct = createAsyncThunk(
  "product/removeImageFromProduct ",
  async (payload, thunkApi) => {
    const { dispatch, getState } = thunkApi;
    // let originalImages = getState().product.productToEdit.images;
    // let newImages = payload.images;

    dispatch(startLoading());
    try {
      const response = await productApi.deleteProductImage(payload);
      switch (response.status) {
        case 200:
          toast.success("Xóa hình ảnh thành công", {
            position: toast.POSITION.TOP_RIGHT,
          });
          dispatch(stopLoading());
          return payload;
        case 401:
          return null;
        case 400:
          return null;
        default:
          return null;
      }
    } catch (error) {
      toast.error("Xóa hình ảnh thất bại!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log("update product: ", error);
      dispatch(stopLoading());
      return null;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    try {
      const response = await productApi.deleteProduct(payload);
      switch (response.status) {
        case 200:
          toast.success("Xóa sản phẩm thành công!", {
            position: toast.POSITION.TOP_RIGHT,
          });
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
  reducers: {
    setProductToEdit: (state, action) => {
      state.productToEdit = action.payload;
    },
  },
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
        // state.currentProduct = productDetail;
        state.productToEdit = productDetail;
      })
      .addCase(fetchListProductInCategory.fulfilled, (state, action) => {
        if (action.payload === null) return;
        const { listProduct } = action.payload;
        state.listProduct = listProduct;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        if (action.payload === null) return;
        let { newProduct, responseData } = action.payload;

        newProduct = { ...newProduct, id: responseData.id };

        let newListProduct = state.listProduct;
        newListProduct.push(newProduct);

        state.productToEdit = newProduct;
        state.listProduct = newListProduct;
      })
      .addCase(addImageToProduct.fulfilled, (state, action) => {
        if (action.payload === null) return;
        let { image } = action.payload;
        state.productToEdit.images.push({ name: image.name });
      })
      .addCase(removeImageFromProduct.fulfilled, (state, action) => {
        if (action.payload === null) return;
        let image = action.payload;
        state.productToEdit.images = state.productToEdit.images.filter(
          (e) => e.id !== image.id
        );
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        if (action.payload === null) return;
        let { newProduct } = action.payload;

        let newListProduct = [...state.listProduct];

        let index = newListProduct.findIndex(
          (productSystem) => productSystem.id === newProduct.id
        );
        newListProduct[index] = newProduct;

        state.productToEdit = { ...state.productToEdit, newProduct };
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

export const { setProductToEdit } = productSlice.actions;

export default productSlice.reducer;
