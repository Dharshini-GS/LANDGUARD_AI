import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RiskBadge } from '../common/RiskBadge';
import { 
  MapPin, 
  Filter, 
  ArrowRight,
  Globe
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';

import { filterProjectsByScopeAndFilters, getSemanticRiskColor } from '../../data/kpiData';

// Custom Leaflet marker icons with exact semantic risk colors
const createCustomPin = (color: string) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.4);"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  });
};

export const GISRiskMapPage: React.FC = () => {
  const { 
    projects, 
    scope, 
    dashboardFilters, 
    setDashboardFilters, 
    setSelectedProjectId, 
    setActivePage,
    currentUser
  } = useApp();

  const [mapLayer, setMapLayer] = useState<'streets' | 'topo'>('streets');

  // Filter projects by Scope & Active Dashboard Filters (RBAC Enforced)
  const scopedProjects = filterProjectsByScopeAndFilters(
    projects,
    scope,
    dashboardFilters,
    undefined,
    currentUser
  );

  // Map Center default based on Scope
  const defaultCenter: [number, number] = scopedProjects.length > 0 
    ? scopedProjects[0].coordinates 
    : [20.5937, 78.9629]; // All India Center

  return (
    <div className="space-y-4">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#E2E2E2] pb-3">
        <div>
          <h2 className="text-xl font-black text-[#111111] tracking-tight m-0 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#111111]" />
            GIS Acquisition Risk Map & Spatial Intelligence
          </h2>
          <p className="text-xs text-[#555555] font-medium m-0">
            Geospatial overlay of land acquisition delay risks across authorized scope: <strong>{scope.state} / {scope.district} / {scope.area}</strong> ({scopedProjects.length} area pins)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#555555]">Base Layer:</span>
          <button
            onClick={() => setMapLayer('streets')}
            className={`px-2.5 py-1 text-xs font-bold rounded border ${
              mapLayer === 'streets' 
                ? 'bg-[#111111] text-white border-[#111111]' 
                : 'bg-white text-[#111111] border-[#D9D9D9]'
            }`}
          >
            Streets
          </button>
          <button
            onClick={() => setMapLayer('topo')}
            className={`px-2.5 py-1 text-xs font-bold rounded border ${
              mapLayer === 'topo' 
                ? 'bg-[#111111] text-white border-[#111111]' 
                : 'bg-white text-[#111111] border-[#D9D9D9]'
            }`}
          >
            Topographic
          </button>
        </div>
      </div>

      {/* Map Control Strip & Legend */}
      <div className="govt-card p-3 bg-white flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-bold text-[#111111]">
          <Globe className="w-4 h-4 text-[#111111]" />
          <span>Semantic Risk Legend:</span>
        </div>

        {/* Semantic Risk Color Indicators (#2E7D32, #F9A825, #EF6C00, #D32F2F) */}
        <div className="flex flex-wrap items-center gap-4 font-bold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#2E7D32] border border-white shadow-xs"></span>
            <span className="text-[#2E7D32]">Low Risk (0–30%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#F9A825] border border-white shadow-xs"></span>
            <span className="text-[#F9A825]">Medium Risk (31–60%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#EF6C00] border border-white shadow-xs"></span>
            <span className="text-[#EF6C00]">High Risk (61–80%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#D32F2F] border border-white shadow-xs"></span>
            <span className="text-[#D32F2F]">Critical Risk (81–100%)</span>
          </div>
        </div>

        {/* Risk Category Filter */}
        <div className="flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-[#555555]" />
          <select
            value={dashboardFilters.riskCategory}
            onChange={(e) => setDashboardFilters(prev => ({ ...prev, riskCategory: e.target.value }))}
            className="text-xs font-bold bg-[#F5F5F5] border border-[#D9D9D9] rounded px-2 py-0.5 text-[#111111] focus:outline-none"
          >
            <option value="All">All Map Pins</option>
            <option value="LOW">Low Risk Pins</option>
            <option value="MEDIUM">Medium Risk Pins</option>
            <option value="HIGH">High Risk Pins</option>
            <option value="CRITICAL">Critical Risk Pins</option>
          </select>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="govt-card overflow-hidden bg-white h-[500px] relative rounded">
        <MapContainer 
          center={defaultCenter} 
          zoom={scope.level === 'National' ? 5 : scope.level === 'State' ? 7 : 10} 
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={
              mapLayer === 'streets' 
                ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                : 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
            }
          />

          {/* Render Area & Project Pins */}
          {scopedProjects.map((p) => {
            const pinColor = getSemanticRiskColor(p.riskCategory);

            return (
              <React.Fragment key={p.id}>
                {/* Risk Radius Circle */}
                <CircleMarker
                  center={p.coordinates}
                  radius={p.riskScore / 3}
                  pathOptions={{
                    color: pinColor,
                    fillColor: pinColor,
                    fillOpacity: 0.2,
                    stroke: true,
                    weight: 1
                  }}
                />

                {/* Marker Pin */}
                <Marker 
                  position={p.coordinates}
                  icon={createCustomPin(pinColor)}
                >
                  <Popup className="custom-popup">
                    <div className="p-2 space-y-1.5 text-xs text-[#111111] max-w-[220px]">
                      <div className="font-bold border-b border-[#E2E2E2] pb-1 flex items-center justify-between">
                        <span>{p.name}</span>
                        <RiskBadge category={p.riskCategory} showIcon={false} />
                      </div>
                      <div><strong>Location:</strong> {p.state} / {p.district} / <strong>{p.area}</strong></div>
                      <div><strong>Risk Score:</strong> <span className="font-mono font-bold" style={{ color: pinColor }}>{p.riskScore}%</span></div>
                      <div><strong>Delay Prob:</strong> <span className="font-mono font-bold">{p.delayProbability}%</span></div>
                      <div><strong>Expected Delay:</strong> <span className="font-mono font-bold">{p.expectedDelayDays} Days</span></div>
                      <div><strong>Primary Bottleneck:</strong> {p.primaryBottleneck}</div>
                      
                      <button
                        onClick={() => {
                          setSelectedProjectId(p.id);
                          setActivePage('risk');
                        }}
                        className="w-full mt-2 bg-[#111111] hover:bg-[#333333] text-white font-bold text-[10px] py-1 rounded flex items-center justify-center gap-1"
                      >
                        <span>Analyze Project Risk</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </Popup>
                </Marker>
              </React.Fragment>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};
