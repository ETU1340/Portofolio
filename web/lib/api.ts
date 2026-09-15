const API_URL =
  typeof window === 'undefined'
    ? (process.env.API_INTERNAL_URL ?? 'http://localhost:4000')
    : '';

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message ?? `Erreur ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export function getProjects(params?: {
  type?: string;
  status?: string;
  tech?: string;
  admin?: boolean;
}) {
  const search = new URLSearchParams();
  if (params?.type) search.set('type', params.type);
  if (params?.status) search.set('status', params.status);
  if (params?.tech) search.set('tech', params.tech);
  if (params?.admin) search.set('admin', 'true');
  const qs = search.toString();
  return apiFetch<import('./types').Project[]>(
    `/api/projects${qs ? `?${qs}` : ''}`,
  );
}

export function getProject(slug: string) {
  return apiFetch<import('./types').Project>(`/api/projects/${slug}`);
}

export function getSkills() {
  return apiFetch<import('./types').Skill[]>('/api/skills');
}

export function getProfile() {
  return apiFetch<import('./types').Profile>('/api/profile');
}

export function updateProfile(data: import('./types').Profile) {
  return apiFetch<import('./types').Profile>('/api/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function sendContact(data: {
  senderName: string;
  senderEmail: string;
  subject: string;
  content: string;
}) {
  return apiFetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
