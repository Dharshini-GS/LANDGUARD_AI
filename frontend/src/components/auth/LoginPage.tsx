import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Lock, User, RefreshCw, ArrowRight } from 'lucide-react';
import type { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const { users, setCurrentUser, setActivePage } = useApp();

  const [username, setUsername] = useState('officer_admin');
  const [password, setPassword] = useState('••••••••');
  const [selectedRole, setSelectedRole] = useState<UserRole>('System Administrator');
  const [captchaInput, setCaptchaInput] = useState('7K9M');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const userMatch = users.find(u => u.role === selectedRole) || users[0];
    setCurrentUser(userMatch);
    setActivePage('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col justify-between p-4 antialiased">
      {/* Top Banner */}
      <div className="text-center pt-6">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-white border border-[#D9D9D9] shadow-xs mb-3 text-[#111111]">
          <Shield className="w-8 h-8 text-[#111111]" />
        </div>
        <h1 className="text-2xl font-black tracking-wide text-[#111111] m-0 uppercase">LANDGUARD AI</h1>
        <p className="text-xs text-[#555555] font-medium max-w-md mx-auto mt-1 m-0">
          Predictive Land Acquisition Delay Intelligence — Decision Support System
        </p>
      </div>

      {/* Main Login Card (White Theme Government Style) */}
      <div className="max-w-md w-full mx-auto bg-white rounded shadow-md border border-[#D9D9D9] p-6 space-y-4 my-auto">
        <div className="border-b border-[#E2E2E2] pb-3 text-center">
          <h2 className="text-base font-extrabold text-[#111111] uppercase tracking-wider m-0">
            Government Portal Login
          </h2>
          <p className="text-[11px] text-[#555555] font-medium m-0">
            Enter authorized credentials to access national monitoring platform
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-3 text-xs">
          {/* Official ID / Username */}
          <div>
            <label className="font-bold text-[#333333] block mb-1">Official ID / Username:</label>
            <div className="relative">
              <User className="w-4 h-4 text-[#777777] absolute left-2.5 top-2.5" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Official ID"
                className="w-full pl-9 pr-3 py-2 bg-[#F5F5F5] border border-[#D9D9D9] rounded text-[#111111] font-semibold focus:outline-none focus:border-[#111111]"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="font-bold text-[#333333] block mb-1">Password:</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#777777] absolute left-2.5 top-2.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full pl-9 pr-3 py-2 bg-[#F5F5F5] border border-[#D9D9D9] rounded text-[#111111] font-semibold focus:outline-none focus:border-[#111111]"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <label className="font-bold text-[#333333] block mb-1">Designated Role (Demo Mode):</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              className="w-full py-2 px-3 bg-[#F5F5F5] border border-[#D9D9D9] rounded text-[#111111] font-bold focus:outline-none focus:border-[#111111]"
            >
              <option value="System Administrator">System Administrator (Full India Access)</option>
              <option value="State Officer">State Officer (State Scope)</option>
              <option value="District Officer">District Officer (District Scope)</option>
              <option value="Project Manager">Project Manager (Project Scope)</option>
              <option value="Data/Analytics Officer">Data / Analytics Officer</option>
            </select>
          </div>

          {/* Captcha Placeholder */}
          <div>
            <label className="font-bold text-[#333333] block mb-1">Security Verification Code (Captcha):</label>
            <div className="flex items-center gap-2">
              <div className="bg-[#111111] text-white font-mono font-black tracking-widest text-sm px-4 py-1.5 rounded select-none">
                7K9M
              </div>
              <button
                type="button"
                className="p-2 bg-[#F5F5F5] border border-[#D9D9D9] rounded text-[#555555] hover:bg-[#E2E2E2]"
                title="Refresh Captcha"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <input
                type="text"
                required
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                placeholder="Enter Code"
                className="flex-1 py-1.5 px-3 bg-[#F5F5F5] border border-[#D9D9D9] rounded text-[#111111] font-mono font-bold focus:outline-none"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#111111] hover:bg-[#333333] text-white font-black py-2.5 rounded text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 mt-2"
          >
            <span>Sign In to Government Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="border-t border-[#E2E2E2] pt-3 text-center text-[10px] text-[#777777] space-y-1">
          <div className="font-bold uppercase tracking-wider text-[#333333]">Authorized Access Only</div>
          <div>Prototype System — For Demonstration Purposes</div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="text-center text-[11px] text-[#777777] max-w-xl mx-auto pb-4">
        Prototype trained and demonstrated using synthetic/historical-like data. The system is designed to be retrained and validated using authorized government data when available.
      </div>
    </div>
  );
};
