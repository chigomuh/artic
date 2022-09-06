import useArtworks from "hooks/artworks/useArtworks";
import useIntersectionObserver from "hooks/common/useIntersectionObserver";
import Image from "next/image";
import { useState } from "react";
import { Artwork } from "types/artworks/types";

const IMAGE_BASE_URL = "https://www.artic.edu/iiif/2";

const Artworks = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const { artworksData, error, setCurrentPage } = useArtworks(20);

  const intersectionHandler = () => {
    setCurrentPage((prev) => prev + 1);
    if (artworksData) {
      setArtworks((prev) => [...prev, ...artworksData.data]);
    }
  };

  const options = {
    threshold: 0.5,
  };

  const [target] = useIntersectionObserver(intersectionHandler, options);
  console.log(artworks);

  if (!artworksData && artworks.length === 0) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error... to try after a few minutes</div>;
  }

  return (
    <>
      <div> this is artworks page</div>
      <div onClick={() => setCurrentPage((prev) => prev + 1)}>
        Click to next page
      </div>
      {artworks.map((artwork: Artwork) => (
        <div key={artwork.id}>
          <div>{artwork.title}</div>
          {artwork.image_id && (
            <div className="w-40 h-40">
              <Image
                src={`${IMAGE_BASE_URL}/${artwork.image_id}/full/843,/0/default.jpg`}
                alt="thumnail"
                width={300}
                height={300}
                placeholder="blur"
                blurDataURL={`${artwork.thumbnail.lqip}`}
              />
            </div>
          )}
        </div>
      ))}
      <div ref={target}></div>
    </>
  );
};

export default Artworks;
