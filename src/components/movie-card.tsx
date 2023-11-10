import { useState } from "react";
import { Card, Image, Text, Button } from "@mantine/core";
import * as $api from "@/api";

export const MovieCard = ({
  movie,
  setBlockPage,
}: {
  movie: Record<string, string>;
  setBlockPage: (value: boolean) => void;
}) => {
  const [downloadLinks, setDownloadLinks] = useState([]);
  const [generatingLink, setGeneratingLink] = useState(false);

  const generateDownloadLink = async () => {
    try {
      setGeneratingLink(true);
      setBlockPage(true);
      const data = await $api.generateDownloadLink(movie.link);
      const { downloadLinks } = data;
      setDownloadLinks(downloadLinks);
    } catch (err) {
      console.log("oops");
    } finally {
      setBlockPage(false);
      setGeneratingLink(false);
    }
  };

  const linksGenerated = generatingLink === false && downloadLinks.length > 0;

  return (
    <div key={movie.link}>
      <Card shadow="sm" padding="xl">
        <Card.Section>
          <Image
            src={movie.poster}
            height={160}
            alt="No way!"
            style={{ objectFit: "contain", objectPosition: "center" }}
            placeholder={"cannot load image"}
          />
        </Card.Section>

        <Text size="lg" mt="md">
          {movie.title}
        </Text>

        <Text mt="xs" color="dimmed" size="sm" style={{ marginBottom: 25 }}>
          {movie.synopsis}
        </Text>

        {linksGenerated ? (
          <ul>
            {downloadLinks.map((link, index) => (
              <li key={`download-link-${index}`}>
                <a href={link} target="_blank">
                  {link}
                </a>
              </li>
            ))}

            <style jsx>
              {`
                ul {
                  list-style: none;
                }
              `}
            </style>
          </ul>
        ) : (
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                loading={generatingLink === true}
                onClick={generateDownloadLink}
              >
                generate download link
              </Button>
            </div>
            {generatingLink === true && (
              <div
                style={{
                  marginTop: 8,
                  textAlign: "center",
                  fontSize: 14,
                  color: "gray",
                }}
              >
                Please exercise some patience, this would take a while
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};
