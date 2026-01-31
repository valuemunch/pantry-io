# Fix Recipe Generation Errors & Upgrade to Gemini 2.5 Flash

## Root Cause Analysis
1.  **`net::ERR_ABORTED`**: The Next.js development server process exited unexpectedly, causing the browser to lose its connection to the API.
2.  **`Invalid recipe format`**: The LLM response failed to parse as valid JSON or did not match the strict Zod schema (likely due to extra text, markdown formatting, or the `vibeName` exceeding the 30-character limit).

## Technical Implementation Plan

### 1. Stability & Infrastructure
- Restart the Next.js development server to resolve the aborted connection issue.

### 2. LLM Configuration Upgrade
- Update the primary model to `gemini-2.5-flash` in [route.ts](file:///c:/dev/playground/trae-hackathon/src/app/api/generateRecipe/route.ts).
- Refine the `prompt` to strictly enforce **minified JSON output** (no whitespaces, no newlines) as requested.
- Explicitly instruct the LLM to keep `vibeName` under 30 characters to prevent Zod validation failures.

### 3. Robust Response Handling
- Enhance the JSON extraction logic in the API route to handle edge cases where the model might still include markdown wrappers or prefix/suffix text.
- Add a dedicated server-side log that outputs the raw LLM response only when parsing fails, facilitating instant debugging.

### 4. Documentation
- Update [prd.md](file:///c:/dev/playground/trae-hackathon/docs/prd.md) and [development-plan.md](file:///c:/dev/playground/trae-hackathon/docs/development-plan.md) to officially document the move to Gemini 2.5 Flash.

## Verification
- Test with the same ingredients (`chicken, tomato, potato`) in the browser.
- Verify in the server console that the response is received from the correct provider and model.
