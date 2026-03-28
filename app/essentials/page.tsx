import Link from "next/link";

export default function Essentials() {
  return (
    <div className="min-h-screen p-4 sm:p-8 bg-white">
      <Link href="/" className="fixed top-4 sm:top-10 left-1/2 -translate-x-1/2 font-medium text-sm hover:underline underline-offset-4 transition-all z-50">
        ← back
      </Link>
      
      <div className="max-w-6xl mx-auto py-16 sm:py-20">
        <div className="mb-12 sm:mb-20">
          <h1 className="text-4xl sm:text-6xl font-light text-gray-900 mb-4 tracking-wide">Essentials</h1>
          <div className="w-32 h-0.5 bg-gray-900"></div>
        </div>
        
        <div className="space-y-16 sm:space-y-24">
          <div className="group">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-2">
                <div className="overflow-hidden border border-gray-200 shadow-lg">
                  <img 
                    src="/STUFF4.jpg" 
                    alt="M4 Macbook Pro"
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              
              <div className="lg:col-span-3 pt-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Computing</p>
                <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">M4 Macbook Pro</h2>
                <p className="text-lg sm:text-xl text-gray-600 mb-6 italic">Work</p>
                
                <div className="border-l-2 border-gray-200 pl-6 group-hover:border-gray-900 transition-colors duration-300">
                  <div className="flex gap-4 text-sm text-gray-500 font-mono mb-4">
                    <span>20 CORE CPU</span>
                    <span>•</span>
                    <span>16 CORE GPU</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-[15px]">
                    School, Projects, SSN, etc.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="group">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-2 order-1 lg:order-2">
                <div className="overflow-hidden border border-gray-200 shadow-lg">
                  <img 
                    src="/STUFF1.jpg" 
                    alt="Wired Lightnings"
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              
              <div className="lg:col-span-3 pt-2 order-2 lg:order-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Audio</p>
                <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Wired Lightnings</h2>
                <p className="text-lg sm:text-xl text-gray-600 mb-6 italic">Music</p>
                
                <div className="border-l-2 border-gray-200 pl-6 group-hover:border-gray-900 transition-colors duration-300">
                  <div className="flex gap-4 text-sm text-gray-500 font-mono mb-4">
                    <span>48KHZ</span>
                    <span>•</span>
                    <span>23OHM</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-[15px]">
                    Obey to it
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="group">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-2">
                <div className="overflow-hidden border border-gray-200 shadow-lg">
                  <img 
                    src="/STUFF3.jpg" 
                    alt="Notebook & Pen"
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              
              <div className="lg:col-span-3 pt-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Analog</p>
                <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Notebook & Pen</h2>
                <p className="text-lg sm:text-xl text-gray-600 mb-6 italic">Journaling or Agenda</p>
                
                <div className="border-l-2 border-gray-200 pl-6 group-hover:border-gray-900 transition-colors duration-300">
                  <div className="flex gap-4 text-sm text-gray-500 font-mono mb-4">
                    <span>300 PAGES</span>
                    <span>•</span>
                    <span>LEATHER COVER</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-[15px]">
                    Goldfish Memory
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}