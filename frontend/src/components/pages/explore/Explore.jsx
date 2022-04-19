import { useEffect, useState } from "react";
import { wordMenu } from "../../../data/words";
import WordCard from "../../widgets/wordCard/WordCard";
import "./Explore.scss";
import RightPane from "../../../layout/rightDrawer/RightDrawer";
import WordDetails from "../../widgets/wordDetails/WordDetails";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../../store/action/common";
import Pagination from "../../widgets/pagination/Pagination";
import { H3 } from "../../shared/typography/Typogrpahy";
import { Autocomplete } from "@material-ui/lab";
import { TextField, InputAdornment, Select, MenuItem } from "@material-ui/core";
import { ReactComponent as SearchIcon } from "../../../assets/images/search.svg";
import { getWordList, updatePagination } from "../../../store/action/explore";
import { plainToClass } from 'class-transformer';
import { Word } from "../../../model/Word";

const Explore = () => {
  const [filterStatus, setFilterStatus] = useState(null);
  const [words, setWords] = useState([]);
  const rightDrawer = useSelector(state => state.common.rightDrawer);
  const dispatch = useDispatch();

  const pagination = useSelector(state => state.explore.pagination);
  const wordList = useSelector(state => state.explore.words);

  useEffect(() => {
    const payload = {
      pagination: {
        size: pagination.size,
        page_no: pagination.page_no
      }
    }
    dispatch(getWordList(payload));
  }, []);

  useEffect(() => {
    if (wordList) {
      const temp = wordList.map(word => plainToClass(Word, word));
      setWords(temp);
    }
  }, [wordList]);

  function handleRightPaneOpen(event) {
    dispatch(action.showRightDrawer({ open: true }));
  }

  function handleRightPaneClose() {
    dispatch(action.showRightDrawer({ open: false }));
  }

  function handleFilterStatusChange(event) {
    setFilterStatus(event.target.value);
  }

  function handlePageNumberChange(event, currPage) {
    dispatch(getWordList({
      pagination: {
        page_no: currPage,
        size: pagination.size
      }
    }));
  }

  return (
    <>
      <H3 className="heading">Search Vocabulary Words</H3>
      <div className="filters">
        <Autocomplete
          freeSolo
          id="search"
          className="search-autocomplete"
          // value={""}
          disableClearable
          getOptionLabel={(data) => data.value}
          options={[]}
          renderOption={() => "ada"}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                variant="outlined"
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
            )
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
              horizontal: "left"
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "right"
            },
            getContentAnchorEl: null
          }} >
          {
            wordMenu?.map(data => {
              return (
                <MenuItem
                  key={data.id}
                  value={data}>
                  {data.title}
                </MenuItem>
              )
            })
          }
        </Select>
      </div>
      <div className="word-grid-container">
        {
          words?.map(word => <WordCard {...word} onClick={handleRightPaneOpen} />)
        }
      </div>
      <div className="pagination">
        <Pagination
          limit={pagination.size}
          paginationOptions={[20, 40, 60, 80, 100]}
          handlePageNumberChange={handlePageNumberChange}
          totalPage={pagination.total_pages} />
      </div>
      <RightPane
        open={rightDrawer?.open}
        close={handleRightPaneClose}
        className="word-details-pane">
        <WordDetails id={6} />
      </RightPane>
    </>
  )
}

export default Explore;