import axiosClient from "./AxiosClient";
import { fakeApi } from "./fakeApi";
import { listShippingMethods } from "./fakeData";

const shippingMethodApi = {
  getListShippingMethod: async (loginInfo) => {
    // let response = await fakeApi({
    //   // request: loginInfo,
    //   response: {
    //     status: 200,
    //     data: {
    //       listShippingMethod: listShippingMethods,
    //     },
    //   },
    //   timeOut: 1000,
    // });
    // return response;
    const url = "/services/shipping";
    let response = await axiosClient.get(url).then((res) => res);
    console.log("getShippingMethod API response - ", response);
    return {
      status: response.status,
      data: { listShippingMethod: response.data?.data },
    };
  },
  postShippingMethod: async (shippingMethod) => {
    console.log("postShippingMethod - payload", shippingMethod);
    const url = "/services/shipping";
    let response = await axiosClient
      .post(url, shippingMethod)
      .then((res) => res);
    console.log("postShippingMethod API response - ", response);
    return {
      status: response.status,
      data: { listShippingMethod: response.data?.data },
    };
    // let response = await fakeApi({
    //   // request: loginInfo,
    //   response: {
    //     status: 200,
    //     data: {
    //       id: Math.floor(Math.random() * 1000),
    //     },
    //   },
    //   timeOut: 1000,
    // });
    // return response;
  },
  patchShippingMethod: async (shippingMethod) => {
    const url = "/services/shipping/" + shippingMethod.id;
    const { name, description } = shippingMethod;
    let payload = { name, description };
    console.log("patchShippingMethod - payload", payload);
    let response = await axiosClient.patch(url, payload).then((res) => res);
    console.log("patchShippingMethod API response - ", response);
    return {
      status: response.status,
      data: { listShippingMethod: response.data?.data },
    };
    // let response = await fakeApi({
    //   // request: loginInfo,
    //   response: {
    //     status: 200,
    //     data: {},
    //   },
    //   timeOut: 1000,
    // });
    // return response;
  },
  deleteShippingMethod: async (shippingMethodId) => {
    // let response = await fakeApi({
    //   // request: loginInfo,
    //   response: {
    //     status: 200,
    //     data: {},
    //   },
    //   timeOut: 1000,
    // });
    // return response;
    const url = "/services/shipping/" + shippingMethodId;
    let response = await axiosClient.delete(url).then((res) => res);
    console.log("getShippingMethod API response - ", response);
    return {
      status: response.status,
      data: {},
    };
  },
};

export default shippingMethodApi;
