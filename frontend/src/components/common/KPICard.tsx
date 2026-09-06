import React from 'react';
import { HelpCircle, ArrowUpRight } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: string;
  isCritical?: boolean;
  isHigh?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  subtitle,
  trend,
  isCritical,
  isHigh,
  icon,
  onClick,
}) => {
  return (
    <div 
      onClick={onClick}
      className={`govt-card p-4 flex flex-col justify-between border-t-4 transition-all ${
        onClick ? 'cursor-pointer hover:border-t-black hover:shadow-md hover:bg-[#FDFDFD] group' : ''
      } ${
        isCritical 
          ? 'border-t-red-600' 
          : isHigh 
          ? 'border-t-orange-600' 
          : 'border-t-[#111111]'
      }`}
      title={subtitle}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-xs font-bold text-[#555555] group-hover:text-[#111111] uppercase tracking-wider leading-tight">
          {title}
        </span>
        {icon && <div className="text-[#555555] group-hover:text-[#111111] p-1 bg-[#F5F5F5] rounded border border-[#E2E2E2] shrink-0">{icon}</div>}
      </div>

      <div>
        <div className="text-2xl font-black text-[#111111] tracking-tight leading-none mb-1 font-mono">
          {value}
        </div>
        {subtitle && (
          <div className="text-[11px] font-medium text-[#777777] leading-snug flex items-center gap-1">
            <HelpCircle className="w-3 h-3 text-[#777777] shrink-0" />
            <span className="truncate">{subtitle}</span>
          </div>
        )}
        {trend && (
          <div className="text-[10px] font-semibold text-[#333333] mt-1">
            {trend}
          </div>
        )}
        {onClick && (
          <div className="text-[10px] font-bold text-[#111111] mt-2 pt-1 border-t border-[#F5F5F5] flex items-center justify-between group-hover:underline">
            <span>View Details</span>
            <ArrowUpRight className="w-3 h-3 text-[#111111] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        )}
      </div>
    </div>
  );
};
