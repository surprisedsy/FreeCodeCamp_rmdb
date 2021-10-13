import { useState, useEffect } from "react";
// API
import API from "../API";

// Helpers
import { isPersistedState } from "../helpers";

const initialState = {
  page: 0,
  results: [],
  totla_pages: 0,
  total_results: 0,
};

export const useHomeFetch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchMovies = async (page, searchTerm = "") => {
    try {
      setError(false);
      setLoading(true);

      const movies = await API.fetchMovies(searchTerm, page);

      // 점 3개 -> es6 spread 문법
      // 반복 가능한(iterable) 객체에서만 사용할 수 있고, 객체 내부 데이터들을 펼치는 역할을 함
      setState((prev) => ({
        ...movies,
        results:
          //          old movies array, new movies array -> 아마 나중에 값 비교해서 rerender 할때 필요한듯??
          //                                                react에서 rerender 할때 꼭 mutate() 해서 데이터 새로 만들어서 비교해야함
          //                                                생짜 원본으로 하면 안됨. very very important !!
          page > 1 ? [...prev.results, ...movies.results] : [...movies.results],
      }));
    } catch (error) {
      setError(true);
    }

    setLoading(false);
  };

  // initial and search (searchTerm 이 변경되면 작동)
  useEffect(() => {
    if (!searchTerm) {
      const sessionState = isPersistedState("homeState");

      if (sessionState) {
        console.log("Grabbing from sessionStorage");
        setState(sessionState);
        return;
      }
    }

    console.log("Grabbing from API");
    setState(initialState);
    fetchMovies(1, searchTerm);
  }, [searchTerm]);

  // Load More
  useEffect(() => {
    if (!isLoadingMore) {
      return;
    }

    fetchMovies(state.page + 1, searchTerm);
    setIsLoadingMore(false);
  }, [isLoadingMore, searchTerm, state.page]);

  // Write to sessionStorage
  useEffect(() => {
    if (!searchTerm) {
      sessionStorage.setItem("homeState", JSON.stringify(state));
    }
  }, [searchTerm, state]);

  return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };
};
