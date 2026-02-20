import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to Aicarus</h1>
      <p className="text-lg">Explaining AI safety in a way anyone can understand.</p>
    </main>
    </div>
  );
}
