import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  SlidersHorizontal, 
  ArrowRight, 
  RotateCcw, 
  AlertCircle, 
  TrendingDown,
  Building2
} from 'lucide-react';
import type { SimulationState } from '../../types';

export const WhatIfSimulatorPage: React.FC = () => {
  const { selectedProject, runSimulation } = useApp();

  // Simulation Form Controls State
  const [compPct, setCompPct] = useState<number>(selectedProject.compCompletedPct);
  const [legalCount, setLegalCount] = useState<number>(selectedProject.legalDisputesCount);
  const [approvalDays, setApprovalDays] = useState<number>(selectedProject.approvalDelayDays);
  const [rrPct, setRrPct] = useState<number>(selectedProject.rrCompletionPct);

  // Result State
  const [simulationResult, setSimulationResult] = useState<{
    simulatedRisk: number;
    riskReduction: number;
  } | null>(null);

  const handleSimulate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const simState: SimulationState = {
      compCompletedPct: compPct,
      legalDisputesCount: legalCount,
      approvalDelayDays: approvalDays,
      rrCompletionPct: rrPct
    };
    const res = runSimulation(selectedProject.id, simState);
    setSimulationResult(res);
  };

  const handleReset = () => {
    setCompPct(selectedProject.compCompletedPct);
    setLegalCount(selectedProject.legalDisputesCount);
    setApprovalDays(selectedProject.approvalDelayDays);
    setRrPct(selectedProject.rrCompletionPct);
    setSimulationResult(null);
  };

  // Quick Preset Scenarios
  const applyPreset90Comp = () => {
    setCompPct(90);
    setLegalCount(Math.max(0, selectedProject.legalDisputesCount - 8));
    setApprovalDays(10);
    setRrPct(80);
  };

  return (
    <div className="space-y-5">
      {/* Top Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#E2E2E2] pb-3">
        <div>
          <h2 className="text-xl font-black text-[#111111] tracking-tight m-0 flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-[#111111]" />
            What-If Intervention Simulator
          </h2>
          <p className="text-xs text-[#555555] font-medium m-0">
            Simulate administrative interventions and estimate risk score reduction before committing resources
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={applyPreset90Comp}
            className="bg-[#111111] hover:bg-[#333333] text-white text-xs font-bold px-3.5 py-1.5 rounded transition-colors"
          >
            Apply Fast-Track Intervention Preset
          </button>
          <button
            onClick={handleReset}
            className="bg-white hover:bg-[#F5F5F5] text-[#111111] border border-[#D9D9D9] text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Target Project Info Strip */}
      <div className="govt-card p-3 bg-[#111111] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-white" />
          <span className="text-xs font-bold">Active Simulation Target:</span>
          <span className="text-xs font-extrabold text-amber-400">{selectedProject.name} ({selectedProject.id})</span>
        </div>
        <div className="text-xs font-mono">
          State: <strong>{selectedProject.state}</strong> | District: <strong>{selectedProject.district}</strong> | Baseline Risk: <strong className="text-red-400">{selectedProject.riskScore}%</strong>
        </div>
      </div>

      {/* Side-by-Side Main Grid: CURRENT SITUATION vs INTERVENTION SCENARIO */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left Column: CURRENT SITUATION Baseline Controls */}
        <div className="govt-card p-4 space-y-4 bg-white">
          <div className="border-b border-[#E2E2E2] pb-2">
            <h3 className="text-xs font-extrabold text-[#111111] uppercase tracking-wider m-0">
              1. CURRENT SITUATION (Baseline Parameters)
            </h3>
            <p className="text-[11px] text-[#555555] m-0">Adjust intervention sliders to test hypothetical policy changes</p>
          </div>

          <form onSubmit={handleSimulate} className="space-y-4 text-xs">
            {/* Slider 1: Compensation Completed % */}
            <div className="space-y-1 bg-[#F5F5F5] p-2.5 rounded border border-[#D9D9D9]">
              <div className="flex justify-between font-bold text-[#111111]">
                <span>Compensation Disbursement Completed:</span>
                <span className="font-mono text-[#111111]">{selectedProject.compCompletedPct}% → <strong className="text-black">{compPct}%</strong></span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={compPct}
                onChange={(e) => setCompPct(Number(e.target.value))}
                className="w-full accent-[#111111] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#777777] font-mono">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Slider 2: Legal Disputes Count */}
            <div className="space-y-1 bg-[#F5F5F5] p-2.5 rounded border border-[#D9D9D9]">
              <div className="flex justify-between font-bold text-[#111111]">
                <span>Active Legal Disputes Count:</span>
                <span className="font-mono text-[#111111]">{selectedProject.legalDisputesCount} → <strong className="text-black">{legalCount} cases</strong></span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={legalCount}
                onChange={(e) => setLegalCount(Number(e.target.value))}
                className="w-full accent-[#111111] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#777777] font-mono">
                <span>0 Cases</span>
                <span>20 Cases</span>
                <span>40 Cases</span>
              </div>
            </div>

            {/* Slider 3: Approval Delay Days */}
            <div className="space-y-1 bg-[#F5F5F5] p-2.5 rounded border border-[#D9D9D9]">
              <div className="flex justify-between font-bold text-[#111111]">
                <span>Department Clearance Delay:</span>
                <span className="font-mono text-[#111111]">{selectedProject.approvalDelayDays} → <strong className="text-black">{approvalDays} days</strong></span>
              </div>
              <input
                type="range"
                min="0"
                max="120"
                value={approvalDays}
                onChange={(e) => setApprovalDays(Number(e.target.value))}
                className="w-full accent-[#111111] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#777777] font-mono">
                <span>0 Days</span>
                <span>60 Days</span>
                <span>120 Days</span>
              </div>
            </div>

            {/* Slider 4: R&R Completion % */}
            <div className="space-y-1 bg-[#F5F5F5] p-2.5 rounded border border-[#D9D9D9]">
              <div className="flex justify-between font-bold text-[#111111]">
                <span>Resettlement & Rehabilitation (R&R):</span>
                <span className="font-mono text-[#111111]">{selectedProject.rrCompletionPct}% → <strong className="text-black">{rrPct}%</strong></span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={rrPct}
                onChange={(e) => setRrPct(Number(e.target.value))}
                className="w-full accent-[#111111] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#777777] font-mono">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#111111] hover:bg-[#333333] text-white py-2.5 rounded font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <span>Run Intervention Model Simulation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Column: INTERVENTION SCENARIO Results */}
        <div className="govt-card p-4 space-y-4 bg-white flex flex-col justify-between">
          <div className="space-y-3">
            <div className="border-b border-[#E2E2E2] pb-2">
              <h3 className="text-xs font-extrabold text-[#111111] uppercase tracking-wider m-0">
                2. INTERVENTION SCENARIO RESULTS
              </h3>
              <p className="text-[11px] text-[#555555] m-0">Simulated outcome metrics based on machine learning weights</p>
            </div>

            {/* Before vs After Comparison Cards */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-[#F5F5F5] p-3 rounded border border-[#D9D9D9] text-center">
                <div className="text-[10px] font-bold text-[#555555] uppercase">Baseline Current Risk</div>
                <div className="text-3xl font-black text-red-600 font-mono mt-1">{selectedProject.riskScore}%</div>
                <div className="text-[10px] font-bold text-red-700 mt-1 uppercase">{selectedProject.riskCategory}</div>
              </div>

              <div className="bg-[#111111] text-white p-3 rounded border border-black text-center">
                <div className="text-[10px] font-bold text-[#D9D9D9] uppercase">Simulated Risk</div>
                <div className="text-3xl font-black text-green-400 font-mono mt-1">
                  {simulationResult ? `${simulationResult.simulatedRisk}%` : `${selectedProject.riskScore}%`}
                </div>
                <div className="text-[10px] font-bold text-green-300 mt-1 uppercase">
                  {simulationResult 
                    ? (simulationResult.simulatedRisk <= 30 ? 'LOW' : simulationResult.simulatedRisk <= 60 ? 'MEDIUM' : 'HIGH') 
                    : selectedProject.riskCategory}
                </div>
              </div>
            </div>

            {/* Risk Reduction Callout */}
            <div className="p-3 bg-green-50 border border-green-300 rounded flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-green-700" />
                <div>
                  <div className="text-xs font-bold text-green-950">Estimated Risk Reduction:</div>
                  <div className="text-[11px] text-green-800">Impact score improvement from baseline</div>
                </div>
              </div>
              <div className="text-xl font-black text-green-800 font-mono">
                {simulationResult ? `-${simulationResult.riskReduction} pts` : '0 pts'}
              </div>
            </div>

            {/* Simulated Parameter Comparison Table */}
            <div className="border border-[#E2E2E2] rounded overflow-hidden text-xs">
              <table className="w-full border-collapse">
                <thead className="bg-[#F5F5F5] font-bold text-[#111111] border-b border-[#E2E2E2]">
                  <tr>
                    <th className="p-2 text-left">Parameter</th>
                    <th className="p-2 text-center">Current</th>
                    <th className="p-2 text-center">Simulated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E2E2]">
                  <tr>
                    <td className="p-2 font-medium">Compensation Completed</td>
                    <td className="p-2 text-center font-mono">{selectedProject.compCompletedPct}%</td>
                    <td className="p-2 text-center font-mono font-bold text-[#111111]">{compPct}%</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">Legal Disputes</td>
                    <td className="p-2 text-center font-mono">{selectedProject.legalDisputesCount} cases</td>
                    <td className="p-2 text-center font-mono font-bold text-[#111111]">{legalCount} cases</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">Approval Delay</td>
                    <td className="p-2 text-center font-mono">{selectedProject.approvalDelayDays} days</td>
                    <td className="p-2 text-center font-mono font-bold text-[#111111]">{approvalDays} days</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">R&R Completion</td>
                    <td className="p-2 text-center font-mono">{selectedProject.rrCompletionPct}%</td>
                    <td className="p-2 text-center font-mono font-bold text-[#111111]">{rrPct}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Model Disclaimer Notice */}
          <div className="p-2.5 bg-[#F5F5F5] border border-[#D9D9D9] rounded flex items-start gap-2 text-[11px] text-[#555555]">
            <AlertCircle className="w-4 h-4 text-[#777777] shrink-0 mt-0.5" />
            <div>
              <strong>Disclaimer:</strong> Model-based scenario estimate — not a guaranteed outcome. Predictions are derived from trained synthetic decision trees.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
