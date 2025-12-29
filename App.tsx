
import React, { useState, useEffect } from 'react';
import { ModuleCategory } from './types';
import { SYSTEM_MODULES, TECH_STACK } from './constants';
import ModuleCard from './components/ModuleCard';
import LiveMonitor from './components/LiveMonitor';
import DatabaseManager from './components/DatabaseManager';
import WorkflowVisualizer from './components/WorkflowVisualizer';
import { getSystemInsights } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'architecture' | 'database' | 'workflow' | 'security' | 'stack'>('dashboard');
  const [insights, setInsights] = useState<string>("Initializing system diagnostics...");
  
  const systemMetrics = {
    cpu: 42,
    gpuTemp: 68,
    latency: 38,
    cameras: 1420
  };

  useEffect(() => {
    const fetchInsights = async () => {
      const result = await getSystemInsights(systemMetrics);
      setInsights(result);
    };
    fetchInsights();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="glass-effect border-b border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-900/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter text-slate-100 uppercase">AEGIS NEXUS</h1>
              <p className="text-[10px] text-cyan-500 font-bold uppercase tracking-[0.2em]">High-Security Biometrics Control</p>
            </div>
          </div>

          <nav className="flex bg-slate-900/50 p-1 rounded-xl border border-slate-800 overflow-x-auto max-w-full scrollbar-hide">
            {['dashboard', 'architecture', 'database', 'workflow', 'security', 'stack'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all uppercase tracking-wide whitespace-nowrap ${
                  activeTab === tab ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="mb-8 p-4 bg-cyan-900/10 border border-cyan-500/20 rounded-xl flex items-center gap-4">
           <div className="bg-cyan-500/20 p-2 rounded-full text-cyan-400 shrink-0">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
               <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
             </svg>
           </div>
           <p className="text-sm text-cyan-200 font-medium">
             <span className="font-bold mr-2 uppercase text-[10px] tracking-widest text-cyan-500">System Architect:</span>
             {insights}
           </p>
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            <LiveMonitor />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               {[
                 { label: 'Avg Latency', val: '38ms', trend: '-2ms', color: 'text-emerald-400' },
                 { label: 'False Acceptance', val: '0.001%', trend: 'stable', color: 'text-emerald-400' },
                 { label: 'Total Identified', val: '1.2M', trend: '+12k Today', color: 'text-cyan-400' },
                 { label: 'System Health', val: '99.98%', trend: 'UPTIME', color: 'text-emerald-400' }
               ].map((m, i) => (
                 <div key={i} className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
                   <p className="text-xs font-bold text-slate-500 uppercase mb-2">{m.label}</p>
                   <p className={`text-2xl font-black ${m.color}`}>{m.val}</p>
                   <p className="text-[10px] text-slate-400 mt-2 font-mono uppercase">{m.trend}</p>
                 </div>
               ))}
            </div>
          </div>
        )}

        {activeTab === 'database' && <DatabaseManager />}
        
        {activeTab === 'workflow' && <WorkflowVisualizer />}

        {activeTab === 'architecture' && (
          <div className="animate-fadeIn">
            <div className="mb-12 max-w-3xl">
              <h2 className="text-4xl font-black text-slate-100 mb-4">Enterprise Architecture</h2>
              <p className="text-lg text-slate-400">
                Aegis utilizes a distributed microservices model optimized for extreme-scale edge and cloud deployments. 
                Our pipeline integrates state-of-the-art CNNs with a highly secure vector search backend.
              </p>
            </div>
            
            {Object.values(ModuleCategory).map((cat) => (
              <section key={cat} className="mb-12">
                <h3 className="text-sm font-bold text-cyan-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
                  <span>{cat}</span>
                  <div className="flex-1 h-px bg-slate-800"></div>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {SYSTEM_MODULES.filter(m => m.category === cat).map(m => (
                    <ModuleCard key={m.id} module={m} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {activeTab === 'stack' && (
          <div className="animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              <table className="w-full text-left">
                <thead className="bg-slate-800/50">
                  <tr>
                    <th className="p-6 text-sm font-bold text-slate-300 uppercase">Layer</th>
                    <th className="p-6 text-sm font-bold text-slate-300 uppercase">Primary Technology</th>
                    <th className="p-6 text-sm font-bold text-slate-300 uppercase">Purpose</th>
                    <th className="p-6 text-sm font-bold text-slate-300 uppercase">Advantage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {TECH_STACK.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-6 text-sm font-bold text-cyan-500">{item.layer}</td>
                      <td className="p-6 text-sm font-mono text-slate-100">{item.technology}</td>
                      <td className="p-6 text-sm text-slate-400">{item.purpose}</td>
                      <td className="p-6 text-sm">
                        <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                          {item.advantage}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="animate-fadeIn grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div className="bg-slate-900 border border-slate-800 p-10 rounded-3xl">
                <h2 className="text-3xl font-black text-slate-100 mb-6">Cybersecurity Matrix</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h5 className="text-cyan-400 font-bold uppercase tracking-widest text-xs">Data Protection</h5>
                    <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                      <p className="font-bold text-slate-200 text-sm mb-1">AES-256 Vector Encryption</p>
                      <p className="text-xs text-slate-400">All biometric embeddings are encrypted at rest; keys are stored in Hardware Security Modules (HSM).</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h5 className="text-cyan-400 font-bold uppercase tracking-widest text-xs">Model Integrity</h5>
                    <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                      <p className="font-bold text-slate-200 text-sm mb-1">Anti-Adversarial Hardening</p>
                      <p className="text-xs text-slate-400">Models are trained with adversarial examples to prevent spoofing via digital patches.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="p-8 border-t border-slate-800 text-center text-slate-600 text-[10px] uppercase tracking-widest">
        &copy; 2024 Aegis Biometrics Industrial Solutions • All Rights Reserved • v4.2.0-STABLE
      </footer>
    </div>
  );
};

export default App;
