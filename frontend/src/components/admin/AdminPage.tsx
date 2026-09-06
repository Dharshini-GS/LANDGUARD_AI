import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserCheck } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { users, auditLogs } = useApp();

  const [activeTab, setActiveTab] = useState<'Users' | 'AuditLogs'>('Users');

  return (
    <div className="space-y-5">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#E2E2E2] pb-3">
        <div>
          <h2 className="text-xl font-black text-[#111111] tracking-tight m-0 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[#111111]" />
            Portal Administration & System Audit Logs
          </h2>
          <p className="text-xs text-[#555555] font-medium m-0">
            Role-Based Access Control (RBAC) management and immutable action audit history
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="govt-card p-2 bg-white flex items-center gap-2">
        <button
          onClick={() => setActiveTab('Users')}
          className={`px-4 py-1.5 text-xs font-bold rounded transition-all ${
            activeTab === 'Users' ? 'bg-[#111111] text-white' : 'text-[#555555] hover:bg-[#F5F5F5]'
          }`}
        >
          Authorized System Users ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('AuditLogs')}
          className={`px-4 py-1.5 text-xs font-bold rounded transition-all ${
            activeTab === 'AuditLogs' ? 'bg-[#111111] text-white' : 'text-[#555555] hover:bg-[#F5F5F5]'
          }`}
        >
          System Action Audit Logs ({auditLogs.length})
        </button>
      </div>

      {/* Content */}
      {activeTab === 'Users' ? (
        <div className="govt-card p-4 space-y-3 bg-white">
          <h3 className="text-xs font-extrabold text-[#111111] uppercase tracking-wider border-b border-[#E2E2E2] pb-2 m-0">
            Authorized Personnel Role Registry
          </h3>
          <div className="overflow-x-auto">
            <table className="govt-table">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Full Name</th>
                  <th>Designated System Role</th>
                  <th>Assigned State / District Scope</th>
                  <th>Status</th>
                  <th>Last Portal Access</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td className="font-mono font-bold text-[#111111]">{u.id}</td>
                    <td className="font-bold text-[#111111]">{u.name}</td>
                    <td>{u.role}</td>
                    <td>{u.state || 'All States'} {u.district ? `/ ${u.district}` : ''}</td>
                    <td>
                      <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded border border-green-300">
                        {u.status}
                      </span>
                    </td>
                    <td className="font-mono text-[#777777]">{u.lastLogin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="govt-card p-4 space-y-3 bg-white">
          <h3 className="text-xs font-extrabold text-[#111111] uppercase tracking-wider border-b border-[#E2E2E2] pb-2 m-0">
            Immutable Administrative Audit Trail
          </h3>
          <div className="overflow-x-auto">
            <table className="govt-table">
              <thead>
                <tr>
                  <th>Audit ID</th>
                  <th>Timestamp</th>
                  <th>Official / Role</th>
                  <th>Action Performed</th>
                  <th>Target Project</th>
                  <th>Previous State</th>
                  <th>New State</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="font-mono font-bold text-[#111111]">{log.id}</td>
                    <td className="font-mono text-[#777777]">{log.timestamp}</td>
                    <td className="font-bold text-[#111111]">{log.user}</td>
                    <td className="font-semibold">{log.action}</td>
                    <td>{log.project}</td>
                    <td className="font-mono text-[#555555]">{log.previousValue}</td>
                    <td className="font-mono font-bold text-[#111111]">{log.newValue}</td>
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
