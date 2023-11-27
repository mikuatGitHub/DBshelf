import clientPromise from "../lib/mongodb";

export async function getStaticProps(){
  try {
    const client = await clientPromise;/* DB接続 */
    const db = client.db("skillshelf");/* DB名から参照 */

    const skills = await db
    .collection("skills")/* コレクション名から参照 */
    .find({})
    .limit(10)
    .toArray();/* 配列に変換 */

    // res.json(skills);
    // console.log("Skills from getServerSideProps:", skills);

    return {
      props: { skills: JSON.parse(JSON.stringify(skills)) },/* 文字列に変換 */
    };

  } catch (e) {
    console.error(e);
  }
}

export default function Skills(props) {
  // console.log(typeof props) /* object */
  // const str = JSON.stringify(props.skills)

  return (
    <>
      {/* <h1>hello{str}</h1> */}
      <ul>
        {props.skills.map((skill) => (
          <li key={skill._id}>
            {skill.title}
            {skill.description}
            {skill.rating}
            {skill.comment}
          </li>
        ))}
      </ul>
    </>
  );
}
