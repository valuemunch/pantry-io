"use server"

import { createClient } from "@/lib/supabase/server"

/**
 * Fetches a random cuisine style from the Supabase "CuisineStyle" table.
 * Uses a random offset based on the total count of rows.
 */
export async function getRandomCuisine() {
  const supabase = await createClient()

  // 1. Get total count of cuisines
  const { count, error: countError } = await supabase
    .from("CuisineStyle")
    .select("*", { count: "exact", head: true })

  if (countError || count === null) {
    console.error("Error fetching cuisine count:", countError)
    return null
  }

  // 2. Select a random index
  const randomIndex = Math.floor(Math.random() * count)

  // 3. Fetch the cuisine at that index
  const { data, error: selectError } = await supabase
    .from("CuisineStyle")
    .select("Name, Emoji")
    .range(randomIndex, randomIndex)
    .single()

  if (selectError) {
    console.error("Error fetching random cuisine:", selectError)
    return null
  }

  return data
}
