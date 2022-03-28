import { Menu, MenuItem } from "@material-ui/core";

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
  //optional fields
  menu: PropTypes.array,
  className: PropTypes.string
};
