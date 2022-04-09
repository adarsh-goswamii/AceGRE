import { Menu, MenuItem } from "@material-ui/core";
import { PropTypes } from "prop-types";

const MenuList = ({
  menu, 
  className
}) => {
  return (
    <>
      {
        menu?.map(({ id, onClick, title }) => {
          return (<MenuItem key={id} onClick={onClick} className={`${className} light`}>{title}</MenuItem>);
        })
      }
    </>
  );
};

export default MenuList;
MenuList.propTypes={
  //necesary field
  menu: PropTypes.array.isRequired,
  //optional field
  className: PropTypes.string
};
