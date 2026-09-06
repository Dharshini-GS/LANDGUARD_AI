import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RiskBadge } from '../common/RiskBadge';
import { 
  BarChart3, 
  GitCompare, 
  TrendingUp, 
  ArrowRight,
  Filter,
  XCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { filterProjectsByScopeAndFilters, calculateKPIs, getSemanticRiskColor } from '../../data/kpiData';

export const AnalyticsPage: React.FC = () => {
  const { 
    projects, 
    scope, 
    dashboardFilters, 
    setDashboardFilters,
    activeKpiFilter, 
    setActiveKpiFilter,
    setSelectedProjectId, 
    setActivePage,
    currentUser
  } = useApp();

  const [activeTab, setActiveTab] = useState<'DelayAnalysis' | 'State' | 'ProjectType' | 'Comparison'>(
    activeKpiFilter === 'AVG_DELAY_PROB' || activeKpiFilter === 'AVG_EXPECTED_DELAY' ? 'DelayAnalysis' : 'State'
  );

  // Filter projects by Scope & Active Dashboard Filters (RBAC Isolated)
  const scopedProjects = filterProjectsByScopeAndFilters(
    projects,
    scope,
    dashboardFilters,
    undefined,
    currentUser
  );

  const kpis = calculateKPIs(scopedProjects);

  // Calculate Min / Max delay probability & expected delay
  const maxDelayProbProject = scopedProjects.length > 0
    ? [...scopedProjects].sort((a, b) => b.delayProbability - a.delayProbability)[0]
    : null;

  const maxExpectedDelayProject = scopedProjects.length > 0
    ? [...scopedProjects].sort((a, b) => b.expectedDelayDays - a.expectedDelayDays)[0]
    : null;

  // Group data by State for chart
  const stateStats: Record<string, { total: number; avgRisk: number; critical: number; sumRisk: number; sumDelayDays: number }> = {};
  scopedProjects.forEach(p => {
    if (!stateStats[p.state]) {
      stateStats[p.state] = { total: 0, avgRisk: 0, critical: 0, sumRisk: 0, sumDelayDays: 0 };
    }
    stateStats[p.state].total += 1;
    stateStats[p.state].sumRisk += p.riskScore;
    stateStats[p.state].sumDelayDays += p.expectedDelayDays;
    if (p.riskCategory === 'CRITICAL') stateStats[p.state].critical += 1;
  });

  const stateChartData = Object.keys(stateStats).map(st => {
    const avgRiskPct = Math.round(stateStats[st].sumRisk / stateStats[st].total);
    const avgDelayDays = Math.round(stateStats[st].sumDelayDays / stateStats[st].total);
    const riskColor = getSemanticRiskColor(avgRiskPct);

    return {
      state: st,
      totalProjects: stateStats[st].total,
      avgRiskPct,
      avgDelayDays,
      criticalProjects: stateStats[st].critical,
      riskColor
    };
  });

  // Inter-State Comparison Benchmark Data (Semantic Risk Colored)
  const comparisonData = [
    { metric: 'Avg Risk Score (%)', 'Tamil Nadu': 84, 'Maharashtra': 68, 'Karnataka': 18, 'Uttar Pradesh': 89 },
    { metric: 'Avg Delay (Days)', 'Tamil Nadu': 85, 'Maharashtra': 58, 'Karnataka': 10, 'Uttar Pradesh': 110 },
    { metric: 'Critical Projects Count', 'Tamil Nadu': 1, 'Maharashtra': 0, 'Karnataka': 0, 'Uttar Pradesh': 1 },
  ];

  const clearKpiFilter = () => {
    setActiveKpiFilter(null);
    setDashboardFilters({ projectType: 'All', riskCategory: 'All', bottleneckStage: 'All' });
  };

  return (
    <div className="space-y-5">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#E2E2E2] pb-3">
        <div>
          <h2 className="text-xl font-black text-[#111111] tracking-tight m-0 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#111111]" />
            Administrative Analytics & Delay Intelligence
          </h2>
          <p className="text-xs text-[#555555] font-medium m-0">
            Monitored Scope: <strong>{scope.state} / {scope.district} / {scope.area}</strong> ({scopedProjects.length} projects in scope)
          </p>
        </div>
      </div>

      {/* KPI Filter Banner Notice */}
      {activeKpiFilter && (
        <div className="p-2.5 bg-[#F5F5F5] border border-[#D9D9D9] rounded flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#111111]" />
            <span className="font-bold text-[#111111]">
              Viewing {activeKpiFilter === 'AVG_DELAY_PROB' ? 'Average Delay Probability Analysis' : 'Average Expected Delay Analysis'} (Scope: {scope.state} / {scope.district} / {scope.area})
            </span>
          </div>
          <button
            onClick={clearKpiFilter}
            className="text-xs text-red-700 hover:text-red-900 font-bold flex items-center gap-1"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Clear Filter</span>
          </button>
        </div>
      )}

      {/* Analytics Level Selector Bar */}
      <div className="govt-card p-3 bg-white flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-[#555555] uppercase tracking-wider mr-2">Analytics View:</span>
          {(['DelayAnalysis', 'State', 'Comparison'] as const).map((view) => {
            const isActive = activeTab === view;
            return (
              <button
                key={view}
                onClick={() => setActiveTab(view)}
                className={`px-3 py-1 text-xs font-bold rounded transition-all ${
                  isActive 
                    ? 'bg-[#111111] text-white shadow-xs' 
                    : 'text-[#555555] hover:bg-[#F5F5F5] border border-[#D9D9D9]'
                }`}
              >
                {view === 'DelayAnalysis' ? 'Delay Analysis & Breakdown' : view}
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. Key Delay Metrics Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="govt-card p-3.5 bg-white border-t-4 border-t-[#2E7D32]">
          <div className="text-[10px] font-bold text-[#555555] uppercase">Average Delay Probability</div>
          <div className="text-2xl font-black font-mono mt-1" style={{ color: getSemanticRiskColor(kpis.avgDelayProbability || 0) }}>
            {kpis.avgDelayProbability !== null ? `${kpis.avgDelayProbability}%` : '—'}
          </div>
          <div className="text-[11px] text-[#777777]">Scope: {scope.state} / {scope.district}</div>
        </div>

        <div className="govt-card p-3.5 bg-white border-t-4 border-t-[#37474F]">
          <div className="text-[10px] font-bold text-[#555555] uppercase">Average Expected Delay</div>
          <div className="text-2xl font-black text-[#37474F] font-mono mt-1">
            {kpis.avgExpectedDelay !== null ? `${kpis.avgExpectedDelay} Days` : '—'}
          </div>
          <div className="text-[11px] text-[#777777]">Estimated duration overrun</div>
        </div>

        <div className="govt-card p-3.5 bg-white border-t-4 border-t-[#D32F2F]">
          <div className="text-[10px] font-bold text-[#555555] uppercase">Highest Delay Probability</div>
          <div className="text-2xl font-black text-[#D32F2F] font-mono mt-1">
            {maxDelayProbProject ? `${maxDelayProbProject.delayProbability}%` : '—'}
          </div>
          <div className="text-[11px] text-[#777777] truncate">
            {maxDelayProbProject ? maxDelayProbProject.name : 'No projects'}
          </div>
        </div>

        <div className="govt-card p-3.5 bg-white border-t-4 border-t-[#EF6C00]">
          <div className="text-[10px] font-bold text-[#555555] uppercase">Max Expected Delay</div>
          <div className="text-2xl font-black text-[#EF6C00] font-mono mt-1">
            {maxExpectedDelayProject ? `${maxExpectedDelayProject.expectedDelayDays} Days` : '—'}
          </div>
          <div className="text-[11px] text-[#777777] truncate">
            {maxExpectedDelayProject ? maxExpectedDelayProject.name : 'No projects'}
          </div>
        </div>
      </div>

      {/* 2. Primary Analytics Visualization (Requirement 2 & 4: Colorful Risk-Based Chart System) */}
      <div className="govt-card p-4 space-y-4 bg-white">
        {activeTab === 'Comparison' ? (
          <div>
            <div className="border-b border-[#E2E2E2] pb-2 mb-3">
              <h3 className="text-xs font-extrabold text-[#111111] uppercase tracking-wider m-0 flex items-center gap-1.5">
                <GitCompare className="w-4 h-4 text-[#111111]" />
                Inter-State Benchmark Comparison (Tamil Nadu vs Maharashtra vs Karnataka vs Uttar Pradesh)
              </h3>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="metric" tick={{ fontSize: 11, fill: '#555555' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#555555' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#111111', color: '#fff', fontSize: '11px', borderRadius: '4px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="Tamil Nadu" fill="#D32F2F" />
                  <Bar dataKey="Maharashtra" fill="#EF6C00" />
                  <Bar dataKey="Karnataka" fill="#2E7D32" />
                  <Bar dataKey="Uttar Pradesh" fill="#B71C1C" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between border-b border-[#E2E2E2] pb-2 mb-3">
              <h3 className="text-xs font-extrabold text-[#111111] uppercase tracking-wider m-0 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#111111]" />
                State-Level Average Risk & Delay Duration Overrun
              </h3>
              <div className="flex items-center gap-3 text-[10px] font-bold">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#2E7D32] inline-block"></span> 0-30% Low</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#F9A825] inline-block"></span> 31-60% Medium</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#EF6C00] inline-block"></span> 61-80% High</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#D32F2F] inline-block"></span> 81-100% Critical</span>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stateChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="state" tick={{ fontSize: 11, fill: '#555555' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#555555' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111111', color: '#fff', fontSize: '11px', borderRadius: '4px' }}
                    formatter={(value, name) => [
                      name === 'avgRiskPct' ? `${value}%` : `${value} Days`,
                      name === 'avgRiskPct' ? 'Avg Delay Prob. (%)' : 'Avg Expected Delay (Days)'
                    ]}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  {/* Avg Delay Probability Bar (Dynamic Semantic Risk Colors: Green/Yellow/Orange/Red) */}
                  <Bar dataKey="avgRiskPct" name="Avg Delay Prob. (%)">
                    {stateChartData.map((entry, index) => (
                      <Cell key={`cell-risk-${index}`} fill={entry.riskColor} />
                    ))}
                  </Bar>
                  {/* Avg Expected Delay Bar (Neutral Dark Blue/Grey: #37474F) */}
                  <Bar dataKey="avgDelayDays" name="Avg Expected Delay (Days)" fill="#37474F" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* 3. Project-wise Detailed Breakdown Table (With Area Column) */}
      <div className="govt-card p-4 bg-white">
        <div className="flex items-center justify-between border-b border-[#E2E2E2] pb-3 mb-3">
          <h3 className="text-xs font-extrabold text-[#111111] uppercase tracking-wider m-0">
            Project-Wise Delay Analysis Breakdown ({scopedProjects.length} Projects in Scope)
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="govt-table">
            <thead>
              <tr>
                <th>Project ID</th>
                <th>Project Name</th>
                <th>State / District / Area</th>
                <th>Delay Probability (%)</th>
                <th>Expected Delay (Days)</th>
                <th>Risk Category</th>
                <th>Primary Bottleneck Stage</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {scopedProjects.length > 0 ? (
                scopedProjects.map((p) => (
                  <tr 
                    key={p.id}
                    onClick={() => {
                      setSelectedProjectId(p.id);
                      setActivePage('risk');
                    }}
                    className="cursor-pointer hover:bg-[#F5F5F5]"
                  >
                    <td className="font-mono font-bold text-[#111111]">{p.id}</td>
                    <td className="font-bold text-[#111111]">{p.name}</td>
                    <td>{p.state} / {p.district} / <strong>{p.area}</strong></td>
                    <td className="font-mono font-bold" style={{ color: getSemanticRiskColor(p.delayProbability) }}>
                      {p.delayProbability}%
                    </td>
                    <td className="font-mono font-bold">{p.expectedDelayDays} Days</td>
                    <td>
                      <RiskBadge category={p.riskCategory} />
                    </td>
                    <td className="font-medium text-[#333333]">{p.primaryBottleneck}</td>
                    <td>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProjectId(p.id);
                          setActivePage('risk');
                        }}
                        className="bg-[#111111] hover:bg-[#333333] text-white text-[11px] font-bold px-2.5 py-1 rounded flex items-center gap-1 transition-colors"
                      >
                        <span>Analyze Detail</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-6 text-[#777777] font-medium">
                    No matching projects found for the selected scope and filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
