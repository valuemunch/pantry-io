import { cn } from "@/utils/cn"
import { Clock, Users, Utensils } from "lucide-react"

export type Recipe = {
  recipeTitle: string
  vibeName: string
  ingredients: string[]
  instructions: string[]
  prepTime: string
  cookTime: string
  servings: string | number
}

interface RecipeCardProps {
  recipe: Recipe | null
  isLoading: boolean
  error: string | null
  className?: string
}

/**
 * RecipeCard component displays the generated recipe details.
 * Handles loading states with skeleton animations and error states.
 */
export function RecipeCard({ recipe, isLoading, error, className }: RecipeCardProps) {
  if (isLoading) {
    return (
      <div className={cn("bg-white shadow-sm rounded-2xl p-6 md:p-8 border border-orange-100 animate-in fade-in zoom-in-95", className)}>
        <div className="animate-pulse space-y-6">
          <div className="space-y-2">
            <div className="h-4 bg-orange-100 rounded w-1/4"></div>
            <div className="h-8 bg-gray-100 rounded w-3/4"></div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-10 bg-gray-50 rounded-xl"></div>
            <div className="h-10 bg-gray-50 rounded-xl"></div>
            <div className="h-10 bg-gray-50 rounded-xl"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-100 rounded w-full"></div>
            <div className="h-4 bg-gray-100 rounded w-full"></div>
            <div className="h-4 bg-gray-100 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={cn("bg-red-50 border border-red-100 rounded-2xl p-6 text-center animate-in fade-in slide-in-from-top-2", className)}>
        <p className="text-red-600 font-bold">Oops! Something went wrong.</p>
        <p className="text-red-500 text-sm mt-1">{error}</p>
        <p className="text-red-400 text-xs mt-3 italic">Try checking your ingredients or global twist selection.</p>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className={cn("text-center py-12 px-6 border-2 border-dashed border-orange-100 rounded-2xl", className)}>
        <div className="bg-orange-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
          <Utensils className="w-6 h-6 text-orange-200" />
        </div>
        <p className="text-gray-400 text-sm font-medium">
          Enter your ingredients above to generate a custom recipe.
        </p>
      </div>
    )
  }

  return (
    <div className={cn("bg-white shadow-xl rounded-2xl overflow-hidden border border-orange-100 animate-in fade-in slide-in-from-bottom-4 duration-500", className)}>
      {/* Header with Vibe */}
      <div className="bg-orange-600 p-6 md:p-8 text-white">
        <span className="text-orange-200 text-xs font-bold uppercase tracking-wider mb-2 block">
          {recipe.vibeName}
        </span>
        <h2 className="text-2xl md:text-3xl font-black leading-tight">
          {recipe.recipeTitle}
        </h2>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center p-3 bg-orange-50 rounded-xl border border-orange-100">
            <Clock className="w-5 h-5 text-orange-600 mb-1" />
            <span className="text-[10px] font-bold text-orange-400 uppercase">Prep</span>
            <span className="text-sm font-bold text-gray-700">{recipe.prepTime}</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-orange-50 rounded-xl border border-orange-100">
            <Utensils className="w-5 h-5 text-orange-600 mb-1" />
            <span className="text-[10px] font-bold text-orange-400 uppercase">Cook</span>
            <span className="text-sm font-bold text-gray-700">{recipe.cookTime}</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-orange-50 rounded-xl border border-orange-100">
            <Users className="w-5 h-5 text-orange-600 mb-1" />
            <span className="text-[10px] font-bold text-orange-400 uppercase">Serves</span>
            <span className="text-sm font-bold text-gray-700">{recipe.servings}</span>
          </div>
        </div>

        {/* Ingredients */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <div className="w-1.5 h-6 bg-orange-500 rounded-full" />
            Ingredients
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-600 bg-gray-50/50 p-2 rounded-lg border border-gray-100">
                <div className="w-1.5 h-1.5 bg-orange-300 rounded-full flex-shrink-0" />
                <span className="text-sm">{ing}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <div className="w-1.5 h-6 bg-orange-500 rounded-full" />
            Instructions
          </h3>
          <ol className="space-y-4">
            {recipe.instructions.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-xs font-bold">
                  {i + 1}
                </span>
                <p className="text-gray-600 text-sm leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
