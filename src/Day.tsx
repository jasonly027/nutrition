import { useEffect, useRef, useState } from "react";
import foodService from "./FoodService";
import { Food } from "./types/Food";
import NavBar from "./NavBar";
import Calender from "./Calender";
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
      <NavBar />
      <div className="flex flex-col align-middle justify-center  my-3">
        <div className="flex justify-center space-x-3 mb-3">
          <button
            onClick={() => setShowSearch(true)}
            className="bg-tblue text-white font-semibold p-2 rounded-md"
          >
            Search for an item
          </button>
          <button
            onClick={() => setShowSearch(false)}
            className="bg-cerulean text-white font-semibold p-2 rounded-md"
          >
            Add a custom item
          </button>
        </div>
        <div className="inline-flex justify-center">
          {showSearch ? <SearchItem></SearchItem> : <CustomItem></CustomItem>}
        </div>
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
  const suggestionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!query) return;

    foodService.search(query, setSuggestions);
  }, [query]);

  return (
    <>
      <div className="w-1/2 flex flex-col">
        <input
          type="text"
          placeholder="Food Item"
          list="suggestions"
          className="p-1 rounded-lg relative w-full border-gray-400 border-2"
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="relative block">
          <div
            ref={suggestionRef}
            className="absolute w-full"
          >
            {suggestions.map((suggest, index) => (
              <Suggestion
                food={suggest}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function Suggestion({ food }: { food: Food }) {
  return (
    <>
      <div
        className="p-1 bg-lavender first:rounded-t-lg last:rounded-b-lg"
      >
        <span className="select-none">
          {food.name} ({food.cal})
        </span>
      </div>
    </>
  );
}

function CustomItem() {
  return (
    <>
      <div className="inline-flex">
        <form className="flex align-middle items-center">
          <input
            type="text"
            placeholder="Food Name"
            className="p-1 rounded-l-lg border-2 border-r-0 border-gray-400 w-2/3"
          />
          <input
            type="text"
            placeholder="Calories"
            className="p-1 border-2 rounded-r-lg border-gray-400 flex-1 w-1/3"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className="size-6 mx-2 inline-block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </form>
      </div>
    </>
  );
}
