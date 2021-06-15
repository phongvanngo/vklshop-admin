import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryApi from "app/api/categoryApi";
import { openErrorNofificationDialog } from "./dialogSlice";
import { startLoading, stopLoading } from "./loadingSlice";
import { toast } from "react-toastify";

const initialState = {
  listCategory: [],
};

export const fetchListCategory = createAsyncThunk(
  "category/fetchListCategory",
  async (payload, thunkApi) => {
    if (payload !== null) {
    }
    const { dispatch } = thunkApi;
    dispatch(startLoading());
    try {
      const response = await categoryApi.getListCategory();

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
export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;

    dispatch(startLoading());
    try {
      const response = await categoryApi.postCategory(payload);
      switch (response.status) {
        case 200:
          toast.success("Tạo danh mục sản phẩm mới thành công!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          dispatch(stopLoading());
          return { newCategory: payload, responseData: response.data };
        case 401:
          throw new Error("Unauthorize");
        case 442:
          toast.error("422: Dữ liệu không hợp lệ", {
            position: toast.POSITION.TOP_RIGHT,
          });
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
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;

    dispatch(startLoading());
    try {
      const response = await categoryApi.patchCategory(payload);
      switch (response.status) {
        case 200:
          toast.success("Cập nhật thành công!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          dispatch(stopLoading());
          return { newCategory: payload, responseData: response.data };
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
          title: "Cập nhập danh mục sản phẩm thất bại",
        })
      );
      dispatch(stopLoading());
      return null;
    }
  }
);
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (payload, thunkApi) => {
    const { dispatch } = thunkApi;

    dispatch(startLoading());
    try {
      const response = await categoryApi.deleteCategory(payload);
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

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListCategory.fulfilled, (state, action) => {
        if (action.payload === null) return;
        const { listCategory } = action.payload;
        state.listCategory = listCategory;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        if (action.payload === null) return;
        let { newCategory, responseData } = action.payload;

        newCategory = { ...newCategory, id: responseData.id };

        let newListCategory = state.listCategory;
        newListCategory = [newCategory, ...state.listCategory];

        state.listCategory = newListCategory;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        if (action.payload === null) return;
        let { newCategory } = action.payload;

        let newListCategory = [...state.listCategory];

        let index = newListCategory.findIndex(
          (categorySystem) => categorySystem.id === newCategory.id
        );
        newListCategory[index] = newCategory;

        state.listCategory = newListCategory;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        if (action.payload === null) return;
        let { id } = action.payload;

        state.listCategory = state.listCategory.filter(
          (categorySystem) => categorySystem.id !== id
        );
      });
  },
});

export const {} = categorySlice.actions;

export default categorySlice.reducer;
