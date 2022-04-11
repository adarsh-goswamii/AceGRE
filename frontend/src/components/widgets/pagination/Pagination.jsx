import {useState} from "react";
import Pagination from '@material-ui/lab/Pagination';
import { Select, MenuItem } from '@material-ui/core';
import { useEffect } from 'react';

const CustomPagination = ({
  totalPage, // n number 
  paginationOptions, // n array
  limit, // n number
  handleCardPerPageChange, // n funtion
  handlePageNumberChange, // n function
}) => {
  const [cardPerPage, setCardPerPage] = useState(undefined);
  useEffect(() => {
    setCardPerPage(limit);
  }, [limit]);

  function changeCardPerPage(event) {
    setCardPerPage(event.target.value);
    handleCardPerPageChange(event.target.value);
  }
  return (
    <>
      <div className="card-per-page">
        Cards Per page:
        <Select
          id="card-per-page"
          variant="outlined"
          size="small"
          onChange={changeCardPerPage}
          value={cardPerPage || ""}>
          {
            paginationOptions?.map((value) => {
              return <MenuItem
                value={value}
                key={value}>{value}</MenuItem>
            })
          }
        </Select>
      </div>
      <Pagination
        count={totalPage}
        shape="rounded"
        onChange={handlePageNumberChange} />
      <div></div>
    </>
  );
};

export default CustomPagination;