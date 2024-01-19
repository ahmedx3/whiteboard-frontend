// eslint-disable-next-line import/no-unresolved
import axios from 'axios';
// import Vue from 'vue';
import store from '@/store';

const baseURL = process.env.NODE_ENV === 'production' ? 'http://18.216.26.20:3000' : 'http://localhost:3000';

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

  // ************************ Courses ************************ //

  /**
   * Queries the backend for a single course of a given
   * id and returns it if found.
   * @param {number} id an integer for the course id
   * @returns an object with a single 'data' property
   *    containing an array of courses
   */
  async fetchSingleCourse(id) {
    // convert the id to an int
    // sometimes it's string parsed from the url params
    const idNum = parseInt(id, 10);
    // console.log(`id is ${idNum} and of type ${typeof idNum}`);

    // reuse the fetch all courses method then filter for
    // the course id specified
    // @TODO replace with a call to a dedicated single course endpoint
    return this.fetchAllCourses()
      .then((courses) => {
        // console.log(`[api] fetchSingleCourse [courses]: ${courses}`);

        const requestedCourse = courses.data.filter((course) => course._id === idNum)[0];
        // console.log(`[api] fetchSingleCourse [matches]: ${matches}`);

        return requestedCourse;
      })
      .catch(() => false);

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

  async fetchAllCourses() {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken'))}`,
      },
    };
    return axios
      .get(`${baseURL}/api/v1/courses`, config)
      .then((response) => response.data)
      .catch(() => false);
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

  // ************************ Assignments       ************************ //

  async fetchAllAssignments() {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken'))}`,
      },
    };
    return axios
      .get(`${baseURL}/api/v1/assignments`, config)
      .then((response) => response.data)
      .catch(() => false);
  },

  async fetchSingleAssignment(id) {
    // convert the id to an int
    // sometimes it's a string parsed from the url params
    const idNum = parseInt(id, 10);
    // console.log(`id is ${idNum} and of type ${typeof idNum}`);

    // reuse the fetch all assignments method then filter for
    // the assignment id specified
    return this.fetchAllAssignments()
      .then((assignments) => {
        // console.log(`[api] fetchSingleAssignment [assignments]: ${JSON.stringify(assignments)}`);

        const requestedAssignment = assignments.data
          .filter((assignment) => assignment.id === idNum)[0];
        // console.log(`[api] fetchSingleAssignment [matches]: ${requestedAssignment}`);

        return requestedAssignment;
      })
      .catch(() => false);

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

  async createAssignment(newAssignment) {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken'))}`,
      },
    };

    // placeholder functionality
    // return new Promise((resolve) => {
    //   if (courseData && config) {
    //     resolve(true);
    //   } else {
    //     resolve(false);
    //   }
    // });

    return axios
      .post(`${baseURL}/api/v1/assignments`, newAssignment, config)
      .then((response) => response.data)
      .catch(() => false);
  },

  // ************************ Course Activities ************************ //

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
