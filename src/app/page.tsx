import { IngredientInput } from "@/components/IngredientInput"
import { RecipeCard } from "@/components/RecipeCard"

/**
 * Main landing page for the application.
 * Implements a mobile-first responsive layout with brand styling.
 */
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-12 md:py-24 bg-orange-50/50">
      <div className="w-full max-w-2xl flex flex-col items-center gap-12">
        {/* Header Section */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-orange-600">
            What&apos;s for Dinner?
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            Pantry Edition
          </p>
          <div className="h-1 w-24 bg-orange-400 mx-auto rounded-full" />
        </header>

        {/* Form and Result Section */}
        <section className="w-full grid gap-8 md:gap-12">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-orange-100">
            <IngredientInput />
          </div>
          
          <div className="w-full">
            <RecipeCard />
          </div>
        </section>

        {/* Footer Info */}
        <footer className="text-center text-sm text-gray-400 mt-8">
          <p>Just 3 ingredients. Zero decision fatigue.</p>
        </footer>
      </div>
    </main>
  )
}
