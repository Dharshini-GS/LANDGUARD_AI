import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { GovernmentHeader, Sidebar } from './components/common/HeaderSidebar';
import { GlobalScopeIndicator } from './components/common/GlobalScopeIndicator';
import { FloatingAIChatbot } from './components/common/FloatingAIChatbot';
import { LoginPage } from './components/auth/LoginPage';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { DataManagementPage } from './components/data/DataManagementPage';
import { ProjectMonitoringPage } from './components/monitoring/ProjectMonitoringPage';
import { ProjectRiskAnalysisPage } from './components/risk/ProjectRiskAnalysisPage';
import { WhatIfSimulatorPage } from './components/simulator/WhatIfSimulatorPage';
import { GISRiskMapPage } from './components/gis/GISRiskMapPage';
import { AlertsPage } from './components/alerts/AlertsPage';
import { AnalyticsPage } from './components/analytics/AnalyticsPage';
import { ReportsPage } from './components/reports/ReportsPage';
import { AdminPage } from './components/admin/AdminPage';

const MainLayout: React.FC = () => {
  const { activePage } = useApp();

  if (activePage === 'login') {
    return <LoginPage />;
  }

  const renderActivePageContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'data':
        return <DataManagementPage />;
      case 'monitoring':
        return <ProjectMonitoringPage />;
      case 'risk':
        return <ProjectRiskAnalysisPage />;
      case 'simulator':
        return <WhatIfSimulatorPage />;
      case 'gis':
        return <GISRiskMapPage />;
      case 'alerts':
        return <AlertsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'reports':
        return <ReportsPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col antialiased font-sans">
      {/* Government Top Header */}
      <GovernmentHeader />

      {/* Main Container with Sidebar & Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Dynamic Page Main Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto max-w-full relative">
          {/* Global Geographic Scope Indicator */}
          <GlobalScopeIndicator />

          {/* Active Page View */}
          {renderActivePageContent()}
        </main>
      </div>

      {/* Floating Bottom-Right AI Assistant Chatbot */}
      <FloatingAIChatbot />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
