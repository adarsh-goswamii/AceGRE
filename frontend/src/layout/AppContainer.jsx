import {useEffect, useState} from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "../routes/routes";
import Container from "./container/Container";
import Header from "./header/Header";

const AppContainer = () => {
  return (
    <>
      <Header />
      {/* <Toaster /> */}
      {/* <Modal />
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