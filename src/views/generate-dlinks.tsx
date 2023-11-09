import { Button, Text, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { generateDownloadLink } from "@/api";

const copyToClipboard = (text: string) => {
  const input = document.createElement("input");
  // Avoid scrolling to bottom
  input.style.top = "0";
  input.style.left = "0";
  input.style.position = "fixed";
  input.value = text;
  document.body.appendChild(input);
  // Select the input field
  input.select();
  input.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(input.value);
  input.remove();
};

export default function GenerateDownloadLink() {
  const [movieLink, setMovieLink] = useState("");
  const [downloadLinks, setDownloadLinks] = useState<string[]>([]);
  const [movieDetails, setMovieDetails] = useState<null | Record<
    string,
    string
  >>(null);

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
      const data: {
        movieDetails: Record<string, string>;
        downloadLinks: string[];
      } = await generateDownloadLink(movieLink);
      console.log("data --", data);
      const { downloadLinks, movieDetails } = data;
      setDownloadLinks(downloadLinks);
      setMovieDetails(movieDetails);
    } catch (err) {
      console.log(`we can't donwload link`);
    }
  };

  const shareLinks = () => {
    const data = {
      url: window.location.host + `/dl/${movieDetails!.movieSlug}`,
      title: `Download ${movieDetails!.movieTitle} now`,
    };
    if ("share" in window.navigator) {
      window.navigator.share(data);
    } else {
      copyToClipboard(data.url);
      notifications.show({
        color: "blue",
        title: "Page url copied",
        message: "Share url with friends to enjoy movie",
      });
    }
  };

  const clearLinks = () => {
    setMovieLink("");
    setDownloadLinks([]);
  };

  return (
    <div>
      <Title mb={20} size="h2">
        Movie Link Generator
      </Title>

      {downloadLinks && downloadLinks.length > 0 ? (
        <div>
          {movieDetails && (
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
          )}
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
            <Button onClick={clearLinks} color="red" variant="outline">
              clear
            </Button>
          </div>
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
              <Button type="submit" size="lg">
                Generate
              </Button>
            </div>
          </form>
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
