export interface Artwork {
  artist_display: string;
  artist_id: string;
  artist_titles: string[];
  artwork_type_title: string;
  color: {
    h: number;
    l: number;
    s: number;
    percentage: number;
    population: number;
  };
  copyright_notice: string;
  credit_line: string;
  date_display: string;
  date_start: number;
  date_end: number;
  date_qualifier_title: string;
  dimensions: string;
  id: number;
  image_id: string;
  medium_display: string;
  place_of_origin: string;
  main_reference_number: string;
  title: string;
  thumbnail: {
    lqip: string;
    width: number;
    height: number;
    alt_text: string;
  };
  timestamp: string;
}

export interface OriginalArtworksData {
  config: {
    iiif_url: string;
    website_url: string;
  };
  data: Artwork[];
  info: {
    license_links: string[];
    license_text: string;
    version: string;
  };
  pagination: {
    current_page: number;
    limit: number;
    offset: number;
    total: number;
    total_pages: number;
  };
  perference: unknown;
}
