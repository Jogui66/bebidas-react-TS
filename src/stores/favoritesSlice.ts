import type { StateCreator } from "zustand";
import type { RecipeById } from "../types";
import { createRecipiesSlice, type RecipesSliceType } from "./recipeSlice";
import { createNotificationsSlice, type NotificationsSliceType } from "./notificationSlice";

export type FavoritesSliceType = {
    favorites: RecipeById[]
    handleClickFavorite: (recipe: RecipeById) => void
    favoriteExist: (id: RecipeById['idDrink']) => boolean
    loadFromStorage: () => void
}

export const createFavoritesSlice : StateCreator<FavoritesSliceType & RecipesSliceType & NotificationsSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
    favorites: [],
    handleClickFavorite: (recipe) => {
        if(get().favoriteExist(recipe.idDrink)) {
            set((state) => ({
                favorites: state.favorites.filter( favorite => favorite.idDrink !== recipe.idDrink)
            }))
            createNotificationsSlice(set, get, api).showNotification({
                text: 'Se eliminó de favoritos',
                error: false
            })
        } else {
            set((state) => ({
                favorites: [ ...state.favorites, recipe ]
            }))
            createNotificationsSlice(set, get, api).showNotification({
                text: 'Se agregó a favoritos',
                error: false
            })
        }
        createRecipiesSlice(set, get, api).closeModal()
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    favoriteExist: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites')
        if(storedFavorites) {
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }
})