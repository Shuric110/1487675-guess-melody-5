import axios from "axios";

const BACKEND_URL = `https://5.react.pages.academy/guess-melody`;
const REQUEST_TIMEOUT = 5000;

const HttpCode = {
  UNAUTHORIZED: 401
};

export default class Api {
  constructor() {
    this._httpClient = axios.create({
      baseURL: BACKEND_URL,
      timeout: REQUEST_TIMEOUT,
      withCredentials: true,
    });

    this._httpClient.interceptors.response.use(this._handleSuccess, this._handleFailure);

    this._onUnauthorized = null;
  }

  _handleSuccess(response) {
    return response;
  }

  _handleFailure(err) {
    const {response} = err;

    if (response.status === HttpCode.UNAUTHORIZED) {
      if (this._onUnauthorized) {
        this._onUnauthorized();
      }

      throw err;
    }

    throw err;
  }

  setOnUnauthorized(onUnauthorized) {
    this._onUnauthorized = onUnauthorized;
  }

  getQuestions() {
    return this._httpClient.get(`/questions`);
  }

  getCheckAuthorization() {
    return this._httpClient.get(`/login`);
  }

  login(email, password) {
    return this._httpClient.post(`/login`, {email, password});
  }
}
