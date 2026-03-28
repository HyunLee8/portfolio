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
                  <source src="/mapper1.mp4" type="video/mp4" />
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
                  <source src="/mapper2.mp4" type="video/mp4" />
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
                DJI Tello Drone has a camera on the front that is angled a little bit below the parallel and for some reason the camera quality comes in as a hint of blue but it’s good enough for YOLO11n to detect general object. Even though media pipe extracts facial features better, YOLO can detect from farther away but one caveat it can’t detect faces so i had to calculate like the top ⅕ of the body to track.               </p>
              </div>

              <div className="space-y-2 sm:space-y-3 border-l-2 border-gray-200 pl-4 sm:pl-5 group-hover:border-gray-900 transition-colors duration-300">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wide">Concurrent Architecture</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-[15px]">
                There’s around 9 threads running in the back. Most of it is due receiving camera input, and throwing back Tello instructions via the SDK it comes with it. It got pretty messy once the code base got quite big because I accidentally ended up having a bit of circular imports with calling the directions input since in the object where I activated the camera I just lazily had it also take in the camera data. 
               </p>
              </div>

              <div className="space-y-2 sm:space-y-3 border-l-2 border-gray-200 pl-4 sm:pl-5 group-hover:border-gray-900 transition-colors duration-300">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wide">Voice Intelligence</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-[15px]">
                During the end of the project I tried to add an LLM voice activator but it failed pretty bad because 11Eleven labs is pretty shit for how it is advertised. At the end I scrapped the voice activator and just went with a hold button but even then it was pretty bad at detecting voice commands.
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
              <source src="/drone_demo.mp4" type="video/mp4" />
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
                  The program demands organization and you will pay for it like I did if you do not plan ahead. The shell of the entire message is built on top of just one class. Every large group of messages will be stored within classes and every class will have every possible type of message field it can have whether it is optional or not. All message field types are strongly encouraged to be used with an enum class in order to trace through errors more efficiently and also string lengths should also be stored in an enum to make sure you are indexing through correctly.
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
          
          <Link href="https://arxiv.org/pdf/1909.09586" className="w-full lg:flex-1 grid grid-cols-2 gap-3 sm:gap-4">
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