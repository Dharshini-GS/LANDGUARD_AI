export type ScopeLevel = 'National' | 'State' | 'District' | 'Area' | 'Project';

export interface MonitoringScope {
  level: ScopeLevel;
  state: string; // 'All States' or specific state name
  district: string; // 'All Districts' or specific district name
  area: string; // 'All Areas' or specific area name
}

export type UserRole = 
  | 'System Administrator'
  | 'State Officer'
  | 'District Officer'
  | 'Project Manager'
  | 'Data/Analytics Officer';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  state?: string;
  district?: string;
  area?: string;
  status: 'Active' | 'Inactive';
  lastLogin: string;
}

export type RiskCategory = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type AcquisitionStage = 
  | 'Notification'
  | 'Documentation'
  | 'Compensation'
  | 'Legal Resolution'
  | 'R&R'
  | 'Possession';

export interface SHAPContributor {
  feature: string;
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  contributionPct: number;
  explanation: string;
}

export interface Recommendation {
  id: string;
  priority: number;
  stage: AcquisitionStage;
  reason: string;
  action: string;
  responsibleDept: string;
  status: 'Pending' | 'In Progress' | 'Escalated' | 'Resolved';
}

export interface StageRiskDetail {
  riskPct: number;
  status: RiskCategory;
  progressPct: number;
  explanation: string;
}

export interface RiskTrendPoint {
  day: string;
  riskPct: number;
  expectedDelayDays?: number;
}

export interface Project {
  id: string;
  name: string;
  type: string;
  state: string;
  district: string;
  area: string; // e.g. 'Hosur', 'Guindy', 'Hinjawadi'
  landAreaAcres: number;
  affectedFamilies: number;
  landownersCount: number;
  coordinates: [number, number]; // [lat, lng]
  lastUpdated: string;
  assignedOfficer?: string;
  
  // Status inputs
  notificationStatus: 'Completed' | 'Pending' | 'In Progress';
  notificationPendingDays: number;
  docCompletionPct: number;
  ownershipVerifiedPct: number;
  ownershipConflictsCount: number;
  possessionPct: number;
  
  compAmountCrores: number;
  compCompletedPct: number;
  pendingCompCases: number;
  compPendingAmountCrores: number;
  
  legalDisputesCount: number;
  pendingLegalCases: number;
  avgLegalResolutionDays: number;
  
  approvalStatus: 'Approved' | 'Pending' | 'Delayed';
  pendingApprovalsCount: number;
  approvalDelayDays: number;
  pendingDepartment: string;
  
  rrCompletionPct: number;
  familiesAwaitingRR: number;
  pendingResettlementCases: number;
  
  avgStakeholderResponseDays: number;
  deptCoordinationScore: number; // 1-10
  adminBottleneckCount: number;
  
  // Model Predictions
  delayProbability: number; // e.g. 84%
  riskScore: number; // 0-100
  riskCategory: RiskCategory;
  expectedDelayDays: number; // e.g. 47 days
  primaryBottleneck: AcquisitionStage;
  stageRisks: Record<AcquisitionStage, StageRiskDetail>;
  shapContributors: SHAPContributor[];
  recommendations: Recommendation[];
  interventionPriorityScore: number; // 0-100
  riskTrend: RiskTrendPoint[];
}

export interface AlertItem {
  id: string;
  projectId: string;
  projectName: string;
  state: string;
  district: string;
  area?: string;
  riskCategory: RiskCategory;
  riskScore: number;
  mainFactors: string[];
  recommendedAction: string;
  status: 'New' | 'Acknowledged' | 'In Progress' | 'Resolved';
  timestamp: string;
}

export interface AuditLogItem {
  id: string;
  user: string;
  role: string;
  action: string;
  project: string;
  timestamp: string;
  previousValue: string;
  newValue: string;
}

export interface DataQualityReport {
  totalRecords: number;
  validRecords: number;
  missingValues: number;
  duplicateRecords: number;
  invalidRecords: number;
  qualityScorePct: number;
  warnings: string[];
}

export interface SimulationState {
  compCompletedPct: number;
  legalDisputesCount: number;
  approvalDelayDays: number;
  rrCompletionPct: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
