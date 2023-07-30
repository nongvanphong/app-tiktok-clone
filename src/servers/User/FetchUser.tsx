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
const UpdateUserName = async (id: number, user_name: string) => {
  try {
    const newData = {id, user_name};
    const response = await api.post('/auth/changeusername', newData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
const UpdatePassword = async (
  id: number,
  passwordOld: string,
  passwordNew: string,
) => {
  try {
    const newData = {id, passwordOld, passwordNew};
    const response = await api.post('/auth/changepassword', newData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
const UpdateAvatar = async (image: File, id: number) => {
  try {
    const formData = new FormData();
    formData.append('uploadImage', image);
    formData.append('id', id.toString());
    const response = await api.post('/auth/avatar', formData);
    return response.data;
  } catch (error) {
    console.log('Error fetching users:', error);
    return error.response.data;
  }
};
export const FetchUser = {
  checkEMail,
  Login,
  Register,
  UpdateUserName,
  UpdatePassword,
  UpdateAvatar,
};
