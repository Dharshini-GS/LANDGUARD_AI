import React, { createContext, useContext, useState } from 'react';
import type { 
  Project, 
  AlertItem, 
  User, 
  AuditLogItem, 
  DataQualityReport, 
  SimulationState, 
  MonitoringScope, 
  ScopeLevel,
  ChatMessage 
} from '../types';
import { mockProjects, mockAlerts, mockUsers, mockAuditLogs, initialDataQualityReport } from '../data/mockData';
import type { DashboardFilters } from '../data/kpiData';
import { filterProjectsByScopeAndFilters } from '../data/kpiData';

export type PageId = 
  | 'login'
  | 'dashboard'
  | 'data'
  | 'monitoring'
  | 'risk'
  | 'simulator'
  | 'gis'
  | 'alerts'
  | 'analytics'
  | 'reports'
  | 'admin';

interface AppContextType {
  currentUser: User | null;
  activePage: PageId;
  selectedProjectId: string;
  projects: Project[];
  alerts: AlertItem[];
  users: User[];
  auditLogs: AuditLogItem[];
  dataQualityReport: DataQualityReport;
  
  // Scope State (State -> District -> Area -> Project)
  scope: MonitoringScope;
  setScopeLevel: (level: ScopeLevel) => void;
  setScopeState: (stateName: string) => void;
  setScopeDistrict: (districtName: string) => void;
  setScopeArea: (areaName: string) => void;

  // Shared Dashboard Filters State
  dashboardFilters: DashboardFilters;
  setDashboardFilters: React.Dispatch<React.SetStateAction<DashboardFilters>>;
  activeKpiFilter: string | null;
  setActiveKpiFilter: (kpi: string | null) => void;
  
  // Chatbot State
  isChatbotOpen: boolean;
  setIsChatbotOpen: (open: boolean) => void;
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => void;

  // Navigation & Actions
  setCurrentUser: (user: User | null) => void;
  setActivePage: (page: PageId) => void;
  setSelectedProjectId: (id: string) => void;
  updateAlertStatus: (alertId: string, status: AlertItem['status']) => void;
  runSimulation: (projectId: string, state: SimulationState) => { simulatedRisk: number; riskReduction: number };
  addAuditLog: (action: string, project: string, prev: string, next: string) => void;
  selectedProject: Project;
  filteredProjects: Project[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUserState, setCurrentUserState] = useState<User | null>(mockUsers[0]); // Default System Administrator
  const [activePage, setActivePage] = useState<PageId>('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('PRJ-TN-2024-001');
  const [projects] = useState<Project[]>(mockProjects);
  const [alerts, setAlerts] = useState<AlertItem[]>(mockAlerts);
  const [users] = useState<User[]>(mockUsers);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(mockAuditLogs);
  const [dataQualityReport] = useState<DataQualityReport>(initialDataQualityReport);

  // Global Scope State (State -> District -> Area -> Project)
  const [scope, setScope] = useState<MonitoringScope>({
    level: 'National',
    state: 'All States',
    district: 'All Districts',
    area: 'All Areas'
  });

  // Dashboard Filters State
  const [dashboardFilters, setDashboardFilters] = useState<DashboardFilters>({
    projectType: 'All',
    riskCategory: 'All',
    bottleneckStage: 'All'
  });
  const [activeKpiFilter, setActiveKpiFilter] = useState<string | null>(null);

  // Floating Chatbot State
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: 'Greetings. I am the LANDGUARD AI Assistant for infrastructure delay risk decision support. How may I assist your monitoring today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // Set User & Enforce Assigned Scope (RBAC Data Isolation)
  const setCurrentUser = (user: User | null) => {
    setCurrentUserState(user);
    if (!user) return;

    if (user.role === 'State Officer' && user.state) {
      setScope({
        level: 'State',
        state: user.state,
        district: 'All Districts',
        area: 'All Areas'
      });
    } else if (user.role === 'District Officer' && user.state && user.district) {
      setScope({
        level: 'District',
        state: user.state,
        district: user.district,
        area: 'All Areas'
      });
    } else if (user.role === 'Project Manager' && user.state) {
      setScope({
        level: 'State',
        state: user.state,
        district: user.district || 'All Districts',
        area: user.area || 'All Areas'
      });
    } else {
      setScope({
        level: 'National',
        state: 'All States',
        district: 'All Districts',
        area: 'All Areas'
      });
    }
  };

  const selectedProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  // Role-Isolated Filtered Projects
  const filteredProjects = filterProjectsByScopeAndFilters(
    projects,
    scope,
    dashboardFilters,
    undefined,
    currentUserState
  );

  const setScopeLevel = (level: ScopeLevel) => {
    if (currentUserState?.role === 'State Officer' && level === 'National') return;
    if (currentUserState?.role === 'District Officer' && (level === 'National' || level === 'State')) return;
    setScope(prev => ({ ...prev, level }));
  };

  const setScopeState = (stateName: string) => {
    if (currentUserState?.role === 'State Officer' || currentUserState?.role === 'District Officer') return;
    setScope(prev => ({
      ...prev,
      state: stateName,
      district: 'All Districts',
      area: 'All Areas',
      level: stateName === 'All States' ? 'National' : 'State'
    }));
  };

  const setScopeDistrict = (districtName: string) => {
    if (currentUserState?.role === 'District Officer') return;
    setScope(prev => ({
      ...prev,
      district: districtName,
      area: 'All Areas',
      level: districtName === 'All Districts' ? (prev.state === 'All States' ? 'National' : 'State') : 'District'
    }));
  };

  const setScopeArea = (areaName: string) => {
    setScope(prev => ({
      ...prev,
      area: areaName,
      level: areaName === 'All Areas' 
        ? (prev.district === 'All Districts' ? (prev.state === 'All States' ? 'National' : 'State') : 'District')
        : 'Area'
    }));
  };

  const sendChatMessage = (userText: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    let replyText = "I have analyzed your query against our synthetic project database.";

    const queryLower = userText.toLowerCase();
    if (queryLower.includes("immediate") || queryLower.includes("critical") || queryLower.includes("action")) {
      const criticalCount = filteredProjects.filter(p => p.riskCategory === 'CRITICAL').length;
      replyText = `Within your authorized scope (${scope.state} / ${scope.district} / ${scope.area}), there are ${criticalCount} projects classified as CRITICAL requiring immediate intervention, led by ${selectedProject.name} (${selectedProject.riskScore}% risk).`;
    } else if (queryLower.includes("why") || queryLower.includes("reason") || queryLower.includes("bottleneck")) {
      replyText = `For ${selectedProject.name}, the primary bottleneck is ${selectedProject.primaryBottleneck}. Key drivers include ${selectedProject.legalDisputesCount} active legal disputes and ${selectedProject.compCompletedPct}% compensation completion.`;
    } else if (queryLower.includes("intervention") || queryLower.includes("reduce") || queryLower.includes("what-if")) {
      replyText = `Running a what-if intervention to increase compensation to 90% and resolve legal cases reduces ${selectedProject.name}'s risk score from ${selectedProject.riskScore}% to 63% (a 21 percentage point reduction).`;
    } else if (queryLower.includes("district") || queryLower.includes("state") || queryLower.includes("area")) {
      replyText = `Currently monitoring authorized scope: ${scope.state === 'All States' ? 'All Indian States' : scope.state} → ${scope.district} → ${scope.area}.`;
    }

    const assistantMsg: ChatMessage = {
      id: `msg-reply-${Date.now()}`,
      sender: 'assistant',
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg, assistantMsg]);
  };

  const updateAlertStatus = (alertId: string, status: AlertItem['status']) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status } : a));
    addAuditLog(`Updated alert ${alertId} status to ${status}`, selectedProject.name, 'Previous Status', status);
  };

  const addAuditLog = (action: string, project: string, previousValue: string, newValue: string) => {
    const newLog: AuditLogItem = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      user: currentUserState ? `${currentUserState.name} (${currentUserState.role})` : 'Anonymous',
      role: currentUserState?.role || 'Guest',
      action,
      project,
      timestamp: new Date().toLocaleString(),
      previousValue,
      newValue
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const runSimulation = (projectId: string, simulation: SimulationState) => {
    const p = projects.find(item => item.id === projectId) || selectedProject;
    
    const compDelta = (simulation.compCompletedPct - p.compCompletedPct) * 0.35;
    const legalDelta = (p.legalDisputesCount - simulation.legalDisputesCount) * 1.5;
    const approvalDelta = (p.approvalDelayDays - simulation.approvalDelayDays) * 0.3;
    const rrDelta = (simulation.rrCompletionPct - p.rrCompletionPct) * 0.15;

    const totalReduction = Math.max(0, Math.round(compDelta + legalDelta + approvalDelta + rrDelta));
    const simulatedRisk = Math.max(10, p.riskScore - totalReduction);

    addAuditLog(
      'Executed What-If Intervention Simulation',
      p.name,
      `Original Risk: ${p.riskScore}%`,
      `Simulated Risk: ${simulatedRisk}% (-${totalReduction} pts)`
    );

    return { simulatedRisk, riskReduction: totalReduction };
  };

  return (
    <AppContext.Provider
      value={{
        currentUser: currentUserState,
        activePage,
        selectedProjectId,
        projects,
        filteredProjects,
        alerts,
        users,
        auditLogs,
        dataQualityReport,
        scope,
        setScopeLevel,
        setScopeState,
        setScopeDistrict,
        setScopeArea,
        dashboardFilters,
        setDashboardFilters,
        activeKpiFilter,
        setActiveKpiFilter,
        isChatbotOpen,
        setIsChatbotOpen,
        chatMessages,
        sendChatMessage,
        setCurrentUser,
        setActivePage,
        setSelectedProjectId,
        updateAlertStatus,
        runSimulation,
        addAuditLog,
        selectedProject
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
