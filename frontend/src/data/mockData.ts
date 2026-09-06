import type { Project, AlertItem, User, AuditLogItem, DataQualityReport } from '../types';

export const mockProjects: Project[] = [
  {
    "id": "CHN-INF-001",
    "name": "Chennai Outer Ring Road Expansion",
    "type": "Highway Expansion",
    "state": "Tamil Nadu",
    "district": "Chennai",
    "area": "Madhavaram",
    "landAreaAcres": 450,
    "affectedFamilies": 280,
    "landownersCount": 120,
    "coordinates": [
      13.1488,
      80.2306
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "CHN001 (Chennai District Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 30.0,
    "compCompletedPct": 58,
    "pendingCompCases": 30,
    "compPendingAmountCrores": 10.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 20,
    "pendingResettlementCases": 7,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 72,
    "riskScore": 72,
    "riskCategory": "HIGH",
    "expectedDelayDays": 55,
    "primaryBottleneck": "Legal Resolution",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 72,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Legal Resolution Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Legal Resolution."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 47,
        "expectedDelayDays": 35
      },
      {
        "day": "Day 30",
        "riskPct": 72,
        "expectedDelayDays": 55
      }
    ]
  },
  {
    "id": "CHN-INF-007",
    "name": "Madhavaram Bus Terminal Modernization",
    "type": "Urban Infrastructure",
    "state": "Tamil Nadu",
    "district": "Chennai",
    "area": "Madhavaram",
    "landAreaAcres": 286,
    "affectedFamilies": 316,
    "landownersCount": 206,
    "coordinates": [
      13.151,
      80.232
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "CHN001 (Chennai District Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 80,
    "ownershipVerifiedPct": 76,
    "ownershipConflictsCount": 5,
    "possessionPct": 65,
    "compAmountCrores": 106.0,
    "compCompletedPct": 70,
    "pendingCompCases": 36,
    "compPendingAmountCrores": 46.0,
    "legalDisputesCount": 5,
    "pendingLegalCases": 3,
    "avgLegalResolutionDays": 60,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 1,
    "approvalDelayDays": 8,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 65,
    "familiesAwaitingRR": 56,
    "pendingResettlementCases": 13,
    "avgStakeholderResponseDays": 14,
    "deptCoordinationScore": 7,
    "adminBottleneckCount": 2,
    "delayProbability": 48,
    "riskScore": 48,
    "riskCategory": "MEDIUM",
    "expectedDelayDays": 30,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 80,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 70,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 48,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 65,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 50,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 23,
        "expectedDelayDays": 10
      },
      {
        "day": "Day 30",
        "riskPct": 48,
        "expectedDelayDays": 30
      }
    ]
  },
  {
    "id": "CHN-INF-002",
    "name": "Chennai Metro Corridor Development",
    "type": "Metro Rail",
    "state": "Tamil Nadu",
    "district": "Chennai",
    "area": "Sholinganallur",
    "landAreaAcres": 195,
    "affectedFamilies": 225,
    "landownersCount": 115,
    "coordinates": [
      12.901,
      80.2279
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "CHN001 (Chennai District Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 55.0,
    "compCompletedPct": 85,
    "pendingCompCases": 35,
    "compPendingAmountCrores": 35.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 65,
    "pendingResettlementCases": 12,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 24,
    "riskScore": 24,
    "riskCategory": "LOW",
    "expectedDelayDays": 14,
    "primaryBottleneck": "Possession",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 24,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Possession Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Possession."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 24,
        "expectedDelayDays": 14
      }
    ]
  },
  {
    "id": "CHN-INF-008",
    "name": "Sholinganallur IT Flyover Project",
    "type": "Urban Transport",
    "state": "Tamil Nadu",
    "district": "Chennai",
    "area": "Sholinganallur",
    "landAreaAcres": 599,
    "affectedFamilies": 129,
    "landownersCount": 269,
    "coordinates": [
      12.903,
      80.229
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "CHN001 (Chennai District Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 80,
    "ownershipVerifiedPct": 76,
    "ownershipConflictsCount": 5,
    "possessionPct": 65,
    "compAmountCrores": 79.0,
    "compCompletedPct": 70,
    "pendingCompCases": 29,
    "compPendingAmountCrores": 19.0,
    "legalDisputesCount": 5,
    "pendingLegalCases": 3,
    "avgLegalResolutionDays": 60,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 1,
    "approvalDelayDays": 8,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 65,
    "familiesAwaitingRR": 69,
    "pendingResettlementCases": 6,
    "avgStakeholderResponseDays": 14,
    "deptCoordinationScore": 7,
    "adminBottleneckCount": 2,
    "delayProbability": 52,
    "riskScore": 52,
    "riskCategory": "MEDIUM",
    "expectedDelayDays": 32,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 80,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 70,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 52,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 65,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 50,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 27,
        "expectedDelayDays": 12
      },
      {
        "day": "Day 30",
        "riskPct": 52,
        "expectedDelayDays": 32
      }
    ]
  },
  {
    "id": "CHN-INF-003",
    "name": "North Chennai Logistics Infrastructure",
    "type": "Logistics Hub",
    "state": "Tamil Nadu",
    "district": "Chennai",
    "area": "Thiruvottiyur",
    "landAreaAcres": 553,
    "affectedFamilies": 283,
    "landownersCount": 223,
    "coordinates": [
      13.1636,
      80.3007
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "CHN001 (Chennai District Officer)",
    "notificationStatus": "In Progress",
    "notificationPendingDays": 30,
    "docCompletionPct": 50,
    "ownershipVerifiedPct": 46,
    "ownershipConflictsCount": 18,
    "possessionPct": 30,
    "compAmountCrores": 93.0,
    "compCompletedPct": 36,
    "pendingCompCases": 33,
    "compPendingAmountCrores": 33.0,
    "legalDisputesCount": 18,
    "pendingLegalCases": 16,
    "avgLegalResolutionDays": 140,
    "approvalStatus": "Delayed",
    "pendingApprovalsCount": 4,
    "approvalDelayDays": 40,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 30,
    "familiesAwaitingRR": 23,
    "pendingResettlementCases": 10,
    "avgStakeholderResponseDays": 30,
    "deptCoordinationScore": 3,
    "adminBottleneckCount": 7,
    "delayProbability": 88,
    "riskScore": 88,
    "riskCategory": "CRITICAL",
    "expectedDelayDays": 95,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 50,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 80,
        "status": "CRITICAL",
        "progressPct": 36,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 88,
        "status": "CRITICAL",
        "progressPct": 30,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 30,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 30,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 92,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 63,
        "expectedDelayDays": 75
      },
      {
        "day": "Day 30",
        "riskPct": 88,
        "expectedDelayDays": 95
      }
    ]
  },
  {
    "id": "CHN-INF-004",
    "name": "Guindy Urban Infrastructure Upgrade",
    "type": "Urban Development",
    "state": "Tamil Nadu",
    "district": "Chennai",
    "area": "Guindy",
    "landAreaAcres": 619,
    "affectedFamilies": 349,
    "landownersCount": 289,
    "coordinates": [
      13.0067,
      80.202
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "CHN001 (Chennai District Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 80,
    "ownershipVerifiedPct": 76,
    "ownershipConflictsCount": 5,
    "possessionPct": 65,
    "compAmountCrores": 79.0,
    "compCompletedPct": 70,
    "pendingCompCases": 39,
    "compPendingAmountCrores": 19.0,
    "legalDisputesCount": 5,
    "pendingLegalCases": 3,
    "avgLegalResolutionDays": 60,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 1,
    "approvalDelayDays": 8,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 65,
    "familiesAwaitingRR": 89,
    "pendingResettlementCases": 16,
    "avgStakeholderResponseDays": 14,
    "deptCoordinationScore": 7,
    "adminBottleneckCount": 2,
    "delayProbability": 45,
    "riskScore": 45,
    "riskCategory": "MEDIUM",
    "expectedDelayDays": 28,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 80,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 70,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 65,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 50,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 20,
        "expectedDelayDays": 8
      },
      {
        "day": "Day 30",
        "riskPct": 45,
        "expectedDelayDays": 28
      }
    ]
  },
  {
    "id": "CHN-INF-005",
    "name": "South Chennai Stormwater Infrastructure",
    "type": "Urban Infrastructure",
    "state": "Tamil Nadu",
    "district": "Chennai",
    "area": "Perungudi",
    "landAreaAcres": 226,
    "affectedFamilies": 256,
    "landownersCount": 146,
    "coordinates": [
      12.9654,
      80.2461
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "CHN001 (Chennai District Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 46.0,
    "compCompletedPct": 85,
    "pendingCompCases": 36,
    "compPendingAmountCrores": 26.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 96,
    "pendingResettlementCases": 13,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 18,
    "riskScore": 18,
    "riskCategory": "LOW",
    "expectedDelayDays": 10,
    "primaryBottleneck": "Possession",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 18,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Possession Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Possession."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 18,
        "expectedDelayDays": 10
      }
    ]
  },
  {
    "id": "CHN-INF-006",
    "name": "Industrial Corridor Land Development",
    "type": "Industrial Corridor",
    "state": "Tamil Nadu",
    "district": "Chennai",
    "area": "Ambattur",
    "landAreaAcres": 512,
    "affectedFamilies": 342,
    "landownersCount": 182,
    "coordinates": [
      13.1147,
      80.1548
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "CHN001 (Chennai District Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 52.0,
    "compCompletedPct": 58,
    "pendingCompCases": 32,
    "compPendingAmountCrores": 32.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 82,
    "pendingResettlementCases": 9,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 65,
    "riskScore": 65,
    "riskCategory": "HIGH",
    "expectedDelayDays": 48,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 65,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 40,
        "expectedDelayDays": 28
      },
      {
        "day": "Day 30",
        "riskPct": 65,
        "expectedDelayDays": 48
      }
    ]
  },
  {
    "id": "CBE-INF-001",
    "name": "Coimbatore Ring Road Development",
    "type": "Highway Expansion",
    "state": "Tamil Nadu",
    "district": "Coimbatore",
    "area": "Sulur",
    "landAreaAcres": 639,
    "affectedFamilies": 169,
    "landownersCount": 309,
    "coordinates": [
      11.0244,
      77.1265
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "CBE001 (Coimbatore District Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 80,
    "ownershipVerifiedPct": 76,
    "ownershipConflictsCount": 5,
    "possessionPct": 65,
    "compAmountCrores": 39.0,
    "compCompletedPct": 70,
    "pendingCompCases": 39,
    "compPendingAmountCrores": 19.0,
    "legalDisputesCount": 5,
    "pendingLegalCases": 3,
    "avgLegalResolutionDays": 60,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 1,
    "approvalDelayDays": 8,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 65,
    "familiesAwaitingRR": 109,
    "pendingResettlementCases": 16,
    "avgStakeholderResponseDays": 14,
    "deptCoordinationScore": 7,
    "adminBottleneckCount": 2,
    "delayProbability": 52,
    "riskScore": 52,
    "riskCategory": "MEDIUM",
    "expectedDelayDays": 35,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 80,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 70,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 52,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 65,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 50,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 27,
        "expectedDelayDays": 15
      },
      {
        "day": "Day 30",
        "riskPct": 52,
        "expectedDelayDays": 35
      }
    ]
  },
  {
    "id": "CBE-INF-007",
    "name": "Sulur Airport Link Road",
    "type": "Road Development",
    "state": "Tamil Nadu",
    "district": "Coimbatore",
    "area": "Sulur",
    "landAreaAcres": 595,
    "affectedFamilies": 125,
    "landownersCount": 265,
    "coordinates": [
      11.028,
      77.13
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "CBE001 (Coimbatore District Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 95.0,
    "compCompletedPct": 85,
    "pendingCompCases": 25,
    "compPendingAmountCrores": 35.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 65,
    "pendingResettlementCases": 2,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 25,
    "riskScore": 25,
    "riskCategory": "LOW",
    "expectedDelayDays": 14,
    "primaryBottleneck": "Possession",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Possession Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Possession."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 25,
        "expectedDelayDays": 14
      }
    ]
  },
  {
    "id": "CBE-INF-003",
    "name": "Pollachi Road Modernization",
    "type": "Road Development",
    "state": "Tamil Nadu",
    "district": "Coimbatore",
    "area": "Pollachi",
    "landAreaAcres": 209,
    "affectedFamilies": 239,
    "landownersCount": 129,
    "coordinates": [
      10.6609,
      77.0048
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "CBE001 (Coimbatore District Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 89.0,
    "compCompletedPct": 85,
    "pendingCompCases": 19,
    "compPendingAmountCrores": 29.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 79,
    "pendingResettlementCases": 11,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 22,
    "riskScore": 22,
    "riskCategory": "LOW",
    "expectedDelayDays": 12,
    "primaryBottleneck": "Possession",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 22,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Possession Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Possession."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 22,
        "expectedDelayDays": 12
      }
    ]
  },
  {
    "id": "CBE-INF-004",
    "name": "Mettupalayam Railway Infrastructure",
    "type": "Railway",
    "state": "Tamil Nadu",
    "district": "Coimbatore",
    "area": "Mettupalayam",
    "landAreaAcres": 555,
    "affectedFamilies": 85,
    "landownersCount": 225,
    "coordinates": [
      11.2995,
      76.9427
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "CBE001 (Coimbatore District Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 75.0,
    "compCompletedPct": 58,
    "pendingCompCases": 15,
    "compPendingAmountCrores": 15.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 25,
    "pendingResettlementCases": 7,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 76,
    "riskScore": 76,
    "riskCategory": "HIGH",
    "expectedDelayDays": 62,
    "primaryBottleneck": "Legal Resolution",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 76,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Legal Resolution Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Legal Resolution."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 51,
        "expectedDelayDays": 42
      },
      {
        "day": "Day 30",
        "riskPct": 76,
        "expectedDelayDays": 62
      }
    ]
  },
  {
    "id": "CBE-INF-008",
    "name": "Mettupalayam Bypass Road",
    "type": "Highway Expansion",
    "state": "Tamil Nadu",
    "district": "Coimbatore",
    "area": "Mettupalayam",
    "landAreaAcres": 377,
    "affectedFamilies": 107,
    "landownersCount": 297,
    "coordinates": [
      11.302,
      76.945
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "CBE001 (Coimbatore District Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 80,
    "ownershipVerifiedPct": 76,
    "ownershipConflictsCount": 5,
    "possessionPct": 65,
    "compAmountCrores": 37.0,
    "compCompletedPct": 70,
    "pendingCompCases": 37,
    "compPendingAmountCrores": 17.0,
    "legalDisputesCount": 5,
    "pendingLegalCases": 3,
    "avgLegalResolutionDays": 60,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 1,
    "approvalDelayDays": 8,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 65,
    "familiesAwaitingRR": 47,
    "pendingResettlementCases": 14,
    "avgStakeholderResponseDays": 14,
    "deptCoordinationScore": 7,
    "adminBottleneckCount": 2,
    "delayProbability": 45,
    "riskScore": 45,
    "riskCategory": "MEDIUM",
    "expectedDelayDays": 28,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 80,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 70,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 65,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 50,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 20,
        "expectedDelayDays": 8
      },
      {
        "day": "Day 30",
        "riskPct": 45,
        "expectedDelayDays": 28
      }
    ]
  },
  {
    "id": "CBE-INF-005",
    "name": "Western Tamil Nadu Water Supply Project",
    "type": "Water Supply",
    "state": "Tamil Nadu",
    "district": "Coimbatore",
    "area": "Perur",
    "landAreaAcres": 648,
    "affectedFamilies": 278,
    "landownersCount": 318,
    "coordinates": [
      10.9702,
      76.9113
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "CBE001 (Coimbatore District Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 68.0,
    "compCompletedPct": 85,
    "pendingCompCases": 28,
    "compPendingAmountCrores": 48.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 118,
    "pendingResettlementCases": 5,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 28,
    "riskScore": 28,
    "riskCategory": "LOW",
    "expectedDelayDays": 15,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 28,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 28,
        "expectedDelayDays": 15
      }
    ]
  },
  {
    "id": "CBE-INF-002",
    "name": "Coimbatore Industrial Corridor",
    "type": "Industrial Corridor",
    "state": "Tamil Nadu",
    "district": "Coimbatore",
    "area": "Annur",
    "landAreaAcres": 239,
    "affectedFamilies": 169,
    "landownersCount": 159,
    "coordinates": [
      11.2335,
      77.1006
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "CBE001 (Coimbatore District Officer)",
    "notificationStatus": "In Progress",
    "notificationPendingDays": 30,
    "docCompletionPct": 50,
    "ownershipVerifiedPct": 46,
    "ownershipConflictsCount": 18,
    "possessionPct": 30,
    "compAmountCrores": 99.0,
    "compCompletedPct": 36,
    "pendingCompCases": 39,
    "compPendingAmountCrores": 39.0,
    "legalDisputesCount": 18,
    "pendingLegalCases": 16,
    "avgLegalResolutionDays": 140,
    "approvalStatus": "Delayed",
    "pendingApprovalsCount": 4,
    "approvalDelayDays": 40,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 30,
    "familiesAwaitingRR": 109,
    "pendingResettlementCases": 16,
    "avgStakeholderResponseDays": 30,
    "deptCoordinationScore": 3,
    "adminBottleneckCount": 7,
    "delayProbability": 84,
    "riskScore": 84,
    "riskCategory": "CRITICAL",
    "expectedDelayDays": 88,
    "primaryBottleneck": "Legal Resolution",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 50,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 80,
        "status": "CRITICAL",
        "progressPct": 36,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 84,
        "status": "CRITICAL",
        "progressPct": 30,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 30,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 30,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Legal Resolution Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Legal Resolution."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 92,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 59,
        "expectedDelayDays": 68
      },
      {
        "day": "Day 30",
        "riskPct": 84,
        "expectedDelayDays": 88
      }
    ]
  },
  {
    "id": "CBE-INF-009",
    "name": "Annur Textile Substation Infrastructure",
    "type": "Power Infrastructure",
    "state": "Tamil Nadu",
    "district": "Coimbatore",
    "area": "Annur",
    "landAreaAcres": 326,
    "affectedFamilies": 156,
    "landownersCount": 246,
    "coordinates": [
      11.236,
      77.103
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "CBE001 (Coimbatore District Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 46.0,
    "compCompletedPct": 58,
    "pendingCompCases": 26,
    "compPendingAmountCrores": 26.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 96,
    "pendingResettlementCases": 3,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 68,
    "riskScore": 68,
    "riskCategory": "HIGH",
    "expectedDelayDays": 48,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 68,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 43,
        "expectedDelayDays": 28
      },
      {
        "day": "Day 30",
        "riskPct": 68,
        "expectedDelayDays": 48
      }
    ]
  },
  {
    "id": "CBE-INF-006",
    "name": "Kinathukadavu Solar Infrastructure",
    "type": "Solar Power",
    "state": "Tamil Nadu",
    "district": "Coimbatore",
    "area": "Kinathukadavu",
    "landAreaAcres": 212,
    "affectedFamilies": 342,
    "landownersCount": 132,
    "coordinates": [
      10.8242,
      77.0194
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "CBE001 (Coimbatore District Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 80,
    "ownershipVerifiedPct": 76,
    "ownershipConflictsCount": 5,
    "possessionPct": 65,
    "compAmountCrores": 72.0,
    "compCompletedPct": 70,
    "pendingCompCases": 32,
    "compPendingAmountCrores": 12.0,
    "legalDisputesCount": 5,
    "pendingLegalCases": 3,
    "avgLegalResolutionDays": 60,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 1,
    "approvalDelayDays": 8,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 65,
    "familiesAwaitingRR": 82,
    "pendingResettlementCases": 9,
    "avgStakeholderResponseDays": 14,
    "deptCoordinationScore": 7,
    "adminBottleneckCount": 2,
    "delayProbability": 38,
    "riskScore": 38,
    "riskCategory": "MEDIUM",
    "expectedDelayDays": 22,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 80,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 70,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 38,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 65,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 50,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 13,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 38,
        "expectedDelayDays": 22
      }
    ]
  },
  {
    "id": "SLM-INF-003",
    "name": "Salem Railway Modernization",
    "type": "Railway",
    "state": "Tamil Nadu",
    "district": "Salem",
    "area": "Salem City",
    "landAreaAcres": 210,
    "affectedFamilies": 340,
    "landownersCount": 130,
    "coordinates": [
      11.6643,
      78.146
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "SLM001 (Salem District Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 70.0,
    "compCompletedPct": 85,
    "pendingCompCases": 30,
    "compPendingAmountCrores": 10.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 80,
    "pendingResettlementCases": 7,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 20,
    "riskScore": 20,
    "riskCategory": "LOW",
    "expectedDelayDays": 12,
    "primaryBottleneck": "Possession",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 20,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Possession Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Possession."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 20,
        "expectedDelayDays": 12
      }
    ]
  },
  {
    "id": "SLM-INF-006",
    "name": "Salem Smart City Flyover Network",
    "type": "Urban Transport",
    "state": "Tamil Nadu",
    "district": "Salem",
    "area": "Salem City",
    "landAreaAcres": 550,
    "affectedFamilies": 280,
    "landownersCount": 220,
    "coordinates": [
      11.668,
      78.149
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "SLM001 (Salem District Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 80,
    "ownershipVerifiedPct": 76,
    "ownershipConflictsCount": 5,
    "possessionPct": 65,
    "compAmountCrores": 30.0,
    "compCompletedPct": 70,
    "pendingCompCases": 30,
    "compPendingAmountCrores": 10.0,
    "legalDisputesCount": 5,
    "pendingLegalCases": 3,
    "avgLegalResolutionDays": 60,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 1,
    "approvalDelayDays": 8,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 65,
    "familiesAwaitingRR": 20,
    "pendingResettlementCases": 7,
    "avgStakeholderResponseDays": 14,
    "deptCoordinationScore": 7,
    "adminBottleneckCount": 2,
    "delayProbability": 48,
    "riskScore": 48,
    "riskCategory": "MEDIUM",
    "expectedDelayDays": 28,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 80,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 70,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 48,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 65,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 50,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 23,
        "expectedDelayDays": 8
      },
      {
        "day": "Day 30",
        "riskPct": 48,
        "expectedDelayDays": 28
      }
    ]
  },
  {
    "id": "SLM-INF-004",
    "name": "Attur Water Infrastructure Project",
    "type": "Water Supply",
    "state": "Tamil Nadu",
    "district": "Salem",
    "area": "Attur",
    "landAreaAcres": 378,
    "affectedFamilies": 108,
    "landownersCount": 298,
    "coordinates": [
      11.5975,
      78.5971
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "SLM001 (Salem District Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 80,
    "ownershipVerifiedPct": 76,
    "ownershipConflictsCount": 5,
    "possessionPct": 65,
    "compAmountCrores": 38.0,
    "compCompletedPct": 70,
    "pendingCompCases": 38,
    "compPendingAmountCrores": 18.0,
    "legalDisputesCount": 5,
    "pendingLegalCases": 3,
    "avgLegalResolutionDays": 60,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 1,
    "approvalDelayDays": 8,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 65,
    "familiesAwaitingRR": 48,
    "pendingResettlementCases": 15,
    "avgStakeholderResponseDays": 14,
    "deptCoordinationScore": 7,
    "adminBottleneckCount": 2,
    "delayProbability": 42,
    "riskScore": 42,
    "riskCategory": "MEDIUM",
    "expectedDelayDays": 25,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 80,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 70,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 42,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 65,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 50,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 17,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 42,
        "expectedDelayDays": 25
      }
    ]
  },
  {
    "id": "SLM-INF-002",
    "name": "Mettur Industrial Infrastructure Project",
    "type": "Industrial Development",
    "state": "Tamil Nadu",
    "district": "Salem",
    "area": "Mettur",
    "landAreaAcres": 381,
    "affectedFamilies": 211,
    "landownersCount": 301,
    "coordinates": [
      11.7915,
      77.8006
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "SLM001 (Salem District Officer)",
    "notificationStatus": "In Progress",
    "notificationPendingDays": 30,
    "docCompletionPct": 50,
    "ownershipVerifiedPct": 46,
    "ownershipConflictsCount": 18,
    "possessionPct": 30,
    "compAmountCrores": 41.0,
    "compCompletedPct": 36,
    "pendingCompCases": 21,
    "compPendingAmountCrores": 21.0,
    "legalDisputesCount": 18,
    "pendingLegalCases": 16,
    "avgLegalResolutionDays": 140,
    "approvalStatus": "Delayed",
    "pendingApprovalsCount": 4,
    "approvalDelayDays": 40,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 30,
    "familiesAwaitingRR": 51,
    "pendingResettlementCases": 13,
    "avgStakeholderResponseDays": 30,
    "deptCoordinationScore": 3,
    "adminBottleneckCount": 7,
    "delayProbability": 86,
    "riskScore": 86,
    "riskCategory": "CRITICAL",
    "expectedDelayDays": 92,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 50,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 80,
        "status": "CRITICAL",
        "progressPct": 36,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 86,
        "status": "CRITICAL",
        "progressPct": 30,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 30,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 30,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 92,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 61,
        "expectedDelayDays": 72
      },
      {
        "day": "Day 30",
        "riskPct": 86,
        "expectedDelayDays": 92
      }
    ]
  },
  {
    "id": "SLM-INF-001",
    "name": "Salem\u2013Bengaluru Highway Expansion",
    "type": "Highway Expansion",
    "state": "Tamil Nadu",
    "district": "Salem",
    "area": "Omalur",
    "landAreaAcres": 549,
    "affectedFamilies": 279,
    "landownersCount": 219,
    "coordinates": [
      11.741,
      78.0409
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "SLM001 (Salem District Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 109.0,
    "compCompletedPct": 58,
    "pendingCompCases": 29,
    "compPendingAmountCrores": 49.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 119,
    "pendingResettlementCases": 6,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 70,
    "riskScore": 70,
    "riskCategory": "HIGH",
    "expectedDelayDays": 50,
    "primaryBottleneck": "Legal Resolution",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 70,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Legal Resolution Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Legal Resolution."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 45,
        "expectedDelayDays": 30
      },
      {
        "day": "Day 30",
        "riskPct": 70,
        "expectedDelayDays": 50
      }
    ]
  },
  {
    "id": "SLM-INF-007",
    "name": "Edappadi Sub-Basin Irrigation Canal",
    "type": "Water Infrastructure",
    "state": "Tamil Nadu",
    "district": "Salem",
    "area": "Edappadi",
    "landAreaAcres": 194,
    "affectedFamilies": 124,
    "landownersCount": 114,
    "coordinates": [
      11.5802,
      77.8465
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "SLM001 (Salem District Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 54.0,
    "compCompletedPct": 85,
    "pendingCompCases": 24,
    "compPendingAmountCrores": 34.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 64,
    "pendingResettlementCases": 16,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 24,
    "riskScore": 24,
    "riskCategory": "LOW",
    "expectedDelayDays": 14,
    "primaryBottleneck": "Possession",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 24,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Possession Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Possession."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 24,
        "expectedDelayDays": 14
      }
    ]
  },
  {
    "id": "SLM-INF-005",
    "name": "Sankari Logistics Development",
    "type": "Logistics Hub",
    "state": "Tamil Nadu",
    "district": "Salem",
    "area": "Sankari",
    "landAreaAcres": 411,
    "affectedFamilies": 241,
    "landownersCount": 81,
    "coordinates": [
      11.4828,
      77.8682
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "SLM001 (Salem District Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 51.0,
    "compCompletedPct": 85,
    "pendingCompCases": 21,
    "compPendingAmountCrores": 31.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 81,
    "pendingResettlementCases": 13,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 26,
    "riskScore": 26,
    "riskCategory": "LOW",
    "expectedDelayDays": 14,
    "primaryBottleneck": "Possession",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 26,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Possession Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Possession."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 26,
        "expectedDelayDays": 14
      }
    ]
  },
  {
    "id": "MDU-INF-002",
    "name": "Madurai Metro / Mass Transit Corridor",
    "type": "Urban Transport",
    "state": "Tamil Nadu",
    "district": "Madurai",
    "area": "Madurai North",
    "landAreaAcres": 195,
    "affectedFamilies": 225,
    "landownersCount": 115,
    "coordinates": [
      9.9391,
      78.1217
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MDU001 (Madurai District Officer)",
    "notificationStatus": "In Progress",
    "notificationPendingDays": 30,
    "docCompletionPct": 50,
    "ownershipVerifiedPct": 46,
    "ownershipConflictsCount": 18,
    "possessionPct": 30,
    "compAmountCrores": 35.0,
    "compCompletedPct": 36,
    "pendingCompCases": 35,
    "compPendingAmountCrores": 15.0,
    "legalDisputesCount": 18,
    "pendingLegalCases": 16,
    "avgLegalResolutionDays": 140,
    "approvalStatus": "Delayed",
    "pendingApprovalsCount": 4,
    "approvalDelayDays": 40,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 30,
    "familiesAwaitingRR": 65,
    "pendingResettlementCases": 12,
    "avgStakeholderResponseDays": 30,
    "deptCoordinationScore": 3,
    "adminBottleneckCount": 7,
    "delayProbability": 82,
    "riskScore": 82,
    "riskCategory": "CRITICAL",
    "expectedDelayDays": 84,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 50,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 80,
        "status": "CRITICAL",
        "progressPct": 36,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 82,
        "status": "CRITICAL",
        "progressPct": 30,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 30,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 30,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 92,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 57,
        "expectedDelayDays": 64
      },
      {
        "day": "Day 30",
        "riskPct": 82,
        "expectedDelayDays": 84
      }
    ]
  },
  {
    "id": "MDU-INF-006",
    "name": "Madurai Northern Bypass Expansion",
    "type": "Highway Expansion",
    "state": "Tamil Nadu",
    "district": "Madurai",
    "area": "Madurai North",
    "landAreaAcres": 366,
    "affectedFamilies": 96,
    "landownersCount": 286,
    "coordinates": [
      9.942,
      78.125
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MDU001 (Madurai District Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 66.0,
    "compCompletedPct": 58,
    "pendingCompCases": 26,
    "compPendingAmountCrores": 46.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 36,
    "pendingResettlementCases": 3,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 66,
    "riskScore": 66,
    "riskCategory": "HIGH",
    "expectedDelayDays": 45,
    "primaryBottleneck": "Legal Resolution",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 66,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Legal Resolution Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Legal Resolution."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 41,
        "expectedDelayDays": 25
      },
      {
        "day": "Day 30",
        "riskPct": 66,
        "expectedDelayDays": 45
      }
    ]
  },
  {
    "id": "MDU-INF-001",
    "name": "Madurai Outer Ring Road",
    "type": "Highway Expansion",
    "state": "Tamil Nadu",
    "district": "Madurai",
    "area": "Madurai South",
    "landAreaAcres": 504,
    "affectedFamilies": 234,
    "landownersCount": 174,
    "coordinates": [
      9.8821,
      78.1189
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MDU001 (Madurai District Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 64.0,
    "compCompletedPct": 58,
    "pendingCompCases": 14,
    "compPendingAmountCrores": 44.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 74,
    "pendingResettlementCases": 6,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 68,
    "riskScore": 68,
    "riskCategory": "HIGH",
    "expectedDelayDays": 48,
    "primaryBottleneck": "Legal Resolution",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 68,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Legal Resolution Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Legal Resolution."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 43,
        "expectedDelayDays": 28
      },
      {
        "day": "Day 30",
        "riskPct": 68,
        "expectedDelayDays": 48
      }
    ]
  },
  {
    "id": "MDU-INF-003",
    "name": "Thiruparankundram Infrastructure Development",
    "type": "Urban Development",
    "state": "Tamil Nadu",
    "district": "Madurai",
    "area": "Thiruparankundram",
    "landAreaAcres": 315,
    "affectedFamilies": 245,
    "landownersCount": 235,
    "coordinates": [
      9.8812,
      78.0712
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MDU001 (Madurai District Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 35.0,
    "compCompletedPct": 85,
    "pendingCompCases": 25,
    "compPendingAmountCrores": 15.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 85,
    "pendingResettlementCases": 2,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 25,
    "riskScore": 25,
    "riskCategory": "LOW",
    "expectedDelayDays": 15,
    "primaryBottleneck": "Possession",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Possession Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Possession."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 25,
        "expectedDelayDays": 15
      }
    ]
  },
  {
    "id": "MDU-INF-004",
    "name": "Melur Industrial Development Corridor",
    "type": "Industrial Corridor",
    "state": "Tamil Nadu",
    "district": "Madurai",
    "area": "Melur",
    "landAreaAcres": 590,
    "affectedFamilies": 320,
    "landownersCount": 260,
    "coordinates": [
      10.0345,
      78.3371
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MDU001 (Madurai District Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 80,
    "ownershipVerifiedPct": 76,
    "ownershipConflictsCount": 5,
    "possessionPct": 65,
    "compAmountCrores": 90.0,
    "compCompletedPct": 70,
    "pendingCompCases": 10,
    "compPendingAmountCrores": 30.0,
    "legalDisputesCount": 5,
    "pendingLegalCases": 3,
    "avgLegalResolutionDays": 60,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 1,
    "approvalDelayDays": 8,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 65,
    "familiesAwaitingRR": 60,
    "pendingResettlementCases": 2,
    "avgStakeholderResponseDays": 14,
    "deptCoordinationScore": 7,
    "adminBottleneckCount": 2,
    "delayProbability": 55,
    "riskScore": 55,
    "riskCategory": "MEDIUM",
    "expectedDelayDays": 38,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 80,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 70,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 55,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 65,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 50,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 30,
        "expectedDelayDays": 18
      },
      {
        "day": "Day 30",
        "riskPct": 55,
        "expectedDelayDays": 38
      }
    ]
  },
  {
    "id": "MDU-INF-007",
    "name": "Melur Agricultural Freight Terminal",
    "type": "Logistics Hub",
    "state": "Tamil Nadu",
    "district": "Madurai",
    "area": "Melur",
    "landAreaAcres": 462,
    "affectedFamilies": 292,
    "landownersCount": 132,
    "coordinates": [
      10.037,
      78.34
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MDU001 (Madurai District Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 42.0,
    "compCompletedPct": 85,
    "pendingCompCases": 12,
    "compPendingAmountCrores": 22.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 32,
    "pendingResettlementCases": 4,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 28,
    "riskScore": 28,
    "riskCategory": "LOW",
    "expectedDelayDays": 16,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 28,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 28,
        "expectedDelayDays": 16
      }
    ]
  },
  {
    "id": "MDU-INF-005",
    "name": "Usilampatti Water Infrastructure",
    "type": "Water Supply",
    "state": "Tamil Nadu",
    "district": "Madurai",
    "area": "Usilampatti",
    "landAreaAcres": 333,
    "affectedFamilies": 363,
    "landownersCount": 253,
    "coordinates": [
      9.9678,
      77.7942
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MDU001 (Madurai District Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 93.0,
    "compCompletedPct": 85,
    "pendingCompCases": 23,
    "compPendingAmountCrores": 33.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 103,
    "pendingResettlementCases": 15,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 19,
    "riskScore": 19,
    "riskCategory": "LOW",
    "expectedDelayDays": 10,
    "primaryBottleneck": "Possession",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 19,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Possession Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Possession."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 19,
        "expectedDelayDays": 10
      }
    ]
  },
  {
    "id": "MDU-INF-008",
    "name": "Madurai Airport Runway Extension",
    "type": "Airport Expansion",
    "state": "Tamil Nadu",
    "district": "Madurai",
    "area": "Perungudi",
    "landAreaAcres": 580,
    "affectedFamilies": 310,
    "landownersCount": 250,
    "coordinates": [
      9.8345,
      78.0934
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MDU001 (Madurai District Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 80,
    "ownershipVerifiedPct": 76,
    "ownershipConflictsCount": 5,
    "possessionPct": 65,
    "compAmountCrores": 80.0,
    "compCompletedPct": 70,
    "pendingCompCases": 30,
    "compPendingAmountCrores": 20.0,
    "legalDisputesCount": 5,
    "pendingLegalCases": 3,
    "avgLegalResolutionDays": 60,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 1,
    "approvalDelayDays": 8,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 65,
    "familiesAwaitingRR": 50,
    "pendingResettlementCases": 7,
    "avgStakeholderResponseDays": 14,
    "deptCoordinationScore": 7,
    "adminBottleneckCount": 2,
    "delayProbability": 48,
    "riskScore": 48,
    "riskCategory": "MEDIUM",
    "expectedDelayDays": 30,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 80,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 70,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 48,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 65,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 50,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 23,
        "expectedDelayDays": 10
      },
      {
        "day": "Day 30",
        "riskPct": 48,
        "expectedDelayDays": 30
      }
    ]
  },
  {
    "id": "KGI-INF-001",
    "name": "Hosur Industrial Corridor Expansion",
    "type": "Industrial Corridor",
    "state": "Tamil Nadu",
    "district": "Krishnagiri",
    "area": "Hosur",
    "landAreaAcres": 195,
    "affectedFamilies": 225,
    "landownersCount": 115,
    "coordinates": [
      12.7409,
      77.8253
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KR001 (Krishnagiri District Officer)",
    "notificationStatus": "In Progress",
    "notificationPendingDays": 30,
    "docCompletionPct": 50,
    "ownershipVerifiedPct": 46,
    "ownershipConflictsCount": 18,
    "possessionPct": 30,
    "compAmountCrores": 55.0,
    "compCompletedPct": 36,
    "pendingCompCases": 35,
    "compPendingAmountCrores": 35.0,
    "legalDisputesCount": 18,
    "pendingLegalCases": 16,
    "avgLegalResolutionDays": 140,
    "approvalStatus": "Delayed",
    "pendingApprovalsCount": 4,
    "approvalDelayDays": 40,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 30,
    "familiesAwaitingRR": 65,
    "pendingResettlementCases": 12,
    "avgStakeholderResponseDays": 30,
    "deptCoordinationScore": 3,
    "adminBottleneckCount": 7,
    "delayProbability": 84,
    "riskScore": 84,
    "riskCategory": "CRITICAL",
    "expectedDelayDays": 85,
    "primaryBottleneck": "Legal Resolution",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 50,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 80,
        "status": "CRITICAL",
        "progressPct": 36,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 84,
        "status": "CRITICAL",
        "progressPct": 30,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 30,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 30,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Legal Resolution Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Legal Resolution."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 92,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 59,
        "expectedDelayDays": 65
      },
      {
        "day": "Day 30",
        "riskPct": 84,
        "expectedDelayDays": 85
      }
    ]
  },
  {
    "id": "KGI-INF-006",
    "name": "Hosur Tech Park Link Expressway",
    "type": "Highway Expansion",
    "state": "Tamil Nadu",
    "district": "Krishnagiri",
    "area": "Hosur",
    "landAreaAcres": 467,
    "affectedFamilies": 97,
    "landownersCount": 137,
    "coordinates": [
      12.744,
      77.828
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KR001 (Krishnagiri District Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 107.0,
    "compCompletedPct": 58,
    "pendingCompCases": 27,
    "compPendingAmountCrores": 47.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 37,
    "pendingResettlementCases": 4,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 72,
    "riskScore": 72,
    "riskCategory": "HIGH",
    "expectedDelayDays": 54,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 72,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 47,
        "expectedDelayDays": 34
      },
      {
        "day": "Day 30",
        "riskPct": 72,
        "expectedDelayDays": 54
      }
    ]
  },
  {
    "id": "KGI-INF-002",
    "name": "Krishnagiri Highway Expansion",
    "type": "Highway Expansion",
    "state": "Tamil Nadu",
    "district": "Krishnagiri",
    "area": "Krishnagiri Town",
    "landAreaAcres": 321,
    "affectedFamilies": 251,
    "landownersCount": 241,
    "coordinates": [
      12.5266,
      78.2146
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KR001 (Krishnagiri District Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 81.0,
    "compCompletedPct": 58,
    "pendingCompCases": 31,
    "compPendingAmountCrores": 21.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 91,
    "pendingResettlementCases": 8,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 68,
    "riskScore": 68,
    "riskCategory": "HIGH",
    "expectedDelayDays": 52,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 68,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 43,
        "expectedDelayDays": 32
      },
      {
        "day": "Day 30",
        "riskPct": 68,
        "expectedDelayDays": 52
      }
    ]
  },
  {
    "id": "KGI-INF-003",
    "name": "Bargur Industrial Infrastructure",
    "type": "Industrial Development",
    "state": "Tamil Nadu",
    "district": "Krishnagiri",
    "area": "Bargur",
    "landAreaAcres": 164,
    "affectedFamilies": 194,
    "landownersCount": 84,
    "coordinates": [
      12.5435,
      78.3582
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KR001 (Krishnagiri District Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 80,
    "ownershipVerifiedPct": 76,
    "ownershipConflictsCount": 5,
    "possessionPct": 65,
    "compAmountCrores": 44.0,
    "compCompletedPct": 70,
    "pendingCompCases": 34,
    "compPendingAmountCrores": 24.0,
    "legalDisputesCount": 5,
    "pendingLegalCases": 3,
    "avgLegalResolutionDays": 60,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 1,
    "approvalDelayDays": 8,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 65,
    "familiesAwaitingRR": 34,
    "pendingResettlementCases": 11,
    "avgStakeholderResponseDays": 14,
    "deptCoordinationScore": 7,
    "adminBottleneckCount": 2,
    "delayProbability": 42,
    "riskScore": 42,
    "riskCategory": "MEDIUM",
    "expectedDelayDays": 28,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 80,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 70,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 42,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 65,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 50,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 17,
        "expectedDelayDays": 8
      },
      {
        "day": "Day 30",
        "riskPct": 42,
        "expectedDelayDays": 28
      }
    ]
  },
  {
    "id": "KGI-INF-007",
    "name": "Bargur Granite Transport Corridor",
    "type": "Logistics Hub",
    "state": "Tamil Nadu",
    "district": "Krishnagiri",
    "area": "Bargur",
    "landAreaAcres": 195,
    "affectedFamilies": 325,
    "landownersCount": 115,
    "coordinates": [
      12.546,
      78.361
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KR001 (Krishnagiri District Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 95.0,
    "compCompletedPct": 85,
    "pendingCompCases": 15,
    "compPendingAmountCrores": 35.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 65,
    "pendingResettlementCases": 7,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 26,
    "riskScore": 26,
    "riskCategory": "LOW",
    "expectedDelayDays": 14,
    "primaryBottleneck": "Possession",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 26,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Possession Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Possession."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 26,
        "expectedDelayDays": 14
      }
    ]
  },
  {
    "id": "KGI-INF-005",
    "name": "Uthangarai Road Development",
    "type": "Road Development",
    "state": "Tamil Nadu",
    "district": "Krishnagiri",
    "area": "Uthangarai",
    "landAreaAcres": 292,
    "affectedFamilies": 322,
    "landownersCount": 212,
    "coordinates": [
      12.2625,
      78.5471
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KR001 (Krishnagiri District Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 32.0,
    "compCompletedPct": 85,
    "pendingCompCases": 12,
    "compPendingAmountCrores": 12.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 62,
    "pendingResettlementCases": 4,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 28,
    "riskScore": 28,
    "riskCategory": "LOW",
    "expectedDelayDays": 16,
    "primaryBottleneck": "Possession",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 28,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Possession Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Possession."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 28,
        "expectedDelayDays": 16
      }
    ]
  },
  {
    "id": "KGI-INF-004",
    "name": "Denkanikottai Water Supply Project",
    "type": "Water Supply",
    "state": "Tamil Nadu",
    "district": "Krishnagiri",
    "area": "Denkanikottai",
    "landAreaAcres": 397,
    "affectedFamilies": 227,
    "landownersCount": 317,
    "coordinates": [
      12.5273,
      77.7844
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KR001 (Krishnagiri District Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 77.0,
    "compCompletedPct": 85,
    "pendingCompCases": 37,
    "compPendingAmountCrores": 17.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 67,
    "pendingResettlementCases": 14,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 22,
    "riskScore": 22,
    "riskCategory": "LOW",
    "expectedDelayDays": 12,
    "primaryBottleneck": "Possession",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 22,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Possession Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Possession."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 22,
        "expectedDelayDays": 12
      }
    ]
  },
  {
    "id": "KGI-INF-008",
    "name": "Pochampalli Mega Food Park Link",
    "type": "Industrial Park",
    "state": "Tamil Nadu",
    "district": "Krishnagiri",
    "area": "Pochampalli",
    "landAreaAcres": 177,
    "affectedFamilies": 307,
    "landownersCount": 97,
    "coordinates": [
      12.3385,
      78.3694
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KR001 (Krishnagiri District Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 80,
    "ownershipVerifiedPct": 76,
    "ownershipConflictsCount": 5,
    "possessionPct": 65,
    "compAmountCrores": 57.0,
    "compCompletedPct": 70,
    "pendingCompCases": 27,
    "compPendingAmountCrores": 37.0,
    "legalDisputesCount": 5,
    "pendingLegalCases": 3,
    "avgLegalResolutionDays": 60,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 1,
    "approvalDelayDays": 8,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 65,
    "familiesAwaitingRR": 47,
    "pendingResettlementCases": 4,
    "avgStakeholderResponseDays": 14,
    "deptCoordinationScore": 7,
    "adminBottleneckCount": 2,
    "delayProbability": 46,
    "riskScore": 46,
    "riskCategory": "MEDIUM",
    "expectedDelayDays": 29,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 80,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 70,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 46,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 65,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 50,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 21,
        "expectedDelayDays": 9
      },
      {
        "day": "Day 30",
        "riskPct": 46,
        "expectedDelayDays": 29
      }
    ]
  },
  {
    "id": "MH-PUN-001",
    "name": "Pune Hinjawadi Project 1",
    "type": "Industrial Corridor",
    "state": "Maharashtra",
    "district": "Pune",
    "area": "Hinjawadi",
    "landAreaAcres": 577,
    "affectedFamilies": 107,
    "landownersCount": 247,
    "coordinates": [
      18.5304,
      73.8667
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MH001 (Maharashtra State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 97.0,
    "compCompletedPct": 85,
    "pendingCompCases": 37,
    "compPendingAmountCrores": 37.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 47,
    "pendingResettlementCases": 14,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 22,
    "riskScore": 22,
    "riskCategory": "LOW",
    "expectedDelayDays": 12,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 22,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 22,
        "expectedDelayDays": 12
      }
    ]
  },
  {
    "id": "MH-PUN-002",
    "name": "Pune Hinjawadi Project 2",
    "type": "Highway Expansion",
    "state": "Maharashtra",
    "district": "Pune",
    "area": "Hinjawadi",
    "landAreaAcres": 202,
    "affectedFamilies": 332,
    "landownersCount": 122,
    "coordinates": [
      18.5404,
      73.8767
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MH001 (Maharashtra State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 80,
    "ownershipVerifiedPct": 76,
    "ownershipConflictsCount": 5,
    "possessionPct": 65,
    "compAmountCrores": 82.0,
    "compCompletedPct": 70,
    "pendingCompCases": 22,
    "compPendingAmountCrores": 22.0,
    "legalDisputesCount": 5,
    "pendingLegalCases": 3,
    "avgLegalResolutionDays": 60,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 1,
    "approvalDelayDays": 8,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 65,
    "familiesAwaitingRR": 72,
    "pendingResettlementCases": 14,
    "avgStakeholderResponseDays": 14,
    "deptCoordinationScore": 7,
    "adminBottleneckCount": 2,
    "delayProbability": 45,
    "riskScore": 45,
    "riskCategory": "MEDIUM",
    "expectedDelayDays": 28,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 80,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 70,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 65,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 50,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 20,
        "expectedDelayDays": 8
      },
      {
        "day": "Day 30",
        "riskPct": 45,
        "expectedDelayDays": 28
      }
    ]
  },
  {
    "id": "MH-PUN-003",
    "name": "Pune Chakan Project 1",
    "type": "Industrial Corridor",
    "state": "Maharashtra",
    "district": "Pune",
    "area": "Chakan",
    "landAreaAcres": 464,
    "affectedFamilies": 94,
    "landownersCount": 134,
    "coordinates": [
      18.5504,
      73.8867
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MH001 (Maharashtra State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 64.0,
    "compCompletedPct": 58,
    "pendingCompCases": 24,
    "compPendingAmountCrores": 44.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 34,
    "pendingResettlementCases": 16,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 74,
    "riskScore": 74,
    "riskCategory": "HIGH",
    "expectedDelayDays": 58,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 74,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 49,
        "expectedDelayDays": 38
      },
      {
        "day": "Day 30",
        "riskPct": 74,
        "expectedDelayDays": 58
      }
    ]
  },
  {
    "id": "MH-PUN-004",
    "name": "Pune Chakan Project 2",
    "type": "Highway Expansion",
    "state": "Maharashtra",
    "district": "Pune",
    "area": "Chakan",
    "landAreaAcres": 507,
    "affectedFamilies": 337,
    "landownersCount": 177,
    "coordinates": [
      18.5604,
      73.8967
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MH001 (Maharashtra State Officer)",
    "notificationStatus": "In Progress",
    "notificationPendingDays": 30,
    "docCompletionPct": 50,
    "ownershipVerifiedPct": 46,
    "ownershipConflictsCount": 18,
    "possessionPct": 30,
    "compAmountCrores": 47.0,
    "compCompletedPct": 36,
    "pendingCompCases": 27,
    "compPendingAmountCrores": 27.0,
    "legalDisputesCount": 18,
    "pendingLegalCases": 16,
    "avgLegalResolutionDays": 140,
    "approvalStatus": "Delayed",
    "pendingApprovalsCount": 4,
    "approvalDelayDays": 40,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 30,
    "familiesAwaitingRR": 77,
    "pendingResettlementCases": 4,
    "avgStakeholderResponseDays": 30,
    "deptCoordinationScore": 3,
    "adminBottleneckCount": 7,
    "delayProbability": 85,
    "riskScore": 85,
    "riskCategory": "CRITICAL",
    "expectedDelayDays": 90,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 50,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 80,
        "status": "CRITICAL",
        "progressPct": 36,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 85,
        "status": "CRITICAL",
        "progressPct": 30,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 30,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 30,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 92,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 60,
        "expectedDelayDays": 70
      },
      {
        "day": "Day 30",
        "riskPct": 85,
        "expectedDelayDays": 90
      }
    ]
  },
  {
    "id": "MH-PUN-005",
    "name": "Pune Hadapsar Project 1",
    "type": "Industrial Corridor",
    "state": "Maharashtra",
    "district": "Pune",
    "area": "Hadapsar",
    "landAreaAcres": 378,
    "affectedFamilies": 108,
    "landownersCount": 298,
    "coordinates": [
      18.5704,
      73.9067
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MH001 (Maharashtra State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 78.0,
    "compCompletedPct": 85,
    "pendingCompCases": 38,
    "compPendingAmountCrores": 18.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 48,
    "pendingResettlementCases": 15,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 22,
    "riskScore": 22,
    "riskCategory": "LOW",
    "expectedDelayDays": 12,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 22,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 22,
        "expectedDelayDays": 12
      }
    ]
  },
  {
    "id": "MH-PUN-006",
    "name": "Pune Pimpri Project 1",
    "type": "Industrial Corridor",
    "state": "Maharashtra",
    "district": "Pune",
    "area": "Pimpri",
    "landAreaAcres": 479,
    "affectedFamilies": 109,
    "landownersCount": 149,
    "coordinates": [
      18.5804,
      73.9167
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MH001 (Maharashtra State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 59.0,
    "compCompletedPct": 58,
    "pendingCompCases": 39,
    "compPendingAmountCrores": 39.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 49,
    "pendingResettlementCases": 16,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 74,
    "riskScore": 74,
    "riskCategory": "HIGH",
    "expectedDelayDays": 58,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 74,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 49,
        "expectedDelayDays": 38
      },
      {
        "day": "Day 30",
        "riskPct": 74,
        "expectedDelayDays": 58
      }
    ]
  },
  {
    "id": "MH-PUN-007",
    "name": "Pune Pimpri Project 2",
    "type": "Highway Expansion",
    "state": "Maharashtra",
    "district": "Pune",
    "area": "Pimpri",
    "landAreaAcres": 168,
    "affectedFamilies": 98,
    "landownersCount": 88,
    "coordinates": [
      18.5904,
      73.9267
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MH001 (Maharashtra State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 48.0,
    "compCompletedPct": 85,
    "pendingCompCases": 28,
    "compPendingAmountCrores": 28.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 38,
    "pendingResettlementCases": 5,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 22,
    "riskScore": 22,
    "riskCategory": "LOW",
    "expectedDelayDays": 12,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 22,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 22,
        "expectedDelayDays": 12
      }
    ]
  },
  {
    "id": "MH-PUN-008",
    "name": "Pune Talegaon Project 1",
    "type": "Industrial Corridor",
    "state": "Maharashtra",
    "district": "Pune",
    "area": "Talegaon",
    "landAreaAcres": 635,
    "affectedFamilies": 265,
    "landownersCount": 305,
    "coordinates": [
      18.6004,
      73.9367
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MH001 (Maharashtra State Officer)",
    "notificationStatus": "In Progress",
    "notificationPendingDays": 30,
    "docCompletionPct": 50,
    "ownershipVerifiedPct": 46,
    "ownershipConflictsCount": 18,
    "possessionPct": 30,
    "compAmountCrores": 95.0,
    "compCompletedPct": 36,
    "pendingCompCases": 15,
    "compPendingAmountCrores": 35.0,
    "legalDisputesCount": 18,
    "pendingLegalCases": 16,
    "avgLegalResolutionDays": 140,
    "approvalStatus": "Delayed",
    "pendingApprovalsCount": 4,
    "approvalDelayDays": 40,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 30,
    "familiesAwaitingRR": 105,
    "pendingResettlementCases": 7,
    "avgStakeholderResponseDays": 30,
    "deptCoordinationScore": 3,
    "adminBottleneckCount": 7,
    "delayProbability": 85,
    "riskScore": 85,
    "riskCategory": "CRITICAL",
    "expectedDelayDays": 90,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 50,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 80,
        "status": "CRITICAL",
        "progressPct": 36,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 85,
        "status": "CRITICAL",
        "progressPct": 30,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 30,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 30,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 92,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 60,
        "expectedDelayDays": 70
      },
      {
        "day": "Day 30",
        "riskPct": 85,
        "expectedDelayDays": 90
      }
    ]
  },
  {
    "id": "MH-MUM-001",
    "name": "Mumbai Fort Infrastructure 1",
    "type": "Metro Rail",
    "state": "Maharashtra",
    "district": "Mumbai City",
    "area": "Fort",
    "landAreaAcres": 606,
    "affectedFamilies": 336,
    "landownersCount": 276,
    "coordinates": [
      18.9488,
      72.8453
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MH001 (Maharashtra State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 86.0,
    "compCompletedPct": 85,
    "pendingCompCases": 26,
    "compPendingAmountCrores": 26.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 76,
    "pendingResettlementCases": 3,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 20,
    "riskScore": 20,
    "riskCategory": "LOW",
    "expectedDelayDays": 10,
    "primaryBottleneck": "Legal Resolution",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 20,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Legal Resolution Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Legal Resolution."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 20,
        "expectedDelayDays": 10
      }
    ]
  },
  {
    "id": "MH-MUM-002",
    "name": "Mumbai Fort Infrastructure 2",
    "type": "Urban Development",
    "state": "Maharashtra",
    "district": "Mumbai City",
    "area": "Fort",
    "landAreaAcres": 643,
    "affectedFamilies": 173,
    "landownersCount": 313,
    "coordinates": [
      18.9588,
      72.8553
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MH001 (Maharashtra State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 80,
    "ownershipVerifiedPct": 76,
    "ownershipConflictsCount": 5,
    "possessionPct": 65,
    "compAmountCrores": 83.0,
    "compCompletedPct": 70,
    "pendingCompCases": 13,
    "compPendingAmountCrores": 23.0,
    "legalDisputesCount": 5,
    "pendingLegalCases": 3,
    "avgLegalResolutionDays": 60,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 1,
    "approvalDelayDays": 8,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 65,
    "familiesAwaitingRR": 113,
    "pendingResettlementCases": 5,
    "avgStakeholderResponseDays": 14,
    "deptCoordinationScore": 7,
    "adminBottleneckCount": 2,
    "delayProbability": 48,
    "riskScore": 48,
    "riskCategory": "MEDIUM",
    "expectedDelayDays": 30,
    "primaryBottleneck": "Legal Resolution",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 80,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 70,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 48,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 65,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Legal Resolution Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Legal Resolution."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 50,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 23,
        "expectedDelayDays": 10
      },
      {
        "day": "Day 30",
        "riskPct": 48,
        "expectedDelayDays": 30
      }
    ]
  },
  {
    "id": "MH-MUM-003",
    "name": "Mumbai Worli Infrastructure 1",
    "type": "Metro Rail",
    "state": "Maharashtra",
    "district": "Mumbai City",
    "area": "Worli",
    "landAreaAcres": 463,
    "affectedFamilies": 93,
    "landownersCount": 133,
    "coordinates": [
      18.9688,
      72.8653
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MH001 (Maharashtra State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 63.0,
    "compCompletedPct": 58,
    "pendingCompCases": 23,
    "compPendingAmountCrores": 43.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 33,
    "pendingResettlementCases": 15,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 76,
    "riskScore": 76,
    "riskCategory": "HIGH",
    "expectedDelayDays": 60,
    "primaryBottleneck": "Legal Resolution",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 76,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Legal Resolution Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Legal Resolution."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 51,
        "expectedDelayDays": 40
      },
      {
        "day": "Day 30",
        "riskPct": 76,
        "expectedDelayDays": 60
      }
    ]
  },
  {
    "id": "MH-MUM-004",
    "name": "Mumbai Worli Infrastructure 2",
    "type": "Urban Development",
    "state": "Maharashtra",
    "district": "Mumbai City",
    "area": "Worli",
    "landAreaAcres": 198,
    "affectedFamilies": 228,
    "landownersCount": 118,
    "coordinates": [
      18.9788,
      72.8753
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MH001 (Maharashtra State Officer)",
    "notificationStatus": "In Progress",
    "notificationPendingDays": 30,
    "docCompletionPct": 50,
    "ownershipVerifiedPct": 46,
    "ownershipConflictsCount": 18,
    "possessionPct": 30,
    "compAmountCrores": 58.0,
    "compCompletedPct": 36,
    "pendingCompCases": 38,
    "compPendingAmountCrores": 38.0,
    "legalDisputesCount": 18,
    "pendingLegalCases": 16,
    "avgLegalResolutionDays": 140,
    "approvalStatus": "Delayed",
    "pendingApprovalsCount": 4,
    "approvalDelayDays": 40,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 30,
    "familiesAwaitingRR": 68,
    "pendingResettlementCases": 15,
    "avgStakeholderResponseDays": 30,
    "deptCoordinationScore": 3,
    "adminBottleneckCount": 7,
    "delayProbability": 88,
    "riskScore": 88,
    "riskCategory": "CRITICAL",
    "expectedDelayDays": 95,
    "primaryBottleneck": "Legal Resolution",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 50,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 80,
        "status": "CRITICAL",
        "progressPct": 36,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 88,
        "status": "CRITICAL",
        "progressPct": 30,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 30,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 30,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Legal Resolution Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Legal Resolution."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 92,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 63,
        "expectedDelayDays": 75
      },
      {
        "day": "Day 30",
        "riskPct": 88,
        "expectedDelayDays": 95
      }
    ]
  },
  {
    "id": "MH-MUM-005",
    "name": "Mumbai Dadar Infrastructure 1",
    "type": "Metro Rail",
    "state": "Maharashtra",
    "district": "Mumbai City",
    "area": "Dadar",
    "landAreaAcres": 249,
    "affectedFamilies": 179,
    "landownersCount": 169,
    "coordinates": [
      18.9888,
      72.8853
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MH001 (Maharashtra State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 109.0,
    "compCompletedPct": 85,
    "pendingCompCases": 19,
    "compPendingAmountCrores": 49.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 119,
    "pendingResettlementCases": 11,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 20,
    "riskScore": 20,
    "riskCategory": "LOW",
    "expectedDelayDays": 10,
    "primaryBottleneck": "Legal Resolution",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 20,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Legal Resolution Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Legal Resolution."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 20,
        "expectedDelayDays": 10
      }
    ]
  },
  {
    "id": "MH-MUM-006",
    "name": "Mumbai Bandra Infrastructure 1",
    "type": "Metro Rail",
    "state": "Maharashtra",
    "district": "Mumbai City",
    "area": "Bandra",
    "landAreaAcres": 618,
    "affectedFamilies": 248,
    "landownersCount": 288,
    "coordinates": [
      18.9988,
      72.8953
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MH001 (Maharashtra State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 58.0,
    "compCompletedPct": 58,
    "pendingCompCases": 28,
    "compPendingAmountCrores": 38.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 88,
    "pendingResettlementCases": 5,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 76,
    "riskScore": 76,
    "riskCategory": "HIGH",
    "expectedDelayDays": 60,
    "primaryBottleneck": "Legal Resolution",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 76,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Legal Resolution Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Legal Resolution."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 51,
        "expectedDelayDays": 40
      },
      {
        "day": "Day 30",
        "riskPct": 76,
        "expectedDelayDays": 60
      }
    ]
  },
  {
    "id": "MH-MUM-007",
    "name": "Mumbai Bandra Infrastructure 2",
    "type": "Urban Development",
    "state": "Maharashtra",
    "district": "Mumbai City",
    "area": "Bandra",
    "landAreaAcres": 609,
    "affectedFamilies": 239,
    "landownersCount": 279,
    "coordinates": [
      19.0088,
      72.9053
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MH001 (Maharashtra State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 49.0,
    "compCompletedPct": 85,
    "pendingCompCases": 19,
    "compPendingAmountCrores": 29.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 79,
    "pendingResettlementCases": 11,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 20,
    "riskScore": 20,
    "riskCategory": "LOW",
    "expectedDelayDays": 10,
    "primaryBottleneck": "Legal Resolution",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 20,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Legal Resolution Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Legal Resolution."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 20,
        "expectedDelayDays": 10
      }
    ]
  },
  {
    "id": "MH-THN-001",
    "name": "Thane Thane North Link 1",
    "type": "Highway Expansion",
    "state": "Maharashtra",
    "district": "Thane",
    "area": "Thane North",
    "landAreaAcres": 193,
    "affectedFamilies": 223,
    "landownersCount": 113,
    "coordinates": [
      19.2283,
      72.9881
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MH001 (Maharashtra State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 33.0,
    "compCompletedPct": 85,
    "pendingCompCases": 33,
    "compPendingAmountCrores": 13.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 63,
    "pendingResettlementCases": 10,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 24,
    "riskScore": 24,
    "riskCategory": "LOW",
    "expectedDelayDays": 14,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 24,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 24,
        "expectedDelayDays": 14
      }
    ]
  },
  {
    "id": "MH-THN-002",
    "name": "Thane Thane North Link 2",
    "type": "Logistics Hub",
    "state": "Maharashtra",
    "district": "Thane",
    "area": "Thane North",
    "landAreaAcres": 633,
    "affectedFamilies": 163,
    "landownersCount": 303,
    "coordinates": [
      19.2383,
      72.9981
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MH001 (Maharashtra State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 80,
    "ownershipVerifiedPct": 76,
    "ownershipConflictsCount": 5,
    "possessionPct": 65,
    "compAmountCrores": 93.0,
    "compCompletedPct": 70,
    "pendingCompCases": 33,
    "compPendingAmountCrores": 33.0,
    "legalDisputesCount": 5,
    "pendingLegalCases": 3,
    "avgLegalResolutionDays": 60,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 1,
    "approvalDelayDays": 8,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 65,
    "familiesAwaitingRR": 103,
    "pendingResettlementCases": 10,
    "avgStakeholderResponseDays": 14,
    "deptCoordinationScore": 7,
    "adminBottleneckCount": 2,
    "delayProbability": 42,
    "riskScore": 42,
    "riskCategory": "MEDIUM",
    "expectedDelayDays": 25,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 80,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 70,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 42,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 65,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 50,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 17,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 42,
        "expectedDelayDays": 25
      }
    ]
  },
  {
    "id": "MH-THN-003",
    "name": "Thane Thane West Link 1",
    "type": "Highway Expansion",
    "state": "Maharashtra",
    "district": "Thane",
    "area": "Thane West",
    "landAreaAcres": 250,
    "affectedFamilies": 80,
    "landownersCount": 170,
    "coordinates": [
      19.2483,
      73.0081
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MH001 (Maharashtra State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 30.0,
    "compCompletedPct": 58,
    "pendingCompCases": 10,
    "compPendingAmountCrores": 10.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 20,
    "pendingResettlementCases": 2,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 68,
    "riskScore": 68,
    "riskCategory": "HIGH",
    "expectedDelayDays": 50,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 68,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 43,
        "expectedDelayDays": 30
      },
      {
        "day": "Day 30",
        "riskPct": 68,
        "expectedDelayDays": 50
      }
    ]
  },
  {
    "id": "MH-THN-004",
    "name": "Thane Thane West Link 2",
    "type": "Logistics Hub",
    "state": "Maharashtra",
    "district": "Thane",
    "area": "Thane West",
    "landAreaAcres": 199,
    "affectedFamilies": 229,
    "landownersCount": 119,
    "coordinates": [
      19.2583,
      73.0181
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MH001 (Maharashtra State Officer)",
    "notificationStatus": "In Progress",
    "notificationPendingDays": 30,
    "docCompletionPct": 50,
    "ownershipVerifiedPct": 46,
    "ownershipConflictsCount": 18,
    "possessionPct": 30,
    "compAmountCrores": 39.0,
    "compCompletedPct": 36,
    "pendingCompCases": 39,
    "compPendingAmountCrores": 19.0,
    "legalDisputesCount": 18,
    "pendingLegalCases": 16,
    "avgLegalResolutionDays": 140,
    "approvalStatus": "Delayed",
    "pendingApprovalsCount": 4,
    "approvalDelayDays": 40,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 30,
    "familiesAwaitingRR": 69,
    "pendingResettlementCases": 16,
    "avgStakeholderResponseDays": 30,
    "deptCoordinationScore": 3,
    "adminBottleneckCount": 7,
    "delayProbability": 82,
    "riskScore": 82,
    "riskCategory": "CRITICAL",
    "expectedDelayDays": 85,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 50,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 80,
        "status": "CRITICAL",
        "progressPct": 36,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 82,
        "status": "CRITICAL",
        "progressPct": 30,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 30,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 30,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 92,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 57,
        "expectedDelayDays": 65
      },
      {
        "day": "Day 30",
        "riskPct": 82,
        "expectedDelayDays": 85
      }
    ]
  },
  {
    "id": "MH-THN-005",
    "name": "Thane Kalyan Link 1",
    "type": "Highway Expansion",
    "state": "Maharashtra",
    "district": "Thane",
    "area": "Kalyan",
    "landAreaAcres": 634,
    "affectedFamilies": 364,
    "landownersCount": 304,
    "coordinates": [
      19.2683,
      73.0281
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MH001 (Maharashtra State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 34.0,
    "compCompletedPct": 85,
    "pendingCompCases": 24,
    "compPendingAmountCrores": 14.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 104,
    "pendingResettlementCases": 16,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 24,
    "riskScore": 24,
    "riskCategory": "LOW",
    "expectedDelayDays": 14,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 24,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 24,
        "expectedDelayDays": 14
      }
    ]
  },
  {
    "id": "MH-THN-006",
    "name": "Thane Kalyan Link 2",
    "type": "Logistics Hub",
    "state": "Maharashtra",
    "district": "Thane",
    "area": "Kalyan",
    "landAreaAcres": 164,
    "affectedFamilies": 294,
    "landownersCount": 84,
    "coordinates": [
      19.2783,
      73.0381
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MH001 (Maharashtra State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 104.0,
    "compCompletedPct": 58,
    "pendingCompCases": 14,
    "compPendingAmountCrores": 44.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 34,
    "pendingResettlementCases": 6,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 68,
    "riskScore": 68,
    "riskCategory": "HIGH",
    "expectedDelayDays": 50,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 68,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 43,
        "expectedDelayDays": 30
      },
      {
        "day": "Day 30",
        "riskPct": 68,
        "expectedDelayDays": 50
      }
    ]
  },
  {
    "id": "MH-THN-007",
    "name": "Thane Bhiwandi Link 1",
    "type": "Highway Expansion",
    "state": "Maharashtra",
    "district": "Thane",
    "area": "Bhiwandi",
    "landAreaAcres": 324,
    "affectedFamilies": 354,
    "landownersCount": 244,
    "coordinates": [
      19.2883,
      73.0481
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MH001 (Maharashtra State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 64.0,
    "compCompletedPct": 85,
    "pendingCompCases": 14,
    "compPendingAmountCrores": 44.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 94,
    "pendingResettlementCases": 6,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 24,
    "riskScore": 24,
    "riskCategory": "LOW",
    "expectedDelayDays": 14,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 24,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 24,
        "expectedDelayDays": 14
      }
    ]
  },
  {
    "id": "MH-THN-008",
    "name": "Thane Bhiwandi Link 2",
    "type": "Logistics Hub",
    "state": "Maharashtra",
    "district": "Thane",
    "area": "Bhiwandi",
    "landAreaAcres": 583,
    "affectedFamilies": 113,
    "landownersCount": 253,
    "coordinates": [
      19.2983,
      73.0581
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MH001 (Maharashtra State Officer)",
    "notificationStatus": "In Progress",
    "notificationPendingDays": 30,
    "docCompletionPct": 50,
    "ownershipVerifiedPct": 46,
    "ownershipConflictsCount": 18,
    "possessionPct": 30,
    "compAmountCrores": 103.0,
    "compCompletedPct": 36,
    "pendingCompCases": 13,
    "compPendingAmountCrores": 43.0,
    "legalDisputesCount": 18,
    "pendingLegalCases": 16,
    "avgLegalResolutionDays": 140,
    "approvalStatus": "Delayed",
    "pendingApprovalsCount": 4,
    "approvalDelayDays": 40,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 30,
    "familiesAwaitingRR": 53,
    "pendingResettlementCases": 5,
    "avgStakeholderResponseDays": 30,
    "deptCoordinationScore": 3,
    "adminBottleneckCount": 7,
    "delayProbability": 82,
    "riskScore": 82,
    "riskCategory": "CRITICAL",
    "expectedDelayDays": 85,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 50,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 80,
        "status": "CRITICAL",
        "progressPct": 36,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 82,
        "status": "CRITICAL",
        "progressPct": 30,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 30,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 30,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 92,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 57,
        "expectedDelayDays": 65
      },
      {
        "day": "Day 30",
        "riskPct": 82,
        "expectedDelayDays": 85
      }
    ]
  },
  {
    "id": "MH-NAG-001",
    "name": "Nagpur MIHAN Zone Corridor 1",
    "type": "Industrial Park",
    "state": "Maharashtra",
    "district": "Nagpur",
    "area": "MIHAN Zone",
    "landAreaAcres": 179,
    "affectedFamilies": 209,
    "landownersCount": 99,
    "coordinates": [
      21.1558,
      79.0982
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MH001 (Maharashtra State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 99.0,
    "compCompletedPct": 85,
    "pendingCompCases": 19,
    "compPendingAmountCrores": 39.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 49,
    "pendingResettlementCases": 11,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 26,
    "riskScore": 26,
    "riskCategory": "LOW",
    "expectedDelayDays": 15,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 26,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 26,
        "expectedDelayDays": 15
      }
    ]
  },
  {
    "id": "MH-NAG-002",
    "name": "Nagpur MIHAN Zone Corridor 2",
    "type": "Railway",
    "state": "Maharashtra",
    "district": "Nagpur",
    "area": "MIHAN Zone",
    "landAreaAcres": 528,
    "affectedFamilies": 258,
    "landownersCount": 198,
    "coordinates": [
      21.1658,
      79.1082
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MH001 (Maharashtra State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 80,
    "ownershipVerifiedPct": 76,
    "ownershipConflictsCount": 5,
    "possessionPct": 65,
    "compAmountCrores": 108.0,
    "compCompletedPct": 70,
    "pendingCompCases": 38,
    "compPendingAmountCrores": 48.0,
    "legalDisputesCount": 5,
    "pendingLegalCases": 3,
    "avgLegalResolutionDays": 60,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 1,
    "approvalDelayDays": 8,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 65,
    "familiesAwaitingRR": 98,
    "pendingResettlementCases": 15,
    "avgStakeholderResponseDays": 14,
    "deptCoordinationScore": 7,
    "adminBottleneckCount": 2,
    "delayProbability": 44,
    "riskScore": 44,
    "riskCategory": "MEDIUM",
    "expectedDelayDays": 26,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 80,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 70,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 44,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 65,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 50,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 19,
        "expectedDelayDays": 6
      },
      {
        "day": "Day 30",
        "riskPct": 44,
        "expectedDelayDays": 26
      }
    ]
  },
  {
    "id": "MH-NAG-003",
    "name": "Nagpur Nagpur Central Corridor 1",
    "type": "Industrial Park",
    "state": "Maharashtra",
    "district": "Nagpur",
    "area": "Nagpur Central",
    "landAreaAcres": 458,
    "affectedFamilies": 188,
    "landownersCount": 128,
    "coordinates": [
      21.1758,
      79.1182
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MH001 (Maharashtra State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 78.0,
    "compCompletedPct": 58,
    "pendingCompCases": 28,
    "compPendingAmountCrores": 18.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 28,
    "pendingResettlementCases": 5,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 70,
    "riskScore": 70,
    "riskCategory": "HIGH",
    "expectedDelayDays": 52,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 70,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 45,
        "expectedDelayDays": 32
      },
      {
        "day": "Day 30",
        "riskPct": 70,
        "expectedDelayDays": 52
      }
    ]
  },
  {
    "id": "MH-NAG-004",
    "name": "Nagpur Nagpur Central Corridor 2",
    "type": "Railway",
    "state": "Maharashtra",
    "district": "Nagpur",
    "area": "Nagpur Central",
    "landAreaAcres": 498,
    "affectedFamilies": 128,
    "landownersCount": 168,
    "coordinates": [
      21.1858,
      79.1282
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MH001 (Maharashtra State Officer)",
    "notificationStatus": "In Progress",
    "notificationPendingDays": 30,
    "docCompletionPct": 50,
    "ownershipVerifiedPct": 46,
    "ownershipConflictsCount": 18,
    "possessionPct": 30,
    "compAmountCrores": 78.0,
    "compCompletedPct": 36,
    "pendingCompCases": 28,
    "compPendingAmountCrores": 18.0,
    "legalDisputesCount": 18,
    "pendingLegalCases": 16,
    "avgLegalResolutionDays": 140,
    "approvalStatus": "Delayed",
    "pendingApprovalsCount": 4,
    "approvalDelayDays": 40,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 30,
    "familiesAwaitingRR": 68,
    "pendingResettlementCases": 5,
    "avgStakeholderResponseDays": 30,
    "deptCoordinationScore": 3,
    "adminBottleneckCount": 7,
    "delayProbability": 84,
    "riskScore": 84,
    "riskCategory": "CRITICAL",
    "expectedDelayDays": 88,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 50,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 80,
        "status": "CRITICAL",
        "progressPct": 36,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 84,
        "status": "CRITICAL",
        "progressPct": 30,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 30,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 30,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 92,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 59,
        "expectedDelayDays": 68
      },
      {
        "day": "Day 30",
        "riskPct": 84,
        "expectedDelayDays": 88
      }
    ]
  },
  {
    "id": "MH-NAG-005",
    "name": "Nagpur Kamptee Corridor 1",
    "type": "Industrial Park",
    "state": "Maharashtra",
    "district": "Nagpur",
    "area": "Kamptee",
    "landAreaAcres": 508,
    "affectedFamilies": 138,
    "landownersCount": 178,
    "coordinates": [
      21.1958,
      79.1382
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MH001 (Maharashtra State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 88.0,
    "compCompletedPct": 85,
    "pendingCompCases": 38,
    "compPendingAmountCrores": 28.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 78,
    "pendingResettlementCases": 15,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 26,
    "riskScore": 26,
    "riskCategory": "LOW",
    "expectedDelayDays": 15,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 26,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 26,
        "expectedDelayDays": 15
      }
    ]
  },
  {
    "id": "MH-NAG-006",
    "name": "Nagpur Kamptee Corridor 2",
    "type": "Railway",
    "state": "Maharashtra",
    "district": "Nagpur",
    "area": "Kamptee",
    "landAreaAcres": 489,
    "affectedFamilies": 319,
    "landownersCount": 159,
    "coordinates": [
      21.2058,
      79.1482
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MH001 (Maharashtra State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 69.0,
    "compCompletedPct": 58,
    "pendingCompCases": 39,
    "compPendingAmountCrores": 49.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 59,
    "pendingResettlementCases": 16,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 70,
    "riskScore": 70,
    "riskCategory": "HIGH",
    "expectedDelayDays": 52,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 70,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 45,
        "expectedDelayDays": 32
      },
      {
        "day": "Day 30",
        "riskPct": 70,
        "expectedDelayDays": 52
      }
    ]
  },
  {
    "id": "MH-NAG-007",
    "name": "Nagpur Hingna Corridor 1",
    "type": "Industrial Park",
    "state": "Maharashtra",
    "district": "Nagpur",
    "area": "Hingna",
    "landAreaAcres": 556,
    "affectedFamilies": 186,
    "landownersCount": 226,
    "coordinates": [
      21.2158,
      79.1582
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "MH001 (Maharashtra State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 76.0,
    "compCompletedPct": 85,
    "pendingCompCases": 26,
    "compPendingAmountCrores": 16.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 26,
    "pendingResettlementCases": 3,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 26,
    "riskScore": 26,
    "riskCategory": "LOW",
    "expectedDelayDays": 15,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 26,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 26,
        "expectedDelayDays": 15
      }
    ]
  },
  {
    "id": "KA-BLR-001",
    "name": "Bengaluru Electronic City Transit 1",
    "type": "Metro Rail",
    "state": "Karnataka",
    "district": "Bengaluru Urban",
    "area": "Electronic City",
    "landAreaAcres": 388,
    "affectedFamilies": 118,
    "landownersCount": 308,
    "coordinates": [
      12.9816,
      77.6046
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KA001 (Karnataka State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 48.0,
    "compCompletedPct": 85,
    "pendingCompCases": 18,
    "compPendingAmountCrores": 28.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 58,
    "pendingResettlementCases": 10,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 18,
    "riskScore": 18,
    "riskCategory": "LOW",
    "expectedDelayDays": 10,
    "primaryBottleneck": "Possession",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 18,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Possession Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Possession."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 18,
        "expectedDelayDays": 10
      }
    ]
  },
  {
    "id": "KA-BLR-002",
    "name": "Bengaluru Electronic City Transit 2",
    "type": "Industrial Corridor",
    "state": "Karnataka",
    "district": "Bengaluru Urban",
    "area": "Electronic City",
    "landAreaAcres": 251,
    "affectedFamilies": 181,
    "landownersCount": 171,
    "coordinates": [
      12.9916,
      77.6146
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KA001 (Karnataka State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 80,
    "ownershipVerifiedPct": 76,
    "ownershipConflictsCount": 5,
    "possessionPct": 65,
    "compAmountCrores": 71.0,
    "compCompletedPct": 70,
    "pendingCompCases": 21,
    "compPendingAmountCrores": 11.0,
    "legalDisputesCount": 5,
    "pendingLegalCases": 3,
    "avgLegalResolutionDays": 60,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 1,
    "approvalDelayDays": 8,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 65,
    "familiesAwaitingRR": 21,
    "pendingResettlementCases": 13,
    "avgStakeholderResponseDays": 14,
    "deptCoordinationScore": 7,
    "adminBottleneckCount": 2,
    "delayProbability": 46,
    "riskScore": 46,
    "riskCategory": "MEDIUM",
    "expectedDelayDays": 28,
    "primaryBottleneck": "Possession",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 80,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 70,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 46,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 65,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Possession Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Possession."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 50,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 21,
        "expectedDelayDays": 8
      },
      {
        "day": "Day 30",
        "riskPct": 46,
        "expectedDelayDays": 28
      }
    ]
  },
  {
    "id": "KA-BLR-003",
    "name": "Bengaluru Whitefield Transit 1",
    "type": "Metro Rail",
    "state": "Karnataka",
    "district": "Bengaluru Urban",
    "area": "Whitefield",
    "landAreaAcres": 511,
    "affectedFamilies": 141,
    "landownersCount": 181,
    "coordinates": [
      13.0016,
      77.6246
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KA001 (Karnataka State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 31.0,
    "compCompletedPct": 58,
    "pendingCompCases": 11,
    "compPendingAmountCrores": 11.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 81,
    "pendingResettlementCases": 3,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 72,
    "riskScore": 72,
    "riskCategory": "HIGH",
    "expectedDelayDays": 55,
    "primaryBottleneck": "Possession",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 72,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Possession Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Possession."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 47,
        "expectedDelayDays": 35
      },
      {
        "day": "Day 30",
        "riskPct": 72,
        "expectedDelayDays": 55
      }
    ]
  },
  {
    "id": "KA-BLR-004",
    "name": "Bengaluru Whitefield Transit 2",
    "type": "Industrial Corridor",
    "state": "Karnataka",
    "district": "Bengaluru Urban",
    "area": "Whitefield",
    "landAreaAcres": 373,
    "affectedFamilies": 303,
    "landownersCount": 293,
    "coordinates": [
      13.0116,
      77.6346
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KA001 (Karnataka State Officer)",
    "notificationStatus": "In Progress",
    "notificationPendingDays": 30,
    "docCompletionPct": 50,
    "ownershipVerifiedPct": 46,
    "ownershipConflictsCount": 18,
    "possessionPct": 30,
    "compAmountCrores": 93.0,
    "compCompletedPct": 36,
    "pendingCompCases": 23,
    "compPendingAmountCrores": 33.0,
    "legalDisputesCount": 18,
    "pendingLegalCases": 16,
    "avgLegalResolutionDays": 140,
    "approvalStatus": "Delayed",
    "pendingApprovalsCount": 4,
    "approvalDelayDays": 40,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 30,
    "familiesAwaitingRR": 43,
    "pendingResettlementCases": 15,
    "avgStakeholderResponseDays": 30,
    "deptCoordinationScore": 3,
    "adminBottleneckCount": 7,
    "delayProbability": 86,
    "riskScore": 86,
    "riskCategory": "CRITICAL",
    "expectedDelayDays": 90,
    "primaryBottleneck": "Possession",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 50,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 80,
        "status": "CRITICAL",
        "progressPct": 36,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 86,
        "status": "CRITICAL",
        "progressPct": 30,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 30,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 30,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Possession Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Possession."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 92,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 61,
        "expectedDelayDays": 70
      },
      {
        "day": "Day 30",
        "riskPct": 86,
        "expectedDelayDays": 90
      }
    ]
  },
  {
    "id": "KA-BLR-005",
    "name": "Bengaluru Yelahanka Transit 1",
    "type": "Metro Rail",
    "state": "Karnataka",
    "district": "Bengaluru Urban",
    "area": "Yelahanka",
    "landAreaAcres": 382,
    "affectedFamilies": 312,
    "landownersCount": 302,
    "coordinates": [
      13.0216,
      77.6446
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KA001 (Karnataka State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 62.0,
    "compCompletedPct": 85,
    "pendingCompCases": 32,
    "compPendingAmountCrores": 42.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 52,
    "pendingResettlementCases": 9,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 18,
    "riskScore": 18,
    "riskCategory": "LOW",
    "expectedDelayDays": 10,
    "primaryBottleneck": "Possession",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 18,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Possession Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Possession."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 18,
        "expectedDelayDays": 10
      }
    ]
  },
  {
    "id": "KA-BLR-006",
    "name": "Bengaluru Yelahanka Transit 2",
    "type": "Industrial Corridor",
    "state": "Karnataka",
    "district": "Bengaluru Urban",
    "area": "Yelahanka",
    "landAreaAcres": 188,
    "affectedFamilies": 318,
    "landownersCount": 108,
    "coordinates": [
      13.0316,
      77.6546
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KA001 (Karnataka State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 68.0,
    "compCompletedPct": 58,
    "pendingCompCases": 38,
    "compPendingAmountCrores": 48.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 58,
    "pendingResettlementCases": 15,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 72,
    "riskScore": 72,
    "riskCategory": "HIGH",
    "expectedDelayDays": 55,
    "primaryBottleneck": "Possession",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 72,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Possession Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Possession."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 47,
        "expectedDelayDays": 35
      },
      {
        "day": "Day 30",
        "riskPct": 72,
        "expectedDelayDays": 55
      }
    ]
  },
  {
    "id": "KA-BLR-007",
    "name": "Bengaluru Peenya Transit 1",
    "type": "Metro Rail",
    "state": "Karnataka",
    "district": "Bengaluru Urban",
    "area": "Peenya",
    "landAreaAcres": 627,
    "affectedFamilies": 257,
    "landownersCount": 297,
    "coordinates": [
      13.0416,
      77.6646
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KA001 (Karnataka State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 67.0,
    "compCompletedPct": 85,
    "pendingCompCases": 37,
    "compPendingAmountCrores": 47.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 97,
    "pendingResettlementCases": 14,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 18,
    "riskScore": 18,
    "riskCategory": "LOW",
    "expectedDelayDays": 10,
    "primaryBottleneck": "Possession",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 18,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Possession Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Possession."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 18,
        "expectedDelayDays": 10
      }
    ]
  },
  {
    "id": "KA-BLR-008",
    "name": "Bengaluru Sarjapur Transit 1",
    "type": "Metro Rail",
    "state": "Karnataka",
    "district": "Bengaluru Urban",
    "area": "Sarjapur",
    "landAreaAcres": 477,
    "affectedFamilies": 307,
    "landownersCount": 147,
    "coordinates": [
      13.0516,
      77.6746
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KA001 (Karnataka State Officer)",
    "notificationStatus": "In Progress",
    "notificationPendingDays": 30,
    "docCompletionPct": 50,
    "ownershipVerifiedPct": 46,
    "ownershipConflictsCount": 18,
    "possessionPct": 30,
    "compAmountCrores": 57.0,
    "compCompletedPct": 36,
    "pendingCompCases": 27,
    "compPendingAmountCrores": 37.0,
    "legalDisputesCount": 18,
    "pendingLegalCases": 16,
    "avgLegalResolutionDays": 140,
    "approvalStatus": "Delayed",
    "pendingApprovalsCount": 4,
    "approvalDelayDays": 40,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 30,
    "familiesAwaitingRR": 47,
    "pendingResettlementCases": 4,
    "avgStakeholderResponseDays": 30,
    "deptCoordinationScore": 3,
    "adminBottleneckCount": 7,
    "delayProbability": 86,
    "riskScore": 86,
    "riskCategory": "CRITICAL",
    "expectedDelayDays": 90,
    "primaryBottleneck": "Possession",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 50,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 80,
        "status": "CRITICAL",
        "progressPct": 36,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 86,
        "status": "CRITICAL",
        "progressPct": 30,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 30,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 30,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Possession Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Possession."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 92,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 61,
        "expectedDelayDays": 70
      },
      {
        "day": "Day 30",
        "riskPct": 86,
        "expectedDelayDays": 90
      }
    ]
  },
  {
    "id": "KA-MYS-001",
    "name": "Mysuru Nanjangud Expressway 1",
    "type": "Highway Expansion",
    "state": "Karnataka",
    "district": "Mysuru",
    "area": "Nanjangud",
    "landAreaAcres": 292,
    "affectedFamilies": 222,
    "landownersCount": 212,
    "coordinates": [
      12.3058,
      76.6494
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KA001 (Karnataka State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 32.0,
    "compCompletedPct": 85,
    "pendingCompCases": 32,
    "compPendingAmountCrores": 12.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 62,
    "pendingResettlementCases": 9,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 22,
    "riskScore": 22,
    "riskCategory": "LOW",
    "expectedDelayDays": 12,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 22,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 22,
        "expectedDelayDays": 12
      }
    ]
  },
  {
    "id": "KA-MYS-002",
    "name": "Mysuru Nanjangud Expressway 2",
    "type": "Industrial Park",
    "state": "Karnataka",
    "district": "Mysuru",
    "area": "Nanjangud",
    "landAreaAcres": 419,
    "affectedFamilies": 149,
    "landownersCount": 89,
    "coordinates": [
      12.3158,
      76.6594
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KA001 (Karnataka State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 80,
    "ownershipVerifiedPct": 76,
    "ownershipConflictsCount": 5,
    "possessionPct": 65,
    "compAmountCrores": 59.0,
    "compCompletedPct": 70,
    "pendingCompCases": 19,
    "compPendingAmountCrores": 39.0,
    "legalDisputesCount": 5,
    "pendingLegalCases": 3,
    "avgLegalResolutionDays": 60,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 1,
    "approvalDelayDays": 8,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 65,
    "familiesAwaitingRR": 89,
    "pendingResettlementCases": 11,
    "avgStakeholderResponseDays": 14,
    "deptCoordinationScore": 7,
    "adminBottleneckCount": 2,
    "delayProbability": 40,
    "riskScore": 40,
    "riskCategory": "MEDIUM",
    "expectedDelayDays": 24,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 80,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 70,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 40,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 65,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 50,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 15,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 40,
        "expectedDelayDays": 24
      }
    ]
  },
  {
    "id": "KA-MYS-003",
    "name": "Mysuru Hootagalli Expressway 1",
    "type": "Highway Expansion",
    "state": "Karnataka",
    "district": "Mysuru",
    "area": "Hootagalli",
    "landAreaAcres": 261,
    "affectedFamilies": 291,
    "landownersCount": 181,
    "coordinates": [
      12.3258,
      76.6694
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KA001 (Karnataka State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 61.0,
    "compCompletedPct": 58,
    "pendingCompCases": 11,
    "compPendingAmountCrores": 41.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 31,
    "pendingResettlementCases": 3,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 68,
    "riskScore": 68,
    "riskCategory": "HIGH",
    "expectedDelayDays": 48,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 68,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 43,
        "expectedDelayDays": 28
      },
      {
        "day": "Day 30",
        "riskPct": 68,
        "expectedDelayDays": 48
      }
    ]
  },
  {
    "id": "KA-MYS-004",
    "name": "Mysuru Hootagalli Expressway 2",
    "type": "Industrial Park",
    "state": "Karnataka",
    "district": "Mysuru",
    "area": "Hootagalli",
    "landAreaAcres": 236,
    "affectedFamilies": 366,
    "landownersCount": 156,
    "coordinates": [
      12.3358,
      76.6794
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KA001 (Karnataka State Officer)",
    "notificationStatus": "In Progress",
    "notificationPendingDays": 30,
    "docCompletionPct": 50,
    "ownershipVerifiedPct": 46,
    "ownershipConflictsCount": 18,
    "possessionPct": 30,
    "compAmountCrores": 96.0,
    "compCompletedPct": 36,
    "pendingCompCases": 26,
    "compPendingAmountCrores": 36.0,
    "legalDisputesCount": 18,
    "pendingLegalCases": 16,
    "avgLegalResolutionDays": 140,
    "approvalStatus": "Delayed",
    "pendingApprovalsCount": 4,
    "approvalDelayDays": 40,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 30,
    "familiesAwaitingRR": 106,
    "pendingResettlementCases": 3,
    "avgStakeholderResponseDays": 30,
    "deptCoordinationScore": 3,
    "adminBottleneckCount": 7,
    "delayProbability": 82,
    "riskScore": 82,
    "riskCategory": "CRITICAL",
    "expectedDelayDays": 84,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 50,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 80,
        "status": "CRITICAL",
        "progressPct": 36,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 82,
        "status": "CRITICAL",
        "progressPct": 30,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 30,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 30,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 92,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 57,
        "expectedDelayDays": 64
      },
      {
        "day": "Day 30",
        "riskPct": 82,
        "expectedDelayDays": 84
      }
    ]
  },
  {
    "id": "KA-MYS-005",
    "name": "Mysuru Hebbal Industrial Area Expressway 1",
    "type": "Highway Expansion",
    "state": "Karnataka",
    "district": "Mysuru",
    "area": "Hebbal Industrial Area",
    "landAreaAcres": 416,
    "affectedFamilies": 346,
    "landownersCount": 86,
    "coordinates": [
      12.3458,
      76.6894
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KA001 (Karnataka State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 96.0,
    "compCompletedPct": 85,
    "pendingCompCases": 36,
    "compPendingAmountCrores": 36.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 86,
    "pendingResettlementCases": 13,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 22,
    "riskScore": 22,
    "riskCategory": "LOW",
    "expectedDelayDays": 12,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 22,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 22,
        "expectedDelayDays": 12
      }
    ]
  },
  {
    "id": "KA-MYS-006",
    "name": "Mysuru Hebbal Industrial Area Expressway 2",
    "type": "Industrial Park",
    "state": "Karnataka",
    "district": "Mysuru",
    "area": "Hebbal Industrial Area",
    "landAreaAcres": 356,
    "affectedFamilies": 86,
    "landownersCount": 276,
    "coordinates": [
      12.3558,
      76.6994
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KA001 (Karnataka State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 36.0,
    "compCompletedPct": 58,
    "pendingCompCases": 16,
    "compPendingAmountCrores": 16.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 26,
    "pendingResettlementCases": 8,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 68,
    "riskScore": 68,
    "riskCategory": "HIGH",
    "expectedDelayDays": 48,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 68,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 43,
        "expectedDelayDays": 28
      },
      {
        "day": "Day 30",
        "riskPct": 68,
        "expectedDelayDays": 48
      }
    ]
  },
  {
    "id": "KA-MYS-007",
    "name": "Mysuru Hebbal Industrial Area Expressway 3",
    "type": "Highway Expansion",
    "state": "Karnataka",
    "district": "Mysuru",
    "area": "Hebbal Industrial Area",
    "landAreaAcres": 244,
    "affectedFamilies": 374,
    "landownersCount": 164,
    "coordinates": [
      12.3658,
      76.7094
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KA001 (Karnataka State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 84.0,
    "compCompletedPct": 85,
    "pendingCompCases": 34,
    "compPendingAmountCrores": 24.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 114,
    "pendingResettlementCases": 11,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 22,
    "riskScore": 22,
    "riskCategory": "LOW",
    "expectedDelayDays": 12,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 22,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 22,
        "expectedDelayDays": 12
      }
    ]
  },
  {
    "id": "KA-BEL-001",
    "name": "Belagavi Belagavi North Corridor 1",
    "type": "Road Development",
    "state": "Karnataka",
    "district": "Belagavi",
    "area": "Belagavi North",
    "landAreaAcres": 585,
    "affectedFamilies": 315,
    "landownersCount": 255,
    "coordinates": [
      15.8597,
      74.5077
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KA001 (Karnataka State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 45.0,
    "compCompletedPct": 85,
    "pendingCompCases": 35,
    "compPendingAmountCrores": 25.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 55,
    "pendingResettlementCases": 12,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 24,
    "riskScore": 24,
    "riskCategory": "LOW",
    "expectedDelayDays": 14,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 24,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 24,
        "expectedDelayDays": 14
      }
    ]
  },
  {
    "id": "KA-BEL-002",
    "name": "Belagavi Belagavi North Corridor 2",
    "type": "Water Supply",
    "state": "Karnataka",
    "district": "Belagavi",
    "area": "Belagavi North",
    "landAreaAcres": 288,
    "affectedFamilies": 118,
    "landownersCount": 208,
    "coordinates": [
      15.8697,
      74.5177
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KA001 (Karnataka State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 80,
    "ownershipVerifiedPct": 76,
    "ownershipConflictsCount": 5,
    "possessionPct": 65,
    "compAmountCrores": 68.0,
    "compCompletedPct": 70,
    "pendingCompCases": 18,
    "compPendingAmountCrores": 48.0,
    "legalDisputesCount": 5,
    "pendingLegalCases": 3,
    "avgLegalResolutionDays": 60,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 1,
    "approvalDelayDays": 8,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 65,
    "familiesAwaitingRR": 58,
    "pendingResettlementCases": 10,
    "avgStakeholderResponseDays": 14,
    "deptCoordinationScore": 7,
    "adminBottleneckCount": 2,
    "delayProbability": 42,
    "riskScore": 42,
    "riskCategory": "MEDIUM",
    "expectedDelayDays": 25,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 80,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 70,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 42,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 65,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 50,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 17,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 42,
        "expectedDelayDays": 25
      }
    ]
  },
  {
    "id": "KA-BEL-003",
    "name": "Belagavi Belagavi South Corridor 1",
    "type": "Road Development",
    "state": "Karnataka",
    "district": "Belagavi",
    "area": "Belagavi South",
    "landAreaAcres": 216,
    "affectedFamilies": 346,
    "landownersCount": 136,
    "coordinates": [
      15.8797,
      74.5277
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KA001 (Karnataka State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 76.0,
    "compCompletedPct": 58,
    "pendingCompCases": 36,
    "compPendingAmountCrores": 16.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 86,
    "pendingResettlementCases": 13,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 70,
    "riskScore": 70,
    "riskCategory": "HIGH",
    "expectedDelayDays": 50,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 70,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 45,
        "expectedDelayDays": 30
      },
      {
        "day": "Day 30",
        "riskPct": 70,
        "expectedDelayDays": 50
      }
    ]
  },
  {
    "id": "KA-BEL-004",
    "name": "Belagavi Belagavi South Corridor 2",
    "type": "Water Supply",
    "state": "Karnataka",
    "district": "Belagavi",
    "area": "Belagavi South",
    "landAreaAcres": 238,
    "affectedFamilies": 168,
    "landownersCount": 158,
    "coordinates": [
      15.8897,
      74.5377
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KA001 (Karnataka State Officer)",
    "notificationStatus": "In Progress",
    "notificationPendingDays": 30,
    "docCompletionPct": 50,
    "ownershipVerifiedPct": 46,
    "ownershipConflictsCount": 18,
    "possessionPct": 30,
    "compAmountCrores": 38.0,
    "compCompletedPct": 36,
    "pendingCompCases": 38,
    "compPendingAmountCrores": 18.0,
    "legalDisputesCount": 18,
    "pendingLegalCases": 16,
    "avgLegalResolutionDays": 140,
    "approvalStatus": "Delayed",
    "pendingApprovalsCount": 4,
    "approvalDelayDays": 40,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 30,
    "familiesAwaitingRR": 108,
    "pendingResettlementCases": 15,
    "avgStakeholderResponseDays": 30,
    "deptCoordinationScore": 3,
    "adminBottleneckCount": 7,
    "delayProbability": 84,
    "riskScore": 84,
    "riskCategory": "CRITICAL",
    "expectedDelayDays": 86,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 50,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 80,
        "status": "CRITICAL",
        "progressPct": 36,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 84,
        "status": "CRITICAL",
        "progressPct": 30,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 30,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 30,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 92,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 59,
        "expectedDelayDays": 66
      },
      {
        "day": "Day 30",
        "riskPct": 84,
        "expectedDelayDays": 86
      }
    ]
  },
  {
    "id": "KA-BEL-005",
    "name": "Belagavi Gokak Corridor 1",
    "type": "Road Development",
    "state": "Karnataka",
    "district": "Belagavi",
    "area": "Gokak",
    "landAreaAcres": 300,
    "affectedFamilies": 230,
    "landownersCount": 220,
    "coordinates": [
      15.8997,
      74.5477
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KA001 (Karnataka State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 40.0,
    "compCompletedPct": 85,
    "pendingCompCases": 10,
    "compPendingAmountCrores": 20.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 70,
    "pendingResettlementCases": 2,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 24,
    "riskScore": 24,
    "riskCategory": "LOW",
    "expectedDelayDays": 14,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 24,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 24,
        "expectedDelayDays": 14
      }
    ]
  },
  {
    "id": "KA-BEL-006",
    "name": "Belagavi Gokak Corridor 2",
    "type": "Water Supply",
    "state": "Karnataka",
    "district": "Belagavi",
    "area": "Gokak",
    "landAreaAcres": 344,
    "affectedFamilies": 374,
    "landownersCount": 264,
    "coordinates": [
      15.9097,
      74.5577
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KA001 (Karnataka State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 84.0,
    "compCompletedPct": 58,
    "pendingCompCases": 34,
    "compPendingAmountCrores": 24.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 114,
    "pendingResettlementCases": 11,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 70,
    "riskScore": 70,
    "riskCategory": "HIGH",
    "expectedDelayDays": 50,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 70,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 45,
        "expectedDelayDays": 30
      },
      {
        "day": "Day 30",
        "riskPct": 70,
        "expectedDelayDays": 50
      }
    ]
  },
  {
    "id": "KA-BEL-007",
    "name": "Belagavi Gokak Corridor 3",
    "type": "Road Development",
    "state": "Karnataka",
    "district": "Belagavi",
    "area": "Gokak",
    "landAreaAcres": 455,
    "affectedFamilies": 85,
    "landownersCount": 125,
    "coordinates": [
      15.9197,
      74.5677
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KA001 (Karnataka State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 95.0,
    "compCompletedPct": 85,
    "pendingCompCases": 15,
    "compPendingAmountCrores": 35.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 25,
    "pendingResettlementCases": 7,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 24,
    "riskScore": 24,
    "riskCategory": "LOW",
    "expectedDelayDays": 14,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 24,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 24,
        "expectedDelayDays": 14
      }
    ]
  },
  {
    "id": "KA-DHA-001",
    "name": "Dharwad Hubballi Central Infrastructure 1",
    "type": "Railway",
    "state": "Karnataka",
    "district": "Dharwad",
    "area": "Hubballi Central",
    "landAreaAcres": 162,
    "affectedFamilies": 292,
    "landownersCount": 82,
    "coordinates": [
      15.4689,
      75.0178
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KA001 (Karnataka State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 102.0,
    "compCompletedPct": 85,
    "pendingCompCases": 12,
    "compPendingAmountCrores": 42.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 32,
    "pendingResettlementCases": 4,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 20,
    "riskScore": 20,
    "riskCategory": "LOW",
    "expectedDelayDays": 11,
    "primaryBottleneck": "Legal Resolution",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 20,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Legal Resolution Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Legal Resolution."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 20,
        "expectedDelayDays": 11
      }
    ]
  },
  {
    "id": "KA-DHA-002",
    "name": "Dharwad Hubballi Central Infrastructure 2",
    "type": "Solar Power",
    "state": "Karnataka",
    "district": "Dharwad",
    "area": "Hubballi Central",
    "landAreaAcres": 423,
    "affectedFamilies": 353,
    "landownersCount": 93,
    "coordinates": [
      15.4789,
      75.0278
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KA001 (Karnataka State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 80,
    "ownershipVerifiedPct": 76,
    "ownershipConflictsCount": 5,
    "possessionPct": 65,
    "compAmountCrores": 43.0,
    "compCompletedPct": 70,
    "pendingCompCases": 13,
    "compPendingAmountCrores": 23.0,
    "legalDisputesCount": 5,
    "pendingLegalCases": 3,
    "avgLegalResolutionDays": 60,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 1,
    "approvalDelayDays": 8,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 65,
    "familiesAwaitingRR": 93,
    "pendingResettlementCases": 5,
    "avgStakeholderResponseDays": 14,
    "deptCoordinationScore": 7,
    "adminBottleneckCount": 2,
    "delayProbability": 38,
    "riskScore": 38,
    "riskCategory": "MEDIUM",
    "expectedDelayDays": 22,
    "primaryBottleneck": "Legal Resolution",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 80,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 70,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 38,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 65,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Legal Resolution Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Legal Resolution."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 50,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 13,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 38,
        "expectedDelayDays": 22
      }
    ]
  },
  {
    "id": "KA-DHA-003",
    "name": "Dharwad Dharwad Industrial Area Infrastructure 1",
    "type": "Railway",
    "state": "Karnataka",
    "district": "Dharwad",
    "area": "Dharwad Industrial Area",
    "landAreaAcres": 307,
    "affectedFamilies": 337,
    "landownersCount": 227,
    "coordinates": [
      15.4889,
      75.0378
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KA001 (Karnataka State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 47.0,
    "compCompletedPct": 58,
    "pendingCompCases": 27,
    "compPendingAmountCrores": 27.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 77,
    "pendingResettlementCases": 4,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 66,
    "riskScore": 66,
    "riskCategory": "HIGH",
    "expectedDelayDays": 46,
    "primaryBottleneck": "Legal Resolution",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 66,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Legal Resolution Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Legal Resolution."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 41,
        "expectedDelayDays": 26
      },
      {
        "day": "Day 30",
        "riskPct": 66,
        "expectedDelayDays": 46
      }
    ]
  },
  {
    "id": "KA-DHA-004",
    "name": "Dharwad Dharwad Industrial Area Infrastructure 2",
    "type": "Solar Power",
    "state": "Karnataka",
    "district": "Dharwad",
    "area": "Dharwad Industrial Area",
    "landAreaAcres": 322,
    "affectedFamilies": 252,
    "landownersCount": 242,
    "coordinates": [
      15.4989,
      75.0478
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KA001 (Karnataka State Officer)",
    "notificationStatus": "In Progress",
    "notificationPendingDays": 30,
    "docCompletionPct": 50,
    "ownershipVerifiedPct": 46,
    "ownershipConflictsCount": 18,
    "possessionPct": 30,
    "compAmountCrores": 102.0,
    "compCompletedPct": 36,
    "pendingCompCases": 32,
    "compPendingAmountCrores": 42.0,
    "legalDisputesCount": 18,
    "pendingLegalCases": 16,
    "avgLegalResolutionDays": 140,
    "approvalStatus": "Delayed",
    "pendingApprovalsCount": 4,
    "approvalDelayDays": 40,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 30,
    "familiesAwaitingRR": 92,
    "pendingResettlementCases": 9,
    "avgStakeholderResponseDays": 30,
    "deptCoordinationScore": 3,
    "adminBottleneckCount": 7,
    "delayProbability": 80,
    "riskScore": 80,
    "riskCategory": "CRITICAL",
    "expectedDelayDays": 82,
    "primaryBottleneck": "Legal Resolution",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 50,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 80,
        "status": "CRITICAL",
        "progressPct": 36,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 80,
        "status": "CRITICAL",
        "progressPct": 30,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 30,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 30,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Legal Resolution Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Legal Resolution."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 92,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 55,
        "expectedDelayDays": 62
      },
      {
        "day": "Day 30",
        "riskPct": 80,
        "expectedDelayDays": 82
      }
    ]
  },
  {
    "id": "KA-DHA-005",
    "name": "Dharwad Navalgund Infrastructure 1",
    "type": "Railway",
    "state": "Karnataka",
    "district": "Dharwad",
    "area": "Navalgund",
    "landAreaAcres": 193,
    "affectedFamilies": 123,
    "landownersCount": 113,
    "coordinates": [
      15.5089,
      75.0578
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KA001 (Karnataka State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 73.0,
    "compCompletedPct": 85,
    "pendingCompCases": 23,
    "compPendingAmountCrores": 13.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 63,
    "pendingResettlementCases": 15,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 20,
    "riskScore": 20,
    "riskCategory": "LOW",
    "expectedDelayDays": 11,
    "primaryBottleneck": "Legal Resolution",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 20,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Legal Resolution Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Legal Resolution."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 20,
        "expectedDelayDays": 11
      }
    ]
  },
  {
    "id": "KA-DHA-006",
    "name": "Dharwad Navalgund Infrastructure 2",
    "type": "Solar Power",
    "state": "Karnataka",
    "district": "Dharwad",
    "area": "Navalgund",
    "landAreaAcres": 441,
    "affectedFamilies": 371,
    "landownersCount": 111,
    "coordinates": [
      15.5189,
      75.0678
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KA001 (Karnataka State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 41.0,
    "compCompletedPct": 58,
    "pendingCompCases": 31,
    "compPendingAmountCrores": 21.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 111,
    "pendingResettlementCases": 8,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 66,
    "riskScore": 66,
    "riskCategory": "HIGH",
    "expectedDelayDays": 46,
    "primaryBottleneck": "Legal Resolution",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 66,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Legal Resolution Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Legal Resolution."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 41,
        "expectedDelayDays": 26
      },
      {
        "day": "Day 30",
        "riskPct": 66,
        "expectedDelayDays": 46
      }
    ]
  },
  {
    "id": "KA-DHA-007",
    "name": "Dharwad Kalghatgi Infrastructure 1",
    "type": "Railway",
    "state": "Karnataka",
    "district": "Dharwad",
    "area": "Kalghatgi",
    "landAreaAcres": 188,
    "affectedFamilies": 318,
    "landownersCount": 108,
    "coordinates": [
      15.5289,
      75.0778
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KA001 (Karnataka State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 68.0,
    "compCompletedPct": 85,
    "pendingCompCases": 38,
    "compPendingAmountCrores": 48.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 58,
    "pendingResettlementCases": 15,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 20,
    "riskScore": 20,
    "riskCategory": "LOW",
    "expectedDelayDays": 11,
    "primaryBottleneck": "Legal Resolution",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 20,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Legal Resolution Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Legal Resolution."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 20,
        "expectedDelayDays": 11
      }
    ]
  },
  {
    "id": "KA-DHA-008",
    "name": "Dharwad Kalghatgi Infrastructure 2",
    "type": "Solar Power",
    "state": "Karnataka",
    "district": "Dharwad",
    "area": "Kalghatgi",
    "landAreaAcres": 183,
    "affectedFamilies": 213,
    "landownersCount": 103,
    "coordinates": [
      15.5389,
      75.0878
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "KA001 (Karnataka State Officer)",
    "notificationStatus": "In Progress",
    "notificationPendingDays": 30,
    "docCompletionPct": 50,
    "ownershipVerifiedPct": 46,
    "ownershipConflictsCount": 18,
    "possessionPct": 30,
    "compAmountCrores": 83.0,
    "compCompletedPct": 36,
    "pendingCompCases": 23,
    "compPendingAmountCrores": 23.0,
    "legalDisputesCount": 18,
    "pendingLegalCases": 16,
    "avgLegalResolutionDays": 140,
    "approvalStatus": "Delayed",
    "pendingApprovalsCount": 4,
    "approvalDelayDays": 40,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 30,
    "familiesAwaitingRR": 53,
    "pendingResettlementCases": 15,
    "avgStakeholderResponseDays": 30,
    "deptCoordinationScore": 3,
    "adminBottleneckCount": 7,
    "delayProbability": 80,
    "riskScore": 80,
    "riskCategory": "CRITICAL",
    "expectedDelayDays": 82,
    "primaryBottleneck": "Legal Resolution",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 50,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 80,
        "status": "CRITICAL",
        "progressPct": 36,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 80,
        "status": "CRITICAL",
        "progressPct": 30,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 30,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 30,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Legal Resolution Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Legal Resolution."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 92,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 55,
        "expectedDelayDays": 62
      },
      {
        "day": "Day 30",
        "riskPct": 80,
        "expectedDelayDays": 82
      }
    ]
  },
  {
    "id": "UP-VNS-001",
    "name": "Varanasi Babatpur Link 1",
    "type": "Railway",
    "state": "Uttar Pradesh",
    "district": "Varanasi",
    "area": "Babatpur",
    "landAreaAcres": 357,
    "affectedFamilies": 187,
    "landownersCount": 277,
    "coordinates": [
      25.3276,
      82.9839
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "UP001 (Uttar Pradesh State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 97.0,
    "compCompletedPct": 85,
    "pendingCompCases": 27,
    "compPendingAmountCrores": 37.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 27,
    "pendingResettlementCases": 4,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 25,
    "riskScore": 25,
    "riskCategory": "LOW",
    "expectedDelayDays": 15,
    "primaryBottleneck": "Notification",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Notification Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Notification."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 25,
        "expectedDelayDays": 15
      }
    ]
  },
  {
    "id": "UP-VNS-002",
    "name": "Varanasi Babatpur Link 2",
    "type": "Highway Expansion",
    "state": "Uttar Pradesh",
    "district": "Varanasi",
    "area": "Babatpur",
    "landAreaAcres": 625,
    "affectedFamilies": 355,
    "landownersCount": 295,
    "coordinates": [
      25.3376,
      82.9939
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "UP001 (Uttar Pradesh State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 80,
    "ownershipVerifiedPct": 76,
    "ownershipConflictsCount": 5,
    "possessionPct": 65,
    "compAmountCrores": 45.0,
    "compCompletedPct": 70,
    "pendingCompCases": 15,
    "compPendingAmountCrores": 25.0,
    "legalDisputesCount": 5,
    "pendingLegalCases": 3,
    "avgLegalResolutionDays": 60,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 1,
    "approvalDelayDays": 8,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 65,
    "familiesAwaitingRR": 95,
    "pendingResettlementCases": 7,
    "avgStakeholderResponseDays": 14,
    "deptCoordinationScore": 7,
    "adminBottleneckCount": 2,
    "delayProbability": 50,
    "riskScore": 50,
    "riskCategory": "MEDIUM",
    "expectedDelayDays": 30,
    "primaryBottleneck": "Notification",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 80,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 70,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 50,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 65,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Notification Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Notification."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 50,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 25,
        "expectedDelayDays": 10
      },
      {
        "day": "Day 30",
        "riskPct": 50,
        "expectedDelayDays": 30
      }
    ]
  },
  {
    "id": "UP-VNS-003",
    "name": "Varanasi Kashi Link 1",
    "type": "Railway",
    "state": "Uttar Pradesh",
    "district": "Varanasi",
    "area": "Kashi",
    "landAreaAcres": 301,
    "affectedFamilies": 331,
    "landownersCount": 221,
    "coordinates": [
      25.3476,
      83.0039
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "UP001 (Uttar Pradesh State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 41.0,
    "compCompletedPct": 58,
    "pendingCompCases": 21,
    "compPendingAmountCrores": 21.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 71,
    "pendingResettlementCases": 13,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 75,
    "riskScore": 75,
    "riskCategory": "HIGH",
    "expectedDelayDays": 60,
    "primaryBottleneck": "Notification",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 75,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Notification Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Notification."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 50,
        "expectedDelayDays": 40
      },
      {
        "day": "Day 30",
        "riskPct": 75,
        "expectedDelayDays": 60
      }
    ]
  },
  {
    "id": "UP-VNS-004",
    "name": "Varanasi Kashi Link 2",
    "type": "Highway Expansion",
    "state": "Uttar Pradesh",
    "district": "Varanasi",
    "area": "Kashi",
    "landAreaAcres": 385,
    "affectedFamilies": 315,
    "landownersCount": 305,
    "coordinates": [
      25.3576,
      83.0139
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "UP001 (Uttar Pradesh State Officer)",
    "notificationStatus": "In Progress",
    "notificationPendingDays": 30,
    "docCompletionPct": 50,
    "ownershipVerifiedPct": 46,
    "ownershipConflictsCount": 18,
    "possessionPct": 30,
    "compAmountCrores": 105.0,
    "compCompletedPct": 36,
    "pendingCompCases": 35,
    "compPendingAmountCrores": 45.0,
    "legalDisputesCount": 18,
    "pendingLegalCases": 16,
    "avgLegalResolutionDays": 140,
    "approvalStatus": "Delayed",
    "pendingApprovalsCount": 4,
    "approvalDelayDays": 40,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 30,
    "familiesAwaitingRR": 55,
    "pendingResettlementCases": 12,
    "avgStakeholderResponseDays": 30,
    "deptCoordinationScore": 3,
    "adminBottleneckCount": 7,
    "delayProbability": 89,
    "riskScore": 89,
    "riskCategory": "CRITICAL",
    "expectedDelayDays": 110,
    "primaryBottleneck": "Notification",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 50,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 80,
        "status": "CRITICAL",
        "progressPct": 36,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 89,
        "status": "CRITICAL",
        "progressPct": 30,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 30,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 30,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Notification Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Notification."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 92,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 64,
        "expectedDelayDays": 90
      },
      {
        "day": "Day 30",
        "riskPct": 89,
        "expectedDelayDays": 110
      }
    ]
  },
  {
    "id": "UP-VNS-005",
    "name": "Varanasi Pindra Link 1",
    "type": "Railway",
    "state": "Uttar Pradesh",
    "district": "Varanasi",
    "area": "Pindra",
    "landAreaAcres": 583,
    "affectedFamilies": 313,
    "landownersCount": 253,
    "coordinates": [
      25.3676,
      83.0239
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "UP001 (Uttar Pradesh State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 43.0,
    "compCompletedPct": 85,
    "pendingCompCases": 33,
    "compPendingAmountCrores": 23.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 53,
    "pendingResettlementCases": 10,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 25,
    "riskScore": 25,
    "riskCategory": "LOW",
    "expectedDelayDays": 15,
    "primaryBottleneck": "Notification",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Notification Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Notification."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 25,
        "expectedDelayDays": 15
      }
    ]
  },
  {
    "id": "UP-VNS-006",
    "name": "Varanasi Pindra Link 2",
    "type": "Highway Expansion",
    "state": "Uttar Pradesh",
    "district": "Varanasi",
    "area": "Pindra",
    "landAreaAcres": 464,
    "affectedFamilies": 294,
    "landownersCount": 134,
    "coordinates": [
      25.3776,
      83.0339
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "UP001 (Uttar Pradesh State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 64.0,
    "compCompletedPct": 58,
    "pendingCompCases": 14,
    "compPendingAmountCrores": 44.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 34,
    "pendingResettlementCases": 6,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 75,
    "riskScore": 75,
    "riskCategory": "HIGH",
    "expectedDelayDays": 60,
    "primaryBottleneck": "Notification",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 75,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Notification Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Notification."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 50,
        "expectedDelayDays": 40
      },
      {
        "day": "Day 30",
        "riskPct": 75,
        "expectedDelayDays": 60
      }
    ]
  },
  {
    "id": "UP-VNS-007",
    "name": "Varanasi Ramnagar Link 1",
    "type": "Railway",
    "state": "Uttar Pradesh",
    "district": "Varanasi",
    "area": "Ramnagar",
    "landAreaAcres": 334,
    "affectedFamilies": 164,
    "landownersCount": 254,
    "coordinates": [
      25.3876,
      83.0439
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "UP001 (Uttar Pradesh State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 34.0,
    "compCompletedPct": 85,
    "pendingCompCases": 34,
    "compPendingAmountCrores": 14.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 104,
    "pendingResettlementCases": 11,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 25,
    "riskScore": 25,
    "riskCategory": "LOW",
    "expectedDelayDays": 15,
    "primaryBottleneck": "Notification",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Notification Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Notification."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 25,
        "expectedDelayDays": 15
      }
    ]
  },
  {
    "id": "UP-VNS-008",
    "name": "Varanasi Ramnagar Link 2",
    "type": "Highway Expansion",
    "state": "Uttar Pradesh",
    "district": "Varanasi",
    "area": "Ramnagar",
    "landAreaAcres": 369,
    "affectedFamilies": 299,
    "landownersCount": 289,
    "coordinates": [
      25.3976,
      83.0539
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "UP001 (Uttar Pradesh State Officer)",
    "notificationStatus": "In Progress",
    "notificationPendingDays": 30,
    "docCompletionPct": 50,
    "ownershipVerifiedPct": 46,
    "ownershipConflictsCount": 18,
    "possessionPct": 30,
    "compAmountCrores": 89.0,
    "compCompletedPct": 36,
    "pendingCompCases": 19,
    "compPendingAmountCrores": 29.0,
    "legalDisputesCount": 18,
    "pendingLegalCases": 16,
    "avgLegalResolutionDays": 140,
    "approvalStatus": "Delayed",
    "pendingApprovalsCount": 4,
    "approvalDelayDays": 40,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 30,
    "familiesAwaitingRR": 39,
    "pendingResettlementCases": 11,
    "avgStakeholderResponseDays": 30,
    "deptCoordinationScore": 3,
    "adminBottleneckCount": 7,
    "delayProbability": 89,
    "riskScore": 89,
    "riskCategory": "CRITICAL",
    "expectedDelayDays": 110,
    "primaryBottleneck": "Notification",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 50,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 80,
        "status": "CRITICAL",
        "progressPct": 36,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 89,
        "status": "CRITICAL",
        "progressPct": 30,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 30,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 30,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Notification Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Notification."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 92,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 64,
        "expectedDelayDays": 90
      },
      {
        "day": "Day 30",
        "riskPct": 89,
        "expectedDelayDays": 110
      }
    ]
  },
  {
    "id": "UP-LKO-001",
    "name": "Lucknow Hazratganj Project 1",
    "type": "Urban Transport",
    "state": "Uttar Pradesh",
    "district": "Lucknow",
    "area": "Hazratganj",
    "landAreaAcres": 606,
    "affectedFamilies": 236,
    "landownersCount": 276,
    "coordinates": [
      26.8567,
      80.9562
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "UP001 (Uttar Pradesh State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 106.0,
    "compCompletedPct": 85,
    "pendingCompCases": 16,
    "compPendingAmountCrores": 46.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 76,
    "pendingResettlementCases": 8,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 22,
    "riskScore": 22,
    "riskCategory": "LOW",
    "expectedDelayDays": 12,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 22,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 22,
        "expectedDelayDays": 12
      }
    ]
  },
  {
    "id": "UP-LKO-002",
    "name": "Lucknow Hazratganj Project 2",
    "type": "Airport Expansion",
    "state": "Uttar Pradesh",
    "district": "Lucknow",
    "area": "Hazratganj",
    "landAreaAcres": 602,
    "affectedFamilies": 332,
    "landownersCount": 272,
    "coordinates": [
      26.8667,
      80.9662
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "UP001 (Uttar Pradesh State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 80,
    "ownershipVerifiedPct": 76,
    "ownershipConflictsCount": 5,
    "possessionPct": 65,
    "compAmountCrores": 82.0,
    "compCompletedPct": 70,
    "pendingCompCases": 22,
    "compPendingAmountCrores": 22.0,
    "legalDisputesCount": 5,
    "pendingLegalCases": 3,
    "avgLegalResolutionDays": 60,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 1,
    "approvalDelayDays": 8,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 65,
    "familiesAwaitingRR": 72,
    "pendingResettlementCases": 14,
    "avgStakeholderResponseDays": 14,
    "deptCoordinationScore": 7,
    "adminBottleneckCount": 2,
    "delayProbability": 44,
    "riskScore": 44,
    "riskCategory": "MEDIUM",
    "expectedDelayDays": 26,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 80,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 70,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 44,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 65,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 50,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 19,
        "expectedDelayDays": 6
      },
      {
        "day": "Day 30",
        "riskPct": 44,
        "expectedDelayDays": 26
      }
    ]
  },
  {
    "id": "UP-LKO-003",
    "name": "Lucknow Gomti Nagar Project 1",
    "type": "Urban Transport",
    "state": "Uttar Pradesh",
    "district": "Lucknow",
    "area": "Gomti Nagar",
    "landAreaAcres": 364,
    "affectedFamilies": 194,
    "landownersCount": 284,
    "coordinates": [
      26.8767,
      80.9762
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "UP001 (Uttar Pradesh State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 44.0,
    "compCompletedPct": 58,
    "pendingCompCases": 34,
    "compPendingAmountCrores": 24.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 34,
    "pendingResettlementCases": 11,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 72,
    "riskScore": 72,
    "riskCategory": "HIGH",
    "expectedDelayDays": 54,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 72,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 47,
        "expectedDelayDays": 34
      },
      {
        "day": "Day 30",
        "riskPct": 72,
        "expectedDelayDays": 54
      }
    ]
  },
  {
    "id": "UP-LKO-004",
    "name": "Lucknow Gomti Nagar Project 2",
    "type": "Airport Expansion",
    "state": "Uttar Pradesh",
    "district": "Lucknow",
    "area": "Gomti Nagar",
    "landAreaAcres": 432,
    "affectedFamilies": 262,
    "landownersCount": 102,
    "coordinates": [
      26.8867,
      80.9862
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "UP001 (Uttar Pradesh State Officer)",
    "notificationStatus": "In Progress",
    "notificationPendingDays": 30,
    "docCompletionPct": 50,
    "ownershipVerifiedPct": 46,
    "ownershipConflictsCount": 18,
    "possessionPct": 30,
    "compAmountCrores": 72.0,
    "compCompletedPct": 36,
    "pendingCompCases": 12,
    "compPendingAmountCrores": 12.0,
    "legalDisputesCount": 18,
    "pendingLegalCases": 16,
    "avgLegalResolutionDays": 140,
    "approvalStatus": "Delayed",
    "pendingApprovalsCount": 4,
    "approvalDelayDays": 40,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 30,
    "familiesAwaitingRR": 102,
    "pendingResettlementCases": 4,
    "avgStakeholderResponseDays": 30,
    "deptCoordinationScore": 3,
    "adminBottleneckCount": 7,
    "delayProbability": 85,
    "riskScore": 85,
    "riskCategory": "CRITICAL",
    "expectedDelayDays": 92,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 50,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 80,
        "status": "CRITICAL",
        "progressPct": 36,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 85,
        "status": "CRITICAL",
        "progressPct": 30,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 30,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 30,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 92,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 60,
        "expectedDelayDays": 72
      },
      {
        "day": "Day 30",
        "riskPct": 85,
        "expectedDelayDays": 92
      }
    ]
  },
  {
    "id": "UP-LKO-005",
    "name": "Lucknow Amausi Project 1",
    "type": "Urban Transport",
    "state": "Uttar Pradesh",
    "district": "Lucknow",
    "area": "Amausi",
    "landAreaAcres": 247,
    "affectedFamilies": 277,
    "landownersCount": 167,
    "coordinates": [
      26.8967,
      80.9962
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "UP001 (Uttar Pradesh State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 47.0,
    "compCompletedPct": 85,
    "pendingCompCases": 27,
    "compPendingAmountCrores": 27.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 117,
    "pendingResettlementCases": 4,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 22,
    "riskScore": 22,
    "riskCategory": "LOW",
    "expectedDelayDays": 12,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 22,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 22,
        "expectedDelayDays": 12
      }
    ]
  },
  {
    "id": "UP-LKO-006",
    "name": "Lucknow Amausi Project 2",
    "type": "Airport Expansion",
    "state": "Uttar Pradesh",
    "district": "Lucknow",
    "area": "Amausi",
    "landAreaAcres": 605,
    "affectedFamilies": 235,
    "landownersCount": 275,
    "coordinates": [
      26.9067,
      81.0062
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "UP001 (Uttar Pradesh State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 65.0,
    "compCompletedPct": 58,
    "pendingCompCases": 15,
    "compPendingAmountCrores": 45.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 75,
    "pendingResettlementCases": 7,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 72,
    "riskScore": 72,
    "riskCategory": "HIGH",
    "expectedDelayDays": 54,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 72,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 47,
        "expectedDelayDays": 34
      },
      {
        "day": "Day 30",
        "riskPct": 72,
        "expectedDelayDays": 54
      }
    ]
  },
  {
    "id": "UP-LKO-007",
    "name": "Lucknow Amausi Project 3",
    "type": "Urban Transport",
    "state": "Uttar Pradesh",
    "district": "Lucknow",
    "area": "Amausi",
    "landAreaAcres": 273,
    "affectedFamilies": 303,
    "landownersCount": 193,
    "coordinates": [
      26.9167,
      81.0162
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "UP001 (Uttar Pradesh State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 93.0,
    "compCompletedPct": 85,
    "pendingCompCases": 23,
    "compPendingAmountCrores": 33.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 43,
    "pendingResettlementCases": 15,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 22,
    "riskScore": 22,
    "riskCategory": "LOW",
    "expectedDelayDays": 12,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 22,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 22,
        "expectedDelayDays": 12
      }
    ]
  },
  {
    "id": "UP-NOI-001",
    "name": "Noida Sector 62 Expressway 1",
    "type": "Airport Expansion",
    "state": "Uttar Pradesh",
    "district": "Noida",
    "area": "Sector 62",
    "landAreaAcres": 434,
    "affectedFamilies": 364,
    "landownersCount": 104,
    "coordinates": [
      28.5455,
      77.401
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "UP001 (Uttar Pradesh State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 94.0,
    "compCompletedPct": 85,
    "pendingCompCases": 24,
    "compPendingAmountCrores": 34.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 104,
    "pendingResettlementCases": 16,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 20,
    "riskScore": 20,
    "riskCategory": "LOW",
    "expectedDelayDays": 10,
    "primaryBottleneck": "Legal Resolution",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 20,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Legal Resolution Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Legal Resolution."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 20,
        "expectedDelayDays": 10
      }
    ]
  },
  {
    "id": "UP-NOI-002",
    "name": "Noida Sector 62 Expressway 2",
    "type": "Industrial Corridor",
    "state": "Uttar Pradesh",
    "district": "Noida",
    "area": "Sector 62",
    "landAreaAcres": 611,
    "affectedFamilies": 341,
    "landownersCount": 281,
    "coordinates": [
      28.5555,
      77.411
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "UP001 (Uttar Pradesh State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 80,
    "ownershipVerifiedPct": 76,
    "ownershipConflictsCount": 5,
    "possessionPct": 65,
    "compAmountCrores": 91.0,
    "compCompletedPct": 70,
    "pendingCompCases": 31,
    "compPendingAmountCrores": 31.0,
    "legalDisputesCount": 5,
    "pendingLegalCases": 3,
    "avgLegalResolutionDays": 60,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 1,
    "approvalDelayDays": 8,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 65,
    "familiesAwaitingRR": 81,
    "pendingResettlementCases": 8,
    "avgStakeholderResponseDays": 14,
    "deptCoordinationScore": 7,
    "adminBottleneckCount": 2,
    "delayProbability": 46,
    "riskScore": 46,
    "riskCategory": "MEDIUM",
    "expectedDelayDays": 28,
    "primaryBottleneck": "Legal Resolution",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 80,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 70,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 46,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 65,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Legal Resolution Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Legal Resolution."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 50,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 21,
        "expectedDelayDays": 8
      },
      {
        "day": "Day 30",
        "riskPct": 46,
        "expectedDelayDays": 28
      }
    ]
  },
  {
    "id": "UP-NOI-003",
    "name": "Noida Greater Noida West Expressway 1",
    "type": "Airport Expansion",
    "state": "Uttar Pradesh",
    "district": "Noida",
    "area": "Greater Noida West",
    "landAreaAcres": 224,
    "affectedFamilies": 254,
    "landownersCount": 144,
    "coordinates": [
      28.5655,
      77.421
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "UP001 (Uttar Pradesh State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 84.0,
    "compCompletedPct": 58,
    "pendingCompCases": 34,
    "compPendingAmountCrores": 24.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 94,
    "pendingResettlementCases": 11,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 74,
    "riskScore": 74,
    "riskCategory": "HIGH",
    "expectedDelayDays": 58,
    "primaryBottleneck": "Legal Resolution",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 74,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Legal Resolution Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Legal Resolution."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 49,
        "expectedDelayDays": 38
      },
      {
        "day": "Day 30",
        "riskPct": 74,
        "expectedDelayDays": 58
      }
    ]
  },
  {
    "id": "UP-NOI-004",
    "name": "Noida Greater Noida West Expressway 2",
    "type": "Industrial Corridor",
    "state": "Uttar Pradesh",
    "district": "Noida",
    "area": "Greater Noida West",
    "landAreaAcres": 271,
    "affectedFamilies": 101,
    "landownersCount": 191,
    "coordinates": [
      28.5755,
      77.431
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "UP001 (Uttar Pradesh State Officer)",
    "notificationStatus": "In Progress",
    "notificationPendingDays": 30,
    "docCompletionPct": 50,
    "ownershipVerifiedPct": 46,
    "ownershipConflictsCount": 18,
    "possessionPct": 30,
    "compAmountCrores": 71.0,
    "compCompletedPct": 36,
    "pendingCompCases": 31,
    "compPendingAmountCrores": 11.0,
    "legalDisputesCount": 18,
    "pendingLegalCases": 16,
    "avgLegalResolutionDays": 140,
    "approvalStatus": "Delayed",
    "pendingApprovalsCount": 4,
    "approvalDelayDays": 40,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 30,
    "familiesAwaitingRR": 41,
    "pendingResettlementCases": 8,
    "avgStakeholderResponseDays": 30,
    "deptCoordinationScore": 3,
    "adminBottleneckCount": 7,
    "delayProbability": 87,
    "riskScore": 87,
    "riskCategory": "CRITICAL",
    "expectedDelayDays": 96,
    "primaryBottleneck": "Legal Resolution",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 50,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 80,
        "status": "CRITICAL",
        "progressPct": 36,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 87,
        "status": "CRITICAL",
        "progressPct": 30,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 30,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 30,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Legal Resolution Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Legal Resolution."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 92,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 62,
        "expectedDelayDays": 76
      },
      {
        "day": "Day 30",
        "riskPct": 87,
        "expectedDelayDays": 96
      }
    ]
  },
  {
    "id": "UP-NOI-005",
    "name": "Noida Jewar Corridor Expressway 1",
    "type": "Airport Expansion",
    "state": "Uttar Pradesh",
    "district": "Noida",
    "area": "Jewar Corridor",
    "landAreaAcres": 419,
    "affectedFamilies": 249,
    "landownersCount": 89,
    "coordinates": [
      28.5855,
      77.441
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "UP001 (Uttar Pradesh State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 79.0,
    "compCompletedPct": 85,
    "pendingCompCases": 29,
    "compPendingAmountCrores": 19.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 89,
    "pendingResettlementCases": 6,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 20,
    "riskScore": 20,
    "riskCategory": "LOW",
    "expectedDelayDays": 10,
    "primaryBottleneck": "Legal Resolution",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 20,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Legal Resolution Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Legal Resolution."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 20,
        "expectedDelayDays": 10
      }
    ]
  },
  {
    "id": "UP-NOI-006",
    "name": "Noida Jewar Corridor Expressway 2",
    "type": "Industrial Corridor",
    "state": "Uttar Pradesh",
    "district": "Noida",
    "area": "Jewar Corridor",
    "landAreaAcres": 375,
    "affectedFamilies": 205,
    "landownersCount": 295,
    "coordinates": [
      28.5955,
      77.451
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "UP001 (Uttar Pradesh State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 35.0,
    "compCompletedPct": 58,
    "pendingCompCases": 15,
    "compPendingAmountCrores": 15.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 45,
    "pendingResettlementCases": 7,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 74,
    "riskScore": 74,
    "riskCategory": "HIGH",
    "expectedDelayDays": 58,
    "primaryBottleneck": "Legal Resolution",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 74,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Legal Resolution Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Legal Resolution."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 49,
        "expectedDelayDays": 38
      },
      {
        "day": "Day 30",
        "riskPct": 74,
        "expectedDelayDays": 58
      }
    ]
  },
  {
    "id": "UP-NOI-007",
    "name": "Noida Jewar Corridor Expressway 3",
    "type": "Airport Expansion",
    "state": "Uttar Pradesh",
    "district": "Noida",
    "area": "Jewar Corridor",
    "landAreaAcres": 623,
    "affectedFamilies": 153,
    "landownersCount": 293,
    "coordinates": [
      28.6055,
      77.461
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "UP001 (Uttar Pradesh State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 43.0,
    "compCompletedPct": 85,
    "pendingCompCases": 23,
    "compPendingAmountCrores": 23.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 93,
    "pendingResettlementCases": 15,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 20,
    "riskScore": 20,
    "riskCategory": "LOW",
    "expectedDelayDays": 10,
    "primaryBottleneck": "Legal Resolution",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 20,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Legal Resolution Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Legal Resolution."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 20,
        "expectedDelayDays": 10
      }
    ]
  },
  {
    "id": "UP-NOI-008",
    "name": "Noida Jewar Corridor Expressway 4",
    "type": "Industrial Corridor",
    "state": "Uttar Pradesh",
    "district": "Noida",
    "area": "Jewar Corridor",
    "landAreaAcres": 262,
    "affectedFamilies": 92,
    "landownersCount": 182,
    "coordinates": [
      28.6155,
      77.471
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "UP001 (Uttar Pradesh State Officer)",
    "notificationStatus": "In Progress",
    "notificationPendingDays": 30,
    "docCompletionPct": 50,
    "ownershipVerifiedPct": 46,
    "ownershipConflictsCount": 18,
    "possessionPct": 30,
    "compAmountCrores": 62.0,
    "compCompletedPct": 36,
    "pendingCompCases": 22,
    "compPendingAmountCrores": 42.0,
    "legalDisputesCount": 18,
    "pendingLegalCases": 16,
    "avgLegalResolutionDays": 140,
    "approvalStatus": "Delayed",
    "pendingApprovalsCount": 4,
    "approvalDelayDays": 40,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 30,
    "familiesAwaitingRR": 32,
    "pendingResettlementCases": 14,
    "avgStakeholderResponseDays": 30,
    "deptCoordinationScore": 3,
    "adminBottleneckCount": 7,
    "delayProbability": 87,
    "riskScore": 87,
    "riskCategory": "CRITICAL",
    "expectedDelayDays": 96,
    "primaryBottleneck": "Legal Resolution",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 50,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 80,
        "status": "CRITICAL",
        "progressPct": 36,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 87,
        "status": "CRITICAL",
        "progressPct": 30,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 30,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 30,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Legal Resolution Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Legal Resolution."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 92,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 62,
        "expectedDelayDays": 76
      },
      {
        "day": "Day 30",
        "riskPct": 87,
        "expectedDelayDays": 96
      }
    ]
  },
  {
    "id": "UP-KAN-001",
    "name": "Kanpur Kanpur Central Freight 1",
    "type": "Logistics Hub",
    "state": "Uttar Pradesh",
    "district": "Kanpur Nagar",
    "area": "Kanpur Central",
    "landAreaAcres": 522,
    "affectedFamilies": 352,
    "landownersCount": 192,
    "coordinates": [
      26.4599,
      80.3419
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "UP001 (Uttar Pradesh State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 102.0,
    "compCompletedPct": 85,
    "pendingCompCases": 12,
    "compPendingAmountCrores": 42.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 92,
    "pendingResettlementCases": 4,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 23,
    "riskScore": 23,
    "riskCategory": "LOW",
    "expectedDelayDays": 13,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 23,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 23,
        "expectedDelayDays": 13
      }
    ]
  },
  {
    "id": "UP-KAN-002",
    "name": "Kanpur Kanpur Central Freight 2",
    "type": "Railway",
    "state": "Uttar Pradesh",
    "district": "Kanpur Nagar",
    "area": "Kanpur Central",
    "landAreaAcres": 357,
    "affectedFamilies": 87,
    "landownersCount": 277,
    "coordinates": [
      26.4699,
      80.3519
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "UP001 (Uttar Pradesh State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 80,
    "ownershipVerifiedPct": 76,
    "ownershipConflictsCount": 5,
    "possessionPct": 65,
    "compAmountCrores": 57.0,
    "compCompletedPct": 70,
    "pendingCompCases": 17,
    "compPendingAmountCrores": 37.0,
    "legalDisputesCount": 5,
    "pendingLegalCases": 3,
    "avgLegalResolutionDays": 60,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 1,
    "approvalDelayDays": 8,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 65,
    "familiesAwaitingRR": 27,
    "pendingResettlementCases": 9,
    "avgStakeholderResponseDays": 14,
    "deptCoordinationScore": 7,
    "adminBottleneckCount": 2,
    "delayProbability": 41,
    "riskScore": 41,
    "riskCategory": "MEDIUM",
    "expectedDelayDays": 24,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 80,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 70,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 41,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 65,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 50,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 16,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 41,
        "expectedDelayDays": 24
      }
    ]
  },
  {
    "id": "UP-KAN-003",
    "name": "Kanpur Panki Industrial Area Freight 1",
    "type": "Logistics Hub",
    "state": "Uttar Pradesh",
    "district": "Kanpur Nagar",
    "area": "Panki Industrial Area",
    "landAreaAcres": 522,
    "affectedFamilies": 252,
    "landownersCount": 192,
    "coordinates": [
      26.4799,
      80.3619
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "UP001 (Uttar Pradesh State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 82.0,
    "compCompletedPct": 58,
    "pendingCompCases": 32,
    "compPendingAmountCrores": 22.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 92,
    "pendingResettlementCases": 9,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 69,
    "riskScore": 69,
    "riskCategory": "HIGH",
    "expectedDelayDays": 49,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 69,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 44,
        "expectedDelayDays": 29
      },
      {
        "day": "Day 30",
        "riskPct": 69,
        "expectedDelayDays": 49
      }
    ]
  },
  {
    "id": "UP-KAN-004",
    "name": "Kanpur Panki Industrial Area Freight 2",
    "type": "Railway",
    "state": "Uttar Pradesh",
    "district": "Kanpur Nagar",
    "area": "Panki Industrial Area",
    "landAreaAcres": 631,
    "affectedFamilies": 161,
    "landownersCount": 301,
    "coordinates": [
      26.4899,
      80.3719
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "UP001 (Uttar Pradesh State Officer)",
    "notificationStatus": "In Progress",
    "notificationPendingDays": 30,
    "docCompletionPct": 50,
    "ownershipVerifiedPct": 46,
    "ownershipConflictsCount": 18,
    "possessionPct": 30,
    "compAmountCrores": 31.0,
    "compCompletedPct": 36,
    "pendingCompCases": 31,
    "compPendingAmountCrores": 11.0,
    "legalDisputesCount": 18,
    "pendingLegalCases": 16,
    "avgLegalResolutionDays": 140,
    "approvalStatus": "Delayed",
    "pendingApprovalsCount": 4,
    "approvalDelayDays": 40,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 30,
    "familiesAwaitingRR": 101,
    "pendingResettlementCases": 8,
    "avgStakeholderResponseDays": 30,
    "deptCoordinationScore": 3,
    "adminBottleneckCount": 7,
    "delayProbability": 83,
    "riskScore": 83,
    "riskCategory": "CRITICAL",
    "expectedDelayDays": 86,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 50,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 80,
        "status": "CRITICAL",
        "progressPct": 36,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 83,
        "status": "CRITICAL",
        "progressPct": 30,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 30,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 30,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 92,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 58,
        "expectedDelayDays": 66
      },
      {
        "day": "Day 30",
        "riskPct": 83,
        "expectedDelayDays": 86
      }
    ]
  },
  {
    "id": "UP-KAN-005",
    "name": "Kanpur Jajmau Freight 1",
    "type": "Logistics Hub",
    "state": "Uttar Pradesh",
    "district": "Kanpur Nagar",
    "area": "Jajmau",
    "landAreaAcres": 163,
    "affectedFamilies": 193,
    "landownersCount": 83,
    "coordinates": [
      26.4999,
      80.3819
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "UP001 (Uttar Pradesh State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 103.0,
    "compCompletedPct": 85,
    "pendingCompCases": 33,
    "compPendingAmountCrores": 43.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 33,
    "pendingResettlementCases": 10,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 23,
    "riskScore": 23,
    "riskCategory": "LOW",
    "expectedDelayDays": 13,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 23,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 23,
        "expectedDelayDays": 13
      }
    ]
  },
  {
    "id": "UP-KAN-006",
    "name": "Kanpur Jajmau Freight 2",
    "type": "Railway",
    "state": "Uttar Pradesh",
    "district": "Kanpur Nagar",
    "area": "Jajmau",
    "landAreaAcres": 633,
    "affectedFamilies": 163,
    "landownersCount": 303,
    "coordinates": [
      26.5099,
      80.3919
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "UP001 (Uttar Pradesh State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 93.0,
    "compCompletedPct": 58,
    "pendingCompCases": 33,
    "compPendingAmountCrores": 33.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 103,
    "pendingResettlementCases": 10,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 69,
    "riskScore": 69,
    "riskCategory": "HIGH",
    "expectedDelayDays": 49,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 69,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 44,
        "expectedDelayDays": 29
      },
      {
        "day": "Day 30",
        "riskPct": 69,
        "expectedDelayDays": 49
      }
    ]
  },
  {
    "id": "UP-KAN-007",
    "name": "Kanpur Jajmau Freight 3",
    "type": "Logistics Hub",
    "state": "Uttar Pradesh",
    "district": "Kanpur Nagar",
    "area": "Jajmau",
    "landAreaAcres": 445,
    "affectedFamilies": 275,
    "landownersCount": 115,
    "coordinates": [
      26.5199,
      80.4019
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "UP001 (Uttar Pradesh State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 45.0,
    "compCompletedPct": 85,
    "pendingCompCases": 25,
    "compPendingAmountCrores": 25.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 115,
    "pendingResettlementCases": 2,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 23,
    "riskScore": 23,
    "riskCategory": "LOW",
    "expectedDelayDays": 13,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 23,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 23,
        "expectedDelayDays": 13
      }
    ]
  },
  {
    "id": "GJ-SRT-001",
    "name": "Surat Hazira Port Link 1",
    "type": "Highway Expansion",
    "state": "Gujarat",
    "district": "Surat",
    "area": "Hazira Port",
    "landAreaAcres": 371,
    "affectedFamilies": 301,
    "landownersCount": 291,
    "coordinates": [
      21.1802,
      72.8411
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "GJ001 (Gujarat State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 71.0,
    "compCompletedPct": 85,
    "pendingCompCases": 21,
    "compPendingAmountCrores": 11.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 41,
    "pendingResettlementCases": 13,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 21,
    "riskScore": 21,
    "riskCategory": "LOW",
    "expectedDelayDays": 11,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 21,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 21,
        "expectedDelayDays": 11
      }
    ]
  },
  {
    "id": "GJ-SRT-002",
    "name": "Surat Hazira Port Link 2",
    "type": "Port Infrastructure",
    "state": "Gujarat",
    "district": "Surat",
    "area": "Hazira Port",
    "landAreaAcres": 273,
    "affectedFamilies": 103,
    "landownersCount": 193,
    "coordinates": [
      21.1902,
      72.8511
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "GJ001 (Gujarat State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 80,
    "ownershipVerifiedPct": 76,
    "ownershipConflictsCount": 5,
    "possessionPct": 65,
    "compAmountCrores": 73.0,
    "compCompletedPct": 70,
    "pendingCompCases": 33,
    "compPendingAmountCrores": 13.0,
    "legalDisputesCount": 5,
    "pendingLegalCases": 3,
    "avgLegalResolutionDays": 60,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 1,
    "approvalDelayDays": 8,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 65,
    "familiesAwaitingRR": 43,
    "pendingResettlementCases": 10,
    "avgStakeholderResponseDays": 14,
    "deptCoordinationScore": 7,
    "adminBottleneckCount": 2,
    "delayProbability": 48,
    "riskScore": 48,
    "riskCategory": "MEDIUM",
    "expectedDelayDays": 27,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 80,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 70,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 48,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 65,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 50,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 23,
        "expectedDelayDays": 7
      },
      {
        "day": "Day 30",
        "riskPct": 48,
        "expectedDelayDays": 27
      }
    ]
  },
  {
    "id": "GJ-SRT-003",
    "name": "Surat Palsana Link 1",
    "type": "Highway Expansion",
    "state": "Gujarat",
    "district": "Surat",
    "area": "Palsana",
    "landAreaAcres": 321,
    "affectedFamilies": 251,
    "landownersCount": 241,
    "coordinates": [
      21.2002,
      72.8611
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "GJ001 (Gujarat State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 61.0,
    "compCompletedPct": 58,
    "pendingCompCases": 31,
    "compPendingAmountCrores": 41.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 91,
    "pendingResettlementCases": 8,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 71,
    "riskScore": 71,
    "riskCategory": "HIGH",
    "expectedDelayDays": 52,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 71,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 46,
        "expectedDelayDays": 32
      },
      {
        "day": "Day 30",
        "riskPct": 71,
        "expectedDelayDays": 52
      }
    ]
  },
  {
    "id": "GJ-SRT-004",
    "name": "Surat Palsana Link 2",
    "type": "Port Infrastructure",
    "state": "Gujarat",
    "district": "Surat",
    "area": "Palsana",
    "landAreaAcres": 368,
    "affectedFamilies": 98,
    "landownersCount": 288,
    "coordinates": [
      21.2102,
      72.8711
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "GJ001 (Gujarat State Officer)",
    "notificationStatus": "In Progress",
    "notificationPendingDays": 30,
    "docCompletionPct": 50,
    "ownershipVerifiedPct": 46,
    "ownershipConflictsCount": 18,
    "possessionPct": 30,
    "compAmountCrores": 48.0,
    "compCompletedPct": 36,
    "pendingCompCases": 28,
    "compPendingAmountCrores": 28.0,
    "legalDisputesCount": 18,
    "pendingLegalCases": 16,
    "avgLegalResolutionDays": 140,
    "approvalStatus": "Delayed",
    "pendingApprovalsCount": 4,
    "approvalDelayDays": 40,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 30,
    "familiesAwaitingRR": 38,
    "pendingResettlementCases": 5,
    "avgStakeholderResponseDays": 30,
    "deptCoordinationScore": 3,
    "adminBottleneckCount": 7,
    "delayProbability": 84,
    "riskScore": 84,
    "riskCategory": "CRITICAL",
    "expectedDelayDays": 88,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 50,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 80,
        "status": "CRITICAL",
        "progressPct": 36,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 84,
        "status": "CRITICAL",
        "progressPct": 30,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 30,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 30,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 92,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 59,
        "expectedDelayDays": 68
      },
      {
        "day": "Day 30",
        "riskPct": 84,
        "expectedDelayDays": 88
      }
    ]
  },
  {
    "id": "GJ-SRT-005",
    "name": "Surat Sachin GIDC Link 1",
    "type": "Highway Expansion",
    "state": "Gujarat",
    "district": "Surat",
    "area": "Sachin GIDC",
    "landAreaAcres": 549,
    "affectedFamilies": 179,
    "landownersCount": 219,
    "coordinates": [
      21.2202,
      72.8811
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "GJ001 (Gujarat State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 89.0,
    "compCompletedPct": 85,
    "pendingCompCases": 19,
    "compPendingAmountCrores": 29.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 119,
    "pendingResettlementCases": 11,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 21,
    "riskScore": 21,
    "riskCategory": "LOW",
    "expectedDelayDays": 11,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 21,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 21,
        "expectedDelayDays": 11
      }
    ]
  },
  {
    "id": "GJ-SRT-006",
    "name": "Surat Sachin GIDC Link 2",
    "type": "Port Infrastructure",
    "state": "Gujarat",
    "district": "Surat",
    "area": "Sachin GIDC",
    "landAreaAcres": 422,
    "affectedFamilies": 152,
    "landownersCount": 92,
    "coordinates": [
      21.2302,
      72.8911
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "GJ001 (Gujarat State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 42.0,
    "compCompletedPct": 58,
    "pendingCompCases": 22,
    "compPendingAmountCrores": 22.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 92,
    "pendingResettlementCases": 14,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 71,
    "riskScore": 71,
    "riskCategory": "HIGH",
    "expectedDelayDays": 52,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 71,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 46,
        "expectedDelayDays": 32
      },
      {
        "day": "Day 30",
        "riskPct": 71,
        "expectedDelayDays": 52
      }
    ]
  },
  {
    "id": "GJ-SRT-007",
    "name": "Surat Sachin GIDC Link 3",
    "type": "Highway Expansion",
    "state": "Gujarat",
    "district": "Surat",
    "area": "Sachin GIDC",
    "landAreaAcres": 512,
    "affectedFamilies": 342,
    "landownersCount": 182,
    "coordinates": [
      21.2402,
      72.9011
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "GJ001 (Gujarat State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 72.0,
    "compCompletedPct": 85,
    "pendingCompCases": 32,
    "compPendingAmountCrores": 12.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 82,
    "pendingResettlementCases": 9,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 21,
    "riskScore": 21,
    "riskCategory": "LOW",
    "expectedDelayDays": 11,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 21,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 21,
        "expectedDelayDays": 11
      }
    ]
  },
  {
    "id": "GJ-SRT-008",
    "name": "Surat Sachin GIDC Link 4",
    "type": "Port Infrastructure",
    "state": "Gujarat",
    "district": "Surat",
    "area": "Sachin GIDC",
    "landAreaAcres": 429,
    "affectedFamilies": 259,
    "landownersCount": 99,
    "coordinates": [
      21.2502,
      72.9111
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "GJ001 (Gujarat State Officer)",
    "notificationStatus": "In Progress",
    "notificationPendingDays": 30,
    "docCompletionPct": 50,
    "ownershipVerifiedPct": 46,
    "ownershipConflictsCount": 18,
    "possessionPct": 30,
    "compAmountCrores": 49.0,
    "compCompletedPct": 36,
    "pendingCompCases": 39,
    "compPendingAmountCrores": 29.0,
    "legalDisputesCount": 18,
    "pendingLegalCases": 16,
    "avgLegalResolutionDays": 140,
    "approvalStatus": "Delayed",
    "pendingApprovalsCount": 4,
    "approvalDelayDays": 40,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 30,
    "familiesAwaitingRR": 99,
    "pendingResettlementCases": 16,
    "avgStakeholderResponseDays": 30,
    "deptCoordinationScore": 3,
    "adminBottleneckCount": 7,
    "delayProbability": 84,
    "riskScore": 84,
    "riskCategory": "CRITICAL",
    "expectedDelayDays": 88,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 50,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 80,
        "status": "CRITICAL",
        "progressPct": 36,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 84,
        "status": "CRITICAL",
        "progressPct": 30,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 30,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 30,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 92,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 59,
        "expectedDelayDays": 68
      },
      {
        "day": "Day 30",
        "riskPct": 84,
        "expectedDelayDays": 88
      }
    ]
  },
  {
    "id": "GJ-AHD-001",
    "name": "Ahmedabad Sanand Corridor 1",
    "type": "Metro Rail",
    "state": "Gujarat",
    "district": "Ahmedabad",
    "area": "Sanand",
    "landAreaAcres": 468,
    "affectedFamilies": 98,
    "landownersCount": 138,
    "coordinates": [
      23.0325,
      72.5814
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "GJ001 (Gujarat State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 48.0,
    "compCompletedPct": 85,
    "pendingCompCases": 28,
    "compPendingAmountCrores": 28.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 38,
    "pendingResettlementCases": 5,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 19,
    "riskScore": 19,
    "riskCategory": "LOW",
    "expectedDelayDays": 10,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 19,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 19,
        "expectedDelayDays": 10
      }
    ]
  },
  {
    "id": "GJ-AHD-002",
    "name": "Ahmedabad Sanand Corridor 2",
    "type": "Industrial Park",
    "state": "Gujarat",
    "district": "Ahmedabad",
    "area": "Sanand",
    "landAreaAcres": 580,
    "affectedFamilies": 210,
    "landownersCount": 250,
    "coordinates": [
      23.0425,
      72.5914
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "GJ001 (Gujarat State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 80,
    "ownershipVerifiedPct": 76,
    "ownershipConflictsCount": 5,
    "possessionPct": 65,
    "compAmountCrores": 60.0,
    "compCompletedPct": 70,
    "pendingCompCases": 20,
    "compPendingAmountCrores": 40.0,
    "legalDisputesCount": 5,
    "pendingLegalCases": 3,
    "avgLegalResolutionDays": 60,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 1,
    "approvalDelayDays": 8,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 65,
    "familiesAwaitingRR": 50,
    "pendingResettlementCases": 12,
    "avgStakeholderResponseDays": 14,
    "deptCoordinationScore": 7,
    "adminBottleneckCount": 2,
    "delayProbability": 43,
    "riskScore": 43,
    "riskCategory": "MEDIUM",
    "expectedDelayDays": 23,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 80,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 70,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 43,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 65,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 50,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 18,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 43,
        "expectedDelayDays": 23
      }
    ]
  },
  {
    "id": "GJ-AHD-003",
    "name": "Ahmedabad Changodar Corridor 1",
    "type": "Metro Rail",
    "state": "Gujarat",
    "district": "Ahmedabad",
    "area": "Changodar",
    "landAreaAcres": 564,
    "affectedFamilies": 194,
    "landownersCount": 234,
    "coordinates": [
      23.0525,
      72.6014
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "GJ001 (Gujarat State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 44.0,
    "compCompletedPct": 58,
    "pendingCompCases": 34,
    "compPendingAmountCrores": 24.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 34,
    "pendingResettlementCases": 11,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 67,
    "riskScore": 67,
    "riskCategory": "HIGH",
    "expectedDelayDays": 47,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 67,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 42,
        "expectedDelayDays": 27
      },
      {
        "day": "Day 30",
        "riskPct": 67,
        "expectedDelayDays": 47
      }
    ]
  },
  {
    "id": "GJ-AHD-004",
    "name": "Ahmedabad Changodar Corridor 2",
    "type": "Industrial Park",
    "state": "Gujarat",
    "district": "Ahmedabad",
    "area": "Changodar",
    "landAreaAcres": 476,
    "affectedFamilies": 306,
    "landownersCount": 146,
    "coordinates": [
      23.0625,
      72.6114
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "GJ001 (Gujarat State Officer)",
    "notificationStatus": "In Progress",
    "notificationPendingDays": 30,
    "docCompletionPct": 50,
    "ownershipVerifiedPct": 46,
    "ownershipConflictsCount": 18,
    "possessionPct": 30,
    "compAmountCrores": 76.0,
    "compCompletedPct": 36,
    "pendingCompCases": 26,
    "compPendingAmountCrores": 16.0,
    "legalDisputesCount": 18,
    "pendingLegalCases": 16,
    "avgLegalResolutionDays": 140,
    "approvalStatus": "Delayed",
    "pendingApprovalsCount": 4,
    "approvalDelayDays": 40,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 30,
    "familiesAwaitingRR": 46,
    "pendingResettlementCases": 3,
    "avgStakeholderResponseDays": 30,
    "deptCoordinationScore": 3,
    "adminBottleneckCount": 7,
    "delayProbability": 81,
    "riskScore": 81,
    "riskCategory": "CRITICAL",
    "expectedDelayDays": 85,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 50,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 80,
        "status": "CRITICAL",
        "progressPct": 36,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 81,
        "status": "CRITICAL",
        "progressPct": 30,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 30,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 30,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 92,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 56,
        "expectedDelayDays": 65
      },
      {
        "day": "Day 30",
        "riskPct": 81,
        "expectedDelayDays": 85
      }
    ]
  },
  {
    "id": "GJ-AHD-005",
    "name": "Ahmedabad GIFT City Corridor 1",
    "type": "Metro Rail",
    "state": "Gujarat",
    "district": "Ahmedabad",
    "area": "GIFT City",
    "landAreaAcres": 353,
    "affectedFamilies": 183,
    "landownersCount": 273,
    "coordinates": [
      23.0725,
      72.6214
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "GJ001 (Gujarat State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 73.0,
    "compCompletedPct": 85,
    "pendingCompCases": 23,
    "compPendingAmountCrores": 13.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 23,
    "pendingResettlementCases": 15,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 19,
    "riskScore": 19,
    "riskCategory": "LOW",
    "expectedDelayDays": 10,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 19,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 19,
        "expectedDelayDays": 10
      }
    ]
  },
  {
    "id": "GJ-AHD-006",
    "name": "Ahmedabad GIFT City Corridor 2",
    "type": "Industrial Park",
    "state": "Gujarat",
    "district": "Ahmedabad",
    "area": "GIFT City",
    "landAreaAcres": 379,
    "affectedFamilies": 309,
    "landownersCount": 299,
    "coordinates": [
      23.0825,
      72.6314
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "GJ001 (Gujarat State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 79.0,
    "compCompletedPct": 58,
    "pendingCompCases": 29,
    "compPendingAmountCrores": 19.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 49,
    "pendingResettlementCases": 6,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 67,
    "riskScore": 67,
    "riskCategory": "HIGH",
    "expectedDelayDays": 47,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 67,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 42,
        "expectedDelayDays": 27
      },
      {
        "day": "Day 30",
        "riskPct": 67,
        "expectedDelayDays": 47
      }
    ]
  },
  {
    "id": "GJ-AHD-007",
    "name": "Ahmedabad GIFT City Corridor 3",
    "type": "Metro Rail",
    "state": "Gujarat",
    "district": "Ahmedabad",
    "area": "GIFT City",
    "landAreaAcres": 603,
    "affectedFamilies": 233,
    "landownersCount": 273,
    "coordinates": [
      23.0925,
      72.6414
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "GJ001 (Gujarat State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 63.0,
    "compCompletedPct": 85,
    "pendingCompCases": 13,
    "compPendingAmountCrores": 43.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 73,
    "pendingResettlementCases": 5,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 19,
    "riskScore": 19,
    "riskCategory": "LOW",
    "expectedDelayDays": 10,
    "primaryBottleneck": "Compensation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 19,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Compensation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Compensation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 19,
        "expectedDelayDays": 10
      }
    ]
  },
  {
    "id": "GJ-VAD-001",
    "name": "Vadodara Makarpura GIDC Expressway 1",
    "type": "Industrial Corridor",
    "state": "Gujarat",
    "district": "Vadodara",
    "area": "Makarpura GIDC",
    "landAreaAcres": 288,
    "affectedFamilies": 118,
    "landownersCount": 208,
    "coordinates": [
      22.3172,
      73.1912
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "GJ001 (Gujarat State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 48.0,
    "compCompletedPct": 85,
    "pendingCompCases": 18,
    "compPendingAmountCrores": 28.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 58,
    "pendingResettlementCases": 10,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 22,
    "riskScore": 22,
    "riskCategory": "LOW",
    "expectedDelayDays": 12,
    "primaryBottleneck": "Possession",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 22,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Possession Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Possession."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 22,
        "expectedDelayDays": 12
      }
    ]
  },
  {
    "id": "GJ-VAD-002",
    "name": "Vadodara Makarpura GIDC Expressway 2",
    "type": "Road Development",
    "state": "Gujarat",
    "district": "Vadodara",
    "area": "Makarpura GIDC",
    "landAreaAcres": 507,
    "affectedFamilies": 337,
    "landownersCount": 177,
    "coordinates": [
      22.3272,
      73.2012
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "GJ001 (Gujarat State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 80,
    "ownershipVerifiedPct": 76,
    "ownershipConflictsCount": 5,
    "possessionPct": 65,
    "compAmountCrores": 87.0,
    "compCompletedPct": 70,
    "pendingCompCases": 27,
    "compPendingAmountCrores": 27.0,
    "legalDisputesCount": 5,
    "pendingLegalCases": 3,
    "avgLegalResolutionDays": 60,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 1,
    "approvalDelayDays": 8,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 65,
    "familiesAwaitingRR": 77,
    "pendingResettlementCases": 4,
    "avgStakeholderResponseDays": 14,
    "deptCoordinationScore": 7,
    "adminBottleneckCount": 2,
    "delayProbability": 45,
    "riskScore": 45,
    "riskCategory": "MEDIUM",
    "expectedDelayDays": 25,
    "primaryBottleneck": "Possession",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 80,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 70,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 65,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Possession Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Possession."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 50,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 20,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 45,
        "expectedDelayDays": 25
      }
    ]
  },
  {
    "id": "GJ-VAD-003",
    "name": "Vadodara Savli Expressway 1",
    "type": "Industrial Corridor",
    "state": "Gujarat",
    "district": "Vadodara",
    "area": "Savli",
    "landAreaAcres": 302,
    "affectedFamilies": 332,
    "landownersCount": 222,
    "coordinates": [
      22.3372,
      73.2112
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "GJ001 (Gujarat State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 82.0,
    "compCompletedPct": 58,
    "pendingCompCases": 22,
    "compPendingAmountCrores": 22.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 72,
    "pendingResettlementCases": 14,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 69,
    "riskScore": 69,
    "riskCategory": "HIGH",
    "expectedDelayDays": 49,
    "primaryBottleneck": "Possession",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 69,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Possession Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Possession."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 44,
        "expectedDelayDays": 29
      },
      {
        "day": "Day 30",
        "riskPct": 69,
        "expectedDelayDays": 49
      }
    ]
  },
  {
    "id": "GJ-VAD-004",
    "name": "Vadodara Savli Expressway 2",
    "type": "Road Development",
    "state": "Gujarat",
    "district": "Vadodara",
    "area": "Savli",
    "landAreaAcres": 346,
    "affectedFamilies": 376,
    "landownersCount": 266,
    "coordinates": [
      22.3472,
      73.2212
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "GJ001 (Gujarat State Officer)",
    "notificationStatus": "In Progress",
    "notificationPendingDays": 30,
    "docCompletionPct": 50,
    "ownershipVerifiedPct": 46,
    "ownershipConflictsCount": 18,
    "possessionPct": 30,
    "compAmountCrores": 46.0,
    "compCompletedPct": 36,
    "pendingCompCases": 36,
    "compPendingAmountCrores": 26.0,
    "legalDisputesCount": 18,
    "pendingLegalCases": 16,
    "avgLegalResolutionDays": 140,
    "approvalStatus": "Delayed",
    "pendingApprovalsCount": 4,
    "approvalDelayDays": 40,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 30,
    "familiesAwaitingRR": 116,
    "pendingResettlementCases": 13,
    "avgStakeholderResponseDays": 30,
    "deptCoordinationScore": 3,
    "adminBottleneckCount": 7,
    "delayProbability": 83,
    "riskScore": 83,
    "riskCategory": "CRITICAL",
    "expectedDelayDays": 87,
    "primaryBottleneck": "Possession",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 50,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 80,
        "status": "CRITICAL",
        "progressPct": 36,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 83,
        "status": "CRITICAL",
        "progressPct": 30,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 30,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 30,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Possession Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Possession."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 92,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 58,
        "expectedDelayDays": 67
      },
      {
        "day": "Day 30",
        "riskPct": 83,
        "expectedDelayDays": 87
      }
    ]
  },
  {
    "id": "GJ-VAD-005",
    "name": "Vadodara Nandesari Expressway 1",
    "type": "Industrial Corridor",
    "state": "Gujarat",
    "district": "Vadodara",
    "area": "Nandesari",
    "landAreaAcres": 579,
    "affectedFamilies": 109,
    "landownersCount": 249,
    "coordinates": [
      22.3572,
      73.2312
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "GJ001 (Gujarat State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 39.0,
    "compCompletedPct": 85,
    "pendingCompCases": 39,
    "compPendingAmountCrores": 19.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 49,
    "pendingResettlementCases": 16,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 22,
    "riskScore": 22,
    "riskCategory": "LOW",
    "expectedDelayDays": 12,
    "primaryBottleneck": "Possession",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 22,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Possession Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Possession."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 22,
        "expectedDelayDays": 12
      }
    ]
  },
  {
    "id": "GJ-VAD-006",
    "name": "Vadodara Nandesari Expressway 2",
    "type": "Road Development",
    "state": "Gujarat",
    "district": "Vadodara",
    "area": "Nandesari",
    "landAreaAcres": 200,
    "affectedFamilies": 230,
    "landownersCount": 120,
    "coordinates": [
      22.3672,
      73.2412
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "GJ001 (Gujarat State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 60.0,
    "compCompletedPct": 58,
    "pendingCompCases": 10,
    "compPendingAmountCrores": 40.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 70,
    "pendingResettlementCases": 2,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 69,
    "riskScore": 69,
    "riskCategory": "HIGH",
    "expectedDelayDays": 49,
    "primaryBottleneck": "Possession",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 69,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Possession Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Possession."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 44,
        "expectedDelayDays": 29
      },
      {
        "day": "Day 30",
        "riskPct": 69,
        "expectedDelayDays": 49
      }
    ]
  },
  {
    "id": "GJ-VAD-007",
    "name": "Vadodara Nandesari Expressway 3",
    "type": "Industrial Corridor",
    "state": "Gujarat",
    "district": "Vadodara",
    "area": "Nandesari",
    "landAreaAcres": 292,
    "affectedFamilies": 122,
    "landownersCount": 212,
    "coordinates": [
      22.3772,
      73.2512
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "GJ001 (Gujarat State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 32.0,
    "compCompletedPct": 85,
    "pendingCompCases": 22,
    "compPendingAmountCrores": 12.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 62,
    "pendingResettlementCases": 14,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 22,
    "riskScore": 22,
    "riskCategory": "LOW",
    "expectedDelayDays": 12,
    "primaryBottleneck": "Possession",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 22,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Possession Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Possession."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 22,
        "expectedDelayDays": 12
      }
    ]
  },
  {
    "id": "GJ-VAD-008",
    "name": "Vadodara Nandesari Expressway 4",
    "type": "Road Development",
    "state": "Gujarat",
    "district": "Vadodara",
    "area": "Nandesari",
    "landAreaAcres": 373,
    "affectedFamilies": 103,
    "landownersCount": 293,
    "coordinates": [
      22.3872,
      73.2612
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "GJ001 (Gujarat State Officer)",
    "notificationStatus": "In Progress",
    "notificationPendingDays": 30,
    "docCompletionPct": 50,
    "ownershipVerifiedPct": 46,
    "ownershipConflictsCount": 18,
    "possessionPct": 30,
    "compAmountCrores": 53.0,
    "compCompletedPct": 36,
    "pendingCompCases": 33,
    "compPendingAmountCrores": 33.0,
    "legalDisputesCount": 18,
    "pendingLegalCases": 16,
    "avgLegalResolutionDays": 140,
    "approvalStatus": "Delayed",
    "pendingApprovalsCount": 4,
    "approvalDelayDays": 40,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 30,
    "familiesAwaitingRR": 43,
    "pendingResettlementCases": 10,
    "avgStakeholderResponseDays": 30,
    "deptCoordinationScore": 3,
    "adminBottleneckCount": 7,
    "delayProbability": 83,
    "riskScore": 83,
    "riskCategory": "CRITICAL",
    "expectedDelayDays": 87,
    "primaryBottleneck": "Possession",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 50,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 80,
        "status": "CRITICAL",
        "progressPct": 36,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 83,
        "status": "CRITICAL",
        "progressPct": 30,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 30,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 30,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Possession Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Possession."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 92,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 58,
        "expectedDelayDays": 67
      },
      {
        "day": "Day 30",
        "riskPct": 83,
        "expectedDelayDays": 87
      }
    ]
  },
  {
    "id": "GJ-RAJ-001",
    "name": "Rajkot Metoda GIDC Freight 1",
    "type": "Railway",
    "state": "Gujarat",
    "district": "Rajkot",
    "area": "Metoda GIDC",
    "landAreaAcres": 237,
    "affectedFamilies": 167,
    "landownersCount": 157,
    "coordinates": [
      22.3139,
      70.8122
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "GJ001 (Gujarat State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 57.0,
    "compCompletedPct": 85,
    "pendingCompCases": 37,
    "compPendingAmountCrores": 37.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 107,
    "pendingResettlementCases": 14,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 24,
    "riskScore": 24,
    "riskCategory": "LOW",
    "expectedDelayDays": 13,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 24,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 24,
        "expectedDelayDays": 13
      }
    ]
  },
  {
    "id": "GJ-RAJ-002",
    "name": "Rajkot Metoda GIDC Freight 2",
    "type": "Solar Power",
    "state": "Gujarat",
    "district": "Rajkot",
    "area": "Metoda GIDC",
    "landAreaAcres": 260,
    "affectedFamilies": 90,
    "landownersCount": 180,
    "coordinates": [
      22.3239,
      70.8222
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "GJ001 (Gujarat State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 80,
    "ownershipVerifiedPct": 76,
    "ownershipConflictsCount": 5,
    "possessionPct": 65,
    "compAmountCrores": 80.0,
    "compCompletedPct": 70,
    "pendingCompCases": 20,
    "compPendingAmountCrores": 20.0,
    "legalDisputesCount": 5,
    "pendingLegalCases": 3,
    "avgLegalResolutionDays": 60,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 1,
    "approvalDelayDays": 8,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 65,
    "familiesAwaitingRR": 30,
    "pendingResettlementCases": 12,
    "avgStakeholderResponseDays": 14,
    "deptCoordinationScore": 7,
    "adminBottleneckCount": 2,
    "delayProbability": 41,
    "riskScore": 41,
    "riskCategory": "MEDIUM",
    "expectedDelayDays": 22,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 80,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 70,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 41,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 65,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 65,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 50,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 16,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 41,
        "expectedDelayDays": 22
      }
    ]
  },
  {
    "id": "GJ-RAJ-003",
    "name": "Rajkot Aji Vasahat Freight 1",
    "type": "Railway",
    "state": "Gujarat",
    "district": "Rajkot",
    "area": "Aji Vasahat",
    "landAreaAcres": 568,
    "affectedFamilies": 198,
    "landownersCount": 238,
    "coordinates": [
      22.3339,
      70.8322
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "GJ001 (Gujarat State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 88.0,
    "compCompletedPct": 58,
    "pendingCompCases": 38,
    "compPendingAmountCrores": 28.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 38,
    "pendingResettlementCases": 15,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 65,
    "riskScore": 65,
    "riskCategory": "HIGH",
    "expectedDelayDays": 45,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 65,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 40,
        "expectedDelayDays": 25
      },
      {
        "day": "Day 30",
        "riskPct": 65,
        "expectedDelayDays": 45
      }
    ]
  },
  {
    "id": "GJ-RAJ-004",
    "name": "Rajkot Aji Vasahat Freight 2",
    "type": "Solar Power",
    "state": "Gujarat",
    "district": "Rajkot",
    "area": "Aji Vasahat",
    "landAreaAcres": 503,
    "affectedFamilies": 133,
    "landownersCount": 173,
    "coordinates": [
      22.3439,
      70.8422
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "GJ001 (Gujarat State Officer)",
    "notificationStatus": "In Progress",
    "notificationPendingDays": 30,
    "docCompletionPct": 50,
    "ownershipVerifiedPct": 46,
    "ownershipConflictsCount": 18,
    "possessionPct": 30,
    "compAmountCrores": 103.0,
    "compCompletedPct": 36,
    "pendingCompCases": 33,
    "compPendingAmountCrores": 43.0,
    "legalDisputesCount": 18,
    "pendingLegalCases": 16,
    "avgLegalResolutionDays": 140,
    "approvalStatus": "Delayed",
    "pendingApprovalsCount": 4,
    "approvalDelayDays": 40,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 30,
    "familiesAwaitingRR": 73,
    "pendingResettlementCases": 10,
    "avgStakeholderResponseDays": 30,
    "deptCoordinationScore": 3,
    "adminBottleneckCount": 7,
    "delayProbability": 80,
    "riskScore": 80,
    "riskCategory": "CRITICAL",
    "expectedDelayDays": 82,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 50,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 80,
        "status": "CRITICAL",
        "progressPct": 36,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 80,
        "status": "CRITICAL",
        "progressPct": 30,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 30,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 30,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 92,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 55,
        "expectedDelayDays": 62
      },
      {
        "day": "Day 30",
        "riskPct": 80,
        "expectedDelayDays": 82
      }
    ]
  },
  {
    "id": "GJ-RAJ-005",
    "name": "Rajkot Shapar Freight 1",
    "type": "Railway",
    "state": "Gujarat",
    "district": "Rajkot",
    "area": "Shapar",
    "landAreaAcres": 267,
    "affectedFamilies": 297,
    "landownersCount": 187,
    "coordinates": [
      22.3539,
      70.8522
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "GJ001 (Gujarat State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 47.0,
    "compCompletedPct": 85,
    "pendingCompCases": 17,
    "compPendingAmountCrores": 27.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 37,
    "pendingResettlementCases": 9,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 24,
    "riskScore": 24,
    "riskCategory": "LOW",
    "expectedDelayDays": 13,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 24,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 24,
        "expectedDelayDays": 13
      }
    ]
  },
  {
    "id": "GJ-RAJ-006",
    "name": "Rajkot Shapar Freight 2",
    "type": "Solar Power",
    "state": "Gujarat",
    "district": "Rajkot",
    "area": "Shapar",
    "landAreaAcres": 624,
    "affectedFamilies": 154,
    "landownersCount": 294,
    "coordinates": [
      22.3639,
      70.8622
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "GJ001 (Gujarat State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 72,
    "ownershipVerifiedPct": 68,
    "ownershipConflictsCount": 10,
    "possessionPct": 52,
    "compAmountCrores": 64.0,
    "compCompletedPct": 58,
    "pendingCompCases": 24,
    "compPendingAmountCrores": 44.0,
    "legalDisputesCount": 10,
    "pendingLegalCases": 8,
    "avgLegalResolutionDays": 90,
    "approvalStatus": "Pending",
    "pendingApprovalsCount": 2,
    "approvalDelayDays": 20,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 48,
    "familiesAwaitingRR": 94,
    "pendingResettlementCases": 16,
    "avgStakeholderResponseDays": 20,
    "deptCoordinationScore": 5,
    "adminBottleneckCount": 4,
    "delayProbability": 65,
    "riskScore": 65,
    "riskCategory": "HIGH",
    "expectedDelayDays": 45,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 72,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 58,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 65,
        "status": "HIGH",
        "progressPct": 52,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 48,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 52,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "HIGH",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 75,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 40,
        "expectedDelayDays": 25
      },
      {
        "day": "Day 30",
        "riskPct": 65,
        "expectedDelayDays": 45
      }
    ]
  },
  {
    "id": "GJ-RAJ-007",
    "name": "Rajkot Shapar Freight 3",
    "type": "Railway",
    "state": "Gujarat",
    "district": "Rajkot",
    "area": "Shapar",
    "landAreaAcres": 259,
    "affectedFamilies": 89,
    "landownersCount": 179,
    "coordinates": [
      22.3739,
      70.8722
    ],
    "lastUpdated": "2026-08-27",
    "assignedOfficer": "GJ001 (Gujarat State Officer)",
    "notificationStatus": "Completed",
    "notificationPendingDays": 0,
    "docCompletionPct": 90,
    "ownershipVerifiedPct": 86,
    "ownershipConflictsCount": 2,
    "possessionPct": 82,
    "compAmountCrores": 79.0,
    "compCompletedPct": 85,
    "pendingCompCases": 19,
    "compPendingAmountCrores": 19.0,
    "legalDisputesCount": 2,
    "pendingLegalCases": 1,
    "avgLegalResolutionDays": 30,
    "approvalStatus": "Approved",
    "pendingApprovalsCount": 0,
    "approvalDelayDays": 3,
    "pendingDepartment": "Revenue & Land Records",
    "rrCompletionPct": 85,
    "familiesAwaitingRR": 29,
    "pendingResettlementCases": 11,
    "avgStakeholderResponseDays": 8,
    "deptCoordinationScore": 9,
    "adminBottleneckCount": 1,
    "delayProbability": 24,
    "riskScore": 24,
    "riskCategory": "LOW",
    "expectedDelayDays": 13,
    "primaryBottleneck": "Documentation",
    "stageRisks": {
      "Notification": {
        "riskPct": 10,
        "status": "LOW",
        "progressPct": 100,
        "explanation": "Notification clear."
      },
      "Documentation": {
        "riskPct": 25,
        "status": "LOW",
        "progressPct": 90,
        "explanation": "Title audit ongoing."
      },
      "Compensation": {
        "riskPct": 45,
        "status": "MEDIUM",
        "progressPct": 85,
        "explanation": "Disbursements active."
      },
      "Legal Resolution": {
        "riskPct": 24,
        "status": "LOW",
        "progressPct": 82,
        "explanation": "Court suits."
      },
      "R&R": {
        "riskPct": 30,
        "status": "LOW",
        "progressPct": 85,
        "explanation": "Rehousing on track."
      },
      "Possession": {
        "riskPct": 35,
        "status": "MEDIUM",
        "progressPct": 82,
        "explanation": "Site handover."
      }
    },
    "shapContributors": [
      {
        "feature": "Documentation Delay Factor",
        "impact": "MEDIUM",
        "contributionPct": 35,
        "explanation": "Primary risk driven by Documentation."
      }
    ],
    "recommendations": [],
    "interventionPriorityScore": 25,
    "riskTrend": [
      {
        "day": "Day 1",
        "riskPct": 10,
        "expectedDelayDays": 5
      },
      {
        "day": "Day 30",
        "riskPct": 24,
        "expectedDelayDays": 13
      }
    ]
  }
];

export const mockAlerts: AlertItem[] = [
  {
    id: 'ALT-2026-001',
    projectId: 'KGI-INF-001',
    projectName: 'Hosur Industrial Corridor Expansion',
    state: 'Tamil Nadu',
    district: 'Krishnagiri',
    area: 'Hosur',
    riskCategory: 'CRITICAL',
    riskScore: 84,
    mainFactors: ['Legal disputes (18 cases)', 'Compensation delay (42%)', 'Pending approval (35 days)'],
    recommendedAction: 'Prioritize legal resolution and compensation processing.',
    status: 'New',
    timestamp: '2026-08-27 09:30 AM'
  },
  {
    id: 'ALT-2026-002',
    projectId: 'CHN-INF-003',
    projectName: 'North Chennai Logistics Infrastructure',
    state: 'Tamil Nadu',
    district: 'Chennai',
    area: 'Thiruvottiyur',
    riskCategory: 'CRITICAL',
    riskScore: 88,
    mainFactors: ['Port boundary title disputes', 'Disbursement backlog (₹57.2 Cr)', 'Resettlement unallocated'],
    recommendedAction: 'Form joint port authority & Revenue committee to expedite title verification.',
    status: 'New',
    timestamp: '2026-08-27 09:15 AM'
  },
  {
    id: 'ALT-2026-003',
    projectId: 'CBE-INF-002',
    projectName: 'Coimbatore Industrial Corridor',
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    area: 'Annur',
    riskCategory: 'CRITICAL',
    riskScore: 84,
    mainFactors: ['16 High Court injunctions', 'Agricultural land rate dispute'],
    recommendedAction: 'Deploy Special Collectorate Legal Task Force for expedited court resolution.',
    status: 'In Progress',
    timestamp: '2026-08-26 04:45 PM'
  }
];

export const mockUsers: User[] = [
  {
    id: 'ADM001',
    name: 'Dr. R. K. Sharma',
    role: 'System Administrator',
    status: 'Active',
    lastLogin: '2026-08-27 10:45 AM'
  },
  {
    id: 'TN001',
    name: 'Smt. M. Kanthimathi',
    role: 'State Officer',
    state: 'Tamil Nadu',
    status: 'Active',
    lastLogin: '2026-08-27 09:12 AM'
  },
  {
    id: 'CHN001',
    name: 'Shri S. Ramesh',
    role: 'District Officer',
    state: 'Tamil Nadu',
    district: 'Chennai',
    status: 'Active',
    lastLogin: '2026-08-27 09:45 AM'
  },
  {
    id: 'CBE001',
    name: 'Smt. R. Priya',
    role: 'District Officer',
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    status: 'Active',
    lastLogin: '2026-08-27 10:15 AM'
  },
  {
    id: 'SLM001',
    name: 'Shri M. Karthik',
    role: 'District Officer',
    state: 'Tamil Nadu',
    district: 'Salem',
    status: 'Active',
    lastLogin: '2026-08-27 08:30 AM'
  },
  {
    id: 'MDU001',
    name: 'Smt. K. Meenakshi',
    role: 'District Officer',
    state: 'Tamil Nadu',
    district: 'Madurai',
    status: 'Active',
    lastLogin: '2026-08-27 11:10 AM'
  },
  {
    id: 'KR001',
    name: 'Shri V. Anand',
    role: 'District Officer',
    state: 'Tamil Nadu',
    district: 'Krishnagiri',
    status: 'Active',
    lastLogin: '2026-08-27 11:05 AM'
  },
  {
    id: 'MH001',
    name: 'Er. P. Deshmukh',
    role: 'State Officer',
    state: 'Maharashtra',
    status: 'Active',
    lastLogin: '2026-08-26 03:20 PM'
  },
  {
    id: 'KA001',
    name: 'Shri S. Hegde',
    role: 'State Officer',
    state: 'Karnataka',
    status: 'Active',
    lastLogin: '2026-08-27 08:40 AM'
  },
  {
    id: 'UP001',
    name: 'Shri A. K. Rai',
    role: 'State Officer',
    state: 'Uttar Pradesh',
    status: 'Active',
    lastLogin: '2026-08-26 02:15 PM'
  },
  {
    id: 'GJ001',
    name: 'Smt. H. Patel',
    role: 'State Officer',
    state: 'Gujarat',
    status: 'Active',
    lastLogin: '2026-08-27 09:30 AM'
  }
];

export const mockAuditLogs: AuditLogItem[] = [
  {
    id: 'AUD-9012',
    user: 'Shri V. Anand (District Officer)',
    role: 'District Officer',
    action: 'Executed What-If Intervention Simulation',
    project: 'Hosur Industrial Corridor Expansion',
    timestamp: '2026-08-27 11:15 AM',
    previousValue: 'Original Risk: 84%',
    newValue: 'Simulated Risk: 63% (-21 pts)'
  }
];

export const initialDataQualityReport: DataQualityReport = {
  totalRecords: 160,
  validRecords: 155,
  missingValues: 3,
  duplicateRecords: 0,
  invalidRecords: 2,
  qualityScorePct: 98,
  warnings: [
    '3 records have pending survey verification numbers.',
    'No duplicate project references detected.'
  ]
};
