import { useEffect, useState } from "react";

export type FetchImage = {
  albumId: string;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

type ApiError =
  | {
      message: string;
      statusCode: number;
    }
  | undefined;

type UseFetchImages = (url: string) => [FetchImage[], boolean, ApiError];

export const useFetchImages: UseFetchImages = (url: string) => {
  const [data, setData] = useState<FetchImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ message: string; statusCode: number }>();

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError({ message: err.message, statusCode: err.status });
        setLoading(false);
      });
  }, [url]);

  return [data, loading, error];
};
