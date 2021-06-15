import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import variantApi from "app/api/variantApi";
import { openErrorNofificationDialog } from "./dialogSlice";
import { startLoading, stopLoading } from "./loadingSlice";

import { toast } from "react-toastify";

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
      dispatch(stopLoading());
      return null;
    }
  }
);
export const createVariant = createAsyncThunk(
  "variant/createVariant",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    try {
      const response = await variantApi.postVariant(payload);
      switch (response.status) {
        case 200:
          toast.success("Tạo mới mẫu mã thành công", {
            position: toast.POSITION.TOP_RIGHT,
          });
          dispatch(stopLoading());
          return { newVariant: payload, responseData: response.data };
        case 401:
          throw new Error("Unauthorize");
        case 400:
          throw new Error("");
        default:
          toast.error("Kiểm tra kết nối mạng của bạn", {
            position: toast.POSITION.TOP_RIGHT,
          });
          throw new Error("Error");
      }
    } catch (error) {
      dispatch(stopLoading());
      return null;
    }
  }
);
export const updateVariant = createAsyncThunk(
  "variant/updateVariant",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    try {
      const response = await variantApi.patchVariant(payload);
      switch (response.status) {
        case 200:
          toast.success("Cập nhật mẫu mã mới thành công", {
            position: toast.POSITION.TOP_RIGHT,
          });
          dispatch(stopLoading());
          return { newVariant: payload, responseData: response.data };
        case 401:
          throw new Error("Unauthorize");
        case 400:
          throw new Error("");
        default:
          toast.error("Kiểm tra kết nối mạng của bạn", {
            position: toast.POSITION.TOP_RIGHT,
          });
          throw new Error("Error");
      }
    } catch (error) {
      // dispatch(
      //   openErrorNofificationDialog({
      //     title: "Cập nhập hệ thống rạp thất bại",
      //   })
      // );

      dispatch(stopLoading());
      return null;
    }
  }
);
export const deleteVariant = createAsyncThunk(
  "variant/deleteVariant",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    try {
      const response = await variantApi.deleteVariant(payload);
      switch (response.status) {
        case 200:
          toast.success("Xóa thành công", {
            position: toast.POSITION.TOP_RIGHT,
          });
          dispatch(stopLoading());
          return { id: payload, responseData: response.data };
        case 401:
          throw new Error("Unauthorize");
        case 400:
          throw new Error("");
        default:
          toast.error("Kiểm tra kết nối mạng của bạn", {
            position: toast.POSITION.TOP_RIGHT,
          });
          throw new Error("Error");
      }
    } catch (error) {
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
    setListVariant: (state, action) => {
      let listVariant = action.payload;
      state.listVariant = (listVariant || []).map((e) => {
        const { id, product_id, name, cost_price, price, stock } = e;
        return {
          id,
          productId: product_id,
          name,
          costPrice: cost_price,
          price,
          stock,
        };
      });
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

        state.listVariant = newListVariant;
      })
      .addCase(updateVariant.rejected, (state, action) => {})
      .addCase(deleteVariant.fulfilled, (state, action) => {
        if (action.payload === null) return;
        let { id } = action.payload.responseData;

        state.listVariant = state.listVariant.filter(
          (variantSystem) => variantSystem.id !== id
        );
      });
  },
});

export const { setListVariant, setEmtyListVariant } = variantSlice.actions;

export default variantSlice.reducer;
