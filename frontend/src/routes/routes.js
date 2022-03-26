import Home from '../components/pages/home/Home';

export const routes= [
  {
    path: "/", 
    exact: true, 
    hideHeader: false, 
    component: Home, 
    id: 1, 
  },{
    path: "/explore", 
    exact: true, 
    hideHeader: false, 
    component: <></>, 
    id: 2, 
  },{
    path: "/quizzes", 
    exact: true, 
    hideHeader: false, 
    component: <></>, 
    id: 3, 
  },{
    path: "/leaderboard", 
    exact: true, 
    hideHeader: false, 
    component: <></>, 
    id: 4, 
  },{
    path: "/user-profile", 
    exact: true, 
    hideHeader: false, 
    component: <></>, 
    id: 5, 
    protected: false,
  },{
    path: "/add-word", 
    exact: true, 
    hideHeader: false, 
    component: <></>, 
    id: 6, 
    protected: true,
  },
]