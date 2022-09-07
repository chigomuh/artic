import useArtworks from "hooks/artworks/useArtworks";
import useIntersectionObserver from "hooks/common/useIntersectionObserver";
import Image from "next/image";
import { useRef, useState } from "react";
import { Artwork } from "types/artworks/types";
import Masonry from "react-masonry-css";

const IMAGE_BASE_URL = "https://www.artic.edu/iiif/2";

const Artworks = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const totalPage = useRef(0);
  const { artworksData, error, setCurrentPage } = useArtworks(100);

  const intersectionHandler = () => {
    setCurrentPage((prev) => {
      if (prev < totalPage.current) {
        return prev + 1;
      }

      return prev;
    });

    if (artworksData) {
      totalPage.current = artworksData.pagination.total_pages;
      setArtworks((prev) => [...prev, ...artworksData.data]);
    }
  };

  const options = {
    threshold: 0.5,
  };

  const [target] = useIntersectionObserver(intersectionHandler, options);

  if (!artworksData && artworks.length === 0) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error... to try after a few minutes</div>;
  }

  const breakpointColsObj = {
    default: 8,
    1100: 5,
    700: 2,
    500: 1,
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div>this is artworks page</div>
        <div className="w-full h-full">
          <Masonry
            breakpointCols={breakpointColsObj}
            className="flex ml-[-30px] w-auto m-0"
            columnClassName="pl-[30px] bg-clip-padding"
          >
            {artworks.map(
              (artwork: Artwork) =>
                artwork.image_id && (
                  <div key={artwork.id} className="inline-block w-40">
                    <div className="ImageWrapper">
                      <Image
                        src={`${IMAGE_BASE_URL}/${artwork.image_id}/full/200,/0/default.jpg`}
                        alt="thumnail"
                        layout="fill"
                        objectFit="contain"
                        placeholder="blur"
                        blurDataURL={`${artwork.thumbnail.lqip}`}
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                )
            )}
          </Masonry>
        </div>
        <div ref={target} className="w-full h-10 black"></div>
        {/* <div onClick={intersectionHandler}>Click to more Artworks</div> */}
      </div>
    </>
  );
};

export default Artworks;
