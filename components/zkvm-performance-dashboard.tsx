/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const formatNumber = (num: number) => {
  if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
  return num.toString();
}

const fetchData = async (relativePath: string) => {
  try {
    const response = await fetch(relativePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }
    const text = await response.text();

    const rows = text.split('\n').map((row) => row.split(','));
    const headers = rows[0];

    return rows.slice(1).map((row) => {
      const obj: any = {};
      headers.forEach((header, index) => {
        obj[header] = isNaN(parseFloat(row[index])) ? row[index] : parseFloat(row[index]);
      });
      return obj;
    });
  } catch (error) {
    console.error("Error reading CSV:", error);
    throw error;
  }
};

export default function ZkVMPerformanceDashboard() {
  const [fibData, setFibData] = useState<any[]>([]);
  const [matrixData, setMatrixData] = useState<any[]>([]);

  useEffect(() => {
    const fetchAllData = async () => {
      const sp1Fib = await fetchData('/data/report_sp1_fib.csv');
      const risc0Fib = await fetchData('/data/report_risc0_fib.csv');
      const joltFib = await fetchData('/data/report_jolt_fib.csv');
      const nexusFib = await fetchData('/data/report_nexus_fib.csv');
      const cenoFib = await fetchData('/data/report_ceno_fib.csv');

      const sp1Matrix = await fetchData('/data/report_sp1_matrix.csv');
      const risc0Matrix = await fetchData('/data/report_risc0_matrix.csv');
      const joltMatrix = await fetchData('/data/report_jolt_matrix.csv');
      const nexusMatrix = await fetchData('/data/report_nexus_matrix.csv');

      setFibData([
        { name: 'SP1', ...sp1Fib[5] },
        { name: 'RISC Zero', ...risc0Fib[5] },
        { name: 'Jolt', ...joltFib[5] },
        { name: 'Nexus', ...nexusFib[5] },
        { name: 'Ceno', ...cenoFib[5] }
      ]);

      setMatrixData([
        { name: 'SP1', ...sp1Matrix[2] },
        { name: 'RISC Zero', ...risc0Matrix[2] },
        { name: 'Jolt', ...joltMatrix[2] },
        { name: 'Nexus', ...nexusMatrix[2] }
      ]);
    };

    fetchAllData();
  }, []);

  const renderChart = (data: any[], metric: string, title: string) => (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Comparison across different zkVM implementations</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            [metric]: {
              label: metric,
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => formatNumber(value)} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey={metric} fill="var(--color-chart-1)" name={metric} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">zkVM Performance Dashboard</h1>
      <Tabs defaultValue="fibonacci">
        <TabsList className="mb-4">
          <TabsTrigger value="fibonacci">Fibonacci</TabsTrigger>
          <TabsTrigger value="matrix">Matrix Operations</TabsTrigger>
        </TabsList>
        <TabsContent value="fibonacci" className="space-y-4">
          {renderChart(fibData, 'proof_duration_sec', '100000th-Fibonacci - Proof Duration (seconds)')}
          {renderChart(fibData, 'max_memory', '100000th-Fibonacci - Max Memory (GB)')}
        </TabsContent>
        <TabsContent value="matrix" className="space-y-4">
          {renderChart(matrixData, 'proof_duration_sec', '30x30MatrixOps - Proof Duration (seconds)')}
          {renderChart(matrixData, 'max_memory', '30x30MatrixOps - Max Memory (GB)')}
        </TabsContent>
      </Tabs>
    </div>
  )
}

