import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Database, 
  Upload, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  FileSpreadsheet, 
  FileCode, 
  Search, 
  History, 
  Layers, 
  Table, 
  Check
} from 'lucide-react';

interface UpdateHistoryLog {
  id: string;
  fileName: string;
  fileType: string;
  recordsCount: number;
  updatedBy: string;
  status: 'Validated & Merged' | 'Validation Warning' | 'Failed';
  timestamp: string;
}

export const DataManagementPage: React.FC = () => {
  const { projects, currentUser, dataQualityReport, addAuditLog } = useApp();
  const [activeTab, setActiveTab] = useState<'Overview' | 'Upload' | 'Update' | 'Validation' | 'Preview' | 'History'>('Overview');

  // Simulated Upload / File state
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; type: string; records: number } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'Idle' | 'Uploaded' | 'Validated' | 'Merged'>('Idle');
  const [searchTerm, setSearchTerm] = useState('');

  // Update History Log state
  const [updateHistory, setUpdateHistory] = useState<UpdateHistoryLog[]>([
    {
      id: 'UPD-2026-0801',
      fileName: 'TamilNadu_LandAcquisition_Q3.xlsx',
      fileType: 'Excel (.xlsx)',
      recordsCount: 145,
      updatedBy: 'Smt. M. Kanthimathi (State Officer)',
      status: 'Validated & Merged',
      timestamp: '2026-08-26 04:30 PM'
    },
    {
      id: 'UPD-2026-0789',
      fileName: 'National_Highways_Phase4_Batch2.csv',
      fileType: 'CSV',
      recordsCount: 350,
      updatedBy: 'Dr. R. K. Sharma (System Administrator)',
      status: 'Validated & Merged',
      timestamp: '2026-08-25 10:15 AM'
    }
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setTimeout(() => {
      setUploadedFile({
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        type: file.name.endsWith('.xlsx') ? 'Excel (.xlsx)' : 'CSV',
        records: 48
      });
      setIsUploading(false);
      setUploadStatus('Uploaded');
    }, 800);
  };

  const handleValidateData = () => {
    setUploadStatus('Validated');
  };

  const handleMergeData = () => {
    if (!uploadedFile) return;
    setUploadStatus('Merged');

    const newLog: UpdateHistoryLog = {
      id: `UPD-${Date.now().toString().slice(-4)}`,
      fileName: uploadedFile.name,
      fileType: uploadedFile.type,
      recordsCount: uploadedFile.records,
      updatedBy: currentUser ? `${currentUser.name} (${currentUser.role})` : 'System Administrator',
      status: 'Validated & Merged',
      timestamp: new Date().toLocaleString()
    };

    setUpdateHistory(prev => [newLog, ...prev]);
    addAuditLog('Uploaded and updated dataset', uploadedFile.name, 'Previous Records', `${uploadedFile.records} New Records Added`);
  };

  const filteredPreviewProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#E2E2E2] pb-3">
        <div>
          <h2 className="text-xl font-black text-[#111111] tracking-tight m-0 flex items-center gap-2">
            <Database className="w-5 h-5 text-[#111111]" />
            Land Acquisition Data Management Portal
          </h2>
          <p className="text-xs text-[#555555] font-medium m-0">
            Ingestion, schema validation, record updates, and data health auditing
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="govt-card p-2 bg-white flex flex-wrap items-center gap-1 border-b border-[#E2E2E2]">
        {(['Overview', 'Upload', 'Update', 'Validation', 'Preview', 'History'] as const).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded transition-all flex items-center gap-1.5 ${
                isActive 
                  ? 'bg-[#111111] text-white shadow-xs' 
                  : 'text-[#555555] hover:bg-[#F5F5F5] hover:text-[#111111]'
              }`}
            >
              {tab === 'Overview' && <Layers className="w-3.5 h-3.5" />}
              {tab === 'Upload' && <Upload className="w-3.5 h-3.5" />}
              {tab === 'Update' && <RefreshCw className="w-3.5 h-3.5" />}
              {tab === 'Validation' && <CheckCircle2 className="w-3.5 h-3.5" />}
              {tab === 'Preview' && <Table className="w-3.5 h-3.5" />}
              {tab === 'History' && <History className="w-3.5 h-3.5" />}
              <span>{tab === 'Overview' ? 'Data Overview' : tab === 'Upload' ? 'Upload Data' : tab === 'Update' ? 'Update Data' : tab === 'Validation' ? 'Data Validation' : tab === 'Preview' ? 'Data Preview' : 'Update History'}</span>
            </button>
          );
        })}
      </div>

      {/* 1. DATA OVERVIEW SECTION */}
      {activeTab === 'Overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="govt-card p-4 bg-white border-t-4 border-t-[#111111]">
              <div className="text-[10px] font-bold text-[#555555] uppercase tracking-wider">Total Records</div>
              <div className="text-2xl font-black text-[#111111] font-mono mt-1">{dataQualityReport.totalRecords}</div>
              <div className="text-[11px] text-[#777777]">Monitored survey plots</div>
            </div>
            <div className="govt-card p-4 bg-white border-t-4 border-t-green-600">
              <div className="text-[10px] font-bold text-[#555555] uppercase tracking-wider">Valid Records</div>
              <div className="text-2xl font-black text-green-700 font-mono mt-1">{dataQualityReport.validRecords}</div>
              <div className="text-[11px] text-[#777777]">96.4% Compliance rate</div>
            </div>
            <div className="govt-card p-4 bg-white border-t-4 border-t-orange-600">
              <div className="text-[10px] font-bold text-[#555555] uppercase tracking-wider">Missing Values</div>
              <div className="text-2xl font-black text-orange-600 font-mono mt-1">{dataQualityReport.missingValues}</div>
              <div className="text-[11px] text-[#777777]">Requires surveyor review</div>
            </div>
            <div className="govt-card p-4 bg-white border-t-4 border-t-red-600">
              <div className="text-[10px] font-bold text-[#555555] uppercase tracking-wider">Duplicates / Invalid</div>
              <div className="text-2xl font-black text-red-600 font-mono mt-1">{dataQualityReport.duplicateRecords + dataQualityReport.invalidRecords}</div>
              <div className="text-[11px] text-[#777777]">Flagged for audit</div>
            </div>
          </div>

          <div className="govt-card p-4 bg-white space-y-3">
            <h3 className="text-xs font-extrabold text-[#111111] uppercase tracking-wider border-b border-[#E2E2E2] pb-2 m-0">
              Data Ingestion Schema Standards
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-[#333333]">
              <div className="p-2 bg-[#F5F5F5] border border-[#D9D9D9] rounded font-mono">project_id (Primary Key)</div>
              <div className="p-2 bg-[#F5F5F5] border border-[#D9D9D9] rounded font-mono">project_name (String)</div>
              <div className="p-2 bg-[#F5F5F5] border border-[#D9D9D9] rounded font-mono">state (State Name)</div>
              <div className="p-2 bg-[#F5F5F5] border border-[#D9D9D9] rounded font-mono">district (District Name)</div>
              <div className="p-2 bg-[#F5F5F5] border border-[#D9D9D9] rounded font-mono">compensation_paid (%)</div>
              <div className="p-2 bg-[#F5F5F5] border border-[#D9D9D9] rounded font-mono">legal_disputes_count (Int)</div>
              <div className="p-2 bg-[#F5F5F5] border border-[#D9D9D9] rounded font-mono">approval_delay_days (Int)</div>
              <div className="p-2 bg-[#F5F5F5] border border-[#D9D9D9] rounded font-mono">survey_number_verified</div>
            </div>
          </div>
        </div>
      )}

      {/* 2. UPLOAD DATA SECTION */}
      {activeTab === 'Upload' && (
        <div className="govt-card p-5 bg-white space-y-4">
          <div className="border-b border-[#E2E2E2] pb-2">
            <h3 className="text-sm font-extrabold text-[#111111] uppercase tracking-wider m-0">
              Upload New Land Acquisition Data File
            </h3>
            <p className="text-xs text-[#555555] m-0">
              Supported file types: CSV (.csv) or Microsoft Excel (.xlsx)
            </p>
          </div>

          {/* Upload Dropzone */}
          <div className="border-2 border-dashed border-[#D9D9D9] bg-[#F9F9F9] rounded-lg p-8 text-center space-y-3 hover:border-[#111111] transition-colors">
            <Upload className="w-10 h-10 text-[#555555] mx-auto" />
            <div>
              <span className="text-xs font-bold text-[#111111]">Select or Drop Data File Here</span>
              <p className="text-[11px] text-[#777777] m-0">Maximum file size: 25 MB</p>
            </div>

            <label className="inline-block bg-[#111111] hover:bg-[#333333] text-white text-xs font-bold px-4 py-2 rounded cursor-pointer transition-colors">
              <span>Browse File</span>
              <input 
                type="file" 
                accept=".csv, .xlsx" 
                onChange={handleFileUpload}
                className="hidden" 
              />
            </label>
          </div>

          {/* Uploaded File Details & Validation Box */}
          {isUploading && (
            <div className="p-3 bg-[#F5F5F5] border border-[#D9D9D9] rounded text-xs text-[#111111] font-bold flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-[#111111]" />
              <span>Parsing and validating uploaded dataset...</span>
            </div>
          )}

          {uploadedFile && !isUploading && (
            <div className="p-4 bg-[#F5F5F5] border border-[#D9D9D9] rounded space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E2E2] pb-2">
                <div className="flex items-center gap-2">
                  {uploadedFile.type.includes('Excel') ? (
                    <FileSpreadsheet className="w-5 h-5 text-green-700" />
                  ) : (
                    <FileCode className="w-5 h-5 text-blue-700" />
                  )}
                  <div>
                    <div className="text-xs font-bold text-[#111111]">{uploadedFile.name}</div>
                    <div className="text-[10px] text-[#555555]">{uploadedFile.type} • {uploadedFile.size} • {uploadedFile.records} records detected</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    uploadStatus === 'Merged' 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : uploadStatus === 'Validated' 
                      ? 'bg-blue-100 text-blue-800 border border-blue-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}>
                    {uploadStatus}
                  </span>
                </div>
              </div>

              {/* Detected Columns */}
              <div className="text-xs text-[#333333]">
                <strong>Detected Columns:</strong> project_id, project_name, state, district, area, land_acres, comp_pct, legal_cases, bottleneck_stage
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2">
                {uploadStatus === 'Uploaded' && (
                  <button
                    onClick={handleValidateData}
                    className="bg-[#111111] hover:bg-[#333333] text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Run Data Validation</span>
                  </button>
                )}

                {uploadStatus === 'Validated' && (
                  <button
                    onClick={handleMergeData}
                    className="bg-green-700 hover:bg-green-800 text-white text-xs font-bold px-4 py-1.5 rounded flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Merge Data into Live Portal</span>
                  </button>
                )}

                {uploadStatus === 'Merged' && (
                  <div className="text-xs font-bold text-green-800 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-green-700" />
                    <span>Successfully merged into system database.</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. UPDATE DATA SECTION */}
      {activeTab === 'Update' && (
        <div className="govt-card p-5 bg-white space-y-4">
          <div className="border-b border-[#E2E2E2] pb-2">
            <h3 className="text-sm font-extrabold text-[#111111] uppercase tracking-wider m-0">
              Update Existing Infrastructure Dataset
            </h3>
            <p className="text-xs text-[#555555] m-0">
              Modify status parameters, compensation progress, or legal dispute records for existing projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-[#F5F5F5] border border-[#D9D9D9] rounded space-y-1">
              <div className="text-xs font-bold text-[#111111]">Update Action</div>
              <div className="text-[11px] text-[#555555]">Delta incremental merge by Project ID</div>
            </div>
            <div className="p-3 bg-[#F5F5F5] border border-[#D9D9D9] rounded space-y-1">
              <div className="text-xs font-bold text-[#111111]">Last Modified</div>
              <div className="text-[11px] text-[#555555]">Today 04:30 PM by {currentUser?.name || 'Admin'}</div>
            </div>
            <div className="p-3 bg-[#F5F5F5] border border-[#D9D9D9] rounded space-y-1">
              <div className="text-xs font-bold text-[#111111]">Validation Rule</div>
              <div className="text-[11px] text-[#555555]">Strict schema check active</div>
            </div>
          </div>

          <div className="p-4 bg-[#F5F5F5] border border-[#D9D9D9] rounded space-y-3">
            <div className="text-xs font-bold text-[#111111]">Upload Batch Update File (.csv / .xlsx)</div>
            <input type="file" accept=".csv, .xlsx" onChange={handleFileUpload} className="text-xs" />
          </div>
        </div>
      )}

      {/* 4. DATA VALIDATION SECTION */}
      {activeTab === 'Validation' && (
        <div className="govt-card p-5 bg-white space-y-4">
          <div className="border-b border-[#E2E2E2] pb-2">
            <h3 className="text-sm font-extrabold text-[#111111] uppercase tracking-wider m-0">
              Data Quality & Audit Rules Engine
            </h3>
          </div>

          <div className="space-y-2">
            {dataQualityReport.warnings.map((warning, wIdx) => (
              <div key={wIdx} className="p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-900 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>{warning}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. DATA PREVIEW SECTION */}
      {activeTab === 'Preview' && (
        <div className="govt-card p-4 bg-white space-y-3">
          <div className="flex items-center justify-between border-b border-[#E2E2E2] pb-2">
            <h3 className="text-xs font-extrabold text-[#111111] uppercase tracking-wider m-0">
              Current Dataset Preview ({filteredPreviewProjects.length} Records)
            </h3>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#777777] absolute left-2 top-2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search preview..."
                className="pl-7 pr-2 py-1 text-xs bg-[#F5F5F5] border border-[#D9D9D9] rounded focus:outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="govt-table">
              <thead>
                <tr>
                  <th>Project ID</th>
                  <th>Project Name</th>
                  <th>State</th>
                  <th>District</th>
                  <th>Type</th>
                  <th>Risk Category</th>
                  <th>Risk Score</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {filteredPreviewProjects.map((p) => (
                  <tr key={p.id}>
                    <td className="font-mono font-bold text-[#111111]">{p.id}</td>
                    <td className="font-bold text-[#111111]">{p.name}</td>
                    <td>{p.state}</td>
                    <td>{p.district}</td>
                    <td>{p.type}</td>
                    <td>{p.riskCategory}</td>
                    <td className="font-mono font-bold">{p.riskScore}%</td>
                    <td className="font-mono text-[11px] text-[#777777]">{p.lastUpdated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. UPDATE HISTORY SECTION */}
      {activeTab === 'History' && (
        <div className="govt-card p-4 bg-white space-y-3">
          <div className="border-b border-[#E2E2E2] pb-2">
            <h3 className="text-xs font-extrabold text-[#111111] uppercase tracking-wider m-0">
              Data Update Audit History
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="govt-table">
              <thead>
                <tr>
                  <th>Update ID</th>
                  <th>File Name</th>
                  <th>Type</th>
                  <th>Records</th>
                  <th>Updated By</th>
                  <th>Status</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {updateHistory.map((log) => (
                  <tr key={log.id}>
                    <td className="font-mono font-bold text-[#111111]">{log.id}</td>
                    <td className="font-bold text-[#111111]">{log.fileName}</td>
                    <td>{log.fileType}</td>
                    <td className="font-mono font-bold">{log.recordsCount}</td>
                    <td>{log.updatedBy}</td>
                    <td>
                      <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded border border-green-300">
                        {log.status}
                      </span>
                    </td>
                    <td className="font-mono text-[11px] text-[#777777]">{log.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
