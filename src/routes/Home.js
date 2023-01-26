import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
const Home = () => {
  const [sweet, setSweet] = useState("");
  const [sweets, setSweets] = useState([]);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setSweet(value);
  };
  const getSweets = async () => {
    const q = query(collection(dbService, "sweets"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const sweetObj = {
        ...doc.data(),
        id: doc.id,
      };
      setSweets((prev) => [sweetObj, ...prev]);
    });
  };

  useEffect(() => {
    getSweets();
  }, []);
  console.log(sweets);
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "sweets"), {
        sweet,
        createdAt: Date.now(),
      });
      console.log(docRef.id);
    } catch (error) {
      console.log("Error adding document: ", error);
    }
    setSweet("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={sweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Sweet" />
      </form>
      {sweets.map((sweet) => (
        <h4 key={sweet.id}>{sweet.sweet}</h4>
      ))}
    </div>
  );
};
export default Home;
