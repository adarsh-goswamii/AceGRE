import { Route, Routes } from "react-router-dom";
import { routes } from "../routes/routes";
import Container from "./container/Container";
import Header from "./header/Header";
import Error404 from "../components/pages/404/Error404";

const AppContainer = () => {
  return (
    <>
      <Header />
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