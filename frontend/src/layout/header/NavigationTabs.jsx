import data from "../../data/headerNav";
import { useLocation, useHistory } from "react-router-dom";
import useGetDevice from "../../hooks/useGetDevice";
import { MOBILE_VIEW, TABLET_VIEW, LAPTOP_VIEW } from "../../hooks/constants";
import { Body } from "../../components/shared/typography/Typogrpahy";

const NavigationTabs = ({
  setAnchorEl,
  handlePopOverClose,
  setMenu,
  setPopover,
}) => {
  const device = useGetDevice();
  const location = useLocation();
  const navigate = useHistory();

  const handleMenuClick = (e, menu) => {
    if (menu.pathname) {
      navigate.push(menu.pathname);
    } else {
      setAnchorEl(e.currentTarget);
      let temp = menu?.submenu.map((data) => {
        data.onClick = () => {
          handlePopOverClose();
          navigate.push(data.pathname);
        };
        return data;
      });
      setMenu(temp);
      setPopover("menu");
    }
  };

  if (device === MOBILE_VIEW || device === TABLET_VIEW) return <></>;

  return (
    <div className="navigation-tabs">
      {data?.map((menu, index) => {
        return (
          <div
            className={`heading-container ${
              location.pathname === menu.pathname ? "active" : ""
            } `}
            onClick={(e) => handleMenuClick(e, menu)}
          >
            <Body key={index} className={`menu-heading`}>
              {menu?.heading}
            </Body>
          </div>
        );
      })}
    </div>
  );
};

export default NavigationTabs;
