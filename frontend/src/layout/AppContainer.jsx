import {useEffect, useState} from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { routes } from "../routes/routes";
import Container from "./container/Container";
import Header from "./header/Header";
import Error404 from "../components/pages/404/Error404";

const AppContainer = () => {
  const location = useLocation();
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    console.log(renderHeader());
    setHeaderVisible(renderHeader());
  }, [window.location.pathname]);

  function renderHeader() {
    const pathname = location.pathname;
    const currentRoute = routes.filter(route => route.path === pathname);
    console.log(currentRoute, pathname);
    return currentRoute && !currentRoute[0].hideHeader;
  }

  return (
    <>
      {headerVisible ? <Header /> : <></>}
      {/* <Toaster />
      <RightDrawer />
      <Modal />
      <Footer /> */}
      <Routes>
        {
          routes?.map(route => {
            return <Route
              key={route?.id}
              path={route.path}
              exact={route.exact}
              element={<Container className={route.className}>
                <route.component />
              </Container>} />
          })
        }
      </Routes>
    </>
  )
};

export default AppContainer;