import axios from "axios";
import { PATH } from "../PATH";

const services = {
  getFiles: async (page: string, headers: any) => {
    const tempHeader = {
      headers: {
        Authorization: "Basic " + headers,
      },
    };
    return axios
      .get(`${PATH.base}/all-files/${page ? `?page=${page}` : ""}`, tempHeader)
      .then((data: any) => {
        return data;
      })
      .catch((err: any) => console.log(err));
  },
  deleteFile: async (file: string) => {
    const header = {
      headers: {
        Authorization: "Basic " + sessionStorage.getItem("credentials"),
      },
    };
    return axios
      .get(`${PATH.base}/delete-files/?file=${file}`, header)
      .then((data: any) => {
        return data;
      })
      .catch((err: any) => console.log(err));
  },
  downloadFiles: async (file: string) => {
    const header = {
      headers: {
        Authorization: "Basic " + sessionStorage.getItem("credentials"),
      },
    };
    return axios
      .get(
        `${PATH.base}/download-files/?directory=templates&file=${file}`,
        header
      )
      .then((data: any) => {
        return data;
      })
      .catch((err: any) => console.log(err));
  },
  doPost: async (body: FormData) => {
    const header = {
      headers: {
        Authorization: "Basic " + sessionStorage.getItem("credentials"),
      },
    };
    return axios
      .post(PATH.base + "/do-post/", body, header)
      .then((response: any) => {
        return response;
      })
      .catch((err: any) => console.log(err));
  },
  getMe: async (body: { username: string; password: string }) => {
    const headers = {
      headers: {
        Authorization: "Basic " + btoa(`${body.username}:${body.password}`),
      },
    };
    return axios
      .get(PATH.base + "/all-files/", headers)
      .then((data: any) => {
        if (body.username && body.password) {
          sessionStorage.setItem("username", body.username);
          sessionStorage.setItem("password", body.password);
          sessionStorage.setItem(
            "credentials",
            btoa(`${body.username}:${body.password}`)
          );
        }
        return data;
      })
      .catch((err: any) => console.log(err));
  },
  getAllPosts: async (page: string, auth: boolean) => {
    const header = {
      headers: {
        Authorization: "Basic " + sessionStorage.getItem("credentials"),
      },
    };
    return axios
      .get(
        `${PATH.base}/all-posts/${page ? `?page=${page}` : ""}`,
        auth ? header : undefined
      )
      .then((data: any) => {
        return data;
      })
      .catch((err: any) => console.log(err));
  },
  getPublic: async (body: any, page?: string) => {
    const queryString = [
      body.date.from && `start_date=${body.date.from}`,
      body.date.to && `end_date=${body.date.to}`,
      body.post_type &&
        Array.isArray(body.post_type) &&
        body.post_type.length > 0 &&
        body.post_type.map((type: string) => `post_type=${type}`),
      body.post_code &&
        body.post_code.length > 0 &&
        `post_code=${body.post_code}`,
      body.words &&
        Array.isArray(body.words) &&
        body.words.length > 0 &&
        body.words.map((word: string) => `words=${word}`),
      body.exact_words === true && `exact_words=${body.exact_words}`,
      body.words_contain === true && `words_contain=${body.words_contain}`,
      page && `page=${page}`,
    ]
      .filter(Boolean)
      .flat()
      .join("&");
    const url = `${PATH.base}/search-files/${
      queryString.length > 0 ? "?" + queryString : ""
    }`;
    return axios
      .get(url)
      .then((data: any) => {
        return data;
      })
      .catch((err: any) => {
          console.log(err);
      });
  },
  resetPassword: async (body: any) => {
    return axios
      .post(`${PATH.base}/password-reset/`, body)
      .then((data: any) => {
        return data;
      })
      .catch((err: any) => console.log(err));
  },
};

export default services;
