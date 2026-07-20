import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-4 sm:p-8 bg-white">
      <Link href="/" className="fixed top-4 sm:top-10 left-1/2 -translate-x-1/2 font-medium text-sm hover:underline underline-offset-4 transition-all z-50">
        ← back
      </Link>
      
      <div className="max-w-7xl mx-auto py-16 sm:py-20 flex flex-col gap-20 sm:gap-32">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-center group">
          <div className="flex flex-col space-y-1 w-full lg:w-[480px]">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">wallhax - 1st place AI & Datascience </p>
            <h2 className="text-3xl sm:text-4xl mb-6 sm:mb-8 font-bold leading-tight tracking-tight text-gray-900">
              Multi Indoor Mapping
            </h2>

            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-2 sm:space-y-3 border-l-2 border-gray-200 pl-4 sm:pl-5 group-hover:border-gray-900 transition-colors duration-300">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wide">AR Collaboration</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-[15px]">
                  The idea is that multiple iOS devices can map out a space together in real time. Each device streams its ARKit camera pose over the network to a Mac relay server which forwards the packets to every other connected peer. So you can have like 3 or 4 people walking around a building and each person sees where the others are and where theyve been. We built out different operation layouts for military, search and rescue, and firefighter scenarios since each one has pretty different needs for how youd want to coordinate movement through a space.
                </p>
              </div>

              <div className="space-y-2 sm:space-y-3 border-l-2 border-gray-200 pl-4 sm:pl-5 group-hover:border-gray-900 transition-colors duration-300">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wide">3D Reconstruction Viewer</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-[15px]">
                  After the mapping session you can replay everything in the browser. We built a three.js viewer that overlays the ARKit camera trajectories on top of a Luma Gaussian splat of the actual space. You load in the transforms.json that comes out of the mapping pipeline, point it at your Luma capture, and then you can scrub through the timeline or play it back and watch the paths animate through the 3D scene. Theres alignment sliders to line up the ARKit coordinate system with the splat since they dont match up perfectly out of the box.
                </p>
              </div>

              <div className="space-y-2 sm:space-y-3 border-l-2 border-gray-200 pl-4 sm:pl-5 group-hover:border-gray-900 transition-colors duration-300">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wide">Networking</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-[15px]">
                  The relay server handles both UDP and TCP. UDP is for the fast operations like pose packets and peer discovery where the server responds with a mission ID and forwards everything between registered clients. TCP is for the heavier payloads like detected planes and pins that need reliable delivery. Theres also a matplotlib visualizer that plots each clients trajectory live as the packets come in which was super useful for debugging.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:flex-1 space-y-3 sm:space-y-4">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white max-h-[440px]">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/mapper1.mp4#t=5" type="video/mp4" />
                </video>
              </div>
              <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white max-h-[440px]">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/mapper2.mp4#t=2" type="video/mp4" />
                </video>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white h-[280px]">
              <video
                className="w-full -mt-[20%]"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/mapper3.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-center group">
          <div className="flex flex-col space-y-1 w-full lg:w-[480px]">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Gazer</p>
            <h2 className="text-3xl sm:text-4xl mb-6 sm:mb-8 font-bold leading-tight tracking-tight text-gray-900">
              Autonomous Drone Tracking
            </h2>
            
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-2 sm:space-y-3 border-l-2 border-gray-200 pl-4 sm:pl-5 group-hover:border-gray-900 transition-colors duration-300">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wide">Computer Vision Pipeline</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-[15px]">
                The DJI Tellos front-facing camera is mounted at a slight downward pitch from horizontal, and its onboard sensor introduces a consistent blue color cast in the image, but the resolution and frame rate are sufficient for YOLO11n to run real-time object detection. While MediaPipe offers higher-fidelity facial landmark extraction, YOLO maintains detection accuracy at greater distances. Since YOLO11n lacks a dedicated face-detection class, I approximated head position by computing a bounding region over the top 20% of each detected persons bounding box and used that as the tracking target.
                </p>
              </div>

              <div className="space-y-2 sm:space-y-3 border-l-2 border-gray-200 pl-4 sm:pl-5 group-hover:border-gray-900 transition-colors duration-300">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wide">Concurrent Architecture</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-[15px]">
                There are roughly 9 concurrent threads running under the hood, most of them handling either the incoming camera frame stream or dispatching movement commands back to the Tello over its UDP-based SDK interface. The architecture got messy once the codebase scaled up, mainly because I introduced circular imports between modules — the class responsible for initializing the camera connection also ended up owning the frame-buffer/data-passing logic for the control-input handlers, tightly coupling two things that shouldve been decoupled.
               </p>
              </div>

              <div className="space-y-2 sm:space-y-3 border-l-2 border-gray-200 pl-4 sm:pl-5 group-hover:border-gray-900 transition-colors duration-300">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wide">Voice Intelligence</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-[15px]">
                Near the end of the project I attempted to integrate an LLM-driven voice-activation layer, but it underperformed significantly. ElevenLabs speech-to-text/wake-word pipeline had far higher latency and much lower recognition accuracy than advertised. I ended up scrapping the always-on voice activator entirely and fell back to a push-to-talk button instead, though even that implementation struggled with reliable voice command parsing under real-world noise conditions.
                </p>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:flex-1 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <video 
              className="w-full h-full object-cover"
              autoPlay 
              loop 
              muted
              playsInline
            >
              <source src="/drone_demo.mp4#t=25" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-center group">
          <div className="flex flex-col space-y-1 w-full lg:w-[520px]">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Sensor Fusion</p>
            <h2 className="text-3xl sm:text-4xl mb-6 sm:mb-8 font-bold leading-tight tracking-tight text-gray-900">
              Error State Kalman Filter
            </h2>
            
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-2 sm:space-y-3 border-l-2 border-gray-200 pl-4 sm:pl-5 group-hover:border-gray-900 transition-colors duration-300">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wide">What is it</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-[15px]">
                In order to predict the trajectory of literaly anything based on inputs from something like an IMU, in a perfect world an IMU is all you would need. Because it collects accelerometer data and gyro you can pretty much map exactly where you are in an isolated environment. One issue however is that we don’t live in such environment and you have to account for random noise. In real life if i have an IMU on my wrist and start dancing, the more time passes the more i divert from where I should be. You need to have some global corrector which can be something like GPS or SLAM. The algorithm to perform ‘sensor fusion’ is called a Kalman Filter or more specifically for this program an Error State Kalman Filter which instead of calculating the Nominal states, calculates the errors.
                </p>
              </div>

              <div className="space-y-2 sm:space-y-3 border-l-2 border-gray-200 pl-4 sm:pl-5 group-hover:border-gray-900 transition-colors duration-300">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wide">Technical Overview</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-[15px]">
                On a high level overview most of the intuition comes from understanding the probability side of things and once you go deeper it’ll be the Calculus and Linear algebra side of things. Basically let’s say we have some data on velocity and position and they are correlated with an upward trend. We form a covariance matrix which is a gaussian cloud centered at one point at a certain frame w.r.t velocity and position. We need some way to ‘predict’ the next state and so every point in the gaussian cloud is mapped to form another ‘prediction’ gaussian cloud. We then take sensor data (GPS global stabilizer or SLAM) and add random noise to form another gaussian cloud around that one point and then perform a probabilistic fusion between these two predicted cloud and sensor data cloud to get another gaussian w/ noise and extract the mean value.
                </p>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:flex-1 space-y-4">
            <Link href="https://arxiv.org/pdf/1711.02508" className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white">
                <img 
                  src="/ESKF1.png" 
                  alt="ESKF Analysis 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white">
                <img 
                  src="/ESKF2.png" 
                  alt="ESKF Analysis 2"
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
            
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white">
                <img 
                  src="/ESKF3.png" 
                  alt="ESKF Analysis 3"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white">
                <img 
                  src="/ESKF4.png" 
                  alt="ESKF Analysis 4"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white">
                <img 
                  src="/ESKF5.png" 
                  alt="ESKF Analysis 5"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-center group">
          <div className="flex flex-col space-y-1 w-full lg:w-[480px]">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">BOE protocol</p>
            <h2 className="text-3xl sm:text-4xl mb-6 sm:mb-8 font-bold leading-tight tracking-tight text-gray-900">
              NOC Engine - 2.11.101
            </h2>
            
            <div className="space-y-6 sm:space-y-8">

              <div className="space-y-2 sm:space-y-3 border-l-2 border-gray-200 pl-4 sm:pl-5 group-hover:border-gray-900 transition-colors duration-300">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wide">Data Structure</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-[15px]">
                  This program demands strict organization as each message field is parsed directly from bytes. The shell of the entire message is built on top of just one class. Every large group of messages will be stored within classes and every class will have every possible type of message field it can have whether it is optional or not. All message field types are strongly encouraged to be used with an enum class in order to trace through errors more efficiently and also string lengths should also be stored in an enum to make sure you are indexing through correctly.
                </p>
              </div>

              <div className="space-y-2 sm:space-y-3 border-l-2 border-gray-200 pl-4 sm:pl-5 group-hover:border-gray-900 transition-colors duration-300">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wide">Parsing</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-[15px]">
                  Any field that can be optional will be casted with std::optional which is just the first thing I thought of however I am sure there are better alternatives. The message pretty much starts off w/ required fields but once it approaches one that is dynamic it will have a prefix that tells how long or what exactly the next part of the message will contain. Using this prefix we can predict the offset of how much hex to read with an index variable which takes care of the diverging offsets issue. Handling bitfields was also really annoying as this was the biggest optional fields section I had to fill out w/ many rules on which ones are repeating or which ones can only appear at the end of the optional sections.
                </p>
              </div>
            </div>
          </div>
          
          <Link href="https://www.cboe.com/document/tech-spec/content/technical-specifications/cboe-titanium-u.s.-equities-boe-specification/list-of-message-types/member-to-cboe" className="w-full lg:flex-1 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white">
              <img
                src="/CBOE1.png"
                alt="LSTM Training Metrics"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white">
              <img
                src="/CBOE2.png"
                alt="LSTM Performance Analysis"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}