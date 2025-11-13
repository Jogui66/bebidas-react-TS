import type { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeService"
import type { Categories, Drink, Drinks, RecipeById, SearchFilter } from "../types"
import type { FavoritesSliceType } from "./favoritesSlice"

export type RecipesSliceType = {
    categories: Categories
    drinks: Drinks
    selectedRecipe: RecipeById
    modal: boolean
    fetchCategories: () => Promise<void>
    searchRecipes: (searchFilter : SearchFilter) => Promise<void>
    selectRecipe: (id: Drink['idDrink']) => Promise<void>
    closeModal: () => void
}

export const createRecipiesSlice : StateCreator<RecipesSliceType & FavoritesSliceType, [], [], RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    selectedRecipe: {} as RecipeById,
    modal: false,
    fetchCategories: async () => {
        const categories = await getCategories()
        set({
            categories
        })
    },
    searchRecipes: async (filters) => {
        const drinks = await getRecipes(filters)
        set({
            drinks
        })
    },
    selectRecipe: async (id) => {
        const selectedRecipe = await getRecipeById(id)
        set({
            selectedRecipe,
            modal: true
        })
    },
    closeModal: () => {
        set({
            modal: false,
            selectedRecipe: {} as RecipeById
        })
    }
})