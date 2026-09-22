import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Link href="/order-tracking-screen" className="p-4 bg-zinc-300 rounded-lg text-zinc-700 font-semibold hover:bg-zinc-400 transition-colors duration-150">
        Order Tracking Screen
      </Link>
    </div>
  );
}
