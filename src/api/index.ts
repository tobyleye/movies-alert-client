import axios from "axios";
const apiBaseURL = import.meta.env.VITE_API_BASE_URL;

export const client = axios.create({
  baseURL: apiBaseURL,
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

export const fetchRecentlyGeneratedMovies = () => {
  return client.get("/recentlyGeneratedMovies").then((res) => res.data.data);
};

export const getMovieDownloadLinks = (movieSlug: string) => {
  return client.get(`/dl/${movieSlug}`).then((res) => res.data.data);
};
