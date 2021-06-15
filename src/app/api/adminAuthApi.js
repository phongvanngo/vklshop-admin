import axiosClient from "./AxiosClient";
import { fakeApi } from "./fakeApi";

const adminAuthApi = {
  sendLoginInfo: async (loginInfo) => {
    // let response = await fakeApi({
    //     request: loginInfo,
    //     response: {
    //         status: 200,
    //         data: {
    //             token: "my app token"
    //         }
    //     }
    //     , timeOut: 2000
    // }
    // )
    // return response;
    let url = "/user/login";

    const { name, password } = loginInfo;
    let payload = { email: name, password };

    let response = await axiosClient.post(url, payload).then((res) => {
      return res;
    });

    return response;
  },
};

export default adminAuthApi;
