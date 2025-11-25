import { useFetcher as useFetcherInner } from "react-router";

export type TypeFetcherData<T, R> = {
  errors?: string[];
  fieldErrors: { [P in keyof T]: string[] };
  formState: T;
  data: R
};

export const useFetcher = <T, R>() => {
  const fetcher = useFetcherInner<TypeFetcherData<T, R>>();

  return {
    ...fetcher?.data,
    isLoading: fetcher.state !== 'idle',
    fetcher
  };
};