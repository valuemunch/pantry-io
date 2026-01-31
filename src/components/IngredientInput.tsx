import { cn } from "@/utils/cn"

interface IngredientInputProps {
  className?: string
}

export function IngredientInput({ className }: IngredientInputProps) {
  return (
    <div className={cn("w-full max-w-md", className)}>
      <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
        Enter 3 Ingredients
      </label>
      <input
        type="text"
        id="ingredients"
        placeholder="e.g., chicken, tomato, basil"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
        disabled
      />
      <p className="mt-2 text-sm text-gray-500">
        Feature coming soon...
      </p>
    </div>
  )
}
