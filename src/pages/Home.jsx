import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="min-h-screen bg-[#FFFDF1]">
      <Navbar />
  <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold mb-4 text-[#562F00]">Assistive Decision-Making System</h1>
      <p className="text-[#7A4A1A] leading-relaxed mb-6">
        This system helps you reflect on internship choices by
        highlighting trade-offs and experience patterns.
      </p>
      <p className="text-[#7A4A1A]">
          It does not recommend decisions — it highlights trade-offs
          and prompts reflection.
        </p>
        <button className="mt-8 px-6 py-3 justify-items-center bg-[#FF9644] text-[#562F00] rounded-lg hover:bg-[#FFCE99] transition-colors">
          Start Analysing Now
        </button>
    </div>
</div>
  );
}

export default Home;
