import {api} from '../api/api';

const checkEMail = async (email: string) => {
  try {
    const response = await api.post('/auth/checkemail', {email});
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
const Login = async (data: object) => {
  try {
    const response = await api.post('/auth/login', data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
const Register = async (data: object) => {
  try {
    const response = await api.post('/auth/register', data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const FetchUser = {
  checkEMail,
  Login,
  Register,
};
