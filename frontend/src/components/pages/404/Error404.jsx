import { H1, H3, H4 } from "../../shared/typography/Typogrpahy";
import error404 from "../../../assets/lottie/404.json";
import { HELPER_TEXT, OOPS, PAGE_NOT_FOUND } from "./constant";
import Lottie from "lottie-react";
import Chip from "../../shared/chip/Chip";
import { useHistory } from "react-router-dom";
import styles from "./error404.module.scss";

const Error404 = () => {
  const history = useHistory();

  return (
    <div className={styles["error404"]}>
      <Lottie animationData={error404} className={styles["error404__animation"]} />
      <div className={styles["error404__content"]}>
        <div>
          <H1 className={styles["error404__heading"]}>{OOPS}</H1>
          <H3>{PAGE_NOT_FOUND}</H3>
        </div>
        <div className={styles["error404__chips"]}>
          <H4 className={styles["error404__helper-text"]}>{HELPER_TEXT}</H4>
          <Chip
            label={"Explore new words"}
            color={"primary"}
            variant={"outlined"}
            className={styles["error404__chip"]}
            onClick={() => history.push("/explore")}
            clickable={true} />
          <Chip
            label={"Take a quiz"}
            color={"primary"}
            variant={"outlined"}
            className={styles["error404__chip"]}
            onClick={() => history.push("/quiz")}
            clickable={true} />
          <Chip
            label={"Navigate to home"}
            color={"primary"}
            variant={"outlined"}
            className={styles["error404__chip"]}
            onClick={() => history.push("/")}
            clickable={true} />
        </div>
      </div>
    </div>
  )
};

export default Error404;
