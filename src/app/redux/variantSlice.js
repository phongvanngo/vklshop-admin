import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import variantApi from "app/api/variantApi";
import { openErrorNofificationDialog } from "./dialogSlice";
import { startLoading, stopLoading } from "./loadingSlice";

const initialState = {
  listVariant: [],
};

export const fetchListVariantProduct = createAsyncThunk(
  "variant/fetchListVariant",
  async (payload, thunkApi) => {
    if (payload !== null) {
    }
    const { dispatch, getState } = thunkApi;
    const { editingProductId } = getState().product;
    if (editingProductId === null) {
      //truong hop dang tao moi san pham
    }
    dispatch(startLoading());
    try {
      const response = await variantApi.getListVariantProduct(payload);
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
export const createVariant = createAsyncThunk(
  "variant/createVariant",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    console.log(payload);
    dispatch(startLoading());
    try {
      const response = await variantApi.postVariant(payload);
      switch (response.status) {
        case 200:
          // dispatch(notify({ message: "Đăng nhập thành công", options: { variant: 'success' } }));
          dispatch(stopLoading());
          return { newVariant: payload, responseData: response.data };
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
          title: "Thêm mẫu mới thất bại",
        })
      );
      dispatch(stopLoading());
      return null;
    }
  }
);
export const updateVariant = createAsyncThunk(
  "variant/updateVariant",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    console.log(payload);
    dispatch(startLoading());
    try {
      const response = await variantApi.postVariant(payload);
      switch (response.status) {
        case 200:
          dispatch(stopLoading());
          return { newVariant: payload, responseData: response.data };
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
          title: "Cập nhập hệ thống rạp thất bại",
        })
      );
      dispatch(stopLoading());
      return null;
    }
  }
);
export const deleteVariant = createAsyncThunk(
  "variant/deleteVariant",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    console.log(payload);
    dispatch(startLoading());
    try {
      const response = await variantApi.deleteVariant(payload);
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
          title: "Xóa rạp thất bại",
        })
      );
      dispatch(stopLoading());
      return null;
    }
  }
);

export const variantSlice = createSlice({
  name: "variant",
  initialState,
  reducers: {
    setEmtyListVariant: (state) => {
      state.listVariant = [];
    },
    setCurrentProdcutId: (state, action) => {
      state.currentProductId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListVariantProduct.fulfilled, (state, action) => {
        if (action.payload === null) return;
        const { listVariant } = action.payload;
        state.listVariant = listVariant;
      })
      .addCase(createVariant.fulfilled, (state, action) => {
        if (action.payload === null) return;
        let { newVariant, responseData } = action.payload;

        newVariant = { ...newVariant, id: responseData.id };

        let newListVariant = state.listVariant;
        newListVariant.push(newVariant);

        state.listVariant = newListVariant;
      })
      .addCase(updateVariant.fulfilled, (state, action) => {
        if (action.payload === null) return;
        let { newVariant } = action.payload;

        let newListVariant = [...state.listVariant];

        let index = newListVariant.findIndex(
          (variantSystem) => variantSystem.id === newVariant.id
        );
        newListVariant[index] = newVariant;
        console.log(newListVariant);

        state.listVariant = newListVariant;
      })
      .addCase(deleteVariant.fulfilled, (state, action) => {
        if (action.payload === null) return;
        let { id } = action.payload;

        state.listVariant = state.listVariant.filter(
          (variantSystem) => variantSystem.id !== id
        );
      });
  },
});

export const { setEmtyListVariant } = variantSlice.actions;

export default variantSlice.reducer;
