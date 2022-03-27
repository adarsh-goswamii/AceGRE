import { Menu, MenuItem } from "@material-ui/core";

const MenuList = ({
  menu, 
  className
}) => {
  return (
    <>
      {
        menu?.map(({ id, onClick, title }) => {
          return (<MenuItem key={id} onClick={onClick} className={className}>{title}</MenuItem>);
        })
      }
    </>
  );
};

export default MenuList;