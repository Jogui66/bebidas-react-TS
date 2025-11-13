import { z } from "zod"
import type { CategoriesAPIResponseSchema, DrinkAPIResponse, DrinksAPIResponse, RecipeAPIResponseSchema, SearchFilterSchema } from "../schema/recipes-schema"

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>
export type SearchFilter = z.infer<typeof SearchFilterSchema>
export type Drinks = z.infer<typeof DrinksAPIResponse>
export type Drink = z.infer<typeof DrinkAPIResponse>
export type RecipeById = z.infer<typeof RecipeAPIResponseSchema>