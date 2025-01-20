import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function ZkVMFlamegraphDashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        CPU Bottleneck Analysis (100000-th Fibonacci)
      </h1>
      <Tabs defaultValue="sp1">
        <TabsList className="mb-4">
          <TabsTrigger value="sp1">SP1</TabsTrigger>
          <TabsTrigger value="risc0">RISC Zero</TabsTrigger>
          <TabsTrigger value="jolt">Jolt</TabsTrigger>
          <TabsTrigger value="nexus">Nexus</TabsTrigger>
          <TabsTrigger value="ceno">Ceno</TabsTrigger>
        </TabsList>
        <TabsContent value="sp1">
          <Image
            src="/data/flamegraph/sp1.png"
            alt="SP1 Flamegraph"
            width={1000}
            height={1000}
            className="w-full h-auto"
          />
        </TabsContent>
        <TabsContent value="risc0">
          <Image
            src="/data/flamegraph/risc0.png"
            alt="RISC Zero Flamegraph"
            width={1000}
            height={1000}
            className="w-full h-auto"
          />
        </TabsContent>
        <TabsContent value="jolt">
          <Image
            src="/data/flamegraph/jolt.png"
            alt="Jolt Flamegraph"
            width={1000}
            height={1000}
            className="w-full h-auto"
          />
        </TabsContent>
        <TabsContent value="nexus">
          <Image
            src="/data/flamegraph/nexus.svg"
            alt="Nexus Flamegraph"
            width={1000}
            height={1000}
            className="w-full h-auto"
          />
        </TabsContent>
        <TabsContent value="ceno">
          <Image
            src="/data/flamegraph/ceno.svg"
            alt="Ceno Flamegraph"
            width={1000}
            height={1000}
            className="w-full h-auto"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
