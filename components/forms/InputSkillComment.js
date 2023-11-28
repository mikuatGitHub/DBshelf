export default function InputSkillComment ({ register, errors }) {
  return (
    <>
      <label className="sub-title" htmlFor="skill-comment">
        感想
      </label>
      <textarea
        id="skill-comment"
        placeholder="感想"
        {...register("comment", { required: "感想を入力してください。" })}
      />
      {errors.comment && (
        <div className="error-msg">{errors.comment.message}</div>
      )}
    </>
  );
};
