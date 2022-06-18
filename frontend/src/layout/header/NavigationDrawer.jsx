
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { showRightDrawer } from '../../store/action/common';
import RightPane from "../../layout/rightDrawer/RightDrawer";
import styles from "./navigationDrawer.module.scss";

const NavigationDrawer = ({}) => {
  const dispatch = useDispatch();
  const open = useSelector(state => state.common.rightDrawer.open);

  const handleMenuClick = () => {
    dispatch(showRightDrawer({ open: true, children: "lorem ipsum" }));
  };

  const handleRightPaneClose = () => {
    dispatch(showRightDrawer({ open: false }));
  };

  return (
    <div className={styles["menu"]}>
      <MenuIcon className={styles["menu__icon"]} onClick={handleMenuClick} />
    </div>
  )
};

export default NavigationDrawer;