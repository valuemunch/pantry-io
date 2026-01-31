-- Create the CuisineStyle table following PascalCase naming conventions
CREATE TABLE "CuisineStyle" (
    "CuisineStyleId" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "Name" TEXT NOT NULL,
    "Emoji" TEXT NOT NULL,
    "CreatedAt" TIMESTAMPTZ DEFAULT NOW()
);
