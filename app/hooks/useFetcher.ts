import { useRef } from "react";
import { useFetcher as useFetcherInner } from "react-router";

export type TypeFetcherData<T, R> = {
  errors?: string[];
  fieldErrors: { [P in keyof T]: string[] };
  formState: T;
  data: R
};

export const useFetcher = <T, R = T>() => {
  const fetcher = useFetcherInner<TypeFetcherData<T, R>>();
  const formRef = useRef<HTMLFormElement>(null)

  return {
    ...fetcher?.data,
    isLoading: fetcher.state !== 'idle',
    fetcher,
    formRef
  };
};