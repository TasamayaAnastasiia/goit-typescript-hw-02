import axios from "axios";
import { Image } from "./components/App/App.types";

type resultPromise = {
  total: number;
  total_pages: number;
  results: Image[];
}

export async function fetchImage(word: string, page: number): Promise<resultPromise> {
  const response = await axios.get(
    `https://api.unsplash.com/search/photos/?client_id=UTvAqhbPZRLYhf5RvRrY2WLJr4BhwsNNhe9G3hI9KlE&query=${word}&per_page=12&page=${page}`
  );
  return response.data;
}
