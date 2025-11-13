import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipiesSlice, type RecipesSliceType } from "./recipeSlice";
import { createFavoritesSlice, type FavoritesSliceType } from "./favoritesSlice";
import { createNotificationsSlice, type NotificationsSliceType } from "./notificationSlice";
import { createAISlice, type AISliceType } from "./aiSlice";

export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificationsSliceType & AISliceType>()(devtools ((...a) => ({
    ...createRecipiesSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationsSlice(...a),
    ...createAISlice(...a)
})))