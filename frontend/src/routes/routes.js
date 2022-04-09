import Error404 from '../components/pages/404/Error404';
import Home from '../components/pages/home/Home';
import Explore from '../components/pages/explore/Explore';
import Login from '../components/pages/login/Login';

export const routes = [
  {
    path: "/",
    className: "home",
    exact: true,
    hideHeader: false,
    component: Home,
    id: 1,
  }, {
    path: "/explore",
    className: "explore",
    exact: true,
    hideHeader: false,
    component: Explore,
    id: 2,
  }, {
    path: "/quizzes",
    className: "quizzes",
    exact: true,
    hideHeader: false,
    component: <></>,
    id: 3,
  }, {
    path: "/leaderboard",
    className: "leaderboard",
    exact: true,
    hideHeader: false,
    component: null,
    id: 4,
  }, {
    path: "/user-profile",
    exact: true,
    hideHeader: false,
    component: <></>,
    id: 5,
    protected: false,
  }, {
    path: "/add-word",
    exact: true,
    hideHeader: false,
    component: <></>,
    id: 6,
    protected: true,
  }, {
    path: "/login",
    exact: true,
    hideHeader: true,
    component: Login,
    id: 8,
    protected: false,
    className: "login-screen",
  }, {
    path: "*",
    exact: true,
    hideHeader: false,
    component: Error404,
    id: 7,
    protected: false,
  }
]