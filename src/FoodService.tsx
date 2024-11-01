import axios from "axios";
import { debounce } from "lodash";
import { Food, FoodSchema } from "./types/Food";

class FoodService {
  static instance: FoodService | null = null;

  constructor() {
    if (FoodService.instance) return FoodService.instance;
    FoodService.instance = this;
  }

  search = debounce(this.search_impl, 1000);

  async search_impl(text: string, setSuggestions: React.Dispatch<React.SetStateAction<Food[]>>) {
    const url = "https://api.nal.usda.gov/fdc/v1/foods/search";
    const response = await axios.get(url, {
      params: {
        api_key: import.meta.env.VITE_USDA_KEY,
        query: text,
        pageSize: 5,
      },
    });

    const raw_foods: any[] = response.data.foods;
    const parsed_foods: Food[] = raw_foods.map((food) => ({
      name: food.description,
      cal: food.foodNutrients[3].value,
    }));

    if (FoodSchema.array().safeParse(parsed_foods).success) {
      setSuggestions(parsed_foods);
    }
  }
}

const foodService = new FoodService();
export default foodService;
