import axios from "axios";
import { useEffect, useState } from "react";
import { RAPID_API_KEY } from "@env";

const api_key = RAPID_API_KEY;
const useFetch = (endPoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    params: { ...query },
    headers: {
      "X-RapidAPI-Key": api_key,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    url: `https://jsearch.p.rapidapi.com/${endPoint}`,
  };

  console.log(api_key);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);

      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert("Oops! Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading();
    fetchData();
  };
  return { data, isLoading, error, refetch };
};

export default useFetch;
