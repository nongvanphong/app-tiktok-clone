import {api} from '../api/api';

const Favourite = async (id: number, videoid: number) => {
  try {
    const newData = {
      id,
      video_id: videoid,
    };

    const response = await api.post('videos/favourite', newData);
    return response.data;
  } catch (error) {
    console.log('Error fetching users:', error);
    return error.response.data;
  }
};

export const FetchFavourite = {
  Favourite,
};
