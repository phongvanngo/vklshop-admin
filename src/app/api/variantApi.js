// import axiosClient from './AxiosClient';
import { fakeApi } from "./fakeApi";
import { listVariants } from "./fakeData";

const variantApi = {
  getListVariantProduct: async (productId) => {
    let response = await fakeApi({
      // request: loginInfo,
      response: {
        status: 200,
        data: {
          listVariant: listVariants.filter((e) => e.id === productId),
        },
      },
      timeOut: 1000,
    });
    return response;
  },
  postVariant: async (variant) => {
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
  patchVariant: async (variant) => {
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
  deleteVariant: async (variant) => {
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

export default variantApi;
