import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import discountCodeApi from "app/api/discountCodeApi";
import { openErrorNofificationDialog } from "./dialogSlice";
import { startLoading, stopLoading } from "./loadingSlice";
import { toast } from "react-toastify";

const initialState = {
  listDiscountCode: [],
};

export const fetchListDiscountCode = createAsyncThunk(
  "discountCode/fetchListDiscountCode",
  async (payload, thunkApi) => {
    if (payload !== null) {
    }
    const { dispatch } = thunkApi;
    dispatch(startLoading());

    try {
      const response = await discountCodeApi.getListDiscountCode();

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
export const createDiscountCode = createAsyncThunk(
  "discountCode/createDiscountCode",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;

    dispatch(startLoading());
    try {
      let response = await discountCodeApi.postDiscountCode(payload);
      switch (response.status) {
        case 200:
          toast.success("Tạo mới thành công", {
            position: toast.POSITION.TOP_RIGHT,
          });
          dispatch(stopLoading());
          return { newDiscountCode: payload, responseData: response.data };
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
export const updateDiscountCode = createAsyncThunk(
  "discountCode/updateDiscountCode",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;

    dispatch(startLoading());
    try {
      const response = await discountCodeApi.patchDiscountCode(payload);
      switch (response.status) {
        case 200:
          toast.success("Cập nhật thành công", {
            position: toast.POSITION.TOP_RIGHT,
          });
          dispatch(stopLoading());
          return { newDiscountCode: payload, responseData: response.data };
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
export const deleteDiscountCode = createAsyncThunk(
  "discountCode/deleteDiscountCode",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;

    dispatch(startLoading());
    try {
      const response = await discountCodeApi.deleteDiscountCode(payload);
      switch (response.status) {
        case 200:
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
      toast.error("Mất kết nối đến máy chủ, kiểm tra lại internet của bạn", {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(stopLoading());
      return null;
    }
  }
);

export const discountCodeSlice = createSlice({
  name: "discountCode",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListDiscountCode.fulfilled, (state, action) => {
        if (action.payload === null) return;
        const { listDiscountCode } = action.payload;
        state.listDiscountCode = listDiscountCode;
      })
      .addCase(createDiscountCode.fulfilled, (state, action) => {
        if (action.payload === null) return;
        let { newDiscountCode, responseData } = action.payload;

        newDiscountCode = { ...newDiscountCode, id: responseData.id };

        let newListDiscountCode = state.listDiscountCode;
        newListDiscountCode.push(newDiscountCode);

        state.listDiscountCode = newListDiscountCode;
      })
      .addCase(updateDiscountCode.fulfilled, (state, action) => {
        if (action.payload === null) return;
        let { newDiscountCode } = action.payload;

        let newListDiscountCode = [...state.listDiscountCode];

        let index = newListDiscountCode.findIndex(
          (discountCodeSystem) => discountCodeSystem.id === newDiscountCode.id
        );
        newListDiscountCode[index] = newDiscountCode;

        state.listDiscountCode = newListDiscountCode;
      })
      .addCase(deleteDiscountCode.fulfilled, (state, action) => {
        if (action.payload === null) return;
        let { id } = action.payload;

        state.listDiscountCode = state.listDiscountCode.filter(
          (discountCodeSystem) => discountCodeSystem.id !== id
        );
      });
  },
});

export const {} = discountCodeSlice.actions;

export default discountCodeSlice.reducer;
