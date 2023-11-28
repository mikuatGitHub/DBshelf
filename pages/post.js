// import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

import {
  InputSkillTitle,
  InputSkillDesc,
  InputSkillComment,
  InputSkillRating,
} from "../components/forms";

import skillApi from "../api/skill";
import { useDispatchSkills } from "../contexts/SkillContext";

import Button from "../components/Button";

export default function Post(){
  const dispatch = useDispatchSkills();
  // const navigate = useNavigate();

  //rating
  const [rating, setRating] = useState(1);
  const handleChangeRating = (rating) => setRating(rating);

  //form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // デフォルト: "firstError"。全て出力は、"all"。
    criteriaMode: "firstError",
    // デフォルト: onSubmit。onChange、onBlur、onTouched
    mode: "onSubmit",
    // 2回目以降のバリデーション。デフォルト: onChange。
    reValidateMode: "onSubmit",
  });

  const onSubmit = (data) => {
    data.rating = rating;
    console.log(data)/* formInputData */
    
    skillApi
      .post(data)
      .then((_Postres) => {
        dispatch({ type: "skill/add", skill: _Postres });
        // reset();
        // navigate("/skills");
      })
      .catch((e) => {
        console.log("error occured!", e);
      });
  };

  return (
    <div className="small-container">
      <h2 className="page-title">新規投稿フォーム</h2>

      <form onSubmit={handleSubmit(onSubmit)}>

        <InputSkillTitle register={register} errors={errors} />
        <InputSkillDesc register={register} errors={errors} />
        <InputSkillComment register={register} errors={errors} />
        <InputSkillRating rating={rating} onChange={handleChangeRating} />


        <div className="footer">
          <button type="submit">submit</button>
          {/* <Button className="blue">追加する</Button> */}
        </div>

      </form>
    </div>
  );
};
