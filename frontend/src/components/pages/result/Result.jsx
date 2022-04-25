import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchResults } from "../../../store/action/quiz";
import "./Result.scss";

const Result = ({ }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const id = new URLSearchParams(location.search).get("id");
  console.log(id);

  const results = useSelector(state => state.quiz.fetchResults);
  console.log(results);

  useEffect(() => {
    if (id) {
      dispatch(fetchResults(id));
    }
  }, [id]);
  return (
    <>
      {results}
    </>
  )
};

export default Result;