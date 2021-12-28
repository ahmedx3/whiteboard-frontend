// eslint-disable-next-line import/no-unresolved
import axios from 'axios';

const baseURL = 'http://localhost:3000';

axios.interceptors.request.use(
  (config) => {
    const credConfig = config;
    credConfig.withCredentials = true;
    return credConfig;
  },
  (err) => Promise.reject(err),
);

const config = {
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken'))}`,
  },
};

export default {
  // ************************ Authentication ************************ //
  async loginUser(user) {
    const request = {
      method: 'POST',
      url: `${baseURL}/api/v1/auth/login`,
      data: user,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios(request)
      .then((res) => res)
      .catch((err) => err.response);

    return response;
  },
  async registerUser(userData) {
    const request = {
      method: 'POST',
      url: `${baseURL}/api/v1/auth/signup`,
      data: userData,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios(request)
      .then((res) => res)
      .catch((err) => err.response);

    return response;
  },

  // ************************ Feed ************************ //

  async fetchAllCourses() {
    return axios
      .get(`${baseURL}/api/v1/courses`, config)
      .then((response) => response.data)
      .catch(() => false);
  },

  async createCourse(courseData) {
    return axios
      .post(`${baseURL}/api/v1/courses`, courseData, config)
      .then((response) => response.data)
      .catch(() => false);
  },

  // ************************ Course Page ************************ //

  async fetchSingleCourse(id) {
    return axios
      .get(`${baseURL}/api/v1/courses/${id}`, config)
      .then((response) => response.data.data)
      .catch(() => false);
  },

  async downloadPDF(name) {
    return axios
      .get(`${baseURL}/api/v1/courses/pdf/${name}`, config)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'test.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(() => false);
  },

  async addPDFtoCourse(id, pdfData) {
    const bodyFormData = new FormData();
    bodyFormData.append('pdf', pdfData.pdf);
    bodyFormData.append('title', pdfData.title);

    return axios
      .post(`${baseURL}/api/v1/courses/${id}/pdf`, bodyFormData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken'))}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response.data)
      .catch(() => false);
  },

  async addVideotoCourse(id, videoData) {
    return axios
      .post(`${baseURL}/api/v1/courses/${id}/video`, videoData, config)
      .then((response) => response.data)
      .catch(() => false);
  },
};
