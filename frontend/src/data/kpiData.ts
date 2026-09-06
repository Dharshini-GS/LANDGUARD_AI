import type { Project, MonitoringScope, User } from '../types';

export interface DashboardFilters {
  projectType: string; // 'All' or specific type
  riskCategory: string; // 'All' or specific category
  bottleneckStage: string; // 'All' or specific stage
}

export interface KPICalculationResult {
  totalProjects: number;
  highRiskProjects: number;
  criticalProjects: number;
  avgDelayProbability: number | null; // null displays '—'
  actionRequired: number;
  avgExpectedDelay: number | null; // null displays '—'
  hasProjects: boolean;
}

/**
 * Standard Government Semantic Risk Color System
 * LOW: #2E7D32 (Green)
 * MEDIUM: #F9A825 (Yellow)
 * HIGH: #EF6C00 (Orange)
 * CRITICAL: #D32F2F (Red)
 * NEUTRAL: #37474F (Dark Blue/Grey)
 */
export function getSemanticRiskColor(val: number | string): string {
  if (typeof val === 'number') {
    if (val <= 30) return '#2E7D32';
    if (val <= 60) return '#F9A825';
    if (val <= 80) return '#EF6C00';
    return '#D32F2F';
  }
  const cat = String(val).toUpperCase();
  if (cat === 'LOW') return '#2E7D32';
  if (cat === 'MEDIUM') return '#F9A825';
  if (cat === 'HIGH') return '#EF6C00';
  if (cat === 'CRITICAL') return '#D32F2F';
  return '#37474F';
}

/**
 * Dynamic Hierarchy Count Functions
 * Strictly calculated from underlying project records
 */
export function getAreaProjectCount(projects: Project[], state: string, district: string, area: string): number {
  return projects.filter(p => p.state === state && p.district === district && p.area === area).length;
}

export function getDistrictProjectCount(projects: Project[], state: string, district: string): number {
  return projects.filter(p => p.state === state && p.district === district).length;
}

export function getStateProjectCount(projects: Project[], state: string): number {
  return projects.filter(p => p.state === state).length;
}

export function getNationalProjectCount(projects: Project[]): number {
  return projects.length;
}

/**
 * Filter projects based on user role-based access control (RBAC), global geographic scope
 * (National, State, District, Area, Project), and dashboard toolbar filters.
 * Enforces hard isolation for State and District officers.
 */
export function filterProjectsByScopeAndFilters(
  allProjects: Project[],
  scope: MonitoringScope,
  filters: DashboardFilters,
  selectedProjectId?: string,
  user?: User | null
): Project[] {
  return allProjects.filter(p => {
    // 0. Hard Role-Based Data Isolation (RBAC)
    if (user && user.role === 'State Officer' && user.state) {
      if (p.state !== user.state) return false;
    } else if (user && user.role === 'District Officer' && user.state && user.district) {
      if (p.state !== user.state || p.district !== user.district) return false;
    } else if (user && user.role === 'Project Manager' && user.state) {
      if (p.state !== user.state) return false;
    }

    // 1. Geographic Scope Filtering (State -> District -> Area -> Project)
    if (scope.level === 'State') {
      if (scope.state !== 'All States' && p.state !== scope.state) return false;
    } else if (scope.level === 'District') {
      if (scope.state !== 'All States' && p.state !== scope.state) return false;
      if (scope.district !== 'All Districts' && p.district !== scope.district) return false;
    } else if (scope.level === 'Area') {
      if (scope.state !== 'All States' && p.state !== scope.state) return false;
      if (scope.district !== 'All Districts' && p.district !== scope.district) return false;
      if (scope.area && scope.area !== 'All Areas' && p.area !== scope.area) return false;
    } else if (scope.level === 'Project') {
      if (selectedProjectId && p.id !== selectedProjectId) return false;
    }

    // Fallback dropdown filters when scope level is broader
    if (scope.state !== 'All States' && p.state !== scope.state) return false;
    if (scope.district !== 'All Districts' && p.district !== scope.district) return false;
    if (scope.area && scope.area !== 'All Areas' && p.area !== scope.area) return false;

    // 2. Dashboard Component Filters
    if (filters.projectType !== 'All' && p.type !== filters.projectType) return false;
    if (filters.riskCategory !== 'All' && p.riskCategory !== filters.riskCategory) return false;
    if (filters.bottleneckStage !== 'All' && p.primaryBottleneck !== filters.bottleneckStage) return false;

    return true;
  });
}

/**
 * Calculate KPI summary metrics from a filtered list of projects.
 */
export function calculateKPIs(projects: Project[]): KPICalculationResult {
  const totalProjects = projects.length;

  if (totalProjects === 0) {
    return {
      totalProjects: 0,
      highRiskProjects: 0,
      criticalProjects: 0,
      avgDelayProbability: null,
      actionRequired: 0,
      avgExpectedDelay: null,
      hasProjects: false
    };
  }

  const highRiskProjects = projects.filter(p => p.riskCategory === 'HIGH').length;
  const criticalProjects = projects.filter(p => p.riskCategory === 'CRITICAL').length;
  
  const sumDelayProb = projects.reduce((acc, p) => acc + p.delayProbability, 0);
  const avgDelayProbability = Math.round((sumDelayProb / totalProjects) * 10) / 10;

  const actionRequired = projects.filter(
    p => p.riskCategory === 'HIGH' || p.riskCategory === 'CRITICAL' || p.interventionPriorityScore >= 70
  ).length;

  const sumExpectedDelay = projects.reduce((acc, p) => acc + p.expectedDelayDays, 0);
  const avgExpectedDelay = Math.round(sumExpectedDelay / totalProjects);

  return {
    totalProjects,
    highRiskProjects,
    criticalProjects,
    avgDelayProbability,
    actionRequired,
    avgExpectedDelay,
    hasProjects: true
  };
}
