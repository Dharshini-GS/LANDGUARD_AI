import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { PageId } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Database, 
  Search, 
  FileText, 
  SlidersHorizontal, 
  MapPin, 
  Bell, 
  BarChart3, 
  FileSpreadsheet, 
  ShieldAlert, 
  UserCheck, 
  HelpCircle, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Shield,
  Circle,
  Clock
} from 'lucide-react';

export const GovernmentHeader: React.FC = () => {
  const { currentUser, setCurrentUser, alerts, setActivePage, scope } = useApp();
  const unreadAlertsCount = alerts.filter(a => a.status === 'New').length;
  const [showHelpModal, setShowHelpModal] = useState(false);

  return (
    <>
      {/* Primary WHITE Government Administrative Header (No Demo/Prototype Banner) */}
      <header className="govt-header-white px-4 py-2.5 flex items-center justify-between sticky top-0 z-40">
        {/* Left Side: Emblem Placeholder & Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#F5F5F5] border border-[#D9D9D9] flex items-center justify-center p-1">
            <Shield className="w-5 h-5 text-[#111111]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-black tracking-wide text-[#111111] m-0 leading-tight">LANDGUARD AI</h1>
              <span className="text-[10px] font-bold text-[#111111] bg-[#F5F5F5] border border-[#D9D9D9] px-2 py-0.5 rounded uppercase tracking-wider">
                GOVERNMENT E-GOVERNANCE PORTAL
              </span>
            </div>
            <p className="text-[11px] text-[#555555] font-medium tracking-normal opacity-90 m-0">
              Predictive Land Acquisition Delay Intelligence
            </p>
          </div>
        </div>

        {/* Right Side: Quick Action Indicators, Role Switcher & Profile */}
        <div className="flex items-center gap-3">
          {/* Notifications Button */}
          <button 
            onClick={() => setActivePage('alerts')}
            className="relative p-2 rounded hover:bg-[#F5F5F5] text-[#333333] border border-[#E2E2E2] transition-colors"
            title="View Alerts & Priorities"
          >
            <Bell className="w-4.5 h-4.5" />
            {unreadAlertsCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white font-bold text-[10px] rounded-full flex items-center justify-center">
                {unreadAlertsCount}
              </span>
            )}
          </button>

          {/* Help Icon */}
          <button 
            onClick={() => setShowHelpModal(true)}
            className="p-2 rounded hover:bg-[#F5F5F5] text-[#333333] border border-[#E2E2E2] transition-colors flex items-center gap-1 text-xs font-medium"
            title="System Operations Manual"
          >
            <HelpCircle className="w-4.5 h-4.5" />
            <span className="hidden md:inline">Help</span>
          </button>


          {/* User Profile Pill & Role Indicator */}
          {currentUser && (
            <div className="flex items-center gap-2 pl-3 border-l border-[#E2E2E2]">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-[#111111]">{currentUser.name}</div>
                <div className="text-[10px] text-[#555555] font-semibold">
                  {currentUser.role} {scope.state !== 'All States' ? `(${scope.state})` : '(National)'}
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#111111] text-white font-bold flex items-center justify-center text-xs">
                {currentUser.name.charAt(0)}
              </div>
            </div>
          )}

          {/* Logout Action */}
          <button 
            onClick={() => {
              setCurrentUser(null);
              setActivePage('login');
            }}
            className="p-1.5 px-2 rounded bg-white hover:bg-red-50 text-red-700 border border-red-200 transition-colors flex items-center gap-1 text-xs font-medium"
            title="Logout of Portal"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Help & System Manual Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded shadow-2xl max-w-lg w-full p-6 border border-[#D9D9D9]">
            <h3 className="text-base font-bold text-[#111111] flex items-center gap-2 mb-3 border-b border-[#E2E2E2] pb-2">
              <Shield className="w-5 h-5 text-[#111111]" /> LANDGUARD AI — User Operations Manual
            </h3>
            <div className="text-xs text-[#333333] space-y-2 mb-4 leading-relaxed">
              <p><strong>System Objective:</strong> Predictive decision support platform for government land acquisition monitoring.</p>
              <ul className="list-disc pl-4 space-y-1.5">
                <li><strong>Role-Based Scope Isolation:</strong> State and District users automatically access data restricted strictly to their assigned territory.</li>
                <li><strong>Interactive KPI Cards:</strong> Click any KPI card to view scope-aware detailed reports and project tables.</li>
                <li><strong>What-If Simulator:</strong> Test intervention outcomes before committing administrative resources.</li>
                <li><strong>SHAP Explainability:</strong> Analyze key bottleneck drivers causing delay probability spikes.</li>
              </ul>
            </div>
            <button 
              onClick={() => setShowHelpModal(false)}
              className="w-full bg-[#111111] hover:bg-[#333333] text-white font-bold text-xs py-2 rounded"
            >
              Close Manual
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export const Sidebar: React.FC = () => {
  const { activePage, setActivePage, currentUser } = useApp();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Unnumbered navigation items (No AI Assistant in Sidebar as per Requirement 2)
  const allNavigationItems: Array<{ id: PageId; label: string; icon: React.ReactNode; roles?: string[] }> = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'data', label: 'Data Management', icon: <Database className="w-4 h-4" /> },
    { id: 'monitoring', label: 'Project Monitoring', icon: <Search className="w-4 h-4" /> },
    { id: 'risk', label: 'Risk Analysis', icon: <FileText className="w-4 h-4" /> },
    { id: 'simulator', label: 'What-If Simulator', icon: <SlidersHorizontal className="w-4 h-4" /> },
    { id: 'gis', label: 'Risk Map (GIS)', icon: <MapPin className="w-4 h-4" /> },
    { id: 'alerts', label: 'Alerts & Priority', icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'reports', label: 'Reports', icon: <FileSpreadsheet className="w-4 h-4" /> },
    { id: 'admin', label: 'Administration', icon: <UserCheck className="w-4 h-4" />, roles: ['System Administrator'] },
  ];

  // Role-based navigation filtering
  const navigationItems = allNavigationItems.filter(item => {
    if (!item.roles) return true;
    return currentUser ? item.roles.includes(currentUser.role) : false;
  });

  return (
    <aside 
      className={`govt-sidebar-white text-[#111111] transition-all duration-200 flex flex-col justify-between shrink-0 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div>
        {/* Sidebar Brand / Toggle Header */}
        <div className="p-3 border-b border-[#E2E2E2] flex items-center justify-between">
          {!isCollapsed && <span className="text-[10px] font-bold text-[#777777] uppercase tracking-widest">Main Navigation</span>}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded hover:bg-[#F5F5F5] text-[#555555] hover:text-[#111111] ml-auto border border-[#E2E2E2]"
            title={isCollapsed ? "Expand Navigation" : "Collapse Navigation"}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation List */}
        <nav className="p-2 space-y-1">
          {navigationItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded text-xs font-medium transition-all ${
                  isActive 
                    ? 'bg-[#F5F5F5] text-[#111111] font-bold border-l-4 border-l-[#111111] shadow-xs' 
                    : 'text-[#555555] hover:bg-[#F5F5F5] hover:text-[#111111]'
                }`}
                title={item.label}
              >
                <span className={isActive ? 'text-[#111111]' : 'text-[#777777]'}>{item.icon}</span>
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer System Operational Status */}
      {!isCollapsed ? (
        <div className="p-3 bg-[#F7F7F7] border-t border-[#E2E2E2] text-[11px] space-y-1 text-[#555555]">
          <div className="font-bold text-[#111111] text-[10px] uppercase tracking-wider mb-1">System Health</div>
          <div className="flex items-center gap-2">
            <Circle className="w-2 h-2 fill-green-600 text-green-600" />
            <span>AI Predictor: <strong>Active</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Circle className="w-2 h-2 fill-green-600 text-green-600" />
            <span>Database: <strong>Connected</strong></span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-[#777777] pt-1 border-t border-[#E2E2E2] mt-1">
            <Clock className="w-3 h-3" />
            <span>Last Sync: Today 11:15 AM</span>
          </div>
        </div>
      ) : (
        <div className="p-2 border-t border-[#E2E2E2] text-center bg-[#F7F7F7]">
          <span title="System Status: Operational">
            <Circle className="w-2 h-2 fill-green-600 text-green-600 mx-auto" />
          </span>
        </div>
      )}
    </aside>
  );
};
