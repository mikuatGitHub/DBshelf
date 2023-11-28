import { useEffect, useContext, createContext, useReducer } from "react";
import skillApi from "../api/skill";

// 本の追加・更新・削除・初期化のコンテキスト
const SkillContext = createContext();
const SkillDispatchContext = createContext();

// 他のファイルからstateを参照できるようにエクスポート
const useSkills = () => useContext(SkillContext);
const useDispatchSkills = () => useContext(SkillDispatchContext);

const reducer = (skills, action) => {
  switch (action.type) {
    case "skill/init":
      return action.skills;

    case "skill/add":
      return [action.skill, ...skills];

    case "skill/delete":
      return skills.filter((_skill) => _skill._id !== action.skill._id);

    case "skill/update":
      const updatedSkills = skills.filter(
        (_skill) => _skill._id !== action.skill._id
      );
      updatedSkills.unshift(action.skill);
      return updatedSkills;

    default:
      return skills;
  }
};

const SkillProvider = ({ children }) => {
  const [skills, dispatch] = useReducer(reducer, []);

  // 初期化
  useEffect(() => {
    skillApi.getAll().then((_skills) => {
      dispatch({ type: "skill/init", skills: _skills });
    });
  }, []);

  return (
    <SkillContext.Provider value={skills}>
      <SkillDispatchContext.Provider value={dispatch}>
        {children}
      </SkillDispatchContext.Provider>
    </SkillContext.Provider>
  );
};

export { useSkills, useDispatchSkills, SkillProvider };
