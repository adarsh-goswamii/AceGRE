import Error404 from "../components/pages/404/Error404";
import Home from "../components/pages/home/Home";
import Explore from "../components/pages/explore/Explore";
import Authentication from "../components/pages/login/Authentication";
import Quiz from "../components/pages/quizzes/Quiz";
import Results from "../components/pages/result/Result";
import Leaderboard from "../components/pages/leaderboard/Leaderboard";
import AddWord from "../components/pages/addWord/AddWord";

export const routes = [
  {
    path: "/",
    className: "home",
    exact: true,
    hideHeader: true,
    component: Home,
    id: 1,
    className: "home-container",
  },
  {
    path: "/explore",
    className: "explore-page-container",
    exact: true,
    hideHeader: false,
    component: Explore,
    id: 2,
  },
  {
    path: "/quizzes",
    className: "quizzes",
    exact: true,
    hideHeader: false,
    component: <></>,
    id: 3,
  },
  {
    path: "/leaderboard",
    className: "leaderboard-page-container",
    exact: true,
    hideHeader: false,
    component: Leaderboard,
    id: 4,
  },
  {
    path: "/user-profile",
    exact: true,
    hideHeader: false,
    component: <></>,
    id: 5,
    protected: false,
  },
  {
    path: "/add-word",
    exact: true,
    hideHeader: false,
    component: AddWord,
    id: 6,
    protected: true,
    className: "add-word-screen"
  },
  {
    path: "/auth",
    exact: true,
    hideHeader: true,
    component: Authentication,
    id: 8,
    protected: false,
    className: "login-screen",
  },
  {
    path: "/quiz",
    exact: true,
    hideHeader: true,
    component: Quiz,
    id: 9,
    protected: false,
    className: "quiz-screen",
  },
  {
    path: "/results",
    exact: false,
    hideHeader: true,
    component: Results,
    id: 10,
    protected: true,
    className: "result-screen",
  },
  {
    path: "*",
    exact: true,
    hideHeader: false,
    component: Error404,
    id: 7,
    protected: false,
  },
];
