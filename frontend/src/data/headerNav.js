let data = [
  {
      heading: "Home",
      pathname: "/",
      submenu: null,
  },
  {
      heading: "Explore",
      pathname: "/explore",
      submenu: null,
  },
  {
      heading: "Quizzes",
      pathname: null,
      submenu: [
          { id: 1, title: "quiz 1", pathname: "/" },
          { id: 2, title: "quiz 2", pathname: "/" },
          { id: 3, title: "quiz 3", pathname: "/" },
          { id: 4, title: "quiz 4", pathname: "/" },
      ],
  },
  {
      heading: "Leaderboard",
      pathname: "/leaderboard",
      submenu: null,
  }
];

export default data;
