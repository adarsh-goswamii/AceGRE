import { words } from "../../../data/words";
import WordCard from "../../widgets/wordCard/WordCard";
import "./Explore.scss";

const Explore = () => {
  return (
    <>
      <div className="word-grid-container">
        {
          words?.map(word => <WordCard {...word} />)
        }
      </div>
      <div className="pagination">

      </div>
    </>
  )
}

export default Explore;