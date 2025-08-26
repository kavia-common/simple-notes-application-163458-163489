# Simple Notes Frontend (Astro)

A minimalistic, light-themed notes UI built with Astro. Features:
- Add note, Edit note, Delete note, View notes, Search notes
- Sidebar for notes list, main editor area, header with search and Add
- Configurable backend API via environment variable

## Environment variables

Create a `.env` file at the project root (same directory as package.json):

```
PUBLIC_NOTES_API_URL=https://your-backend.example.com/api
```

If not set, the app falls back to `http://localhost:8787/api`.

Note: Only PUBLIC_ prefixed variables are exposed to the client by Astro.

## Scripts

- `npm install`
- `npm run dev` Start local dev server (default port 3000 per astro.config.mjs)
- `npm run build` Production build
- `npm run preview` Preview production build

## Folder structure (key files)

```
src/
  components/
    app/
      Header.astro
      Sidebar.astro
      Editor.astro
    NotesApp.astro
    ThemeToggle.astro
  layouts/
    Layout.astro
  pages/
    index.astro
  services/
    api.ts
  utils/
    debounce.ts
```

## Backend API contract (placeholder)

The app expects these endpoints:
- GET    {PUBLIC_NOTES_API_URL}/notes?q=search  -> [{ id, title, content, updatedAt, createdAt }]
- GET    {PUBLIC_NOTES_API_URL}/notes/:id       -> { id, title, content, updatedAt, createdAt }
- POST   {PUBLIC_NOTES_API_URL}/notes           -> { id, title, content, updatedAt, createdAt }
- PUT    {PUBLIC_NOTES_API_URL}/notes/:id       -> { id, title, content, updatedAt, createdAt }
- DELETE {PUBLIC_NOTES_API_URL}/notes/:id       -> 204 No Content

Adjust in src/services/api.ts if your backend differs.

## Notes

- UI colors: primary #1976d2, accent #ff9800, secondary #ffffff
- Minimalistic design focused on clarity and productivity.
