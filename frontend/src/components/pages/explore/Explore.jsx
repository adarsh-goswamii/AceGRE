import { useCallback, useEffect, useState } from "react";
import { wordMenu } from "../../../data/words";
import WordCard from "../../widgets/wordCard/WordCard";
import "./Explore.scss";
import RightPane from "../../../layout/rightDrawer/RightDrawer";
import WordDetails from "../../widgets/wordDetails/WordDetails";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../../store/action/common";
import Pagination from "../../widgets/pagination/Pagination";
import { H3 } from "../../shared/typography/Typogrpahy";
import debounce from "lodash/debounce";
import { TextField, InputAdornment, Select, MenuItem } from "@material-ui/core";
import { ReactComponent as SearchIcon } from "../../../assets/images/search.svg";
import { getWordList, updatePagination } from "../../../store/action/explore";
import { plainToClass } from "class-transformer";
import { Word } from "../../../model/Word";

const Explore = () => {
  const [filterStatus, setFilterStatus] = useState(wordMenu[0]);
  const [words, setWords] = useState([]);
  const [openWord, setOpenWord] = useState({});
  const [search, setSearch] = useState("");
  const rightDrawer = useSelector((state) => state.common.rightDrawer);
  const dispatch = useDispatch();

  const pagination = useSelector((state) => state.explore.pagination);
  const filter = useSelector((state) => state.explore.filter);
  const wordList = useSelector((state) => state.explore.words);

  useEffect(() => {
    const payload = {
      pagination: {
        size: pagination.size,
        page_no: pagination.page_no,
      },
      filter: filter,
    };
    dispatch(getWordList(payload));
  }, []);

  useEffect(() => {
    if (wordList) {
      const temp = wordList.map((word) => plainToClass(Word, word));
      setWords(temp);
    }
  }, [wordList]);

  function handleRightPaneOpen(word) {
    setOpenWord(word);
    dispatch(action.showRightDrawer({ open: true }));
  }

  function handleRightPaneClose() {
    dispatch(action.showRightDrawer({ open: false }));
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

  function handlePageNumberChange(event, currPage) {
    dispatch(
      getWordList({
        pagination: {
          page_no: currPage,
          size: pagination.size,
        },
        filter: filter,
      })
    );
  }

  function handleCardPerPageChange(value) {
    dispatch(
      getWordList({
        pagination: {
          page_no: 1,
          size: value,
        },
        filter,
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
          valeue={search}
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
      </div>
      <div className="word-grid-container">
        {words?.map((word) => (
          <WordCard word={word} onClick={handleRightPaneOpen} />
        ))}
      </div>
      <div className="pagination">
        <Pagination
          page={pagination.page_no}
          limit={pagination.size}
          paginationOptions={[20, 40, 60, 80, 100]}
          handlePageNumberChange={handlePageNumberChange}
          handleCardPerPageChange={handleCardPerPageChange}
          totalPage={pagination.total_pages}
        />
      </div>
      <RightPane
        open={rightDrawer?.open}
        close={handleRightPaneClose}
        className="word-details-pane"
      >
        <WordDetails word={openWord} />
      </RightPane>
    </>
  );
};

export default Explore;
