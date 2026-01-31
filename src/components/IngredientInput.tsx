"use client"

import { useState } from "react"
import { cn } from "@/utils/cn"
import { z } from "zod"
import { getRandomCuisine } from "@/app/actions"

const ingredientsSchema = z.string()
  .transform((val) => val.split(",").map((i) => i.trim()).filter((i) => i.length > 0))
  .refine((ingredients) => ingredients.length === 3, {
    message: "Please enter exactly 3 ingredients separated by commas.",
  })
  .refine(
    (ingredients) => ingredients.every((i) => i.length >= 2 && i.length <= 25),
    {
      message: "Each ingredient must be between 2 and 25 characters.",
    }
  )

interface IngredientInputProps {
  className?: string
}

/**
 * IngredientInput component handles the user input for 3 pantry ingredients.
 * Uses Zod for validation of exactly 3 ingredients and length constraints.
 */
export function IngredientInput({ className }: IngredientInputProps) {
  const [value, setValue] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [surpriseCuisine, setSurpriseCuisine] = useState<{ Name: string, Emoji: string } | null>(null)
  const [isSurprising, setIsSurprising] = useState(false)

  const handleSurprise = async () => {
    setIsSurprising(true)
    const cuisine = await getRandomCuisine()
    if (cuisine) {
      setSurpriseCuisine(cuisine)
    }
    setIsSurprising(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const result = ingredientsSchema.safeParse(value)
    
    if (!result.success) {
      setError(result.error.issues[0]?.message || "Invalid input")
      return
    }

    setError(null)
    setIsSubmitting(true)
    
    const ingredients = result.data
    // TODO: Phase 2 - Trigger API call
    console.log("Generating recipe for:", ingredients)
    
    setTimeout(() => {
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className={cn("w-full space-y-4", className)}>
      <div className="space-y-2">
        <label 
          htmlFor="ingredients" 
          className="block text-sm font-semibold text-gray-700"
        >
          Enter 3 Pantry Staples
        </label>
        <div className="relative">
          <input
            type="text"
            id="ingredients"
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              if (error) setError(null)
            }}
            placeholder="e.g., chicken, tomato, basil"
            className={cn(
              "block w-full rounded-xl border-gray-200 shadow-sm transition-all duration-200",
              "focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-4 border",
              error ? "border-red-300 bg-red-50" : "bg-gray-50/50"
            )}
          />
        </div>
        {error && (
          <p className="text-sm text-red-600 font-medium animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={handleSurprise}
          disabled={isSurprising}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-3 px-4 border-2 border-orange-200 rounded-xl text-sm font-bold text-orange-600 transition-all duration-200",
            "hover:bg-orange-50 hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {isSurprising ? (
            <span className="animate-pulse">Selecting...</span>
          ) : surpriseCuisine ? (
            <>
              <span>{surpriseCuisine.Emoji}</span>
              <span>Twist: {surpriseCuisine.Name} Style!</span>
              <span className="ml-auto text-xs font-normal text-orange-400">Tap to change</span>
            </>
          ) : (
            <>
              <span>✨</span>
              <span>Add a Global Twist</span>
            </>
          )}
        </button>

        <button
          type="submit"
          disabled={isSubmitting || !value.trim()}
          className={cn(
            "w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white transition-all duration-200",
            "bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500",
            "disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
          )}
        >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </span>
        ) : (
          "What's for Dinner?"
        )}
      </button>
    </div>

      <p className="text-xs text-center text-gray-400">
        Separate your 3 ingredients with commas
      </p>
    </form>
  )
}
