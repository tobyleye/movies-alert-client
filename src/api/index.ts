import axios from "axios";

const baseURL = import.meta.env.DEV ? "http://localhost:5183/api" : "/api";

console.log({ baseURL });

export const client = axios.create({
  baseURL: baseURL,
});

export const subscribe = ({
  movieTitle,
  email,
}: {
  movieTitle: string;
  email: string;
}) => {
  return client.post("/subscribe", {
    movieTitle,
    email,
  });
};

export const getRecentMovies = (page: number = 1) => {
  return client
    .get("/recentMovies", {
      params: {
        page,
      },
    })
    .then(({ data }) => data);
};

export const generateDownloadLink = (url: string) => {
  return client
    .post("/generateDownloadLink", { url })
    .then((res) => res.data.data);
};
