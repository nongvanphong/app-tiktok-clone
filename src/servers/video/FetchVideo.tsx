import {types} from '@babel/core';
import {api} from '../api/api';

const GetAll = async (page: number, myid?: number) => {
  try {
    const response = await api.get('/videos/all', {params: {page, myid}});
    return response.data;
  } catch (error) {
    console.log('Error fetching users:', error);
    return error.response.data;
  }
};
const GetAllUser = async (page: number, myid?: number) => {
  try {
    const response = await api.get('/videos/alluser', {params: {page, myid}});
    return response.data;
  } catch (error) {
    console.log('Error fetching users:', error);
    return error.response.data;
  }
};
const Create = async (
  video: File,
  id: number,
  videoDescrible: string | '',
  videoTitle: string | '',
  videoTag: string | '',
  onProgress: (progress: number) => void,
) => {
  try {
    const formData = new FormData();
    formData.append('file', video);
    formData.append('id', id.toString());
    formData.append('videodescrible', videoDescrible);
    formData.append('videotitle', videoTitle);
    formData.append('videotag', videoTag);

    const config = {
      onUploadProgress: (progressEvent: any) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        onProgress(percentCompleted); // Gọi hàm callback để cập nhật tiến trình
      },
    };

    const response = await api.post('/videos/create', formData, config);
    return response.data;
  } catch (error) {
    console.log('Error fetching users:', error);
    return error.response.data;
  }
};
const Update = async (
  id: number,
  videoid: number,
  videodescrible: string | '',
  videotitle: string | '',
  videotag: string | '',
) => {
  try {
    const newData = {videodescrible, videotitle, videotag, id, videoid};

    const response = await api.post('/videos/update', newData);
    return response.data;
  } catch (error) {
    console.log('Error fetching video :', error);
    return error.response.data;
  }
};
const Delete = async (id: number, video_id: number) => {
  try {
    const newData = {id, video_id};

    const response = await api.post('/videos/delete', newData);
    return response.data;
  } catch (error) {
    console.log('Error fetching video :', error);
    return error.response.data;
  }
};
export const FetchVideo = {
  GetAll,
  Create,
  GetAllUser,
  Update,
  Delete,
};
