import axiosClient from "./AxiosClient";
import { fakeApi } from "./fakeApi";
// import { listDiscountCodes } from "./fakeData";

const discountCodeApi = {
  getListDiscountCode: async () => {
    // let response = await fakeApi({
    //   // request: loginInfo,
    //   response: {
    //     status: 200,
    //     data: {
    //       listDiscountCode: listDiscountCodes,
    //     },
    //   },
    //   timeOut: 1000,
    // });
    // return response;
    const url = "/services/discount";
    let response = await axiosClient.get(url).then((res) => res);
    console.log("getDiscountCode API response - ", response);
    return {
      status: response.status,
      data: { listDiscountCode: response.data?.data },
    };
  },
  postDiscountCode: async (discountCode) => {
    console.log("postDiscountCode - payload", discountCode);
    const url = "/services/discount";
    let response = await axiosClient.post(url, discountCode).then((res) => res);
    console.log("postDiscountCode API response - ", response);
    return {
      status: response.status,
      data: { id: response.data?.data?.id },
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
  patchDiscountCode: async (discountCode) => {
    const url = "/services/discount/" + discountCode.id;
    const { code, exp, number, percentage } = discountCode;
    let payload = { code, exp, number, percentage };
    console.log("patchDiscountCode - payload", payload);
    let response = await axiosClient.patch(url, payload).then((res) => res);
    console.log("patchDiscountCode API response - ", response);
    return {
      status: response.status,
      data: { listDiscountCode: response.data?.data },
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
  deleteDiscountCode: async (discountCodeId) => {
    // let response = await fakeApi({
    //   // request: loginInfo,
    //   response: {
    //     status: 200,
    //     data: {},
    //   },
    //   timeOut: 1000,
    // });
    // return response;
    const url = "/services/discount/" + discountCodeId;
    let response = await axiosClient.delete(url).then((res) => res);
    console.log("getDiscountCode API response - ", response);
    return {
      status: response.status,
      data: {},
    };
  },
};

export default discountCodeApi;
