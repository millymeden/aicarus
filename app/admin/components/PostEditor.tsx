"use client";

import { useState, useRef, useCallback, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface PostEditorProps {
  initialSlug?: string;
  initialTitle?: string;
  initialDate?: string;
  initialSummary?: string;
  initialTags?: string;
  initialBody?: string;
  isNew?: boolean;
}

export default function PostEditor({
  initialSlug = "",
  initialTitle = "",
  initialDate = new Date().toISOString().split("T")[0],
  initialSummary = "",
  initialTags = "",
  initialBody = "",
  isNew = true,
}: PostEditorProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialTitle);
  const [date, setDate] = useState(initialDate);
  const [summary, setSummary] = useState(initialSummary);
  const [tags, setTags] = useState(initialTags);
  const [body, setBody] = useState(initialBody);

  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">("idle");
  const [saveError, setSaveError] = useState("");

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Insert text at cursor position in the body textarea
  function insertAtCursor(text: string) {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const newBody = body.slice(0, start) + text + body.slice(end);
    setBody(newBody);
    // Move cursor after inserted text
    requestAnimationFrame(() => {
      el.selectionStart = el.selectionEnd = start + text.length;
      el.focus();
    });
  }

  async function handleImageUpload(file: File) {
    setUploading(true);
    setUploadError("");
    setUploadedUrl("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/images", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setUploadError(data.error ?? "Upload failed.");
      } else {
        setUploadedUrl(data.url);
        // Auto-insert an image tag into the body
        insertAtCursor(`\n![${file.name}](${data.url})\n`);
      }
    } catch {
      setUploadError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file) handleImageUpload(file);
    },
    [body]
  );

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaveStatus("idle");
    setSaveError("");

    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: isNew ? undefined : initialSlug,
          title,
          date,
          summary,
          tags,
          body,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSaveStatus("error");
        setSaveError(data.error ?? "Save failed.");
      } else {
        setSaveStatus("saved");
        if (isNew) {
          // Redirect to the edit page so the URL has the real slug
          router.push(`/admin/posts/${data.slug}`);
        }
      }
    } catch {
      setSaveStatus("error");
      setSaveError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Metadata fields */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Post details
        </h2>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Why AI safety matters"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Tags{" "}
              <span className="text-gray-400 font-normal">(comma-separated)</span>
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. AI safety, policy"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Summary{" "}
            <span className="text-gray-400 font-normal">(shown on the blog listing page)</span>
          </label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={2}
            placeholder="A short description of the post…"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition resize-none"
          />
        </div>
      </div>

      {/* Body / MDX editor */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Post content
          </h2>
          <span className="text-xs text-gray-400">Markdown / MDX supported</span>
        </div>

        {/* Quick-format toolbar */}
        <div className="flex flex-wrap gap-2">
          {[
            { label: "B", action: () => insertAtCursor("**bold text**"), title: "Bold" },
            { label: "I", action: () => insertAtCursor("*italic text*"), title: "Italic" },
            { label: "H2", action: () => insertAtCursor("\n## Heading\n"), title: "Heading 2" },
            { label: "H3", action: () => insertAtCursor("\n### Heading\n"), title: "Heading 3" },
            { label: "Link", action: () => insertAtCursor("[link text](https://)"), title: "Link" },
            { label: "Quote", action: () => insertAtCursor("\n> Blockquote\n"), title: "Blockquote" },
            { label: "Code", action: () => insertAtCursor("`code`"), title: "Inline code" },
            {
              label: "```",
              action: () => insertAtCursor("\n```\ncode block\n```\n"),
              title: "Code block",
            },
            { label: "---", action: () => insertAtCursor("\n---\n"), title: "Divider" },
          ].map(({ label, action, title }) => (
            <button
              key={label}
              type="button"
              onClick={action}
              title={title}
              className="px-2.5 py-1 text-xs font-mono bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 transition"
            >
              {label}
            </button>
          ))}
        </div>

        <textarea
          ref={textareaRef}
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={24}
          placeholder="Write your post here using Markdown…"
          className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm font-mono text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition resize-y"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        />
      </div>

      {/* Image uploader */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Upload image
        </h2>
        <p className="text-xs text-gray-400">
          Drag &amp; drop an image onto the editor above, or use the button below. The image tag
          will be inserted automatically.
        </p>

        <div
          className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-blue-300 transition cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (file) handleImageUpload(file);
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          {uploading ? (
            <p className="text-sm text-gray-500">Uploading…</p>
          ) : (
            <>
              <p className="text-sm text-gray-500">Click to browse, or drag an image here</p>
              <p className="text-xs text-gray-400 mt-1">JPEG, PNG, GIF, WebP, SVG — max 5 MB</p>
            </>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageUpload(file);
            e.target.value = "";
          }}
        />

        {uploadError && (
          <p className="text-sm text-red-600">{uploadError}</p>
        )}
        {uploadedUrl && (
          <p className="text-sm text-green-600">
            ✓ Uploaded — image inserted into your post.{" "}
            <span className="text-gray-400 font-mono text-xs">{uploadedUrl}</span>
          </p>
        )}
      </div>

      {/* Save bar */}
      <div className="flex items-center justify-between gap-4 pb-10">
        <div>
          {saveStatus === "saved" && (
            <p className="text-sm text-green-600">
              ✓ Saved &amp; pushed to GitHub — site will update in ~30 seconds.
            </p>
          )}
          {saveStatus === "error" && (
            <p className="text-sm text-red-600">{saveError}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/admin"
            className="text-sm text-gray-500 hover:text-gray-900 transition"
          >
            ← Back to dashboard
          </a>
          <button
            type="submit"
            disabled={saving}
            className="bg-gray-900 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg px-6 py-2.5 text-sm transition"
          >
            {saving ? "Saving…" : isNew ? "Publish post" : "Save changes"}
          </button>
        </div>
      </div>
    </form>
  );
}
