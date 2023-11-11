"use client";
import { useState } from "react";
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
import useSWR from "swr";

export default function RecentMovies() {
  const [lastPage, setLastPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [blockPage, setBlockPage] = useState(false);

  const {
    data: { data: movies } = {},
    isLoading,
    error,
  } = useSWR(["movies", currentPage], () => $api.getRecentMovies(currentPage), {
    onSuccess(data) {
      if (data && !lastPage) {
        setLastPage(data.lastPage);
      }
    },
  });

  return (
    <Box pos="relative">
      <ScrollToTop key={currentPage} />
      <LoadingOverlay visible={isLoading || blockPage} zIndex={1000} />

      <Grid justify="center">
        <Grid.Col>
          <div>
            <h1 className="text-center mb-0">Recent movies</h1>
            <Text size="sm" className="mb-8">
              Source: tfpdl
            </Text>

            {isLoading ? (
              <div
                style={{
                  padding: "50px 0",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Loader />
              </div>
            ) : error ? (
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

        <Grid.Col>
          <MoviesPaginator
            lastPage={lastPage}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </Grid.Col>
      </Grid>
    </Box>
  );
}
