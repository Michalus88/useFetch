import { useState } from "react";
import { GiftsRes, ChildrenRes } from "types";

const BASE_URL = "http://localhost:3001";

export enum HttpMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export interface UseFetchRes {
  data: Data | null;
  error: any;
  loading: Boolean;
  getAPIData: ApiCall;
}

type Data = ChildrenRes | GiftsRes;
type ApiCall = <T>(path?: string, reqBody?: T) => Promise<void>;
type FetchResWithoutData = Omit<UseFetchRes, "data">;

interface Arguments<T> {
  restUrl?: string;
  method?: HttpMethods;
  body?: T | undefined;
}
export interface FetchChildrenRes extends FetchResWithoutData {
  data: ChildrenRes | null;
}
export interface FetchGiftsRes extends FetchResWithoutData {
  data: GiftsRes | null;
}

export const useFetch = <T>({
  restUrl,
  method = HttpMethods.GET,
  body,
}: Arguments<T>): UseFetchRes => {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const getAPIData: ApiCall = async (path = restUrl, reqBody) => {
    setLoading(true);
    const config = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: reqBody
        ? JSON.stringify(reqBody)
        : body
        ? JSON.stringify(body)
        : null,
    };
    try {
      const apiResponse = await fetch(`${BASE_URL}${path ?? ""}`, config);
      const json = (await apiResponse.json()) as Data | null;
      if (!json) {
        throw new Error("Please try again");
      }

      setData(json);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  // useEffect(() => {
  //   getAPIData();
  // }, []);

  return {
    data,
    error,
    loading,
    getAPIData,
  };
};
