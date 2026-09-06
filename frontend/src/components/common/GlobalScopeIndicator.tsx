import React from 'react';
import { useApp } from '../../context/AppContext';
import { INDIA_STATES_AND_UTS, ALL_INDIAN_STATES, getAreasForDistrict } from '../../data/indiaLocations';
import type { ScopeLevel } from '../../types';
import { MapPin, Globe, Filter, Lock, Layers } from 'lucide-react';

export const GlobalScopeIndicator: React.FC = () => {
  const { scope, setScopeLevel, setScopeState, setScopeDistrict, setScopeArea, currentUser } = useApp();

  const isStateLocked = currentUser?.role === 'State Officer' || currentUser?.role === 'District Officer';
  const isDistrictLocked = currentUser?.role === 'District Officer';

  const availableDistricts = scope.state !== 'All States' && INDIA_STATES_AND_UTS[scope.state] 
    ? INDIA_STATES_AND_UTS[scope.state] 
    : [];

  const availableAreas = scope.district !== 'All Districts'
    ? getAreasForDistrict(scope.district)
    : [];

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (isStateLocked) return;
    setScopeState(e.target.value);
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (isDistrictLocked) return;
    setScopeDistrict(e.target.value);
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setScopeArea(e.target.value);
  };

  const handleLevelClick = (level: ScopeLevel) => {
    if (currentUser?.role === 'State Officer' && level === 'National') return;
    if (currentUser?.role === 'District Officer' && (level === 'National' || level === 'State')) return;
    setScopeLevel(level);
  };

  return (
    <div className="govt-card p-3 mb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-l-4 border-l-[#111111] bg-white">
      {/* Current Scope Breadcrumb (State -> District -> Area -> Project) */}
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-[#111111] text-white rounded">
          <Globe className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[10px] font-bold text-[#777777] uppercase tracking-wider flex items-center gap-1">
            <span>Current Monitoring Scope</span>
            {isStateLocked && (
              <span className="text-[9px] bg-[#111111] text-white font-extrabold px-1 py-0.2 rounded flex items-center gap-0.5">
                <Lock className="w-2.5 h-2.5" /> ROLE LOCKED
              </span>
            )}
          </div>
          <div className="text-xs font-extrabold text-[#111111] flex items-center gap-1.5 flex-wrap">
            <span>India</span>
            <span className="text-[#777777]">/</span>
            <span className={scope.state !== 'All States' ? 'text-[#111111] font-bold' : 'text-[#555555]'}>
              {scope.state}
            </span>
            <span className="text-[#777777]">/</span>
            <span className={scope.district !== 'All Districts' ? 'text-[#111111] font-bold' : 'text-[#555555]'}>
              {scope.district}
            </span>
            <span className="text-[#777777]">/</span>
            <span className={scope.area !== 'All Areas' ? 'text-[#111111] font-bold' : 'text-[#555555]'}>
              {scope.area}
            </span>
          </div>
        </div>
      </div>

      {/* Scope Level Selector & Quick Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Scope Level Buttons */}
        <div className="flex items-center bg-[#F5F5F5] p-0.5 rounded border border-[#D9D9D9]">
          <span className="text-[10px] font-bold text-[#555555] uppercase px-2 hidden lg:inline">
            Scope:
          </span>
          {(['National', 'State', 'District', 'Area', 'Project'] as ScopeLevel[]).map((lvl) => {
            const isActive = scope.level === lvl;
            const isDisabled = 
              (currentUser?.role === 'State Officer' && lvl === 'National') ||
              (currentUser?.role === 'District Officer' && (lvl === 'National' || lvl === 'State'));

            return (
              <button
                key={lvl}
                onClick={() => !isDisabled && handleLevelClick(lvl)}
                disabled={isDisabled}
                className={`px-2.5 py-1 text-xs font-bold rounded transition-all ${
                  isActive
                    ? 'bg-[#111111] text-white shadow-xs'
                    : isDisabled
                    ? 'opacity-40 cursor-not-allowed text-[#777777]'
                    : 'text-[#555555] hover:bg-white hover:text-[#111111]'
                }`}
              >
                {lvl}
              </button>
            );
          })}
        </div>

        {/* State Dropdown */}
        <div className="flex items-center gap-1">
          {isStateLocked ? <Lock className="w-3.5 h-3.5 text-[#111111]" /> : <Filter className="w-3.5 h-3.5 text-[#555555]" />}
          <select
            value={scope.state}
            onChange={handleStateChange}
            disabled={isStateLocked}
            className={`text-xs font-semibold bg-white border border-[#D9D9D9] rounded px-2 py-1 text-[#111111] focus:outline-none ${
              isStateLocked ? 'opacity-70 cursor-not-allowed bg-[#F5F5F5]' : ''
            }`}
          >
            {!isStateLocked && <option value="All States">All States / UTs (India)</option>}
            {ALL_INDIAN_STATES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        {/* Dependent District Dropdown */}
        {scope.state !== 'All States' && (
          <div className="flex items-center gap-1">
            {isDistrictLocked ? <Lock className="w-3.5 h-3.5 text-[#111111]" /> : <MapPin className="w-3.5 h-3.5 text-[#555555]" />}
            <select
              value={scope.district}
              onChange={handleDistrictChange}
              disabled={isDistrictLocked}
              className={`text-xs font-semibold bg-white border border-[#D9D9D9] rounded px-2 py-1 text-[#111111] focus:outline-none ${
                isDistrictLocked ? 'opacity-70 cursor-not-allowed bg-[#F5F5F5]' : ''
              }`}
            >
              {!isDistrictLocked && <option value="All Districts">All Districts ({scope.state})</option>}
              {availableDistricts.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Dependent Area Dropdown */}
        {scope.district !== 'All Districts' && availableAreas.length > 0 && (
          <div className="flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-[#555555]" />
            <select
              value={scope.area}
              onChange={handleAreaChange}
              className="text-xs font-semibold bg-white border border-[#D9D9D9] rounded px-2 py-1 text-[#111111] focus:outline-none"
            >
              <option value="All Areas">All Areas ({scope.district})</option>
              {availableAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};
