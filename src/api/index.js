// eslint-disable-next-line import/no-unresolved
import axios from 'axios';
// import Vue from 'vue';
import store from '@/store';

const baseURL = 'http://localhost:3000';

axios.interceptors.request.use(
  (config) => {
    const credConfig = config;
    credConfig.withCredentials = true;
    return credConfig;
  },
  (err) => Promise.reject(err),
);

// Define dummy user data for testing
const USERDATA = {
  val: 'Test_Val',
  user: {
    type: 'admin',
    test_user_val: 'hi',
  },
};
const _id = 0;
const courses = [
  {
    _id,
    difficulty: 'Advanced',
    name: 'test_course_1',
    instructor: {
      id: -1,
      firstName: 'first_name',
      lastName: 'last_name',
    },
    description: 'lorem ipsum',
    activities: [],
  },
];
// Add user data to local storage and store
localStorage.setItem('userData', JSON.stringify(USERDATA.user));
store.state.currentUser = USERDATA.user;

// Testing contents of store by logging to console
// console.log(`[api] localStorage.getItem('userData') :
// ${localStorage.getItem('userData')}`);
// console.log(`[api] Vue.store :
// ${Vue.store}`);
// console.log(`[api] store :
// ${JSON.stringify(store.state)}`);

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
    // return dummy course data
    return { data: courses };

    // @TODO original
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken'))}`,
    //   },
    // };
    // return axios
    //   .get(`${baseURL}/api/v1/courses`, config)
    //   .then((response) => response.data)
    //   .catch(() => false);
  },

  async fetchMyCourses() {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken'))}`,
      },
    };
    return axios
      .get(`${baseURL}/api/v1/courses/me`, config)
      .then((response) => response.data)
      .catch(() => false);
  },

  async createCourse(courseData) {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken'))}`,
      },
    };
    return axios
      .post(`${baseURL}/api/v1/courses`, courseData, config)
      .then((response) => response.data)
      .catch(() => false);
  },

  // ************************ User Profile ************************ //

  async fetchUserProfile() {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken'))}`,
      },
    };
    return axios
      .get(`${baseURL}/api/v1/users/me`, config)
      .then((response) => response.data)
      .catch(() => false);
  },

  async updateUserProfile(userData) {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken'))}`,
      },
    };
    return axios
      .patch(`${baseURL}/api/v1/users/me`, userData, config)
      .then((response) => response.data)
      .catch(() => false);
  },

  async fetchCurrentUserGrades() {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken'))}`,
      },
    };
    return axios
      .get(`${baseURL}/api/v1/users/me/grades`, config)
      .then((response) => response.data)
      .catch(() => false);
  },

  // ************************ Admin ************************ //

  async fetchAllUsers() {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken'))}`,
      },
    };
    return axios
      .get(`${baseURL}/api/v1/users`, config)
      .then((response) => response.data)
      .catch(() => false);
  },

  async updateUserRole(id) {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken'))}`,
      },
    };
    return axios
      .patch(`${baseURL}/api/v1/users/${id}`, '', config)
      .then((response) => response.data)
      .catch(() => false);
  },

  // ************************ Course Activities ************************ //

  async fetchSingleCourse(id) {
    // return a course from dummy courses list
    return courses[id];

    // @TODO original
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken'))}`,
    //   },
    // };
    // return axios
    //   .get(`${baseURL}/api/v1/courses/${id}`, config)
    //   .then((response) => response.data.data)
    //   .catch(() => false);
  },

  async downloadPDF(name) {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken'))}`,
      },
      responseType: 'blob',
    };
    await axios
      .get(`${baseURL}/api/v1/courses/pdf/${name}`, config)
      .then((res) => {
        // set the blog type to final pdf
        const file = new Blob([res.data], { type: 'application/pdf' });

        // process to auto download it
        const fileURL = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = fileURL;
        link.download = name;
        link.click();
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
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken'))}`,
      },
    };
    return axios
      .post(`${baseURL}/api/v1/courses/${id}/video`, videoData, config)
      .then((response) => response.data)
      .catch(() => false);
  },

  async addQuiztoCourse(id, quiz) {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken'))}`,
      },
    };
    return axios
      .post(`${baseURL}/api/v1/courses/${id}/quiz`, quiz, config)
      .then((response) => response.data)
      .catch(() => false);
  },

  async submitQuiz(id, answers) {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken'))}`,
      },
    };
    return axios
      .post(`${baseURL}/api/v1/courses/submit-quiz-answers/${id}`, answers, config)
      .then((response) => response.data)
      .catch(() => false);
  },

  // ************************ Course Threads ************************ //

  async fetchCourseThreads(id) {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken'))}`,
      },
    };
    return axios
      .get(`${baseURL}/api/v1/courses/${id}/thread`, config)
      .then((response) => response.data)
      .catch(() => false);
  },

  async createThread(id, thread) {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken'))}`,
      },
    };
    return axios
      .post(`${baseURL}/api/v1/courses/${id}/thread`, thread, config)
      .then((response) => response.data)
      .catch(() => false);
  },

  async addThreadAnswer(id, answer) {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken'))}`,
      },
    };
    return axios
      .patch(`${baseURL}/api/v1/courses/thread/${id}`, answer, config)
      .then((response) => response.data)
      .catch(() => false);
  },
};
