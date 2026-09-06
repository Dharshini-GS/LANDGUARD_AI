import React from 'react';
import type { RiskCategory } from '../../types';

interface RiskBadgeProps {
  category: RiskCategory;
  score?: number;
  showIcon?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ category, score, showIcon = true }) => {
  const getBadgeClass = () => {
    switch (category) {
      case 'LOW':
        return 'govt-badge-low';
      case 'MEDIUM':
        return 'govt-badge-medium';
      case 'HIGH':
        return 'govt-badge-high';
      case 'CRITICAL':
        return 'govt-badge-critical';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const getSymbol = () => {
    switch (category) {
      case 'LOW':
        return '●';
      case 'MEDIUM':
        return '▲';
      case 'HIGH':
        return '▲▲';
      case 'CRITICAL':
        return '✖';
    }
  };

  return (
    <span 
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold border tracking-wider uppercase ${getBadgeClass()}`}
    >
      {showIcon && <span className="text-[10px]">{getSymbol()}</span>}
      <span>{category}</span>
      {score !== undefined && <span className="font-mono text-[10px]">({score}%)</span>}
    </span>
  );
};
