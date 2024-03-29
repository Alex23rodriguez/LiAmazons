import { Header } from "../components/Header";
import type { NextPage } from "next";
// import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import gif from "../assets/anim.gif";
import { Button, Stack, Typography } from "@mui/material";
// import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  // const hello = trpc.proxy.example.hello.useQuery({ text: "from tRPC" });

  return (
    // <main
    //   className="container flex flex-col items-center justify-around p-6 mx-auto text-center font-bold"
    //   style={{ minHeight: "clamp(550px, 90vh, 10000px)" }}
    // >
    <Stack alignItems="center" gap={5} sx={{ textAlign: "center" }} mt={4}>
      <Typography variant="h2" color="primary" component="h1">
        liamazons
      </Typography>
      {/* <span className="font-bold text-6xl text-center">/Typography></span> */}
      <Typography variant="h4" text-center component="h2">
        The best way to play Game of the Amazons
      </Typography>
      {/* <span className="font-bold text-4xl text-center"> */}
      {/* The best way to play Game of the Amazons */}
      {/* </span> */}
      <div
        style={{
          width: "clamp(300px, 80vw, 400px)",
        }}
      >
        <Image src={gif} alt="a gif showing gameplay of Game of the Amazons" />
      </div>
      <Link href="/amazons">
        <a aria-label="play locally">
          <Button variant="outlined" sx={{ width: "200px" }}>
            Play Locally
          </Button>
        </a>
      </Link>
      <Link href="/lobby">
        <a aria-label="play online">
          <Button variant="outlined" sx={{ width: "200px" }}>
            Play Online
          </Button>
        </a>
      </Link>
      <Link href="#">
        <a aria-label="tutorial">
          <Button variant="outlined" disabled sx={{ width: "200px" }}>
            Tutorial
          </Button>
        </a>
      </Link>
      <Link href="#">
        <a aria-label="play a friend">
          <Button variant="outlined" disabled sx={{ width: "200px" }}>
            Play a Friend
          </Button>
        </a>
      </Link>
      <Link href="#">
        <a aria-label="play the computer">
          <Button variant="outlined" disabled sx={{ width: "200px" }}>
            Play the computer
          </Button>
        </a>
      </Link>
    </Stack>
  );
};

export default Home;
