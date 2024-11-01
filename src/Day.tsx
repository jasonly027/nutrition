import { InputHTMLAttributes, useEffect, useState } from "react";
import foodService from "./FoodService";
import { Food } from "./types/Food";

export function Day() {
  const [showSearch, setShowSearch] = useState<boolean>(true);

  return (
    <>
      <div className="space-x-3">
        <button onClick={() => setShowSearch(true)}>Search for an item</button>
        <button onClick={() => setShowSearch(false)}>Add a custom item</button>
      </div>
      <br></br>
      {showSearch ? <SearchItem></SearchItem> : <CustomItem></CustomItem>}
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
