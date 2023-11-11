// @ts-nocheck

import { Button, Text, Title } from "@mantine/core";
import { copyToClipboard } from "@/utils";
import { notifications } from "@mantine/notifications";

export function MovieDownloadLinksCard({
  downloadLinks,
  movieDetails,
  onClear,
}: {
  downloadLinks: string[];
  movieDetails: any;
  onClear?: () => void;
}) {
  const shareLinks = () => {
    const data = {
      url: `/dl/${movieDetails!.movieSlug}`,
      title: `Download ${movieDetails!.movieTitle} now`,
    };
    if ("share" in window.navigator) {
      window.navigator.share(data);
    } else {
      const url = window.location.origin + data.url;
      copyToClipboard(url);
      notifications.show({
        color: "blue",
        title: "Page url copied",
        message: "Share url with friends to enjoy movie",
      });
    }
  };

  return (
    <div>
      <div className="movie-info">
        <Title mb={4} size="h3">
          {movieDetails.movieTitle}
        </Title>
        <Text mb={10} className="movie-description">
          {movieDetails.movieDescription}
        </Text>
        <div>
          <img className="movie-poster" src={movieDetails.moviePoster} />
        </div>
      </div>

      <div>
        <Title size="h4">Download links</Title>
        <ul className="generated-links">
          {downloadLinks.map((link) => (
            <li key={link}>
              <a href={link} target="_blank">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="generated-links-btns">
        <Button onClick={shareLinks}>Share</Button>
        {onClear && (
          <Button onClick={onClear} color="red" variant="outline">
            clear
          </Button>
        )}
      </div>

      <style jsx>{`
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

        .generated-links-btns :global(button) {
          flex: 1;
          flex-shrink: 1;
        }

        .movie-poster {
          max-width: 400px;
        }
      `}</style>
    </div>
  );
}
