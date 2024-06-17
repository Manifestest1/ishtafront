import axios from '../../utils/axios';

export const fasescapImageUpload = (data) => {
    return axios.post('/fasescape_image_upload', data);
  };