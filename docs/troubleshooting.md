# Troubleshooting

## Deployment Errors

### EBADPLATFORM / Unsupported platform
**Issue**: Vercel deployment fails with an error similar to:
`npm error notsup Unsupported platform for @rollup/rollup-win32-x64-msvc@4.57.1: wanted {"os":"win32","cpu":"x64"} (current: {"os":"linux","cpu":"x64"})`

**Cause**: A platform-specific dependency (like a Windows-only binary) was explicitly added to the `dependencies` or `devDependencies` block in `package.json`. Since Vercel builds on Linux, it cannot install Windows binaries.

**Fix**: 
1. Remove the platform-specific package from `dependencies`:
   ```bash
   npm uninstall @rollup/rollup-win32-x64-msvc
   ```
2. If the package is necessary for local development but platform-specific, ensure it is only in `optionalDependencies` or let the main package (e.g., `vitest` or `tailwindcss`) handle its own platform-specific sub-dependencies automatically.
3. In this project, we removed the explicit `@rollup/rollup-win32-x64-msvc` entry to allow the environment to resolve the correct binary for the host OS.
