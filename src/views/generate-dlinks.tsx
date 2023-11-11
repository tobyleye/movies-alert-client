// @ts-nocheck
import { Button, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { generateDownloadLink } from "@/api";
import { MovieDownloadLinksCard } from "@/components/movie-download-links-card";
// import useSWR from "swr";

export default function GenerateDownloadLink() {
  const [movieLink, setMovieLink] = useState("");
  const [downloadLinks, setDownloadLinks] = useState<string[]>([]);
  const [movieDetails, setMovieDetails] = useState<null | Record<
    string,
    string
  >>(null);

  const [generatingDownloadLink, setGeneratingDownloadLink] = useState(false);

  const validateLink = () => {
    const validLinkRegex = /^(https?:\/\/)?tfpdl.se\/.*$/;
    if (movieLink && validLinkRegex.test(movieLink)) {
      return true;
    }
    return false;
  };

  const generateLink = async () => {
    if (!validateLink()) {
      notifications.show({
        color: "red",
        title: "Invalid Link",
        message: "The link you entered is not a valid link",
      });
      return;
    }
    try {
      setGeneratingDownloadLink(true);
      const data: {
        movieDetails: Record<string, string>;
        downloadLinks: string[];
      } = await generateDownloadLink(movieLink);
      const { downloadLinks, movieDetails } = data;
      setDownloadLinks(downloadLinks);
      setMovieDetails(movieDetails);
    } catch (err) {
      console.error(`we can't download link`);
    } finally {
      setGeneratingDownloadLink(false);
    }
  };

  const clearLinks = () => {
    setMovieLink("");
    setDownloadLinks([]);
  };

  return (
    <div>
      {/* <LoadingOverlay visible={generatingDownloadLink} zIndex={1000} /> */}
      <Title mb={20} size="h2">
        Movie Link Generator
      </Title>

      {downloadLinks && downloadLinks.length > 0 ? (
        <div>
          <MovieDownloadLinksCard
            downloadLinks={downloadLinks}
            movieDetails={movieDetails}
            onClear={clearLinks}
          />
        </div>
      ) : (
        <div>
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              generateLink();
            }}
          >
            <TextInput
              classNames={{
                input: "link-input",
              }}
              label="Tfpdl movie link"
              value={movieLink}
              placeholder="https://tfpdl.se/oppenheimer-2023-720p-bluray-x264-tfpdl/"
              onChange={(e) => setMovieLink(e.target.value)}
              required
            />
            <div className="submit-btn">
              <Button loading={generatingDownloadLink} type="submit" size="lg">
                Generate
              </Button>
            </div>
          </form>

          {/* <RecentlyGeneratedMovies /> */}
        </div>
      )}

      <style jsx>
        {`
          .form :global(.link-input) {
            height: 50px;
            font-size: 20px;
          }

          .submit-btn {
            margin-top: 12px;
          }

          .generated-links {
            margin: 0;
            padding: 0;
            list-style: none;
            display: grid;
            gap: 5px;
            margin-bottom: 40px;
          }

          .generated-links-btns {
            display: flex;
            gap: 20px;
          }

          .movie-poster {
            max-width: 400px;
          }
        `}
      </style>
    </div>
  );
}

/*

function RecentlyGeneratedMovies() {
  const { data, isLoading } = useSWR("recentlyGeneratedMovies", () =>
    fetchRecentlyGeneratedMovies()
  );
  console.log("data --", data);
  console.log("is loading --", isLoading);

  return (
    <div>
      <h3>Recent movies</h3>
      {data ? (
        <div>
          {data.map((each, index) => {
            return <div key={`rgm-${index}`}>{JSON.stringify(each)}</div>;
          })}
        </div>
      ) : null}
    </div>
  );
}
*/
