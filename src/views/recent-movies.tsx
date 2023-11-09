"use client";
import { useEffect, useState } from "react";
import {
  Alert,
  Text,
  Grid,
  SimpleGrid,
  Loader,
  Box,
  LoadingOverlay,
} from "@mantine/core";
import * as $api from "@/api";
import { ScrollToTop } from "@/components/scroll-to-top";
import { MovieCard } from "@/components/movie-card";
import { MoviesPaginator } from "@/components/movie-paginator";

export default function RecentMovies() {
  const [movies, setMovies] = useState([]);
  const [errorLoadingMovies, setErrorLoadingMovies] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastPage, setLastPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [blockPage, setBlockPage] = useState(false);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        let response = await $api.getRecentMovies();
        let { data, lastPage } = response;
        setMovies(data);
        setLastPage(lastPage);
      } catch (err) {
        setErrorLoadingMovies(true);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  const handlePageChange = async (page: number) => {
    try {
      setLoadingMore(true);
      let { data } = await $api.getRecentMovies(page);
      setMovies(data);
      setCurrentPage(page);
    } catch (err) {
      console.log("error");
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <Box pos="relative">
      <ScrollToTop key={currentPage} />
      <LoadingOverlay visible={loadingMore || blockPage} zIndex={1000} />

      <Grid justify="center">
        <Grid.Col sm={6}>
          <div>
            <h1 className="text-center mb-0">Recent movies</h1>
            <Text align="center" size="sm" className="mb-8">
              Source: tfpdl
            </Text>

            {loading ? (
              <div
                style={{
                  padding: "50px 0",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Loader />
              </div>
            ) : errorLoadingMovies ? (
              <Alert style={{ textAlign: "center" }}>
                Ahh sorry, ann error occured loading movies
              </Alert>
            ) : (
              <SimpleGrid spacing="xl">
                {movies && movies.length > 0
                  ? movies.map((movie: any) => {
                      return (
                        <MovieCard
                          key={movie.link}
                          movie={movie}
                          setBlockPage={setBlockPage}
                        />
                      );
                    })
                  : null}
              </SimpleGrid>
            )}
          </div>
        </Grid.Col>

        <Grid.Col sm={12}>
          <MoviesPaginator
            lastPage={lastPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </Grid.Col>
      </Grid>
    </Box>
  );
}
