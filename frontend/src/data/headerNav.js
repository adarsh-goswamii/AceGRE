import { ReactComponent as ExploreIcon } from "../assets/images/explore.svg";
import { ReactComponent as LeaderboardIcon } from "../assets/images/leaderboard.svg";
import { ReactComponent as QuizIcon } from "../assets/images/quiz.svg";

let data = [
  {
    heading: "Home",
    pathname: "/",
    submenu: null,
    icon: QuizIcon,
  },
  {
    heading: "Explore",
    pathname: "/explore",
    submenu: null,
    icon: ExploreIcon,
  },
  {
    heading: "Quizzes",
    pathname: "/quiz",
    icon: QuizIcon,
  },
  {
    heading: "Leaderboard",
    pathname: "/leaderboard",
    submenu: null,
    icon: LeaderboardIcon,
  },
];

export default data;
