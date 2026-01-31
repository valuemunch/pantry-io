"use client"

import { useState } from "react"
import { IngredientInput } from "./IngredientInput"
import { RecipeCard, type Recipe } from "./RecipeCard"

/**
 * RecipeSection manages the state for recipe generation.
 * It coordinates data between the IngredientInput and RecipeCard components.
 */
export function RecipeSection() {
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleRecipeGenerated = (newRecipe: Recipe) => {
    setRecipe(newRecipe)
    setIsLoading(false)
    setError(null)
  }

  const handleLoading = (loading: boolean) => {
    setIsLoading(loading)
    if (loading) {
      setError(null)
      // Don't clear the old recipe immediately to avoid flickering, 
      // the RecipeCard handles the loading state overlay.
    }
  }

  const handleError = (errorMessage: string) => {
    setError(errorMessage)
    setIsLoading(false)
    setRecipe(null)
  }

  return (
    <section className="w-full grid gap-8 md:gap-12">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-orange-100">
        <IngredientInput 
          onRecipeGenerated={handleRecipeGenerated} 
          onLoading={handleLoading} 
          onError={handleError}
        />
      </div>
      
      <div className="w-full">
        <RecipeCard 
          recipe={recipe} 
          isLoading={isLoading} 
          error={error} 
        />
      </div>
    </section>
  )
}
