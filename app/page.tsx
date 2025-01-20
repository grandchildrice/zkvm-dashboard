/* eslint-disable @next/next/no-img-element */
import ZkVMFlamegraphDashboard from "@/components/zkvm-flamegraph-dashboard";
import ZkVMPerformanceDashboard from "@/components/zkvm-performance-dashboard";

const zkVMmethods = [
  {
    name: "SP1",
    github: "https://github.com/succinctlabs/sp1",
    logo: "https://docs.succinct.xyz/assets/images/sp1-95bcd700ff147045135ad0d0e96a2722.png",
  },
  {
    name: "RISC Zero",
    github: "https://github.com/risc0/risc0",
    logo: "https://pbs.twimg.com/profile_images/1824823661762646016/xQd1gtWT_400x400.jpg",
  },
  {
    name: "Jolt",
    github: "https://github.com/a16z/jolt",
    logo: "https://api.a16zcrypto.com/wp-content/uploads/2024/04/JOLT_Final_02042024-1.png",
  },
  {
    name: "Nexus",
    github: "https://github.com/nexus-xyz/nexus-zkvm",
    logo: "https://framerusercontent.com/images/rj7WYEn8kN0pgryMvb583AzieU.png",
  },
  {
    name: "Ceno",
    github: "https://github.com/scroll-tech/ceno",
    logo: "https://miro.medium.com/v2/resize:fit:887/0*2siyPYPJj5Gum4ln.png",
  },
];

export default function Home() {
  return (
    <div className="max-w-screen grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-5xl font-bold mb-6 text-center m-auto">
          zkVM Benchmarks
        </h1>

        <div className="flex space-x-8 space-y-4 mb-8 mx-auto flex-wrap justify-center items-end">
          {zkVMmethods.map((method) => (
            <a
              key={method.name}
              className="text-center transform transition-transform duration-300 hover:scale-110"
              href={method.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={method.logo}
                alt={`${method.name} Logo`}
                className="h-20 mb-2"
              />
              <div className="font-semibold">{method.name}</div>
            </a>
          ))}
        </div>

        <ZkVMPerformanceDashboard />
        <ZkVMFlamegraphDashboard />
      </main>
    </div>
  );
}
