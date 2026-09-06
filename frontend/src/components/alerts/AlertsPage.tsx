import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RiskBadge } from '../common/RiskBadge';
import { 
  ShieldAlert, 
  ArrowRight,
  Flame,
  Filter,
  XCircle
} from 'lucide-react';
import type { AlertItem } from '../../types';
import { filterProjectsByScopeAndFilters, getSemanticRiskColor } from '../../data/kpiData';

export const AlertsPage: React.FC = () => {
  const { 
    alerts, 
    updateAlertStatus, 
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

  const [activeTab, setActiveTab] = useState<'All' | 'New' | 'Acknowledged' | 'In Progress' | 'Resolved'>('All');

  // Filter projects by active scope & dashboard filters (RBAC Enforced)
  const scopedProjects = filterProjectsByScopeAndFilters(
    projects,
    scope,
    dashboardFilters,
    undefined,
    currentUser
  );

  const scopedProjectIds = new Set(scopedProjects.map(p => p.id));

  // Alerts belonging to active scope
  const scopedAlerts = alerts.filter(a => scopedProjectIds.has(a.projectId));

  const filteredAlerts = scopedAlerts.filter(a => {
    if (activeTab === 'All') return true;
    return a.status === activeTab;
  });

  // Priority Ranking: Sort projects by interventionPriorityScore
  const rankedProjects = [...scopedProjects].sort((a, b) => b.interventionPriorityScore - a.interventionPriorityScore);

  const clearKpiFilter = () => {
    setActiveKpiFilter(null);
    setDashboardFilters({ projectType: 'All', riskCategory: 'All', bottleneckStage: 'All' });
  };

  return (
    <div className="space-y-5">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#E2E2E2] pb-3">
        <div>
          <h2 className="text-xl font-black text-[#111111] tracking-tight m-0 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#D32F2F]" />
            Alerts & Intervention Priority System
          </h2>
          <p className="text-xs text-[#555555] font-medium m-0">
            Monitored Scope: <strong>{scope.state} / {scope.district} / {scope.area}</strong> ({scopedAlerts.length} active alerts)
          </p>
        </div>
      </div>

      {/* KPI Filter Banner Notice */}
      {(activeKpiFilter || dashboardFilters.riskCategory !== 'All') && (
        <div className="p-2.5 bg-[#F5F5F5] border border-[#D9D9D9] rounded flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#111111]" />
            <span className="font-bold text-[#111111]">
              Active Filter: {dashboardFilters.riskCategory !== 'All' ? `${dashboardFilters.riskCategory} Risk Projects` : 'Action Required'} (Scope: {scope.state} / {scope.district} / {scope.area})
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

      {/* Grid Layout: Alerts List vs Priority Ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column: Categorized Alert Center */}
        <div className="lg:col-span-2 space-y-4">
          <div className="govt-card p-3 bg-white flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              {(['All', 'New', 'Acknowledged', 'In Progress', 'Resolved'] as const).map((tab) => {
                const isActive = activeTab === tab;
                const count = tab === 'All' ? scopedAlerts.length : scopedAlerts.filter(a => a.status === tab).length;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 text-xs font-bold rounded transition-all ${
                      isActive
                        ? 'bg-[#111111] text-white shadow-xs'
                        : 'text-[#555555] hover:bg-[#F5F5F5]'
                    }`}
                  >
                    {tab.toUpperCase()} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Alert Cards */}
          <div className="space-y-3">
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map((alert) => {
                const alertColor = getSemanticRiskColor(alert.riskCategory);
                return (
                  <div 
                    key={alert.id}
                    className="govt-card p-4 bg-white border-l-4 space-y-2.5 cursor-pointer hover:bg-[#FDFDFD]"
                    style={{ borderLeftColor: alertColor }}
                    onClick={() => {
                      setSelectedProjectId(alert.projectId);
                      setActivePage('risk');
                    }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E2E2] pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-extrabold text-[10px] px-2 py-0.5 rounded tracking-wider uppercase" style={{ backgroundColor: alertColor }}>
                          {alert.riskCategory} ALERT
                        </span>
                        <h4 className="text-sm font-bold text-[#111111] m-0">{alert.projectName}</h4>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <RiskBadge category={alert.riskCategory} score={alert.riskScore} />
                        <span className="text-[11px] text-[#777777] font-mono">{alert.timestamp}</span>
                      </div>
                    </div>

                    <div className="text-xs text-[#333333] space-y-1">
                      <div><strong>Location:</strong> {alert.state} / {alert.district} {alert.area ? `/ ${alert.area}` : ''}</div>
                      <div>
                        <strong>Main Risk Factors:</strong>
                        <ul className="list-disc pl-4 text-[#111111] space-y-0.5 mt-0.5">
                          {alert.mainFactors.map((factor, fIdx) => (
                            <li key={fIdx}>{factor}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-2 bg-[#F5F5F5] border border-[#D9D9D9] rounded font-semibold text-[#111111] mt-2">
                        <strong>Recommended Administrative Action:</strong> {alert.recommendedAction}
                      </div>
                    </div>

                    {/* Actions Footer */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-[#E2E2E2]">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#555555]">
                        <span>Status:</span>
                        <select
                          value={alert.status}
                          onChange={(e) => {
                            e.stopPropagation();
                            updateAlertStatus(alert.id, e.target.value as AlertItem['status']);
                          }}
                          className="text-xs font-bold bg-[#F5F5F5] border border-[#D9D9D9] rounded px-2 py-0.5 text-[#111111] focus:outline-none"
                        >
                          <option value="New">New</option>
                          <option value="Acknowledged">Acknowledged</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProjectId(alert.projectId);
                          setActivePage('risk');
                        }}
                        className="bg-[#111111] hover:bg-[#333333] text-white text-xs font-bold px-3 py-1 rounded flex items-center gap-1 transition-colors"
                      >
                        <span>Analyze Project Detail</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="govt-card p-6 text-center text-[#777777] text-xs font-medium bg-white">
                No alerts found for the selected monitoring scope ({scope.state} / {scope.district} / {scope.area}) and filters.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Intervention Priority Ranking */}
        <div className="govt-card p-4 space-y-3 bg-white">
          <div className="border-b border-[#E2E2E2] pb-2">
            <h3 className="text-xs font-extrabold text-[#111111] uppercase tracking-wider m-0 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-600" />
              Intervention Priority Ranking
            </h3>
            <p className="text-[11px] text-[#555555] m-0">
              Composite index: <strong>Risk + Urgency + Impact</strong>
            </p>
          </div>

          <div className="space-y-2">
            {rankedProjects.length > 0 ? (
              rankedProjects.map((p, idx) => (
                <div 
                  key={p.id}
                  onClick={() => {
                    setSelectedProjectId(p.id);
                    setActivePage('risk');
                  }}
                  className="p-2.5 bg-[#F5F5F5] border border-[#D9D9D9] rounded flex items-center justify-between gap-2 cursor-pointer hover:bg-[#E2E2E2]"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#111111] text-white font-bold text-xs flex items-center justify-center font-mono">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-[#111111]">{p.name}</div>
                      <div className="text-[10px] text-[#555555]">{p.state} | {p.area}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black text-[#111111] font-mono">
                      {p.interventionPriorityScore}/100
                    </div>
                    <RiskBadge category={p.riskCategory} showIcon={false} />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-xs text-[#777777]">
                No projects ranked in current scope.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
