import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cardTypeApi from "app/api/cardTypeApi";
import { openErrorNofificationDialog } from "./dialogSlice";
import { startLoading, stopLoading } from "./loadingSlice";
import { toast } from "react-toastify";

const initialState = {
  listCardType: [],
};

export const fetchListCardType = createAsyncThunk(
  "cardType/fetchListCardType",
  async (payload, thunkApi) => {
    if (payload !== null) {
    }
    const { dispatch } = thunkApi;
    dispatch(startLoading());

    try {
      const response = await cardTypeApi.getListCardType();

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
export const createCardType = createAsyncThunk(
  "cardType/createCardType",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;

    dispatch(startLoading());
    try {
      let response = await cardTypeApi.postCardType(payload);
      switch (response.status) {
        case 200:
          // dispatch(notify({ message: "Đăng nhập thành công", options: { variant: 'success' } }));
          dispatch(stopLoading());
          return { newCardType: payload, responseData: response.data };
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
export const updateCardType = createAsyncThunk(
  "cardType/updateCardType",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;

    dispatch(startLoading());
    try {
      const response = await cardTypeApi.patchCardType(payload);
      switch (response.status) {
        case 200:
          dispatch(stopLoading());
          return { newCardType: payload, responseData: response.data };
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
export const deleteCardType = createAsyncThunk(
  "cardType/deleteCardType",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;

    dispatch(startLoading());
    try {
      const response = await cardTypeApi.deleteCardType(payload);
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

export const cardTypeSlice = createSlice({
  name: "cardType",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListCardType.fulfilled, (state, action) => {
        if (action.payload === null) return;
        const { listCardType } = action.payload;
        state.listCardType = listCardType;
      })
      .addCase(createCardType.fulfilled, (state, action) => {
        if (action.payload === null) return;
        let { newCardType, responseData } = action.payload;

        newCardType = { ...newCardType, id: responseData.id };

        let newListCardType = state.listCardType;
        newListCardType.push(newCardType);

        state.listCardType = newListCardType;
      })
      .addCase(updateCardType.fulfilled, (state, action) => {
        if (action.payload === null) return;
        let { newCardType } = action.payload;

        let newListCardType = [...state.listCardType];

        let index = newListCardType.findIndex(
          (cardTypeSystem) => cardTypeSystem.id === newCardType.id
        );
        newListCardType[index] = newCardType;

        state.listCardType = newListCardType;
      })
      .addCase(deleteCardType.fulfilled, (state, action) => {
        if (action.payload === null) return;
        let { id } = action.payload;

        state.listCardType = state.listCardType.filter(
          (cardTypeSystem) => cardTypeSystem.id !== id
        );
      });
  },
});

export const {} = cardTypeSlice.actions;

export default cardTypeSlice.reducer;
