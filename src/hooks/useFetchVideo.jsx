import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useFetchVideo(endpoint) {
  const [mediaList, setMediaList] = useState([]);

  const fetchVideo = useCallback(async (endpoint) => {
    try {
      console.log(endpoint);
      const response = await axios.get(endpoint);
      console.log(response);

      setMediaList(response.data);
    } catch (error) {
      throw (new Error("Failed to load video data."), error);
    }
  }, []);

  useEffect(() => {
    fetchVideo(endpoint);
  }, [fetchVideo, endpoint]);

  return mediaList;
}

export default useFetchVideo;
