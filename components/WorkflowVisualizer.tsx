
import React from 'react';
import { SYSTEM_WORKFLOW } from '../constants';

const WorkflowVisualizer: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      <div className="mb-12">
        <h2 className="text-4xl font-black text-slate-100 mb-4">Automated Pipeline</h2>
        <p className="text-lg text-slate-400 max-w-2xl">
          The Aegis Nexus operating procedure is a fully autonomous 11-step cycle from sensor capture to real-time decisioning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {/* Connection Line (Visual) */}
        <div className="hidden lg:block absolute top-[110px] left-20 right-20 h-0.5 bg-gradient-to-r from-cyan-900 via-cyan-500 to-cyan-900 z-0"></div>
        
        {SYSTEM_WORKFLOW.map((step) => (
          <div key={step.step} className="bg-slate-800/40 border border-slate-700 p-6 rounded-2xl relative z-10 hover:border-cyan-500 transition-colors">
            <div className="w-10 h-10 rounded-full bg-cyan-600 text-white font-bold flex items-center justify-center mb-4 shadow-lg shadow-cyan-900/30">
              {step.step}
            </div>
            <h4 className="text-lg font-bold text-slate-100 mb-2">{step.title}</h4>
            <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
            
            <div className="mt-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-mono text-emerald-500 uppercase">Process Active</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 bg-slate-900 border border-slate-800 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-slate-100 mb-2">Manual Override & Maintenance</h3>
          <p className="text-slate-400">System operations are 100% automated but permit surgical human intervention if security thresholds are breached.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-rose-600/20 text-rose-500 border border-rose-600/30 px-6 py-3 rounded-xl font-bold hover:bg-rose-600 hover:text-white transition-all uppercase tracking-widest text-xs">
            Emergency Lockout
          </button>
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-bold transition-all uppercase tracking-widest text-xs">
            Diagnostic Dump
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkflowVisualizer;
