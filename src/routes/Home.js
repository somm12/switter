import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { collection, orderBy, query, onSnapshot } from "firebase/firestore";
import Sweet from "components/Sweet";
import SweetFactory from "components/SweetFactory";
import "style/home.css";
const Home = ({ userObj }) => {
  const [sweets, setSweets] = useState([]);

  useEffect(() => {
    const q = query(
      collection(dbService, "sweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const sweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: userObj.displayName,
        ...doc.data(),
      }));
      setSweets(sweetArr);
    });
  }, []);
  return (
    <div className="homeWrapper">
      <SweetFactory userObj={userObj} />
      {sweets.map((sweet) => (
        <Sweet
          key={sweet.id}
          sweet={sweet}
          isOwner={sweet.creatorId === userObj.uid}
        />
      ))}
    </div>
  );
};
export default Home;
