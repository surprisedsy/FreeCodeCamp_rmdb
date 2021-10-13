import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

// Image
import searchIcon from "../../images/search-icon.svg";

// Styles
import { Wrapper, Content } from "./SearchBar.styles";

const SearchBar = ({ setSearchTerm }) => {
  const [state, setState] = useState("");
  //              useRef = initialize 도와주는? 역할 해주는? 함수
  //              useEffect & useRef 모두 mutable한 값을 가져오긴 하는데 전자는 rerender 시켜주고, 후자는 안함
  const initial = useRef(true);

  useEffect(() => {
    // 기본값을 true로 해놨으니까 초기화 과정 한번만 실행하고 멈춰있어라 라는 뜻
    if (initial.current) {
      initial.current = false;
      return;
    }

    const timer = setTimeout(() => {
      setSearchTerm(state);
    }, 500);

    return () => clearTimeout(timer);
  }, [setSearchTerm, state]);

  return (
    <Wrapper>
      <Content>
        <img src={searchIcon} alt="search-icon" />
        <input
          type="text"
          placeholder="Search Movie"
          onChange={(event) => setState(event.currentTarget.value)}
          value={state}
        />
      </Content>
    </Wrapper>
  );
};

SearchBar.prototype = {
  callback: PropTypes.func,
};

export default SearchBar;
