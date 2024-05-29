import { useCallback, useEffect, useRef, useState } from "react";
import { wordMenu } from "../../../data/words";
import WordCard from "../../widgets/wordCard/WordCard";
import "./Explore.scss";
import WordDetails from "../../widgets/wordDetails/WordDetails";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../../store/action/common";
import Pagination from "../../widgets/pagination/Pagination";
import { H3 } from "../../shared/typography/Typogrpahy";
import debounce from "lodash/debounce";
import { TextField, InputAdornment, Select, MenuItem } from "@material-ui/core";
import { ReactComponent as SearchIcon } from "../../../assets/images/search.svg";
import { getWordList } from "../../../store/action/explore";
import { plainToClass } from "class-transformer";
import { Word } from "../../../model/Word";
import Lottie from "lottie-react";
import secure from "../../../assets/lottie/noResults.json";
import SpeechToText from "../../widgets/speechToText/SpeechToText";

const Explore = () => {
  const loaderRef = useRef();
  const [filterStatus, setFilterStatus] = useState(wordMenu[0]);
  const [words, setWords] = useState([]);
  const [openWord, setOpenWord] = useState({});
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const pagination = useSelector((state) => state.explore.pagination);
  const filter = useSelector((state) => state.explore.filter);
  const wordList = useSelector((state) => state.explore.words);
  const isLoading = useSelector((state) => state?.explore?.isLoading);
  
  useEffect(() => {
    localStorage.removeItem("quiz");
  }, []);

  useEffect(() => {
    if (wordList) {
      const temp = wordList.map((word) => plainToClass(Word, word));
      setWords(temp);
    }
  }, [wordList]);

  const handlePageNumberChange = useCallback(() => {
    if (isLoading || pagination.page_no >= pagination.total_pages) return;
    dispatch(
      getWordList({
        pagination: {
          page_no: pagination.page_no + 1,
          size: pagination.size,
        },
        filter: filter,
      })
    );
  }, [isLoading, pagination, filter, dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        handlePageNumberChange();
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [handlePageNumberChange]);

  function handleRightPaneOpen(word) {
    setOpenWord(word);
    dispatch(
      action.showRightDrawer({
        open: true,
        children: <WordDetails word={word} />,
      })
    );
  }

  function handleFilterStatusChange(event) {
    let temp = event.target.value;
    setFilterStatus(temp);
    dispatch(
      getWordList({
        pagination: {
          page_no: 1,
          size: pagination.size,
        },
        filter: {
          status: temp?.id || 0,
          search: filter.search,
        },
      })
    );
  }

  function handleSearchChange(event) {
    setSearch(event.target.value);
    debouncedSearchCall(event.target.value);
  }

  const debouncedSearchCall = useCallback(
    debounce((value) => {
      dispatch(
        getWordList({
          pagination: {
            page_no: 1,
            size: pagination.size,
          },
          filter: {
            status: filter.status,
            search: value,
          },
        })
      );
    }, 500),
    [filter, pagination]
  );

  return (
    <>
      <H3 className="heading">Search Vocabulary Words</H3>
      <div className="filters">
        <TextField
          className="search-autocomplete"
          value={search}
          onChange={handleSearchChange}
          size="small"
          placeholder="Enter to search words"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className="icon" />
              </InputAdornment>
            ),
          }}
        />

        <SpeechToText setValue={setSearch} />

        {localStorage.getItem("token") && (
          <Select
            label="Status"
            labelId="status"
            variant="outlined"
            className="status-select"
            id="status"
            value={filterStatus}
            renderValue={(data) => data.title}
            onChange={handleFilterStatusChange}
            MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
              getContentAnchorEl: null,
            }}
          >
            {wordMenu?.map((data) => {
              return (
                <MenuItem key={data.id} value={data}>
                  {data.title}
                </MenuItem>
              );
            })}
          </Select>
        )}
      </div>
      {words && words.length > 0 ? (
        <div className="word-grid-container">
          {words?.map((word) => (
            <WordCard word={word} onClick={handleRightPaneOpen} />
          ))}
        </div>
      ) : filter.search || filter.status ? (
        <Lottie animationData={secure} className="lottie" />
      ) : (
        <></>
      )}
      <div ref={loaderRef} />
    </>
  );
};

export default Explore;
