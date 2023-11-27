// /api/skills/[id]
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

// import React, { createContext, useContext, useState, useEffect } from "react";
// import { useRouter } from "next/router"

export default async (req, res) => {

    const client = await clientPromise;
    const db = client.db("skillshelf");

    // const router = useRouter();
    // const { id } = router.query;

    // return (
    //   <div>
    //     <h1>hello</h1>
    //   </div>
    // );

    // MongoDBの _id フィールドはObjectID型で格納されている。_id検索はObjectIDに変換する必要がある。
    const skill= await db
      .collection("skills")
      .findOne({ _id: ObjectId("655989767be3fb6c6a7d38f1") })

    res.json(skill);

};
