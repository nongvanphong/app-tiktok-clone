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

const Create = async (
  video: File,
  id: number,
  videoDescrible: string | '',
  videoTitle: string | '',
  videoTag: string | '',
) => {
  try {
    const formData = new FormData();
    formData.append('file', video);
    formData.append('id', id.toString());
    formData.append('videodescrible', videoDescrible);
    formData.append('videotitle', videoTitle);
    formData.append('videotag', videoTag);

    const response = await api.post('/videos/create', formData);
    return response.data;
  } catch (error) {
    console.log('Error fetching users:', error);
    return error.response.data;
  }
};
export const FetchVideo = {
  GetAll,
  Create,
};
