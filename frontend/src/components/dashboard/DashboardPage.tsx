import React from 'react';
import { useApp } from '../../context/AppContext';
import { KPICard } from '../common/KPICard';
import { RiskBadge } from '../common/RiskBadge';
import { 
  Building2, 
  AlertTriangle, 
  Clock, 
  ShieldAlert, 
  TrendingUp, 
  FileCheck, 
  ArrowRight,
  Filter,
  BarChart2,
  ListFilter,
  AlertCircle,
  FolderOpen
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { filterProjectsByScopeAndFilters, calculateKPIs } from '../../data/kpiData';

export const DashboardPage: React.FC = () => {
  const { 
    projects, 
    scope, 
    selectedProjectId, 
    setSelectedProjectId, 
    setActivePage,
    dashboardFilters,
    setDashboardFilters,
    setActiveKpiFilter,
    currentUser
  } = useApp();

  // 1. Dynamic Scope & User Role-Aware Project List
  const displayProjects = filterProjectsByScopeAndFilters(
    projects,
    scope,
    dashboardFilters,
    selectedProjectId,
    currentUser
  );

  // 2. Data-Driven Centralized KPI Calculation
  const kpis = calculateKPIs(displayProjects);

  // Dynamic Dashboard Title Based on User Role
  const getDashboardTitle = () => {
    if (!currentUser) return 'Land Acquisition Monitoring Dashboard';
    if (currentUser.role === 'System Administrator') return 'National Land Acquisition Monitoring Dashboard';
    if (currentUser.role === 'State Officer') return `${currentUser.state} State Monitoring Dashboard`;
    if (currentUser.role === 'District Officer') return `${currentUser.district} District Monitoring Dashboard`;
    if (currentUser.role === 'Project Manager') return 'Project Portfolio Dashboard';
    if (currentUser.role === 'Data/Analytics Officer') return 'Risk Analytics Dashboard';
    return 'Land Acquisition Monitoring Dashboard';
  };

  // KPI Card Navigation Click Handlers (Preserves Scope & Filters)
  const handleTotalProjectsClick = () => {
    setActiveKpiFilter('TOTAL');
    setActivePage('monitoring');
  };

  const handleHighRiskClick = () => {
    setDashboardFilters(prev => ({ ...prev, riskCategory: 'HIGH' }));
    setActiveKpiFilter('HIGH_RISK');
    setActivePage('monitoring');
  };

  const handleCriticalClick = () => {
    setDashboardFilters(prev => ({ ...prev, riskCategory: 'CRITICAL' }));
    setActiveKpiFilter('CRITICAL');
    setActivePage('alerts');
  };

  const handleAvgDelayProbClick = () => {
    setActiveKpiFilter('AVG_DELAY_PROB');
    setActivePage('analytics');
  };

  const handleActionRequiredClick = () => {
    setActiveKpiFilter('ACTION_REQUIRED');
    setActivePage('alerts');
  };

  const handleAvgExpectedDelayClick = () => {
    setActiveKpiFilter('AVG_EXPECTED_DELAY');
    setActivePage('analytics');
  };

  // Semantic Risk Color System (#2E7D32, #F9A825, #EF6C00, #D32F2F)
  const riskDistData = [
    { name: 'Low Risk', value: displayProjects.filter(p => p.riskCategory === 'LOW').length, color: '#2E7D32' },
    { name: 'Medium Risk', value: displayProjects.filter(p => p.riskCategory === 'MEDIUM').length, color: '#F9A825' },
    { name: 'High Risk', value: displayProjects.filter(p => p.riskCategory === 'HIGH').length, color: '#EF6C00' },
    { name: 'Critical Risk', value: displayProjects.filter(p => p.riskCategory === 'CRITICAL').length, color: '#D32F2F' },
  ];

  // Primary Acquisition Bottleneck Stage Color System
  const bottleneckCounts: Record<string, number> = {};
  displayProjects.forEach(p => {
    bottleneckCounts[p.primaryBottleneck] = (bottleneckCounts[p.primaryBottleneck] || 0) + 1;
  });

  const bottleneckData = Object.keys(bottleneckCounts).map(key => {
    const count = bottleneckCounts[key];
    const pct = displayProjects.length > 0 ? (count / displayProjects.length) * 100 : 0;
    const color = pct >= 35 ? '#D32F2F' : pct >= 25 ? '#EF6C00' : pct >= 15 ? '#F9A825' : '#2E7D32';
    return {
      stage: key,
      count,
      color
    };
  });

  return (
    <div className="space-y-5">
      {/* Dynamic Role-Based Page Title & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#E2E2E2] pb-3">
        <div>
          <h2 className="text-xl font-black text-[#111111] tracking-tight m-0">
            {getDashboardTitle()}
          </h2>
          <p className="text-xs text-[#555555] font-medium m-0">
            Authorized Scope: <strong>{scope.state} / {scope.district} / {scope.area}</strong> ({displayProjects.length} projects)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActivePage('monitoring')}
            className="bg-[#111111] hover:bg-[#333333] text-white text-xs font-bold px-3.5 py-1.5 rounded flex items-center gap-1.5 transition-colors"
          >
            <span>View Full Project Table</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Top Filter Toolbar & Project Level Selector */}
      <div className="govt-card p-3 bg-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#111111]">
            <Filter className="w-4 h-4 text-[#111111]" />
            <span>Dashboard Filters:</span>
          </div>

          {/* Project Type Filter */}
          <select
            value={dashboardFilters.projectType}
            onChange={(e) => setDashboardFilters(prev => ({ ...prev, projectType: e.target.value }))}
            className="text-xs font-semibold bg-[#F5F5F5] border border-[#D9D9D9] rounded px-2.5 py-1 text-[#111111] focus:outline-none focus:border-[#111111]"
          >
            <option value="All">All Project Types</option>
            <option value="Highway">Highway</option>
            <option value="Railway">Railway</option>
            <option value="Industrial Corridor">Industrial Corridor</option>
            <option value="Metro Rail">Metro Rail</option>
            <option value="Airport Expansion">Airport Expansion</option>
            <option value="Industrial Park">Industrial Park</option>
            <option value="Urban Development">Urban Development</option>
          </select>

          {/* Risk Category Filter */}
          <select
            value={dashboardFilters.riskCategory}
            onChange={(e) => setDashboardFilters(prev => ({ ...prev, riskCategory: e.target.value }))}
            className="text-xs font-semibold bg-[#F5F5F5] border border-[#D9D9D9] rounded px-2.5 py-1 text-[#111111] focus:outline-none focus:border-[#111111]"
          >
            <option value="All">All Risk Categories</option>
            <option value="LOW">Low Risk</option>
            <option value="MEDIUM">Medium Risk</option>
            <option value="HIGH">High Risk</option>
            <option value="CRITICAL">Critical Risk</option>
          </select>

          {/* Acquisition Stage Filter */}
          <select
            value={dashboardFilters.bottleneckStage}
            onChange={(e) => setDashboardFilters(prev => ({ ...prev, bottleneckStage: e.target.value }))}
            className="text-xs font-semibold bg-[#F5F5F5] border border-[#D9D9D9] rounded px-2.5 py-1 text-[#111111] focus:outline-none focus:border-[#111111]"
          >
            <option value="All">All Bottleneck Stages</option>
            <option value="Notification">Notification</option>
            <option value="Documentation">Documentation</option>
            <option value="Compensation">Compensation</option>
            <option value="Legal Resolution">Legal Resolution</option>
            <option value="R&R">R&R</option>
            <option value="Possession">Possession</option>
          </select>

          {(dashboardFilters.projectType !== 'All' || dashboardFilters.riskCategory !== 'All' || dashboardFilters.bottleneckStage !== 'All') && (
            <button
              onClick={() => {
                setDashboardFilters({ projectType: 'All', riskCategory: 'All', bottleneckStage: 'All' });
                setActiveKpiFilter(null);
              }}
              className="text-xs text-red-700 font-bold underline hover:text-red-900"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Project Selector when Scope is set to Project */}
        {scope.level === 'Project' && (
          <div className="flex items-center gap-1.5 bg-[#F5F5F5] px-2.5 py-1 rounded border border-[#D9D9D9]">
            <FolderOpen className="w-3.5 h-3.5 text-[#111111]" />
            <span className="text-xs font-bold text-[#111111]">Select Target Project:</span>
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="text-xs font-bold bg-white border border-[#D9D9D9] rounded px-2 py-0.5 text-[#111111] focus:outline-none"
            >
              {displayProjects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.id}) — {p.state}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Empty Data Handling Notice */}
      {!kpis.hasProjects && (
        <div className="p-3 bg-[#F5F5F5] border border-[#D9D9D9] rounded text-xs text-[#555555] font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#777777] shrink-0" />
          <span>No projects found for the selected monitoring scope and filters.</span>
        </div>
      )}

      {/* Interactive & Clickable KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        <KPICard
          title="TOTAL PROJECTS"
          value={kpis.totalProjects}
          subtitle="Number of projects in scope"
          icon={<Building2 className="w-4 h-4" />}
          onClick={handleTotalProjectsClick}
        />
        <KPICard
          title="HIGH-RISK PROJECTS"
          value={kpis.highRiskProjects}
          subtitle="Projects classified as High risk"
          isHigh={kpis.highRiskProjects > 0}
          icon={<AlertTriangle className="w-4 h-4 text-orange-600" />}
          onClick={handleHighRiskClick}
        />
        <KPICard
          title="CRITICAL PROJECTS"
          value={kpis.criticalProjects}
          subtitle="Projects requiring immediate action"
          isCritical={kpis.criticalProjects > 0}
          icon={<ShieldAlert className="w-4 h-4 text-red-600" />}
          onClick={handleCriticalClick}
        />
        <KPICard
          title="AVG DELAY PROB."
          value={kpis.avgDelayProbability !== null ? `${kpis.avgDelayProbability}%` : '—'}
          subtitle="Avg predicted delay probability"
          icon={<TrendingUp className="w-4 h-4" />}
          onClick={handleAvgDelayProbClick}
        />
        <KPICard
          title="ACTION REQUIRED"
          value={kpis.actionRequired}
          subtitle="High & Critical priority projects"
          isCritical={kpis.actionRequired > 0}
          icon={<FileCheck className="w-4 h-4" />}
          onClick={handleActionRequiredClick}
        />
        <KPICard
          title="AVG EXPECTED DELAY"
          value={kpis.avgExpectedDelay !== null ? `${kpis.avgExpectedDelay} Days` : '—'}
          subtitle="Avg predicted delay duration"
          icon={<Clock className="w-4 h-4" />}
          onClick={handleAvgExpectedDelayClick}
        />
      </div>

      {/* Visual Analytics Charts Section (Semantic Colors: #2E7D32, #F9A825, #EF6C00, #D32F2F) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Risk Distribution Breakdown (Semantic Color System) */}
        <div className="govt-card p-4">
          <div className="flex items-center justify-between border-b border-[#E2E2E2] pb-2 mb-3">
            <h3 className="text-xs font-extrabold text-[#111111] uppercase tracking-wider flex items-center gap-1.5 m-0">
              <BarChart2 className="w-4 h-4 text-[#111111]" />
              Project Risk Breakdown
            </h3>
            <span className="text-[10px] text-[#777777] font-mono">Count by Category</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskDistData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#555555' }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#555555' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111111', color: '#fff', fontSize: '11px', borderRadius: '4px' }}
                />
                <Bar dataKey="value">
                  {riskDistData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Primary Acquisition Bottleneck Stage Counts (Concentration Severity Colored) */}
        <div className="govt-card p-4">
          <div className="flex items-center justify-between border-b border-[#E2E2E2] pb-2 mb-3">
            <h3 className="text-xs font-extrabold text-[#111111] uppercase tracking-wider flex items-center gap-1.5 m-0">
              <ListFilter className="w-4 h-4 text-[#111111]" />
              Primary Acquisition Bottleneck Stages
            </h3>
            <span className="text-[10px] text-[#777777] font-mono">Stage Concentration</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bottleneckData} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: '#555555' }} />
                <YAxis dataKey="stage" type="category" tick={{ fontSize: 10, fill: '#555555' }} width={110} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111111', color: '#fff', fontSize: '11px', borderRadius: '4px' }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {bottleneckData.map((entry, index) => (
                    <Cell key={`cell-bn-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Priority Projects Table */}
      <div className="govt-card p-4">
        <div className="flex items-center justify-between border-b border-[#E2E2E2] pb-3 mb-3">
          <div>
            <h3 className="text-sm font-extrabold text-[#111111] uppercase tracking-wider m-0 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              Priority Projects Requiring Immediate Action
            </h3>
            <p className="text-[11px] text-[#555555] font-medium m-0">
              Ranked by delay probability and impact score within authorized scope
            </p>
          </div>
          <button
            onClick={() => setActivePage('alerts')}
            className="text-xs font-bold text-[#111111] hover:underline"
          >
            View All Action Alerts →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="govt-table">
            <thead>
              <tr>
                <th>Project ID</th>
                <th>Project Name</th>
                <th>State / District / Area</th>
                <th>Type</th>
                <th>Risk Category</th>
                <th>Risk Score</th>
                <th>Expected Delay</th>
                <th>Primary Bottleneck</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayProjects.length > 0 ? (
                displayProjects.map((p) => (
                  <tr key={p.id}>
                    <td className="font-mono font-bold text-[#111111]">{p.id}</td>
                    <td className="font-bold text-[#111111]">{p.name}</td>
                    <td>{p.state} / {p.district} / <strong>{p.area}</strong></td>
                    <td>{p.type}</td>
                    <td>
                      <RiskBadge category={p.riskCategory} />
                    </td>
                    <td className="font-mono font-bold text-[#111111]">{p.riskScore}%</td>
                    <td className="font-mono">{p.expectedDelayDays} Days</td>
                    <td className="font-bold text-[#333333]">{p.primaryBottleneck}</td>
                    <td>
                      <button
                        onClick={() => {
                          setSelectedProjectId(p.id);
                          setActivePage('risk');
                        }}
                        className="bg-[#111111] hover:bg-[#333333] text-white text-[11px] font-bold px-2.5 py-1 rounded transition-colors"
                      >
                        Analyze Risk
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center py-6 text-[#777777] font-medium">
                    No matching infrastructure projects found in authorized scope and filters.
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
