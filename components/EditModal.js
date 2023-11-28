import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useDispatchSKills } from '../contexts/SkillContext';
import skillApi from '../api/skill';
import Button from '../components/Button';
import { InputSkillTitle, InputSkillDesc, InputSkillComment, InputSkillRating } from '../components/forms';

const EditModal = ({ skill, setSkill, toggleEditModal }) => {
  const dispatch = useDispatchSkills();

  const [editedSkill, setEditedSkill] = useState({ ...skill });

  const clickCancel = () => toggleEditModal();

  const handleChangeRating = (rate) => setEditedSkill({ ...editedSkill, rating: rate });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    criteriaMode: 'firstError', // デフォルト: "firstError"。全て出力は、"all"。.
    mode: 'onSubmit', // デフォルト: onSubmit。onChange、onBlur、onTouched
    reValidateMode: 'onSubmit', // 2回目以降のバリデーション。デフォルト: onChange。
    defaultValues: {
      // 初回レンダリング時のフォームのデフォルト値
      title: editedSkill.title,
      description: editedSkill.description,
      comment: editedSkill.comment,
    },
  });

  const [error, setError] = useState('');
  const onSubmit = (inputs) => {
    const formedBook = {
      _id: editedSkill._id,
      rating: editedSkill.rating,
      title: inputs.title,
      description: inputs.description,
      comment: inputs.comment,
    };

    skillApi
      .patch(formedSkill)
      .then((_editedSkill) => {
        dispatch({ type: 'skill/update', skill: _editedSkill });
        reset();
        setSkill(_editedSkill);
        toggleEditModal();
      })
      .catch((e) => {
        console.log('error occured!', e);
        setError(e);
      });
  };

  return (
    <div className="modal-container">
      <form className="modal" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="page-title">
          [{editedSkill.title}]<span>を編集</span>
        </h3>

        <InputSkillTitle register={register} errors={errors} />
        {/* <InputSkillDesc register={register} errors={errors} /> */}
        <InputSkillComment register={register} errors={errors} />
        <InputSkillRating rating={editedSkill.rating} onChange={handleChangeRating} />

        <div className="error-msg text-center">{error}</div>

        <div className="footer">
          <Button className="gray mr-16" onClick={clickCancel}>
            キャンセル
          </Button>
          <Button className="blue">確定する</Button>
        </div>
      </form>
    </div>
  );
};

export default EditModal;
