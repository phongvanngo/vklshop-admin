import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cumRapApi from "app/api/cumRapApi";
import { openErrorNofificationDialog } from "./dialogSlice";
import { startLoading, stopLoading } from "./loadingSlice";

const initialState = {
  listCumRap: [],
};

export const fetchListCumRap = createAsyncThunk(
  "cumRap/fetchListCumRap",
  async (payload, thunkApi) => {
    if (payload !== null) {
    }
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    try {
      const response = await cumRapApi.getListCumRap();
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
      console.log(error);
      dispatch(stopLoading());
      return null;
    }
  }
);
export const fetchListCumRapInTheaterSystem = createAsyncThunk(
  "cumRap/fetchListCumRapInTheaterSystem",
  async (payload, thunkApi) => {
    const { theaterSystemId } = payload;
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    try {
      const response = await cumRapApi.getListCumRapInTheaterSytem(
        theaterSystemId
      );
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
export const createCumRap = createAsyncThunk(
  "cumRap/createCumRap",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    console.log(payload);
    dispatch(startLoading());
    try {
      const response = await cumRapApi.postCumRap(payload);
      switch (response.status) {
        case 200:
          // dispatch(notify({ message: "????ng nh???p th??nh c??ng", options: { variant: 'success' } }));
          dispatch(stopLoading());
          return { newCumRap: payload, responseData: response.data };
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
          title: "Th??m h??? th???ng r???p m???i th???t b???i",
        })
      );
      dispatch(stopLoading());
      return null;
    }
  }
);
export const updateCumRap = createAsyncThunk(
  "cumRap/updateCumRap",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    console.log(payload);
    dispatch(startLoading());
    try {
      const response = await cumRapApi.postCumRap(payload);
      switch (response.status) {
        case 200:
          dispatch(stopLoading());
          return { newCumRap: payload, responseData: response.data };
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
          title: "C???p nh???p h??? th???ng r???p th???t b???i",
        })
      );
      dispatch(stopLoading());
      return null;
    }
  }
);
export const deleteCumRap = createAsyncThunk(
  "cumRap/deleteCumRap",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;
    console.log(payload);
    dispatch(startLoading());
    try {
      const response = await cumRapApi.deleteCumRap(payload);
      switch (response.status) {
        case 200:
          // dispatch(notify({ message: "????ng nh???p th??nh c??ng", options: { variant: 'success' } }));
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
          title: "X??a r???p th???t b???i",
        })
      );
      dispatch(stopLoading());
      return null;
    }
  }
);

export const cumRapSlice = createSlice({
  name: "cumRap",
  initialState,
  reducers: {
    setEmtyListCumRap: (state) => {
      state.listCumRap = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListCumRap.fulfilled, (state, action) => {
        if (action.payload === null) return;
        const { listCumRap } = action.payload;
        state.listCumRap = listCumRap;
      })
      .addCase(fetchListCumRapInTheaterSystem.fulfilled, (state, action) => {
        if (action.payload === null) return;
        const { listCumRap } = action.payload;
        state.listCumRap = listCumRap;
      })
      .addCase(createCumRap.fulfilled, (state, action) => {
        if (action.payload === null) return;
        let { newCumRap, responseData } = action.payload;

        newCumRap = { ...newCumRap, id: responseData.id };

        let newListCumRap = state.listCumRap;
        newListCumRap.push(newCumRap);

        state.listCumRap = newListCumRap;
      })
      .addCase(updateCumRap.fulfilled, (state, action) => {
        if (action.payload === null) return;
        let { newCumRap } = action.payload;

        let newListCumRap = [...state.listCumRap];

        let index = newListCumRap.findIndex(
          (cumRap) => cumRap.id === newCumRap.id
        );
        newListCumRap[index] = newCumRap;
        console.log(newListCumRap);

        state.listCumRap = newListCumRap;
      })
      .addCase(deleteCumRap.fulfilled, (state, action) => {
        if (action.payload === null) return;
        let { id } = action.payload;

        state.listCumRap = state.listCumRap.filter(
          (cumRap) => cumRap.id !== id
        );
      });
  },
});

export const { setEmtyListCumRap } = cumRapSlice.actions;

export default cumRapSlice.reducer;
