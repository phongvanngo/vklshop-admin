import axiosClient from "./AxiosClient";
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
    console.log("post variant - variant: ", variant);
    const { name, stock, price, productId, costPrice } = variant;
    let payload = {
      name,
      stock,
      price,
      product_id: productId,
      cost_price: costPrice,
    };
    const url = `/product/${productId}/add-variant`;

    let response = await axiosClient.post(url, payload).then((res) => res);
    return { status: response?.status, data: { id: response?.data?.data?.id } };

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
  patchVariant: async (variant) => {
    console.log("patch variant - variant: ", variant);
    const { name, stock, price, productId, costPrice, id } = variant;
    let payload = {
      name,
      stock,
      price,
      product_id: productId,
      cost_price: costPrice,
    };
    const url = `/product/${productId}/edit-variant/${id}`;

    let response = await axiosClient
      .patch(url, payload)
      .then((res) => res)
      .catch((err) => {
        console.log(err);
        return null;
      });
    return { status: response?.status, data: { id: response?.data?.data?.id } };
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
  deleteVariant: async (variant) => {
    console.log("variant api - delete variant - variant : ", variant);
    const { id, productId } = variant;

    const url = `/product/${productId}/delete-variant?id=${id}`;

    let response = await axiosClient.delete(url).then((res) => res);

    return { status: response.status, data: { id } };

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
};

export default variantApi;
