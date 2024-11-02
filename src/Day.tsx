import { InputHTMLAttributes, useEffect, useState } from "react";
import foodService from "./FoodService";
import { Food } from "./types/Food";
import { Auth } from "firebase/auth";
import { getDatabase, ref, get, set, push} from "firebase/database";
import { auth } from "./Firebase";


export function Day() {
  const [showSearch, setShowSearch] = useState<boolean>(true);

  const [foodEntry, setFoodEntry] = useState("");
  const [calories, setCalories] = useState("");


  const handleAddFood = () => {
    const user = auth.currentUser; // Ensure user is authenticated
    if (user) {
      console.log("authed")
      const db = getDatabase();
      const today = new Date();
      const userRef = ref(db, `users/${user.uid}/${today.getMonth() +" "+ today.getDate()+ " "+ today.getFullYear()}/foodEntries`);
      try {
        const newPost = push(userRef)
        set(newPost, {
          name: foodEntry,
          cal: calories
        }).then();

      } catch (e) {
        console.error(e)
      }
    } else {
      console.log("no auth")
    }
  }
  return (
    <>
      <div className="space-x-3">
        <button onClick={() => setShowSearch(true)}>Search for an item</button>
        <button onClick={() => setShowSearch(false)}>Add a custom item</button>
      </div>
      <br></br>
      {showSearch ? <SearchItem></SearchItem> : <CustomItem></CustomItem>}

      <input value = {foodEntry} onChange={(ev => setFoodEntry(ev.target.value))} type="text" className="" placeholder="Food Name"/>
      <input value = {calories} onChange={(ev) => setCalories(ev.target.value)} type="text" className="" placeholder="Calories"/>
      <input className="justify-center font-bold text-white bg-blue-500 rounded-lg p-2 cursor-pointer" type="button" onClick={handleAddFood} value={'Add Food'}/>
    </>
  );
}

function SearchItem() {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Food[]>([
    {
      name: "banana",
      cal: 123
    },
    {
      name: "apple",
      cal: 300
    }
  ]);

  useEffect(() => {
    if (!query) return;

    foodService.search(query, setSuggestions);
  }, [query]);

  return (
    <>
      <input
        type="text"
        placeholder="Food Item"
        className="p-2 rounded-lg w-full"
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul className="w-full ">
        {suggestions.map((suggest, index) => (
          <li className="first:bg-green-300 bg-red-400 text-left" key={index}>{suggest.name}</li>
        ))}
      </ul>
    </>
  );
}

function CustomItem() {
  return <></>;
}
