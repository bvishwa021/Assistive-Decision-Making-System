import Navbar from "../components/Navbar";
import Grainient from '../components/HomeBg';
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <Navbar />
      <div className="hero">
        <div className="absolute inset-0 -z-10">
          <Grainient
          color1="#fffdf1"
          color2="#ff9644"
          color3="#fffdf1"
          timeSpeed={0.25}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.0}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
          />
        </div>
        <section className="bg-transparent min-h-[80vh] flex flex-col items-center justify-center text-center px-4 z-10">
          <div className="max-w-3xl mx-auto px-6 py-10">
            <h1 className="text-6xl font-bold text-center mb-4 text-[#562F00]">Assistive <br /> Decision-Making System</h1>
            <p className="text-[#7A4A1A] text-lg leading-relaxed mb-6">
              This system helps you reflect on internship choices by
              highlighting trade-offs and experience patterns.
            </p>
            <button 
            className="mt-8 px-6 py-3 justify-items-center bg-[#FF9644] text-[#562F00] text-lg rounded-lg font-semibold hover:bg-[#FFCE99] hover:underline transition-colors"
            onClick={() => navigate('/input')}
            >
              Start Analysing Now
            </button>
          </div>
        </section>
        <div className="justify-items-center">
          <p className="text-[#7A4A1A] text-sm">
            It does not recommend decisions — it highlights trade-offs
            and prompts reflection.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
