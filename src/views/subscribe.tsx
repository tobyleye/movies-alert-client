import { Button, TextInput, Container } from "@mantine/core";
import { useState } from "react";
// import { subscribe as $subscribe } from "@/src/api";

export default function Subscribe() {
  const [movieTitle, setMovieTitle] = useState("");
  const [email, setEmail] = useState("");

  //   const clearForm = () => {
  //     setMovieTitle("");
  //     setEmail("");
  //   };

  const handleSubscribe = async () => {
    window.alert("Sorry feature is not yet available. come back :)");
    // console.log("form submitted!!");
    // try {
    //   await $subscribe({ movieTitle, email });
    //   clearForm();
    // } catch  {}
  };

  return (
    <Container>
      <div className="max-w-2xl mx-auto">
        <h3 className="text-2xl mb-4 font-semibold">Subscription form</h3>
        <p>
          {`Enter the title of the movie you'd like to watch and we will handle
          the rest`}
        </p>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubscribe();
            }}
          >
            <div className="mb-4 grid gap-2">
              <TextInput
                withAsterisk
                required
                value={movieTitle}
                onChange={(e) => setMovieTitle(e.target.value)}
                label="Movie title"
              />
              <TextInput
                required
                withAsterisk
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                placeholder="email you will like to receive alert"
              />
            </div>
            <Button
              type="submit"
              onClick={() => {
                alert("Sorry, this is still a wip");
              }}
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </Container>
  );
}
