//
// API service for Notes Frontend
// Uses PUBLIC_NOTES_API_URL environment variable for backend endpoint configuration.
//
const API_BASE = import.meta.env.PUBLIC_NOTES_API_URL || 'http://localhost:8787/api';

type Note = {
  id: string;
  title: string;
  content: string;
  updatedAt: string; // ISO string
  createdAt?: string;
};

type NewNotePayload = {
  title: string;
  content: string;
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`API error ${res.status}: ${body || res.statusText}`);
  }
  if (res.status === 204) {
    // no content
    // @ts-ignore
    return undefined;
  }
  return res.json() as Promise<T>;
}

// PUBLIC_INTERFACE
export async function listNotes(query?: string): Promise<Note[]> {
  /** List notes, optionally filtered by a search query. */
  const q = query ? `?q=${encodeURIComponent(query)}` : '';
  return request<Note[]>(`/notes${q}`, { method: 'GET' });
}

// PUBLIC_INTERFACE
export async function getNote(id: string): Promise<Note> {
  /** Get a single note by id. */
  return request<Note>(`/notes/${encodeURIComponent(id)}`, { method: 'GET' });
}

// PUBLIC_INTERFACE
export async function createNote(payload: NewNotePayload): Promise<Note> {
  /** Create a new note with title and content. */
  return request<Note>(`/notes`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// PUBLIC_INTERFACE
export async function updateNote(id: string, payload: NewNotePayload): Promise<Note> {
  /** Update an existing note by id. */
  return request<Note>(`/notes/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

// PUBLIC_INTERFACE
export async function deleteNote(id: string): Promise<void> {
  /** Delete a note by id. */
  await request<void>(`/notes/${encodeURIComponent(id)}`, { method: 'DELETE' });
}

// PUBLIC_INTERFACE
export function isApiConfigured(): boolean {
  /** Returns true if the API base is set via env var. */
  return Boolean(import.meta.env.PUBLIC_NOTES_API_URL);
}

export type { Note, NewNotePayload };
