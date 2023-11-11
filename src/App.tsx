// @ts-nocheck

import { Link, Route, Router, Switch, useLocation } from "wouter";
import GenerateDownloadLink from "./views/generate-dlinks";
import RecentMovies from "./views/recent-movies";
import Subscribe from "./views/subscribe";
import Home from "./views/home";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "./App.css";
import { ReactNode } from "react";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { BsArrowLeft } from "react-icons/bs";
import MovieDownloadLinks from "./views/movie-dlinks";

const PageContainer = ({ children }: { children: ReactNode }) => {
  const [location] = useLocation();

  const isHomeRoute = location === "/";

  return (
    <div className="page-container">
      <header className="page-header">
        {!isHomeRoute && (
          <Link href="/" className="back-btn">
            <BsArrowLeft />
            Back
          </Link>
        )}
        <div className="page-title">Tfpdl2x</div>
      </header>
      <div className="page-body">{children}</div>

      <style jsx>
        {`
          .page-body {
            max-width: 600px;
            margin: auto;
            padding: 1rem;
          }

          .page-header {
            margin-bottom: 20px;
            background: #202020;
            color: white;
            padding: 1.4rem 1rem;
            display: flex;
            justify-content: center;
            position: relative;
          }

          .page-header :global(.back-btn) {
            font-size: 20px;
            align-items: center;
            display: flex;
            gap: 10px;
            text-decoration: none;
            position: absolute;
            left: 1rem;
            top: 0;
            bottom: 0;
            color: white;
          }

          .page-title {
            font-size: 18px;
            font-weight: 600;
            text-transform: uppercase;
          }
        `}
      </style>
    </div>
  );
};

function App() {
  return (
    <>
      <MantineProvider>
        <Notifications />
        <Router>
          <PageContainer>
            <Switch>
              <Route path="/">
                <Home />
              </Route>
              <Route path="/subscribe">
                <Subscribe />
              </Route>
              <Route path="/recent-movies">
                <RecentMovies />
              </Route>
              <Route path="/generate-dlinks">
                <GenerateDownloadLink />
              </Route>
              <Route path="/dl/:movieSlug">
                <MovieDownloadLinks />
              </Route>
            </Switch>
          </PageContainer>
        </Router>
      </MantineProvider>
    </>
  );
}

export default App;
