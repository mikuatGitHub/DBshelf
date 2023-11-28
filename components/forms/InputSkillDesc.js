
export default function InputSkillDesc({ register, errors }) {
  return (
    <>
      <label className="sub-title" htmlFor="skill-desc">
        概要
      </label>
      <textarea
        id="skill-desc"
        placeholder="概要"
        {...register("description", {
          required: "概要を入力してください。",
        })}
      />
      {errors.description && (
        <div className="error-msg">{errors.description.message}</div>
      )}
    </>
  );
};

