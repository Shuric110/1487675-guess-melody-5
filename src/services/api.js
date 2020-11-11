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

    this._handleFailure = this._handleFailure.bind(this);
    this._handleSuccess = this._handleSuccess.bind(this);

    this._httpClient.interceptors.response.use(this._handleSuccess, this._handleFailure);

    this._onUnauthorized = null;
  }

  _handleSuccess(response) {
    return response;
  }

  _handleFailure(err) {
    const {response} = err;

    if (response.status === HttpCode.UNAUTHORIZED) {
      if (!err.response.config.__isCheckAuthorization && this._onUnauthorized) {
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

  checkAuthorization() {
    return this._httpClient.get(`/login`, {__isCheckAuthorization: true})
      .then(true)
      .catch((err) => {
        if (err.response.status !== HttpCode.UNAUTHORIZED) {
          throw err;
        }
        return false;
      });
  }

  login(email, password) {
    return this._httpClient.post(`/login`, {email, password});
  }
}
