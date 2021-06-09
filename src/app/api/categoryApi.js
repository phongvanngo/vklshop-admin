// import axiosClient from './AxiosClient';
import { fakeApi } from "./fakeApi";
import { listCategories } from "./fakeData";

const categoryApi = {
  getListCategory: async (loginInfo) => {
    let response = await fakeApi({
      // request: loginInfo,
      response: {
        status: 200,
        data: {
          listCategory: listCategories,
        },
      },
      timeOut: 1000,
    });
    return response;
  },
  postCategory: async (category) => {
    let response = await fakeApi({
      // request: loginInfo,
      response: {
        status: 200,
        data: {
          id: Math.floor(Math.random() * 1000),
        },
      },
      timeOut: 1000,
    });
    return response;
  },
  patchCategory: async (category) => {
    let response = await fakeApi({
      // request: loginInfo,
      response: {
        status: 200,
        data: {},
      },
      timeOut: 1000,
    });
    return response;
  },
  deleteCategory: async (category) => {
    let response = await fakeApi({
      // request: loginInfo,
      response: {
        status: 200,
        data: {},
      },
      timeOut: 1000,
    });
    return response;
  },
};

export default categoryApi;
