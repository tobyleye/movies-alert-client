// @ts-nocheck

import { getMovieDownloadLinks } from "@/api";
import { MovieDownloadLinksCard } from "@/components/movie-download-links-card";
import { Button, LoadingOverlay } from "@mantine/core";
import useSWR from "swr";
import { Link, useParams } from "wouter";
import { VscError as ErrorIcon } from "react-icons/vsc";

export default function MovieDownloadLinks() {
  const { movieSlug } = useParams();
  const { data, isLoading } = useSWR(["movieDownloadLinks", movieSlug], () => {
    return getMovieDownloadLinks(movieSlug!);
  });

  return (
    <div id="movie-download-links">
      {!isLoading ? (
        <div>
          {data ? (
            <MovieDownloadLinksCard
              movieDetails={data.movieDetails}
              downloadLinks={data.downloadLinks.download_links}
            />
          ) : (
            <div className="error-message">
              <ErrorIcon />
              <h3>Oops</h3>
              <div>We couldn't find the movie you were looking for</div>
            </div>
          )}
          <div className="generate-button">
            <Link href="/generate-dlinks">
              <Button fullWidth color="gray" variant="outline">
                Generate your own
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <LoadingOverlay />
      )}

      <style jsx>{`
        .error-message {
          text-align: center;
          padding: 3rem 0;
        }

        .error-message :global(svg) {
          font-size: 50px;
          color: red;
        }

        .error-message h3 {
          font-size: 28px;
          margin-top: 0;
          margin-bottom: 5px;
        }

        .generate-button {
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}
