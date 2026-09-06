import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileSpreadsheet, 
  Download, 
  FileText, 
  Building2, 
  MapPin, 
  BarChart3, 
  ShieldAlert, 
  CheckCircle,
  X,
  Printer
} from 'lucide-react';
import { filterProjectsByScopeAndFilters, calculateKPIs } from '../../data/kpiData';

interface ReportTypeOption {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  rolesAllowed?: string[];
}

export const ReportsPage: React.FC = () => {
  const { projects, scope, currentUser, dashboardFilters } = useApp();
  const [generatedPdfData, setGeneratedPdfData] = useState<{
    title: string;
    date: string;
    user: string;
    scope: string;
    totalProjects: number;
    highRisk: number;
    critical: number;
    avgDelay: string;
    avgExpectedDelay: string;
    projectsList: typeof projects;
  } | null>(null);
  const [showPdfModal, setShowPdfModal] = useState<boolean>(false);

  // Filter projects by current authorized user scope
  const scopedProjects = filterProjectsByScopeAndFilters(
    projects,
    scope,
    dashboardFilters,
    undefined,
    currentUser
  );

  const kpis = calculateKPIs(scopedProjects);

  const reportOptions: ReportTypeOption[] = [
    {
      id: 'project_risk',
      title: 'Generate Project Risk Report',
      subtitle: 'Comprehensive acquisition delay risk assessment for current projects',
      icon: <FileText className="w-5 h-5 text-[#111111]" />
    },
    {
      id: 'national_risk',
      title: 'Generate National Risk Report',
      subtitle: 'All-India infrastructure acquisition intelligence summary',
      icon: <Building2 className="w-5 h-5 text-[#111111]" />,
      rolesAllowed: ['System Administrator']
    },
    {
      id: 'state_risk',
      title: 'Generate State Risk Report',
      subtitle: 'State-wide administrative delay breakdown & district risk ranking',
      icon: <MapPin className="w-5 h-5 text-[#111111]" />,
      rolesAllowed: ['System Administrator', 'State Officer']
    },
    {
      id: 'district_risk',
      title: 'Generate District Risk Report',
      subtitle: 'Collectorate & tehsildar level land acquisition progress audit',
      icon: <MapPin className="w-5 h-5 text-[#111111]" />,
      rolesAllowed: ['System Administrator', 'State Officer', 'District Officer']
    },
    {
      id: 'alerts_priority',
      title: 'Generate Alerts & Priority Report',
      subtitle: 'High & Critical priority projects requiring urgent state intervention',
      icon: <ShieldAlert className="w-5 h-5 text-red-600" />
    },
    {
      id: 'analytics_report',
      title: 'Generate Analytics Report',
      subtitle: 'Explainable AI drivers, bottleneck stage distribution & trends',
      icon: <BarChart3 className="w-5 h-5 text-[#111111]" />
    }
  ];

  // Role Filtering for Report Cards
  const availableReports = reportOptions.filter(r => {
    if (!r.rolesAllowed) return true;
    return currentUser ? r.rolesAllowed.includes(currentUser.role) : false;
  });

  const handleGeneratePdf = (reportId: string) => {
    const reportObj = reportOptions.find(r => r.id === reportId);
    
    setGeneratedPdfData({
      title: reportObj ? reportObj.title.replace('Generate ', '') : 'Land Acquisition Risk Report',
      date: new Date().toLocaleString(),
      user: currentUser ? `${currentUser.name} (${currentUser.role})` : 'System Administrator',
      scope: `${scope.state} / ${scope.district} / ${scope.area}`,
      totalProjects: kpis.totalProjects,
      highRisk: kpis.highRiskProjects,
      critical: kpis.criticalProjects,
      avgDelay: kpis.avgDelayProbability !== null ? `${kpis.avgDelayProbability}%` : '—',
      avgExpectedDelay: kpis.avgExpectedDelay !== null ? `${kpis.avgExpectedDelay} Days` : '—',
      projectsList: scopedProjects
    });

    setShowPdfModal(true);
  };

  const handleTriggerPrintPdf = () => {
    window.print();
  };

  return (
    <div className="space-y-5">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#E2E2E2] pb-3">
        <div>
          <h2 className="text-xl font-black text-[#111111] tracking-tight m-0 flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-[#111111]" />
            Official Government PDF Report Generator
          </h2>
          <p className="text-xs text-[#555555] font-medium m-0">
            Generate formal A4 PDF decision support documents formatted for administrative review
          </p>
        </div>
      </div>

      {/* Report Cards Grid (PDF ONLY - Requirement 3 & 25) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableReports.map((report) => (
          <div 
            key={report.id}
            className="govt-card p-4 bg-white space-y-3 border-t-4 border-t-[#111111] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="p-2 bg-[#F5F5F5] border border-[#D9D9D9] rounded">
                  {report.icon}
                </div>
                <h3 className="text-sm font-bold text-[#111111] m-0 leading-tight">
                  {report.title}
                </h3>
              </div>
              <p className="text-xs text-[#555555] leading-relaxed">
                {report.subtitle}
              </p>
            </div>

            <div className="pt-3 border-t border-[#E2E2E2] flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#777777] uppercase tracking-wider font-mono">
                FORMAT: PDF ONLY
              </span>
              <button
                onClick={() => handleGeneratePdf(report.id)}
                className="bg-[#111111] hover:bg-[#333333] text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Generate PDF</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PDF View / Download Modal (Government A4 Style Formatted PDF) */}
      {showPdfModal && generatedPdfData && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full p-6 border border-[#D9D9D9] space-y-4 my-8">
            {/* Modal Control Header */}
            <div className="flex items-center justify-between border-b border-[#E2E2E2] pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-700" />
                <span className="text-sm font-black text-[#111111]">PDF Report Generated Successfully</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleTriggerPrintPdf}
                  className="bg-[#111111] hover:bg-[#333333] text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Download / Print PDF</span>
                </button>
                <button
                  onClick={() => setShowPdfModal(false)}
                  className="p-1 rounded hover:bg-[#F5F5F5] text-[#555555]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable A4 PDF Report Document Container */}
            <div id="pdf-report-document" className="p-6 bg-white border border-[#E2E2E2] rounded space-y-4 font-sans text-[#111111]">
              {/* PDF Document Header */}
              <div className="border-b-2 border-[#111111] pb-3 flex items-start justify-between">
                <div>
                  <h1 className="text-lg font-black text-[#111111] m-0 tracking-wide">LANDGUARD AI</h1>
                  <div className="text-[11px] font-bold text-[#555555] uppercase tracking-wider">
                    Predictive Land Acquisition Delay Intelligence Portal
                  </div>
                  <div className="text-base font-black text-[#111111] mt-2">
                    {generatedPdfData.title}
                  </div>
                </div>
                <div className="text-right text-[11px] text-[#555555] space-y-0.5 font-mono">
                  <div><strong>Report Date:</strong> {generatedPdfData.date}</div>
                  <div><strong>Generated By:</strong> {generatedPdfData.user}</div>
                  <div><strong>Scope:</strong> {generatedPdfData.scope}</div>
                </div>
              </div>

              {/* Executive Summary Cards */}
              <div className="grid grid-cols-5 gap-2 text-center text-xs">
                <div className="p-2 bg-[#F5F5F5] border border-[#D9D9D9] rounded">
                  <div className="text-[9px] font-bold text-[#555555] uppercase">Total Projects</div>
                  <div className="text-base font-black font-mono mt-0.5">{generatedPdfData.totalProjects}</div>
                </div>
                <div className="p-2 bg-[#F5F5F5] border border-[#D9D9D9] rounded">
                  <div className="text-[9px] font-bold text-[#555555] uppercase">High Risk</div>
                  <div className="text-base font-black text-orange-600 font-mono mt-0.5">{generatedPdfData.highRisk}</div>
                </div>
                <div className="p-2 bg-[#F5F5F5] border border-[#D9D9D9] rounded">
                  <div className="text-[9px] font-bold text-[#555555] uppercase">Critical Risk</div>
                  <div className="text-base font-black text-red-600 font-mono mt-0.5">{generatedPdfData.critical}</div>
                </div>
                <div className="p-2 bg-[#F5F5F5] border border-[#D9D9D9] rounded">
                  <div className="text-[9px] font-bold text-[#555555] uppercase">Avg Delay Prob.</div>
                  <div className="text-base font-black font-mono mt-0.5">{generatedPdfData.avgDelay}</div>
                </div>
                <div className="p-2 bg-[#F5F5F5] border border-[#D9D9D9] rounded">
                  <div className="text-[9px] font-bold text-[#555555] uppercase">Avg Exp. Delay</div>
                  <div className="text-base font-black font-mono mt-0.5">{generatedPdfData.avgExpectedDelay}</div>
                </div>
              </div>

              {/* Data Table Section */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-[#111111] uppercase tracking-wider m-0">
                  Project Risk & Bottleneck Breakdown ({generatedPdfData.projectsList.length} Projects)
                </h4>
                {generatedPdfData.projectsList.length > 0 ? (
                  <table className="w-full text-left text-[11px] border-collapse border border-[#D9D9D9]">
                    <thead>
                      <tr className="bg-[#F5F5F5] text-[#111111] border-b border-[#D9D9D9] font-bold">
                        <th className="p-1.5 border-r border-[#D9D9D9]">Project ID</th>
                        <th className="p-1.5 border-r border-[#D9D9D9]">Project Name</th>
                        <th className="p-1.5 border-r border-[#D9D9D9]">State / District / Area</th>
                        <th className="p-1.5 border-r border-[#D9D9D9]">Risk Score</th>
                        <th className="p-1.5 border-r border-[#D9D9D9]">Risk Category</th>
                        <th className="p-1.5 border-r border-[#D9D9D9]">Expected Delay</th>
                        <th className="p-1.5">Primary Bottleneck</th>
                      </tr>
                    </thead>
                    <tbody>
                      {generatedPdfData.projectsList.map((p) => (
                        <tr key={p.id} className="border-b border-[#E2E2E2]">
                          <td className="p-1.5 font-mono font-bold border-r border-[#D9D9D9]">{p.id}</td>
                          <td className="p-1.5 font-bold border-r border-[#D9D9D9]">{p.name}</td>
                          <td className="p-1.5 border-r border-[#D9D9D9]">{p.state} / {p.district} / <strong>{p.area}</strong></td>
                          <td className="p-1.5 font-mono border-r border-[#D9D9D9]">{p.riskScore}%</td>
                          <td className="p-1.5 font-bold border-r border-[#D9D9D9]">{p.riskCategory}</td>
                          <td className="p-1.5 font-mono border-r border-[#D9D9D9]">{p.expectedDelayDays} Days</td>
                          <td className="p-1.5 font-semibold text-[#333333]">{p.primaryBottleneck}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-4 text-center text-xs text-[#777777] bg-[#F5F5F5] border border-[#D9D9D9]">
                    No data available for the selected monitoring scope and filters.
                  </div>
                )}
              </div>

              {/* Official Sign-off Block */}
              <div className="pt-4 border-t border-[#E2E2E2] flex items-center justify-between text-[10px] text-[#555555]">
                <div>
                  <strong>Official Document Seal:</strong> LANDGUARD AI Decision Support System
                </div>
                <div className="text-right">
                  <strong>Authorized Signatory:</strong> {generatedPdfData.user}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
