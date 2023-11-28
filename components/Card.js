import { Link } from "react-router-dom";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { COLORS, EXCERPT } from "../utils/config";


const Card = ({ skill }) => {

  return (
    <div className="card">
    {/* <Link className="card" to={`/skills/${skill._id}`}> */}

      <h3 className="skill-title">{skill.title}</h3>

      <div className="card__rating">
        {
          <Rating
            emptySymbol={<FontAwesomeIcon icon={faStar} color={COLORS.star.empty} />}
            fullSymbol={<FontAwesomeIcon icon={faStar} color={COLORS.star.full} />}
            fractions={1} // 星をいくつに分割するか。2にしたら星の半分も評価に入る
            initialRating={skill.rating} // デフォルトの評価数。
            readonly={true} // 評価を変更できるかどうか。デフォルトはfalse
          />
        }
      </div>

      <div>
        <div className="sub-title">説明</div>
        <p className="text">{skill.description}</p>
      </div>

      <div>
        <div className="sub-title">コメント</div>
        <p className="text">{skill.comment}</p>
      </div>

        {/* </Link> */}

    </div>
  );
};

export default Card;
