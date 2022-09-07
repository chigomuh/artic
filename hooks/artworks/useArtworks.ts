import fetcher from "hooks/common/fetcher";
import { Dispatch, SetStateAction, useState } from "react";
import useSWR from "swr";
import { OriginalArtworksData } from "types/artworks/types";

const BASE_URL = "https://api.artic.edu/api/v1/artworks";
const fields = [
  "id",
  "title",
  "artist_display", // artist discription
  "artist_titles", // artist name
  "artist_id",
  "dimensions", // artworks width, height, etc...
  "color",
  "artwork_type_title", // artworks type
  "medium_display", // artworks material
  "image_id",
  "date_display", // date discription
  "credit_line", // how the work came into the collection discription
  "place_of_origin", // The original location or place of the work
  "date_start", // the date of the creation of this work
  "date_end", // the date of the creation of this work
  "date_qualifier_title",
  "copyright_notice",
  "main_reference_number",
  "thumbnail",
  "timestamp",
];

interface ReturnData {
  artworksData: OriginalArtworksData;
  loading: boolean;
  error: unknown;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const useArtworks = (limit: number, searchQuery?: string): ReturnData => {
  const [currentPage, setCurrentPage] = useState(1);
  const query = "query[match][artwork_type_title]=painting";
  const URL_ARTWORKS = encodeURI(
    `${BASE_URL}/search?fields=${fields.join(
      ","
    )}&${query}&page=${currentPage}&limit=${limit}${
      searchQuery ? `&q=${searchQuery}` : ""
    }`
  );

  const { data, error } = useSWR(URL_ARTWORKS, fetcher);

  return {
    artworksData: data,
    loading: !error && !data,
    error,
    setCurrentPage,
  };
};

export default useArtworks;
