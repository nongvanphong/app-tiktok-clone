import {api} from '../api/api';

const GetAll = async (idVideo: number) => {
  try {
    const response = await api.get('/comments/all', {params: {idVideo}});
    return response.data;
  } catch (error) {
    console.log('Error fetching users:', error);
    return error.response.data;
  }
};

const Create = async (id: number, messenger: string | '', videoid: number) => {
  try {
    const newData = {
      id,
      messenger,
      videoid,
    };
    const response = await api.post('/comments/create', newData);
    return response.data;
  } catch (error) {
    console.log('Error fetching users:', error);
    return error.response.data;
  }
};
const Delete = async (comment_id: number, id: number, videoid: number) => {
  try {
    const newData = {
      comment_id,
      id,
      videoid,
    };
    const response = await api.post('/comments/delete', newData);
    return response.data;
  } catch (error) {
    console.log('Error fetching users:', error);
    return error.response.data;
  }
};
export const FetchComment = {
  GetAll,
  Create,
  Delete,
};
