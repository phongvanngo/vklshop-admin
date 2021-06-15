import axiosClient from "./AxiosClient";
import { fakeApi } from "./fakeApi";
import { allProducts } from "./fakeData";

const productApi = {
  getListProduct: async () => {
    // let response = await fakeApi({
    //   // request: loginInfo,
    //   response: {
    //     status: 200,
    //     data: {
    //       listProduct: allProducts,
    //     },
    //   },
    //   timeOut: 1000,
    // });
    // return response;
    const url = "/product";
    let response = await axiosClient.get(url).then((res) => res);
    return {
      status: response.status,
      data: {
        listProduct: (response.data?.data || []).map((element) => {
          const {
            id,
            name,
            description,
            content,
            category_id,
            unit,
            images,
            product_variants,
          } = element;

          return {
            id,
            name,
            description,
            content,
            categoryId: category_id,
            unit,
            image: (images || [])[0]?.name,
            images: images.map((e) => ({
              name: e.name,
            })),
            productVariants: product_variants,
          };
        }),
      },
    };
  },
  getProductById: async (productId) => {
    // let response = await fakeApi({
    //   // request: loginInfo,
    //   response: {
    //     status: 200,
    //     data: {
    //       productDetail: allProducts.find((product) => product.id == productId),
    //     },
    //   },
    //   timeOut: 1000,
    // });
    // return response;
    const url = `/product/${productId}`;
    let response = await axiosClient.get(url).then((res) => res);
    const {
      id,
      name,
      description,
      content,
      category_id,
      unit,
      images,
      product_variants,
    } = response?.data?.data || {};

    let productDetail = {
      id,
      name,
      description,
      content,
      categoryId: category_id,
      unit,
      image: (images || [])[0]?.name,
      images: images.map((e) => ({
        name: e.name,
      })),
      productVariants: product_variants,
    };
    return {
      status: response.status,
      data: { productDetail },
    };
  },
  getListProductByCategory: async ({ categoryId }) => {
    // let dt = {
    //   listProduct: allProducts.filter(
    //     (product) => product.categoryId == categoryId
    //   ),
    // };
    //
    //   "get list product by cateogry api - payload, all product, categoryId, data filter",
    //   allProducts,
    //   categoryId,
    //   dt
    // );
    // let response = await fakeApi({
    //   // request: loginInfo,
    //   response: {
    //     status: 200,
    //     data: {
    //       listProduct: allProducts.filter(
    //         (product) => product.categoryId == categoryId
    //       ),
    //     },
    //   },
    //   timeOut: 1000,
    // });

    // return response;
    const url = `/shop/category/${categoryId}/products`;
    let response = await axiosClient.get(url).then((res) => res);
    return {
      status: response.status,
      data: {
        listProduct: (response.data?.data || []).map((element) => {
          const {
            id,
            name,
            description,
            content,
            category_id,
            unit,
            images,
            product_variants,
          } = element;

          return {
            id,
            name,
            description,
            content,
            categoryId: category_id,
            unit,
            image: (images || [])[0]?.name,
            images,
            productVariants: product_variants,
          };
        }),
      },
    };
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

    let { name, unit, description, category, content, images } = product;
    // if (images) images = JSON.parse(images);
    let category_id = category;

    let payload = { name, unit, description, category_id, content, images };

    let url = "/product/create";
    let response = await axiosClient.post(url, payload).then((res) => res);

    return { status: response.status, data: { id: response.data.data.id } };
  },
  patchProduct: async (product) => {
    // let response = await fakeApi({
    //   // request: loginInfo,
    //   response: {
    //     status: 200,
    //     data: {},
    //   },
    //   timeOut: 1000,
    // });
    // return response;

    let { name, unit, description, category, content, images, id } = product;
    if (images) images = JSON.parse(images);
    let category_id = category;

    let payload = { name, unit, description, category_id, content, images };

    let url = "/product/" + id;
    let response = await axiosClient.patch(url, payload).then((res) => res);

    return { status: response.status, data: {} };
  },
  deleteProduct: async (productId) => {
    const url = "/product/delete/" + productId;
    let response = await axiosClient.delete(url).then((res) => res);
    return { status: response.status, data: {} };
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

export default productApi;
