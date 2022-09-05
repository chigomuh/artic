import useArtworks from "hooks/artworks/useArtworks";
import Image from "next/image";
import { Artworks } from "types/artworks/types";

const IMAGE_BASE_URL = "https://www.artic.edu/iiif/2";

const Artworks = () => {
  const { artworksData, error, setCurrentPage } = useArtworks(20);

  if (!artworksData) {
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
      {artworksData.data.map((artworks: Artworks) => (
        <div key={artworks.id}>
          <div>{artworks.title}</div>
          {artworks.image_id && (
            <div className="w-40 h-40">
              <Image
                src={`${IMAGE_BASE_URL}/${artworks.image_id}/full/843,/0/default.jpg`}
                alt="thumnail"
                width={300}
                height={300}
                placeholder="blur"
                blurDataURL={`${artworks.thumbnail.lqip}`}
              />
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default Artworks;
