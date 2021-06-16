import axiosClient from "./AxiosClient";
import { fakeApi } from "./fakeApi";
import { listCardTypes } from "./fakeData";

const cardTypeApi = {
  getListCardType: async () => {
    // let response = await fakeApi({
    //   // request: loginInfo,
    //   response: {
    //     status: 200,
    //     data: {
    //       listCardType: listCardTypes,
    //     },
    //   },
    //   timeOut: 1000,
    // });
    // return response;
    const url = "/services/card";
    let response = await axiosClient.get(url).then((res) => res);
    console.log("getCardType API response - ", response);
    return {
      status: response.status,
      data: { listCardType: response.data?.data },
    };
  },
  postCardType: async (cardType) => {
    console.log("postCardType - payload", cardType);
    const url = "/services/card";
    let response = await axiosClient.post(url, cardType).then((res) => res);
    console.log("postCardType API response - ", response);
    return {
      status: response.status,
      data: { listCardType: response.data?.data },
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
  patchCardType: async (cardType) => {
    const url = "/services/card/" + cardType.id;
    const { name, fee } = cardType;
    let payload = { name, fee };
    console.log("patchCardType - payload", payload);
    let response = await axiosClient.patch(url, payload).then((res) => res);
    console.log("patchCardType API response - ", response);
    return {
      status: response.status,
      data: { listCardType: response.data?.data },
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
  deleteCardType: async (cardTypeId) => {
    // let response = await fakeApi({
    //   // request: loginInfo,
    //   response: {
    //     status: 200,
    //     data: {},
    //   },
    //   timeOut: 1000,
    // });
    // return response;
    const url = "/services/card/" + cardTypeId;
    let response = await axiosClient.delete(url).then((res) => res);
    console.log("getCardType API response - ", response);
    return {
      status: response.status,
      data: {},
    };
  },
};

export default cardTypeApi;
