import { z } from "zod";

export interface Food {
  name: string;
  cal: number;
}

export const FoodSchema = z.object({
  name: z.string(),
  cal: z.number(),
});
