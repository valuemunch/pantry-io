import { cn } from "@/utils/cn"

interface RecipeCardProps {
  className?: string
}

export function RecipeCard({ className }: RecipeCardProps) {
  return (
    <div className={cn("bg-white shadow rounded-lg p-6", className)}>
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
      <p className="text-center text-gray-500 mt-4">Recipe generation placeholder</p>
    </div>
  )
}
