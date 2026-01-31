# Fix Truncated JSON Response & Improve Reliability

## Root Cause Analysis
The "Unterminated string in JSON" error indicates that the LLM response is being cut off mid-sentence. This typically happens when the model exceeds its token limit or encounters an internal generation error. The recent "single-line minified JSON" constraint might also be putting unnecessary pressure on the model, leading to truncation.

## Technical Implementation Plan

### 1. Upgrade LLM Reliability
- **Increase Token Limit**: Raise `maxOutputTokens` from `1024` to `2048` to ensure complex recipes have plenty of room to finish.
- **Implement Native JSON Schema**: Use Gemini's `response_schema` configuration in the API request. This offloads the structural enforcement to the model's internal engine rather than relying solely on prompt instructions.
- **Relax Formatting Constraints**: Remove the "single line" and "minified" requirements. Standard JSON parsing handles whitespace and newlines natively, and allowing the model to use them often results in more stable generation.

### 2. Robust API Error Handling
- **Detailed Logging**: Update the API to log the `finishReason` from the Gemini response. This will help identify if the model is stopping due to safety filters, token limits, or other reasons.
- **Sanitize Input**: Ensure that the `ingredients` array is properly cleaned before being sent to the prompt.

### 3. Verification
- Test with the problematic input (`chicken, tomato, potato`) and verify that the full JSON is returned and successfully parsed by the Zod schema.
- Check the server logs for the new observability metrics (Latency, Provider, Model, and Finish Reason).

## Documentation
- No documentation updates are required for this bug fix, as the core functionality and model selection remain the same.
