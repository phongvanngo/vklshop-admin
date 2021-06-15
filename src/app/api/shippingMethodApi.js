// import axiosClient from './AxiosClient';
import { fakeApi } from "./fakeApi";
import { listShippingMethods } from "./fakeData";

const shippingMethodApi = {
  getListShippingMethod: async (loginInfo) => {
    let response = await fakeApi({
      // request: loginInfo,
      response: {
        status: 200,
        data: {
          listShippingMethod: listShippingMethods,
        },
      },
      timeOut: 1000,
    });
    return response;
  },
  postShippingMethod: async (shippingMethod) => {
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
  patchShippingMethod: async (shippingMethod) => {
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
  deleteShippingMethod: async (shippingMethod) => {
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

export default shippingMethodApi;
