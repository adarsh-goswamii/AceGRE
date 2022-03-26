import { Menu, MenuItem } from "@material-ui/core";

const MenuList = ({
  menu
}) => {
  return (
    <Menu>
      {
        menu?.map(({ onClick, title }) => {
          return <MenuItem onClick={onClick}>{title}</MenuItem>;
        })
      }
    </Menu>
  );
};

export default MenuList;