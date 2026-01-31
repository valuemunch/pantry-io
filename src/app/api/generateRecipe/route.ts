import { NextResponse } from 'next/server'
import { z } from 'zod'

export const runtime = 'edge'

const requestSchema = z.object({
  ingredients: z.array(z.string().min(2).max(25)).length(3),
  cuisine: z.string().optional(),
})

const recipeSchema = z.object({
  recipeTitle: z.string(),
  vibeName: z.string().max(30),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
  prepTime: z.string(),
  cookTime: z.string(),
  servings: z.union([z.string(), z.number()]),
})

/**
 * API Route for generating recipes using Google Gemini API (fallback to OpenAI or Chutes).
 * Implements strict JSON output validation and error handling.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validation = requestSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.format() },
        { status: 400 }
      )
    }

    const { ingredients, cuisine } = validation.data
    
    // Priority: Gemini -> Chutes -> OpenAI
    const geminiKey = process.env.GEMINI_API_KEY
    const chutesKey = process.env.CHUTES_API_KEY
    const openaiKey = process.env.OPENAI_API_KEY

    const cuisinePrompt = cuisine ? ` in ${cuisine} style` : ''
    const prompt = `You are a creative chef. Generate a delicious recipe using exactly these 3 ingredients: ${ingredients.join(', ')}${cuisinePrompt}. 
You can assume the user has basic pantry staples like oil, salt, pepper, and water.
Return the recipe strictly in the following JSON format:
{
  "recipeTitle": "Name of the dish",
  "vibeName": "A short (max 30 chars) descriptive vibe like 'Cozy Sunday Dinner'",
  "ingredients": ["list of ingredients including the 3 provided plus any basic staples used"],
  "instructions": ["step by step instructions"],
  "prepTime": "estimated prep time",
  "cookTime": "estimated cook time",
  "servings": "number of servings"
}
Constraints:
- vibeName MUST be 30 characters or less.
- Output MUST be a single line of minified JSON.
- No markdown formatting, no backticks, no extra text.
Only return the JSON string, no other text.`

    let response: Response
    let provider = ''
    let model = ''
    const startTime = Date.now()

    if (geminiKey) {
      provider = 'Gemini'
      model = 'gemini-2.5-flash'
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`
      
      response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.7,
            maxOutputTokens: 1024,
          }
        })
      })
    } else if (chutesKey) {
      provider = 'Chutes'
      model = 'moonshotai/Kimi-K2.5-TEE'
      response = await fetch('https://llm.chutes.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${chutesKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 1024,
          temperature: 0.7,
          response_format: { type: 'json_object' }
        }),
      })
    } else if (openaiKey) {
      provider = 'OpenAI'
      model = 'gpt-4o-mini'
      response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 1024,
          temperature: 0.7,
          response_format: { type: 'json_object' }
        }),
      })
    } else {
      return NextResponse.json(
        { error: 'No LLM API key configured. Please set GEMINI_API_KEY, CHUTES_API_KEY, or OPENAI_API_KEY.' },
        { status: 500 }
      )
    }

    const duration = Date.now() - startTime
    console.log(`[Observability] LLM Latency: ${duration}ms | Model: ${model} | Provider: ${provider}`)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error(`${provider} API error:`, errorData)
      return NextResponse.json(
        { error: `Failed to generate recipe from ${provider}`, details: errorData },
        { status: 502 }
      )
    }

    const data = await response.json()
    let content = ''

    if (provider === 'Gemini') {
      content = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
    } else {
      content = data.choices?.[0]?.message?.content || ''
    }

    if (!content) {
      return NextResponse.json(
        { error: `Empty response from ${provider}`, data },
        { status: 502 }
      )
    }

    try {
      // Remove potential markdown code blocks if the LLM included them
      // And also any leading/trailing text that might have slipped in
      let cleanContent = content.trim()
      
      // Try to find the first '{' and last '}' to extract the JSON object
      const startIdx = cleanContent.indexOf('{')
      const endIdx = cleanContent.lastIndexOf('}')
      
      if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
        cleanContent = cleanContent.substring(startIdx, endIdx + 1)
      }

      // Remove markdown code blocks again just in case
      cleanContent = cleanContent.replace(/```json\n?|```/g, '').trim()
      
      const recipe = JSON.parse(cleanContent)
      const validatedRecipe = recipeSchema.parse(recipe)
      return NextResponse.json(validatedRecipe)
    } catch (e) {
      console.error('[API] Failed to parse or validate recipe JSON.')
      console.error('[API] Error details:', e)
      console.error('[API] Raw LLM content was:', content)
      
      return NextResponse.json(
        { 
          error: 'Invalid recipe format received from LLM', 
          details: e instanceof Error ? e.message : 'Unknown error',
          content 
        },
        { status: 502 }
      )
    }
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
