import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import shippingMethodApi from "app/api/shippingMethodApi";
import { openErrorNofificationDialog } from "./dialogSlice";
import { startLoading, stopLoading } from "./loadingSlice";

const initialState = {
  listShippingMethod: [],
};

export const fetchListShippingMethod = createAsyncThunk(
  "shippingMethod/fetchListShippingMethod",
  async (payload, thunkApi) => {
    if (payload !== null) {
    }
    const { dispatch } = thunkApi;
    dispatch(startLoading());

    try {
      const response = await shippingMethodApi.getListShippingMethod();

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
export const createShippingMethod = createAsyncThunk(
  "shippingMethod/createShippingMethod",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;

    dispatch(startLoading());
    try {
      const response = await shippingMethodApi.postShippingMethod(payload);
      switch (response.status) {
        case 200:
          // dispatch(notify({ message: "Đăng nhập thành công", options: { variant: 'success' } }));
          dispatch(stopLoading());
          return { newShippingMethod: payload, responseData: response.data };
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
          title: "Thêm hệ thống rạp mới thất bại",
        })
      );
      dispatch(stopLoading());
      return null;
    }
  }
);
export const updateShippingMethod = createAsyncThunk(
  "shippingMethod/updateShippingMethod",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;

    dispatch(startLoading());
    try {
      const response = await shippingMethodApi.postShippingMethod(payload);
      switch (response.status) {
        case 200:
          dispatch(stopLoading());
          return { newShippingMethod: payload, responseData: response.data };
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
export const deleteShippingMethod = createAsyncThunk(
  "shippingMethod/deleteShippingMethod",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;

    dispatch(startLoading());
    try {
      const response = await shippingMethodApi.deleteShippingMethod(payload);
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

export const shippingMethodSlice = createSlice({
  name: "shippingMethod",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListShippingMethod.fulfilled, (state, action) => {
        if (action.payload === null) return;
        const { listShippingMethod } = action.payload;
        state.listShippingMethod = listShippingMethod;
      })
      .addCase(createShippingMethod.fulfilled, (state, action) => {
        if (action.payload === null) return;
        let { newShippingMethod, responseData } = action.payload;

        newShippingMethod = { ...newShippingMethod, id: responseData.id };

        let newListShippingMethod = state.listShippingMethod;
        newListShippingMethod.push(newShippingMethod);

        state.listShippingMethod = newListShippingMethod;
      })
      .addCase(updateShippingMethod.fulfilled, (state, action) => {
        if (action.payload === null) return;
        let { newShippingMethod } = action.payload;

        let newListShippingMethod = [...state.listShippingMethod];

        let index = newListShippingMethod.findIndex(
          (shippingMethodSystem) =>
            shippingMethodSystem.id === newShippingMethod.id
        );
        newListShippingMethod[index] = newShippingMethod;

        state.listShippingMethod = newListShippingMethod;
      })
      .addCase(deleteShippingMethod.fulfilled, (state, action) => {
        if (action.payload === null) return;
        let { id } = action.payload;

        state.listShippingMethod = state.listShippingMethod.filter(
          (shippingMethodSystem) => shippingMethodSystem.id !== id
        );
      });
  },
});

export const {} = shippingMethodSlice.actions;

export default shippingMethodSlice.reducer;
