import { useCallback, useState } from "react";
import { GiftRes, ChildrenRes } from "types";

export const BASE_URL = "http://localhost:3001";
export enum HttpMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export type ListGiftsRes = {
  giftsList: GiftRes[];
};

export type SendReqType<T> = (
  method: HttpMethods,
  restUrl: string,
  body?: T | undefined
) => Promise<void>;

type Data = ChildrenRes | GiftRes[] | GiftRes | null;

interface UseFetchReturnValues {
  isLoading: boolean;
  sendReq: SendReqType<Data>;
  data: Data;
}

export const useFetch = (): UseFetchReturnValues => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Data>(null);

  const sendReq = useCallback(
    async <T>(
      method: HttpMethods = HttpMethods.GET,
      restUrl?: string,
      body?: T | undefined
    ) => {
      setIsLoading(true);
      const config = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : null,
      };

      try {
        const result = await fetch(`${BASE_URL}${restUrl}`, config);

        if (!result.ok) {
          throw new Error("Request failed!");
        }

        setData(await result.json());
      } catch (err) {
        throw new Error("Something went wrong!");
      }
      setIsLoading(false);
    },
    []
  );

  return {
    isLoading,
    sendReq,
    data,
  };
};
