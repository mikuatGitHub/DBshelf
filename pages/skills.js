import clientPromise from "../lib/mongodb";
import Card from "../components/Card";
import Link from "next/link";

export default function Skills(props){
  return (
    <>
      <h1 className="page-title">スキル一覧(MongoDBより取得)</h1>
      <Link href="/post">
        Post Page
      </Link>

      <div className="cards">
        {props.skills.map((skill) => (
          <Card key={skill._id} skill={skill} />
        ))}
      </div>
    </>
  );
};


export async function getStaticProps() {
  try {
    const client = await clientPromise;
    const db = client.db("skillshelf");

    const skills = await db.collection("skills").find({}).toArray();

    return {
      props: { skills: JSON.parse(JSON.stringify(skills)) }
    };
  } catch (e) {
    console.error(e);
    return {
      props: { skills: [] }
    };
  }
}
