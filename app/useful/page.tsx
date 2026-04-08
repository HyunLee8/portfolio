import Link from "next/link";

export default function Useful() {
  return (
    <div className="min-h-screen p-4 sm:p-8 bg-white">
      <Link href="/" className="fixed top-4 sm:top-10 left-1/2 -translate-x-1/2 font-medium text-sm hover:underline underline-offset-4 transition-all z-50">
        ← back
      </Link>
      <div className="pt-30 w-full h-full justify-center items-center gap-20 flex flex-col">
          <div className="flex flex-col justify-center items-center">
            <h1 className="underline">Sound control</h1>
            <div>curl -fsSL https://raw.githubusercontent.com/HyunLee8/SpotPitch/main/install.sh | bash</div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="underline">Freemium</h1>
            <div>{'bash <(curl -sSL https://spotx-official.github.io/run.sh)'}</div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1></h1>
          </div>
      </div>
    </div>
  );
}
