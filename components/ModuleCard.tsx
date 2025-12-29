
import React from 'react';
import { SystemModule } from '../types';

interface ModuleCardProps {
  module: SystemModule;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl hover:shadow-lg hover:shadow-cyan-900/20 transition-all">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-cyan-400">{module.name}</h3>
        <span className={`px-2 py-1 text-xs rounded uppercase font-semibold ${
          module.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
        }`}>
          {module.status}
        </span>
      </div>
      <p className="text-slate-300 text-sm mb-4 leading-relaxed">{module.description}</p>
      
      <div className="space-y-3 mb-6">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Core Features</h4>
        <ul className="space-y-2">
          {module.details.map((detail, i) => (
            <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
              <span className="text-cyan-500 mt-1">•</span>
              {detail}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-2">
        {module.tech.map((t, i) => (
          <span key={i} className="bg-slate-900 text-cyan-500/80 px-2 py-1 rounded text-[10px] font-mono border border-slate-700">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ModuleCard;
