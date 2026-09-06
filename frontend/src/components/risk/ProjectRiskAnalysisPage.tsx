import React from 'react';
import { useApp } from '../../context/AppContext';
import { RiskBadge } from '../common/RiskBadge';
import { 
  Building2, 
  FileText, 
  AlertTriangle, 
  SlidersHorizontal, 
  Sparkles, 
  CheckCircle2, 
  ShieldAlert
} from 'lucide-react';
import type { AcquisitionStage } from '../../types';

export const ProjectRiskAnalysisPage: React.FC = () => {
  const { selectedProject, setActivePage } = useApp();

  const stages: AcquisitionStage[] = [
    'Notification',
    'Documentation',
    'Compensation',
    'Legal Resolution',
    'R&R',
    'Possession'
  ];

  return (
    <div className="space-y-5">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#E2E2E2] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-[#111111] tracking-tight m-0">
              Project Risk Analysis & SHAP AI Explanation
            </h2>
            <RiskBadge category={selectedProject.riskCategory} score={selectedProject.riskScore} />
          </div>
          <p className="text-xs text-[#555555] font-medium m-0">
            Comprehensive diagnostic analysis for {selectedProject.name} ({selectedProject.id})
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActivePage('simulator')}
            className="bg-[#111111] hover:bg-[#333333] text-white text-xs font-bold px-3.5 py-1.5 rounded flex items-center gap-1.5 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Open What-If Simulator</span>
          </button>
        </div>
      </div>

      {/* 1. Project Profile & AI Predictive Risk Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Project Profile Summary */}
        <div className="govt-card p-4 space-y-3 bg-white">
          <h3 className="text-xs font-extrabold text-[#111111] uppercase tracking-wider border-b border-[#E2E2E2] pb-2 m-0 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-[#111111]" />
            Project Basic Profile
          </h3>
          
          <div className="text-xs space-y-2 text-[#333333]">
            <div className="flex justify-between border-b border-[#F5F5F5] pb-1">
              <span className="text-[#777777] font-medium">Project ID:</span>
              <span className="font-mono font-bold text-[#111111]">{selectedProject.id}</span>
            </div>
            <div className="flex justify-between border-b border-[#F5F5F5] pb-1">
              <span className="text-[#777777] font-medium">Project Name:</span>
              <span className="font-bold text-[#111111]">{selectedProject.name}</span>
            </div>
            <div className="flex justify-between border-b border-[#F5F5F5] pb-1">
              <span className="text-[#777777] font-medium">State / District / Area:</span>
              <span className="font-semibold">{selectedProject.state} / {selectedProject.district} / <strong>{selectedProject.area}</strong></span>
            </div>
            <div className="flex justify-between border-b border-[#F5F5F5] pb-1">
              <span className="text-[#777777] font-medium">Project Type:</span>
              <span className="font-semibold">{selectedProject.type}</span>
            </div>
            <div className="flex justify-between border-b border-[#F5F5F5] pb-1">
              <span className="text-[#777777] font-medium">Total Land Area:</span>
              <span className="font-mono font-bold">{selectedProject.landAreaAcres} Acres</span>
            </div>
            <div className="flex justify-between border-b border-[#F5F5F5] pb-1">
              <span className="text-[#777777] font-medium">Affected Families:</span>
              <span className="font-mono font-bold">{selectedProject.affectedFamilies}</span>
            </div>
            <div className="flex justify-between border-b border-[#F5F5F5] pb-1">
              <span className="text-[#777777] font-medium">Landowners Count:</span>
              <span className="font-mono font-bold">{selectedProject.landownersCount}</span>
            </div>
          </div>
        </div>

        {/* AI Predictive Risk Card */}
        <div className="govt-card p-4 space-y-3 bg-white border-l-4 border-l-red-600">
          <h3 className="text-xs font-extrabold text-[#111111] uppercase tracking-wider border-b border-[#E2E2E2] pb-2 m-0 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-red-600" />
            AI Model Prediction Summary
          </h3>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="bg-[#F5F5F5] p-2.5 rounded border border-[#D9D9D9] text-center">
              <div className="text-[10px] font-bold text-[#555555] uppercase">Delay Probability</div>
              <div className="text-2xl font-black text-red-600 font-mono">{selectedProject.delayProbability}%</div>
            </div>

            <div className="bg-[#F5F5F5] p-2.5 rounded border border-[#D9D9D9] text-center">
              <div className="text-[10px] font-bold text-[#555555] uppercase">Risk Score</div>
              <div className="text-2xl font-black text-[#111111] font-mono">{selectedProject.riskScore}/100</div>
            </div>
          </div>

          <div className="space-y-1.5 text-xs pt-1">
            <div className="flex justify-between border-b border-[#F5F5F5] pb-1">
              <span className="text-[#777777]">Expected Delay:</span>
              <span className="font-bold text-[#111111] font-mono">{selectedProject.expectedDelayDays} Days</span>
            </div>
            <div className="flex justify-between border-b border-[#F5F5F5] pb-1">
              <span className="text-[#777777]">Most Likely Bottleneck:</span>
              <span className="font-extrabold text-red-700 bg-red-50 px-1.5 py-0.5 rounded">
                {selectedProject.primaryBottleneck}
              </span>
            </div>
          </div>
        </div>

        {/* Current Acquisition Operational Progress */}
        <div className="govt-card p-4 space-y-3 bg-white">
          <h3 className="text-xs font-extrabold text-[#111111] uppercase tracking-wider border-b border-[#E2E2E2] pb-2 m-0 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-[#111111]" />
            Acquisition Operational Progress
          </h3>

          <div className="space-y-2 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-0.5">
                <span>Documentation:</span>
                <span className="font-mono">{selectedProject.docCompletionPct}%</span>
              </div>
              <div className="w-full bg-[#E2E2E2] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#111111] h-full" style={{ width: `${selectedProject.docCompletionPct}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-0.5">
                <span>Compensation Disbursement:</span>
                <span className="font-mono">{selectedProject.compCompletedPct}%</span>
              </div>
              <div className="w-full bg-[#E2E2E2] h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-600 h-full" style={{ width: `${selectedProject.compCompletedPct}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-0.5">
                <span>R&R Completion:</span>
                <span className="font-mono">{selectedProject.rrCompletionPct}%</span>
              </div>
              <div className="w-full bg-[#E2E2E2] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#333333] h-full" style={{ width: `${selectedProject.rrCompletionPct}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-0.5">
                <span>Physical Possession:</span>
                <span className="font-mono">{selectedProject.possessionPct}%</span>
              </div>
              <div className="w-full bg-[#E2E2E2] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#111111] h-full" style={{ width: `${selectedProject.possessionPct}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Stage-Wise Risk Breakdown */}
      <div className="govt-card p-4 bg-white">
        <h3 className="text-xs font-extrabold text-[#111111] uppercase tracking-wider border-b border-[#E2E2E2] pb-2 mb-3 m-0">
          Stage-Wise Acquisition Risk Breakdown
        </h3>

        <div className="overflow-x-auto">
          <table className="govt-table">
            <thead>
              <tr>
                <th>Acquisition Stage</th>
                <th>Progress (%)</th>
                <th>Risk Level</th>
                <th>Risk Score</th>
                <th>Administrative Status & Issue Explanation</th>
              </tr>
            </thead>
            <tbody>
              {stages.map((stg) => {
                const detail = selectedProject.stageRisks[stg];
                return (
                  <tr key={stg} className={stg === selectedProject.primaryBottleneck ? 'bg-red-50/50' : ''}>
                    <td className="font-bold text-[#111111] flex items-center gap-1.5">
                      {stg === selectedProject.primaryBottleneck && (
                        <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      )}
                      <span>{stg}</span>
                    </td>
                    <td className="font-mono font-semibold">{detail.progressPct}%</td>
                    <td>
                      <RiskBadge category={detail.status} />
                    </td>
                    <td className="font-mono font-bold text-[#111111]">{detail.riskPct}%</td>
                    <td className="text-[#333333] font-medium">{detail.explanation}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. AI Risk Explanation (SHAP Contribution Analysis) */}
      <div className="govt-card p-4 space-y-3 bg-white">
        <div className="flex items-center justify-between border-b border-[#E2E2E2] pb-2">
          <div>
            <h3 className="text-sm font-black text-[#111111] uppercase tracking-wider m-0 flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-[#111111]" />
              Why is this project at risk? (AI Factor Contribution Analysis)
            </h3>
            <p className="text-[11px] text-[#555555] m-0">
              Human-understandable attribution of risk drivers derived from model calculations
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-1">
          {selectedProject.shapContributors.map((contrib, idx) => (
            <div key={idx} className="p-3 bg-[#F5F5F5] border border-[#D9D9D9] rounded">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-[#111111]">{contrib.feature}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                    contrib.impact === 'HIGH' 
                      ? 'bg-red-100 text-red-800 border border-red-300' 
                      : contrib.impact === 'MEDIUM' 
                      ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                      : 'bg-[#E2E2E2] text-[#333333]'
                  }`}>
                    {contrib.impact} IMPACT
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-[#111111]">
                  {contrib.contributionPct}% Contribution
                </span>
              </div>
              
              <div className="w-full bg-[#D9D9D9] h-2 rounded-full overflow-hidden mb-1.5">
                <div 
                  className={`h-full ${contrib.impact === 'HIGH' ? 'bg-red-600' : contrib.impact === 'MEDIUM' ? 'bg-amber-600' : 'bg-[#333333]'}`}
                  style={{ width: `${contrib.contributionPct * 2}%` }}
                />
              </div>

              <p className="text-xs text-[#555555] m-0 font-medium">
                {contrib.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Actionable Administrative Recommendations */}
      <div className="govt-card p-4 bg-white">
        <h3 className="text-xs font-extrabold text-[#111111] uppercase tracking-wider border-b border-[#E2E2E2] pb-2 mb-3 m-0 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#111111]" />
          Recommended Administrative Interventions
        </h3>

        <div className="space-y-2">
          {selectedProject.recommendations.map((rec) => (
            <div key={rec.id} className="p-3 bg-white border border-[#D9D9D9] rounded flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-[#111111] text-white font-mono font-bold text-[10px] px-1.5 py-0.5 rounded">
                    PRIORITY #{rec.priority}
                  </span>
                  <span className="font-bold text-xs text-[#111111]">{rec.stage}</span>
                  <span className="text-[11px] text-[#555555] font-medium">({rec.responsibleDept})</span>
                </div>
                <p className="text-xs text-[#111111] font-semibold m-0">{rec.action}</p>
                <p className="text-[11px] text-[#555555] m-0">Reason: {rec.reason}</p>
              </div>

              <button
                onClick={() => setActivePage('simulator')}
                className="bg-[#111111] hover:bg-[#333333] text-white text-xs font-bold px-3 py-1.5 rounded shrink-0 transition-colors"
              >
                Simulate Intervention
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
