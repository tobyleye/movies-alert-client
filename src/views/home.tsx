// @ts-nocheck

import { ReactNode } from "react";
import { Link } from "wouter";
import { Title, Text } from "@mantine/core";
import cx from "clsx";

const HomeLink = ({
  href,
  disabled,
  children,
}: {
  href: string;
  children: ReactNode;
  disabled?: boolean;
}) => {
  return (
    <div className={cx("home-link", disabled && "disabled")}>
      {disabled ? (
        <div className="link disabled">
          {`>>`} {children}
        </div>
      ) : (
        <Link className="link" href={href} aria-disabled>
          {">>"} {children}
        </Link>
      )}

      <style jsx>{`
        .home-link {
          color: #222;
        }
        .home-link :global(.link) {
          font-size: 20px;
          text-decoration: underline;
          color: inherit;
        }
        .home-link.disabled {
          color: gray;
        }
      `}</style>
    </div>
  );
};
export default function Home() {
  return (
    <div>
      <div className="home-container">
        <div className="home-heading">
          <Title className="home-title">TFPDL who?</Title>
          <Text>Tfpdl, but with more features</Text>
        </div>
        <div className="flex items-center justify-center">
          <div className="home-links">
            <HomeLink href="/generate-dlinks">Generate download link</HomeLink>
            <HomeLink href="/recent-movies">Check recent movies</HomeLink>
            <HomeLink href="/subscribe" disabled>
              Subscribe to upcoming movies (coming soon)
            </HomeLink>
          </div>
        </div>
      </div>

      <style jsx>{`
        .home-container {
        }

        .home-heading {
          margin-bottom: 20px;
        }

        .home-heading p {
        }
        .home-links {
          display: grid;
          gap: 10px;
        }
      `}</style>
    </div>
  );
}
