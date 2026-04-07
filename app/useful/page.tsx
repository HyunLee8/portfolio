"use client";

import Link from "next/link";
import { useState } from "react";

const tools = [
  {
    title: "SpotPitch",
    category: "Audio",
    description: "Attaches itself to Spotify and lets you control the reverb and wetness of whatever music is playing. Just run the install command, then use spotpitch to launch.",
    install: "curl -fsSL https://raw.githubusercontent.com/HyunLee8/SpotPitch/main/install.sh | bash",
    usage: "spotpitch",
    note: "Opens Spotify + GUI",
  },
  {
    title: "SpotX",
    category: "Adblock",
    description: "Removes all ads from Spotify desktop.",
    install: "bash <(curl -sSL https://spotx-official.github.io/run.sh)",
    note: "fudge these ads",
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400 hover:text-gray-900 transition-colors duration-300 cursor-pointer"
    >
      {copied ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  );
}

export default function Useful() {
  return (
    <div className="min-h-screen p-4 sm:p-8 bg-white">
      <Link href="/" className="fixed top-4 sm:top-10 left-1/2 -translate-x-1/2 font-medium text-sm hover:underline underline-offset-4 transition-all z-50">
        ← back
      </Link>

      <div className="max-w-6xl mx-auto py-16 sm:py-20">
        <div className="mb-12 sm:mb-20">
          <h1 className="text-4xl sm:text-6xl font-light text-gray-900 mb-4 tracking-wide">Useful stuff</h1>
          <div className="w-32 h-0.5 bg-gray-900"></div>
        </div>

        <div className="space-y-16 sm:space-y-24">
          {tools.map((tool, index) => (
            <div key={index} className="group">
              <div>
                <div className="pt-2">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">{tool.category}</p>
                  <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">{tool.title}</h2>
                  <p className="text-lg sm:text-xl text-gray-600 mb-6 italic">{tool.note}</p>

                  <div className="border-l-2 border-gray-200 pl-6 group-hover:border-gray-900 transition-colors duration-300">
                    <p className="text-gray-600 leading-relaxed text-[15px] mb-4">
                      {tool.description}
                    </p>

                    {tool.install && (
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Install</p>
                        <div className="relative">
                          <code className="block text-sm text-gray-500 font-mono bg-gray-50 border border-gray-200 rounded-lg p-4 pr-12 overflow-x-auto">
                            {tool.install}
                          </code>
                          <CopyButton text={tool.install} />
                        </div>
                      </div>
                    )}

                    {tool.usage && (
                      <div className="space-y-2 mt-4">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Run</p>
                        <div className="relative">
                          <code className="block text-sm text-gray-500 font-mono bg-gray-50 border border-gray-200 rounded-lg p-4 pr-12">
                            {tool.usage}
                          </code>
                          <CopyButton text={tool.usage} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
