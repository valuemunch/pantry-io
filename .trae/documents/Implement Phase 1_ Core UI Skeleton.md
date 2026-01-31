# Phase 1: Core UI Skeleton Implementation Plan (Simplified)

## 1. Responsive Layout & Theme (Task 1.1)
- **Brand Colors**: Configure Tailwind with the primary brand color `#F97316` (Orange 500-600 range).
- **Layout Refactor**: Clean up [page.tsx](file:///c:/dev/playground/trae-hackathon/src/app/page.tsx) and [layout.tsx](file:///c:/dev/playground/trae-hackathon/src/app/layout.tsx) to provide a centered, mobile-first container with a clean "Pantry Edition" header.

## 2. Ingredient Input Form (Task 1.2)
- **Functional Form**: Update [IngredientInput.tsx](file:///c:/dev/playground/trae-hackathon/src/components/IngredientInput.tsx) to include:
  - An active text input for comma-separated ingredients.
  - **Manual Validation**: Use simple TypeScript logic instead of Zod for faster implementation:
    - Split by commas and trim.
    - Check for exactly 3 ingredients.
    - Check each ingredient length (2-25 chars).
  - Error messages for invalid input.
  - A "Generate Recipe" submit button.

## 3. Global Twist Feature (Task 1.3)
- **Surprise Me Button**: Add a button to trigger a random cuisine selection.
- **Supabase Integration**: Implement a fetch in [actions.ts](file:///c:/dev/playground/trae-hackathon/src/app/actions.ts) to get a random row from the `CuisineStyle` table.

## 4. Testing Infrastructure (Task 1.4)
- **Tooling**: Install and configure `Vitest` and `React Testing Library`.
- **Unit Tests**: Create [IngredientInput.test.tsx](file:///c:/dev/playground/trae-hackathon/src/components/__tests__/IngredientInput.test.tsx) to ensure the validation logic correctly identifies valid/invalid ingredient lists.

## Why skip Zod?
- **Speed**: Manual validation for a single string input is faster to write and doesn't require importing external schema logic.
- **Simplicity**: Aligns with your preference for the "simplest structure" since we only have one validation rule.

**Shall I proceed with this simplified plan?**