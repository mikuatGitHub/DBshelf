export default function InputSkillTitle ({ register, errors }) {
  return (
    <>
      <label className="sub-title" htmlFor="skill-title">
        タイトル
      </label>
      <input
        type="text"
        id="skill-title"
        placeholder="タイトル"
        {...register("title", {
          required: "タイトルを入力してください。",
        })}
      />
      {errors.title && <div className="error-msg">{errors.title.message}</div>}
    </>
  );
};
