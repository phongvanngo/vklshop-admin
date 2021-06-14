import axiosClient from "./AxiosClient";
import { fakeApi } from "./fakeApi";
import { listCategories } from "./fakeData";

const categoryApi = {
  getListCategory: async (loginInfo) => {
    // let response = await fakeApi({
    //   // request: loginInfo,
    //   response: {
    //     status: 200,
    //     data: {
    //       listCategory: listCategories,
    //     },
    //   },
    //   timeOut: 1000,
    // });
    // return response;
    const url = "/shop/categories";
    let response = await axiosClient.get(url).then((res) => res);
    let format_response = {
      status: response.status,
      data: {
        listCategory: response.data.data.map((element) => {
          return { id: element.id, image: element.image, name: element.name };
        }),
      },
    };
    console.log(
      "category api , get list category - response, format response",
      response,
      format_response
    );
    return format_response;
  },
  postCategory: async (category) => {
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
    const url = "/category/create";
    console.log("cateogry api - postCategory - category payload - ", category);
    const { image, name } = category;
    const payload = { image, name };
    let response = await axiosClient.post(url, payload).then((res) => res);
    let format_response = {
      status: response.status,
      data: { id: response.data.data.id },
    };
    console.log(format_response);
    return format_response || {};
  },
  patchCategory: async (category) => {
    console.log("patch category - ", category);
    // let response = await fakeApi({
    //   // request: loginInfo,
    //   response: {
    //     status: 200,
    //     data: {},
    //   },
    //   timeOut: 1000,
    // });
    // return response;
    const { image, name, id } = category;
    const url = "/category/" + id;
    const payload = { image, name };
    let response = await axiosClient.patch(url, payload).then((res) => res);
    let format_response = {
      status: response.status,
      data: {},
    };
    console.log(format_response);
    return format_response || {};
  },
  deleteCategory: async (categoryId) => {
    console.log("delete category api - ", categoryId);
    // let response = await fakeApi({
    //   // request: loginInfo,
    //   response: {
    //     status: 200,
    //     data: {},
    //   },
    //   timeOut: 1000,
    // });
    // return response;
    const url = `/category/delete/${categoryId}`;
    let response = await axiosClient.delete(url).then((res) => res);
    return { status: response.status };
  },
};

export default categoryApi;
