import { useEffect, useState, Suspense } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { routes } from "../routes/routes";
import Container from "./container/Container";
import Header from "./header/Header";
import Modal from "./modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_USER_LOGGEDIN } from "../store/actionType";
import Loader from "../components/widgets/loader/Loader";
import Toaster from "./toaster/Toaster";
import RightDrawer from "./rightDrawer/RightDrawer";

const AppContainer = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [headerVisible, setHeaderVisible] = useState(false);

  const loaderVisible = useSelector((state) => state.common.loader);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email)
      dispatch({
        type: UPDATE_USER_LOGGEDIN,
        payload: true,
      });
  }, []);

  useEffect(() => {
    setHeaderVisible(renderHeader());
  }, [location.pathname]);

  function renderHeader() {
    const pathname = location.pathname;
    console.log(pathname);
    const currentRoute = routes.filter((route) => route.path === pathname);
    return currentRoute && !currentRoute[0]?.hideHeader;
  }

  return (
    <>
      {headerVisible ? <Header /> : <></>}
      {loaderVisible ? <Loader /> : <></>}
      <Toaster />
      <RightDrawer />
      {/* {<Footer /> } */}
      <Modal />
      <Switch>
        {routes?.map((route) => {
          return (
            <Route key={route?.id} path={route.path} exact={route.exact}>
              <Container className={route.className}>
                <Suspense fallback={<Loader />}>
                  <route.component />
                </Suspense>
              </Container>
            </Route>
          );
        })}
      </Switch>
    </>
  );
};

export default AppContainer;
