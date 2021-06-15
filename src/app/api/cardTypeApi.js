// import axiosClient from './AxiosClient';
import { fakeApi } from "./fakeApi";
import { listCardTypes } from "./fakeData";

const cardTypeApi = {
  getListCardType: async (loginInfo) => {
    let response = await fakeApi({
      // request: loginInfo,
      response: {
        status: 200,
        data: {
          listCardType: listCardTypes,
        },
      },
      timeOut: 1000,
    });
    return response;
  },
  postCardType: async (cardType) => {
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
  patchCardType: async (cardType) => {
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
  deleteCardType: async (cardType) => {
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

export default cardTypeApi;
