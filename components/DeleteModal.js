import { useNavigate } from "react-router-dom";

import { useDispatchSkills } from "../contexts/SkillContext";
import skillApi from "../api/skill";
import Button from "./Button";
import { useState } from "react";

const DeleteModal = ({ skill, toggleDeleteModal }) => {
  const [ error, setError ] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatchSkills();

  const onClickDelete = () => {
    skillApi.delete(skill).then(() => {
      dispatch({ type: "skill/delete", skill });
      toggleDeleteModal();
      navigate('/skills');
    }).catch((e) => {
      console.log('error occured!', e)
      setError(e);
    });
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <h3 className="page-title">
          [{skill.title}]<span>を削除しますか</span>
        </h3>
        <div className="error-msg text-center">{error}</div>
        <div className="footer">
          <Button
            className="gray mr-16"
            onClick={toggleDeleteModal}
          >
            キャンセル
          </Button>
          <Button
            className="red"
            onClick={onClickDelete}
          >
            削除
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
