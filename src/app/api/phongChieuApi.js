// import axiosClient from './AxiosClient';
import { fakeApi } from "./fakeApi";
import { listPhongChieu } from "./fakeData";

const phongChieuApi = {
  getListPhongChieu: async (loginInfo) => {
    let response = await fakeApi({
      // request: loginInfo,
      response: {
        status: 200,
        data: {
          listPhongChieu: listPhongChieu(),
        },
      },
      timeOut: 1000,
    });

    return response;
  },
  getListPhongChieuInCumRap: async (cumRapId) => {
    let response = await fakeApi({
      // request: loginInfo,
      response: {
        status: 200,
        data: {
          listPhongChieu: cumRapId ? listPhongChieu(cumRapId) : [],
        },
      },
      timeOut: 1000,
    });

    return response;
  },
  postPhongChieu: async (phongChieu) => {
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
  patchPhongChieu: async (phongChieu) => {
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
  deletePhongChieu: async (phongChieu) => {
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

export default phongChieuApi;
