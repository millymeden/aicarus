// Commits files to GitHub via the REST API.
// On Vercel the filesystem is read-only, so this is how we persist blog posts & images.

const GITHUB_API = "https://api.github.com";

function getConfig() {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER ?? "millymeden";
  const repo = process.env.GITHUB_REPO ?? "aicarus";
  if (!token) throw new Error("GITHUB_TOKEN env var is not set");
  return { token, owner, repo };
}

async function githubFetch(path: string, options: RequestInit = {}) {
  const { token, owner, repo } = getConfig();
  const url = `${GITHUB_API}/repos/${owner}/${repo}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub API error ${res.status}: ${body}`);
  }
  return res.json();
}

/** Get the current SHA of a file (needed to update it). Returns null if the file doesn't exist. */
async function getFileSha(filePath: string): Promise<string | null> {
  try {
    const data = await githubFetch(`/contents/${filePath}`);
    return data.sha ?? null;
  } catch {
    return null;
  }
}

/** Create or update a file in the repo. content should be the raw string (not base64). */
export async function upsertFile(
  filePath: string,
  content: string,
  commitMessage: string
): Promise<void> {
  const sha = await getFileSha(filePath);
  const body: Record<string, string> = {
    message: commitMessage,
    content: Buffer.from(content).toString("base64"),
  };
  if (sha) body.sha = sha;

  await githubFetch(`/contents/${filePath}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

/** Upload a binary file (e.g. an image) to the repo. content should be a Buffer or Uint8Array. */
export async function upsertBinaryFile(
  filePath: string,
  content: Buffer,
  commitMessage: string
): Promise<void> {
  const sha = await getFileSha(filePath);
  const body: Record<string, string> = {
    message: commitMessage,
    content: content.toString("base64"),
  };
  if (sha) body.sha = sha;

  await githubFetch(`/contents/${filePath}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

/** Delete a file from the repo. */
export async function deleteFile(
  filePath: string,
  commitMessage: string
): Promise<void> {
  const sha = await getFileSha(filePath);
  if (!sha) return; // already gone
  await githubFetch(`/contents/${filePath}`, {
    method: "DELETE",
    body: JSON.stringify({ message: commitMessage, sha }),
  });
}

/** Build the MDX file content string from post fields. */
export function buildMdxContent(fields: {
  title: string;
  date: string;
  summary: string;
  tags: string[];
  body: string;
}): string {
  const tagList = fields.tags.map((t) => `  - ${t}`).join("\n");
  return `---
title: "${fields.title}"
date: "${fields.date}"
summary: "${fields.summary}"
tags:
${tagList}
---

${fields.body}
`;
}
