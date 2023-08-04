//const hot = '172.16.24.245';
const hot = '192.168.10.21';
//const hot = '192.168.1.104';
const port = 1234;
export const http = 'http://' + hot + ':' + port;
import axios, {AxiosRequestConfig} from 'axios';

var headerConfig = {};
export const api = axios.create({
  baseURL: http,
});
//Thêm interceptor
api.interceptors.request.use(
  function (config) {
    const contentType = config.headers['Content-Type'];
    const isFormData = config.data instanceof FormData;

    if (isFormData) {
      console.log('=1');
      config.headers['Content-Type'] = 'multipart/form-data';
    } else if (!contentType || contentType.startsWith('application/json')) {
      console.log('=2');
      config.headers['Content-Type'] = 'application/json';
      config.data = JSON.stringify(config.data);
    }

    return config;
  },
  function (error) {
    // Xử lý lỗi trong quá trình gửi yêu cầu
    return Promise.reject(error);
  },
);
