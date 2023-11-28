import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
// import { useParams, useNavigate } from "react-router-dom";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { COLORS } from "../utils/config";
import skillApi from "../api/skill";

import Button from "../components/Button";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";

const ModalPortal = ({ children }) => {
  const target = document.querySelector(".container");
  return createPortal(children, target);
};

export default function Skill(){
  const { id } = useParams();

  const [skill, setSkill] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    skillApi.get(id).then((_skill) => {
      setSkill(_skill);
    }).catch((e) => {
      console.log('error occured!', e);
      setError('URLが不正です。');
    });
  }, []);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const toggleEditModal = () => setIsEditModalOpen((prev) => !prev);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const toggleDeleteModal = () => setIsDeleteModalOpen((prev) => !prev);

  // const navigate = useNavigate();
  // const goToSkillsPage = () => navigate("/skills");

  return (
    <div className="detail">
      <h1>hello</h1>
        {/* <h3 className="skill-title">{skill.title}</h3>
        <div className="error-msg text-center">{error}</div> */}

        <div className="sub-title">概要</div>
        {/* <p className="text">{book.description}</p> */}

        <div className="sub-title">本の感想</div>
        {/* <p className="text">{skill.comment}</p> */}

        <div className="sub-title">本の評価</div>
        {/* <div className="detail__stars">
          {
            <Rating
              emptySymbol={
                <FontAwesomeIcon icon={faStar} color={COLORS.star.empty} />
              }
              fullSymbol={
                <FontAwesomeIcon icon={faStar} color={COLORS.star.full} />
              }
              fractions={1} // 星をいくつに分割するか。2にしたら星の半分も評価に入る
              initialRating={skill.rating}
              readonly={true}
            />
          }
        </div> */}

        {/* <div className="footer">
          <Button className="blue mr-16" onClick={toggleEditModal}>
            編集
          </Button>
          <Button className="red" onClick={toggleDeleteModal}>
            削除
          </Button>
        </div>
      </div> */}

      {/* {isEditModalOpen && (
        <ModalPortal>
          <EditModal
            skill={skill}
            setSkill={setSkill}
            toggleEditModal={toggleEditModal}
          />
        </ModalPortal>
      )} */}

      {/* {isDeleteModalOpen && (
        <ModalPortal>
          <DeleteModal skill={skill} toggleDeleteModal={toggleDeleteModal} />
        </ModalPortal>
      )} */}

      {/* <div className="detail__btnToSkills">
        <Button className="gray" onClick={goToSkillsPage}>
          一覧へ
        </Button>
      </div> */}
      </div>
      )
  }
