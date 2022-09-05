import type { NextPage } from "next";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <div>Index page</div>
      <div onClick={() => router.push(`/artworks`)}>
        Click and move ArtWorks Page!
      </div>
    </>
  );
};

export default Home;
