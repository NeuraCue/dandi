# Cursor Project Dandi

## Create Project

- `npx create-next-app@latest`
- `sudo chown -R $(whoami):$(whoami) .`
- cd into project directory
- npm install
- npm run dev

## Prompts

```
I want you to create a button that will redirect to /dashboards and that will be the dashboard for managing API Keys. It will have a UI for CRUD API for API Keys.

Ok, now I want you to help me connect this CRUD API to a real database which is hosted on supabase.

I want you in `@Sidebar.tsx` when clicking `API Playground` to go into new page /playground where it will have a form to submit an API Key.
When submitting the form it will go to /protected and than validate that this is indeed a valid API Key. If it is, notify with `@Toast.tsx` with a green popup of `Valid API Key, /protected can be accessed`. If not valid will popup a red `Invalid API Key`.
```

## Composer

- CMD + I -> turn on composer
- CMD + SHIFT + I -> full display
