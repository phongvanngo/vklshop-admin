import axios from "axios";
// import { get, save } from './localStorage';
import queryString from "query-string";
// import { get, save } from './localStorage';

const instance = axios.create({
  baseURL: "http://103.142.137.207:3000",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

// ADD Token into Headers
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("id_token");
    if (token) {
      // config.headers["Authorization"] = `${token}`;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => err
);

// const getNewTokenAndReattemptRequest = async (config, refToken) => {
//   try {
//     //
//     const getNewToken = await axios.post('127.0.0.1/users/token', {
//       refreshtoken: refToken,
//     });
//     //
//     const { token, refreshtoken } = getNewToken.data;
//     save('accessToken', token);
//     save('refreshToken', refreshtoken);
//     // config.headers["Authorization"] = `${token}`;
//     config.headers.Authorization = `${token}`;
//     return await axios(config);
//   } catch (err) {
//     window.location.reload();
//     return Promise.reject(err);
//   }
// };

instance.interceptors.response.use(
  (res) => res,
  (error) => {
    // const {
    //   config,
    //   config: { validateStatus },
    //   response: { status },
    // } = error;
    return error.response;
    //
    // if (validateStatus()) return error;
    // if (status === 401) {
    //   //
    //   // const refreshToken = get('refreshToken');
    //   // if (refreshToken)
    //   //   return getNewTokenAndReattemptRequest(config, refreshToken);
    //   // else {
    //   //   window.location.reload();
    //   //   return;
    //   // }
    //   //
    //   return 401;
    // }
    // if (status === 404) {
    //   return error;
    // }
    // return error;
  }
);
export default instance;
