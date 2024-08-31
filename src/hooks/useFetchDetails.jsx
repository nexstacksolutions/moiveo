import axios from "axios";

async function useFetchDetails({ params }) {
  try {
    const { explore, id } = params;

    const [
      detailsResponse,
      castResponse,
      similarResponse,
      recommendationsResponse,
    ] = await Promise.all([
      axios.get(`/${explore}/${id}`),
      axios.get(`/${explore}/${id}/credits`),
      axios.get(`/${explore}/${id}/similar`),
      axios.get(`/${explore}/${id}/recommendations`),
    ]);

    const data = {
      details: detailsResponse.data,
      cast: castResponse.data,
      similar: similarResponse.data.results,
      recommendations: recommendationsResponse.data.results,
    };

    return data;
  } catch (error) {
    throw (new Error("Failed to load data."), error);
  }
}

export default useFetchDetails;
