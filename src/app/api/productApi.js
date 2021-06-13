import axiosClient from "./AxiosClient";
import { fakeApi } from "./fakeApi";
import { allProducts } from "./fakeData";

const productApi = {
  getListProduct: async () => {
    let response = await fakeApi({
      // request: loginInfo,
      response: {
        status: 200,
        data: {
          listProduct: allProducts,
        },
      },
      timeOut: 1000,
    });
    return response;
  },
  getProductById: async (productId) => {
    let response = await fakeApi({
      // request: loginInfo,
      response: {
        status: 200,
        data: {
          productDetail: allProducts.find((product) => product.id == productId),
        },
      },
      timeOut: 1000,
    });
    return response;
  },
  getListProductByCategory: async ({ categoryId }) => {
    let dt = {
      listProduct: allProducts.filter(
        (product) => product.categoryId == categoryId
      ),
    };
    console.log(
      "get list product by cateogry api - payload, all product, categoryId, data filter",
      allProducts,
      categoryId,
      dt
    );
    let response = await fakeApi({
      // request: loginInfo,
      response: {
        status: 200,
        data: {
          listProduct: allProducts.filter(
            (product) => product.categoryId == categoryId
          ),
        },
      },
      timeOut: 1000,
    });

    return response;
  },
  postProduct: async (product) => {
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
    console.log("product api - post product - product payload - ", product);
    let { name, unit, description, category, content, images } = product;
    if (images) images = JSON.parse(images);
    let category_id = category;

    let payload = { name, unit, description, category_id, content, images };

    let url = "/product/create";
    let response = await axiosClient.post(url, payload).then((res) => res);
    console.log("product api - post product - response ", response);
    return { status: response.status, data: { id: response.data.data.id } };
  },
  patchProduct: async (product) => {
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
  deleteProduct: async (product) => {
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

export default productApi;
