import { Route, Routes } from "react-router-dom";
import { routes } from "../routes/routes";
import Container from "./container/Container";
import Header from "./header/Header";

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
            <Route
              key={route?.id}
              path={route.path}
              exact={route.exact} >
              <Container>
                <route.component />
              </Container>
            </Route>
          })
        }
      </Routes>
    </>
  )
};

export default AppContainer;