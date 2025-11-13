import type { StateCreator } from "zustand";
import AIService from "../services/AIService";

export type AISliceType = {
    recipe: string
    isGenereting: boolean
    generateRecipe: (prompt: string) => Promise<void>
}

export const createAISlice : StateCreator<AISliceType>= (set) => ({
    recipe: '',
    isGenereting: false,
    generateRecipe: async (prompt) => {
        set({recipe: '', isGenereting: true})
        const data = await AIService.generateRecipe(prompt)

        for await (const textPart of data) {
            
            set((state => ({
                recipe: state.recipe + textPart
            })))

        }
        set({ isGenereting: false })
    }
})