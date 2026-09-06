import React from 'react';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let style = 'bg-slate-100 text-slate-700 border-slate-300';

  if (['Approved', 'Completed', 'Resolved', 'Active', 'Operational'].includes(status)) {
    style = 'bg-emerald-50 text-emerald-700 border-emerald-300';
  } else if (['Pending', 'In Progress', 'Acknowledged'].includes(status)) {
    style = 'bg-amber-50 text-amber-700 border-amber-300';
  } else if (['Delayed', 'New', 'Critical', 'Escalated'].includes(status)) {
    style = 'bg-rose-50 text-rose-700 border-rose-300';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium border ${style}`}>
      {status}
    </span>
  );
};
