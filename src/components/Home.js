import React from "react";

// Config
import { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from "../config";

// Components
import HeroImage from "./HeroImage";
import Grid from "./Grid";
import Thumb from "./Thumb";
import Spinner from "./Spinner";
import SearchBar from "./SearchBar";
import Button from "./Button";

// Hook
import { useHomeFetch } from "../hooks/useHomeFetch";

// Images
import NoImage from "../images/no_image.jpg";

const Home = () => {
  const { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore } = useHomeFetch();

  console.log(state);

  if (error) {
    return <div>Something went wrong !</div>;
  }

  return (
    <>
      {!searchTerm && state.results[0] ? (
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
          title={state.results[0].original_title}
          text={state.results[0].overview}
        />
      ) : null}
      <SearchBar setSearchTerm={setSearchTerm} />
      <Grid header={searchTerm ? "Search Result" : "Popular Movies"}>
        {state.results.map((movie) => (
          <Thumb
            key={movie.id}
            clickable
            image={movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path : NoImage}
            movieID={movie.id}
          />
        ))}
      </Grid>
      {loading && <Spinner />}
      {state.page < state.total_pages && !loading && (
        <Button text="Load More" callback={() => setIsLoadingMore(true)} />
      )}
    </>
  );
};

export default Home;

// ===== Class Component Example
// import React, { Component } from "react";

// // API
// import API from "../API";

// // Config
// import { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from "../config";

// // Components
// import HeroImage from "./HeroImage";
// import Grid from "./Grid";
// import Thumb from "./Thumb";
// import Spinner from "./Spinner";
// import SearchBar from "./SearchBar";
// import Button from "./Button";

// // Images
// import NoImage from "../images/no_image.jpg";

// const initialState = {
//   page: 0,
//   results: [],
//   totla_pages: 0,
//   total_results: 0,
// };

// class Home extends Component {
//   state = {
//     movies: initialState,
//     searchTerm: "",
//     isLoadingMore: false,
//     loading: false,
//     error: false,
//   };

//   fetchMovies = async (page, searchTerm = "") => {
//     try {
//       this.setState({ error: false, loading: true });

//       const movies = await API.fetchMovies(searchTerm, page);

//       // 점 3개 -> es6 spread 문법
//       // 반복 가능한(iterable) 객체에서만 사용할 수 있고, 객체 내부 데이터들을 펼치는 역할을 함
//       this.setState((prev) => ({
//         ...prev,
//         movies: {
//           ...movies,
//           results:
//             //          old movies array, new movies array -> 아마 나중에 값 비교해서 rerender 할때 필요한듯??
//             //                                                react에서 rerender 할때 꼭 mutate() 해서 데이터 새로 만들어서 비교해야함
//             //                                                생짜 원본으로 하면 안됨. very very important !!
//             page > 1 ? [...prev.movies.results, ...movies.results] : [...movies.results],
//         },
//         loading: false,
//       }));
//     } catch (error) {
//       this.setState({ error: true, loading: false });
//     }
//   };

//   handleSearch = (searchTerm) => {
//     this.setState({ movies: initialState, searchTerm }, () => this.fetchMovies(1, this.state.searchTerm));
//   };

//   handleLoadMore = () => this.fetchMovies(this.state.movies.page + 1, this.state.searchTerm);

//   componentDidMount() {
//     this.fetchMovies(1);
//   }

//   render() {
//     const { searchTerm, movies, loading, error } = this.state;

//     if (error) {
//       return <div>Something went wrong !</div>;
//     }

//     return (
//       <>
//         {!searchTerm && movies.results[0] ? (
//           <HeroImage
//             image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${movies.results[0].backdrop_path}`}
//             title={movies.results[0].original_title}
//             text={movies.results[0].overview}
//           />
//         ) : null}
//         <SearchBar setSearchTerm={this.handleSearch} />
//         <Grid header={searchTerm ? "Search Result" : "Popular Movies"}>
//           {movies.results.map((movie) => (
//             <Thumb
//               key={movie.id}
//               clickable
//               image={movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path : NoImage}
//               movieID={movie.id}
//             />
//           ))}
//         </Grid>
//         {loading && <Spinner />}
//         {movies.page < movies.total_pages && !loading && (
//           <Button text="Load More" callback={this.handleLoadMore} />
//         )}
//       </>
//     );
//   }
// }

// export default Home;
