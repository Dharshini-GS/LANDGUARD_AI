import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RiskBadge } from '../common/RiskBadge';
import { 
  Search, 
  Download, 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  SlidersHorizontal,
  XCircle,
  Filter
} from 'lucide-react';
import type { Project } from '../../types';
import { filterProjectsByScopeAndFilters } from '../../data/kpiData';

export const ProjectMonitoringPage: React.FC = () => {
  const { 
    projects, 
    scope, 
    selectedProjectId, 
    setSelectedProjectId, 
    setActivePage,
    dashboardFilters,
    setDashboardFilters,
    activeKpiFilter,
    setActiveKpiFilter,
    currentUser
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Project>('riskScore');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter projects by Scope & Active Dashboard Filters (RBAC Enforced)
  const scopedProjects = filterProjectsByScopeAndFilters(
    projects,
    scope,
    dashboardFilters,
    scope.level === 'Project' ? selectedProjectId : undefined,
    currentUser
  );

  // Search Logic
  const processedProjects = scopedProjects.filter(p => {
    return (
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.area.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Sort Logic
  const sortedProjects = [...processedProjects].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];

    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    }
    if (typeof valA === 'string' && typeof valB === 'string') {
      return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    return 0;
  });

  // Pagination Logic
  const totalPages = Math.ceil(sortedProjects.length / itemsPerPage) || 1;
  const paginatedProjects = sortedProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field: keyof Project) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const clearKpiFilter = () => {
    setActiveKpiFilter(null);
    setDashboardFilters({ projectType: 'All', riskCategory: 'All', bottleneckStage: 'All' });
  };

  // CSV Export Handler
  const exportToCSV = () => {
    const headers = ["Project ID", "Name", "State", "District", "Area", "Type", "Risk Score", "Risk Category", "Expected Delay (Days)", "Bottleneck", "Last Updated"];
    const rows = sortedProjects.map(p => [
      p.id,
      `"${p.name}"`,
      `"${p.state}"`,
      `"${p.district}"`,
      `"${p.area}"`,
      p.type,
      p.riskScore,
      p.riskCategory,
      p.expectedDelayDays,
      `"${p.primaryBottleneck}"`,
      p.lastUpdated
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `LANDGUARD_Project_Monitoring_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#E2E2E2] pb-3">
        <div>
          <h2 className="text-xl font-black text-[#111111] tracking-tight m-0">
            {activeKpiFilter === 'HIGH_RISK' ? 'High-Risk Infrastructure Projects' : 'Infrastructure Project Monitoring (MIS)'}
          </h2>
          <p className="text-xs text-[#555555] font-medium m-0">
            Monitored Scope: <strong>{scope.state} / {scope.district} / {scope.area}</strong> ({sortedProjects.length} projects)
          </p>
        </div>

        {/* Action / Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={exportToCSV}
            className="bg-[#111111] hover:bg-[#333333] text-white text-xs font-bold px-3.5 py-1.5 rounded flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Filter Banner Notice if redirected from KPI card */}
      {(activeKpiFilter || dashboardFilters.riskCategory !== 'All' || dashboardFilters.projectType !== 'All' || dashboardFilters.bottleneckStage !== 'All') && (
        <div className="p-2.5 bg-[#F5F5F5] border border-[#D9D9D9] rounded flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#111111]" />
            <span className="font-bold text-[#111111]">
              Active Filter: {dashboardFilters.riskCategory !== 'All' ? `${dashboardFilters.riskCategory} Risk` : 'Scope Filtered'} ({sortedProjects.length} projects matching scope: {scope.state} / {scope.district} / {scope.area})
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

      {/* Control Bar: Search & Filtering */}
      <div className="govt-card p-3 bg-white flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-[#777777] absolute left-2.5 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Project ID, Name, State, District or Area..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#F5F5F5] border border-[#D9D9D9] rounded text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1 text-xs text-[#555555] font-bold">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </div>

          <select
            value={dashboardFilters.projectType}
            onChange={(e) => setDashboardFilters(prev => ({ ...prev, projectType: e.target.value }))}
            className="text-xs font-semibold bg-[#F5F5F5] border border-[#D9D9D9] rounded px-2.5 py-1 text-[#111111] focus:outline-none"
          >
            <option value="All">All Types</option>
            <option value="Highway">Highway</option>
            <option value="Railway">Railway</option>
            <option value="Industrial Corridor">Industrial Corridor</option>
            <option value="Metro Rail">Metro Rail</option>
            <option value="Airport Expansion">Airport Expansion</option>
            <option value="Industrial Park">Industrial Park</option>
            <option value="Urban Development">Urban Development</option>
          </select>

          <select
            value={dashboardFilters.riskCategory}
            onChange={(e) => setDashboardFilters(prev => ({ ...prev, riskCategory: e.target.value }))}
            className="text-xs font-semibold bg-[#F5F5F5] border border-[#D9D9D9] rounded px-2.5 py-1 text-[#111111] focus:outline-none"
          >
            <option value="All">All Risk Levels</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="CRITICAL">Critical</option>
          </select>
        </div>
      </div>

      {/* Main MIS Data Table */}
      <div className="govt-card overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="govt-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('id')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    <span>Project ID</span>
                    <ArrowUpDown className="w-3 h-3 text-[#777777]" />
                  </div>
                </th>
                <th onClick={() => handleSort('name')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    <span>Project Name</span>
                    <ArrowUpDown className="w-3 h-3 text-[#777777]" />
                  </div>
                </th>
                <th>State</th>
                <th>District</th>
                <th>Area</th>
                <th>Project Type</th>
                <th onClick={() => handleSort('riskScore')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    <span>Risk Score</span>
                    <ArrowUpDown className="w-3 h-3 text-[#777777]" />
                  </div>
                </th>
                <th>Risk Category</th>
                <th onClick={() => handleSort('expectedDelayDays')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    <span>Expected Delay</span>
                    <ArrowUpDown className="w-3 h-3 text-[#777777]" />
                  </div>
                </th>
                <th>Priority</th>
                <th>Main Bottleneck</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProjects.length > 0 ? (
                paginatedProjects.map((p) => (
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
                    <td>{p.state}</td>
                    <td>{p.district}</td>
                    <td className="font-bold text-[#111111]">{p.area}</td>
                    <td>{p.type}</td>
                    <td className="font-mono font-bold text-[#111111]">{p.riskScore}%</td>
                    <td>
                      <RiskBadge category={p.riskCategory} />
                    </td>
                    <td className="font-mono">{p.expectedDelayDays} Days</td>
                    <td className="font-mono font-bold">{p.interventionPriorityScore}/100</td>
                    <td className="font-semibold text-[#333333]">{p.primaryBottleneck}</td>
                    <td>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProjectId(p.id);
                          setActivePage('risk');
                        }}
                        className="bg-[#111111] hover:bg-[#333333] text-white text-[11px] font-bold px-2.5 py-1 rounded flex items-center gap-1 transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        <span>View Details</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={12} className="text-center py-6 text-[#777777] font-medium">
                    No matching infrastructure projects found for the selected monitoring scope and filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-3 bg-[#F5F5F5] border-t border-[#E2E2E2] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="text-[#555555] font-medium">
            Showing <strong>{sortedProjects.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</strong> to <strong>{Math.min(currentPage * itemsPerPage, sortedProjects.length)}</strong> of <strong>{sortedProjects.length}</strong> projects
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1 rounded border border-[#D9D9D9] bg-white text-[#111111] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F5F5F5]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-bold text-[#111111]">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1 rounded border border-[#D9D9D9] bg-white text-[#111111] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F5F5F5]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
