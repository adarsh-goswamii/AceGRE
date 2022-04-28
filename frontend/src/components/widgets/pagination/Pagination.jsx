import {useState} from "react";
import Pagination from '@material-ui/lab/Pagination';
import { Select, MenuItem } from '@material-ui/core';
import { useEffect } from 'react';
import {PropTypes} from "prop-types";


const CustomPagination = ({
  page,
  totalPage,
  paginationOptions,
  limit,
  handleCardPerPageChange,
  handlePageNumberChange,
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
        page={page}
        shape="rounded"
        onChange={handlePageNumberChange} />
      <div></div>
    </>
  );
};

export default CustomPagination;
CustomPagination.propTypes = {
  // necessary fields
  page:PropTypes.number.isRequired,
  totalPage:PropTypes.number.isRequired,
  paginationOptions :PropTypes.array.isRequired,
  limit:PropTypes.number.isRequired,
  handleCardPerPageChange:PropTypes.func.isRequired,
  handlePageNumberChange :PropTypes.func.isRequired
};