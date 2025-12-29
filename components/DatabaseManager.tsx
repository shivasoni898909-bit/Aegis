
import React, { useState } from 'react';
import { MOCK_IDENTITIES } from '../constants';
import { Identity } from '../types';

const DatabaseManager: React.FC = () => {
  const [identities] = useState<Identity[]>(MOCK_IDENTITIES);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = identities.filter(id => 
    id.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    id.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-slate-100">Biometric Database</h2>
          <p className="text-slate-400 text-sm">Managing 10,482 Enrolled Primary Identities</p>
        </div>
        <div className="flex gap-3">
          <input 
            type="text" 
            placeholder="Search Identity..." 
            className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
            Enroll New Face
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map(person => (
          <div key={person.id} className="bg-slate-800/40 border border-slate-700 p-5 rounded-2xl hover:border-cyan-500/50 transition-all group">
            <div className="relative mb-4">
              <img src={person.avatar} alt={person.name} className="w-20 h-20 rounded-full mx-auto border-4 border-slate-900 group-hover:border-cyan-900 transition-colors" />
              <div className={`absolute bottom-0 right-1/2 translate-x-10 w-6 h-6 rounded-full border-4 border-slate-800 flex items-center justify-center text-[8px] font-bold ${
                person.clearance === 'Alpha' ? 'bg-red-500 text-white' : person.clearance === 'Beta' ? 'bg-amber-500 text-black' : 'bg-emerald-500 text-white'
              }`}>
                {person.clearance[0]}
              </div>
            </div>
            <div className="text-center">
              <h4 className="font-bold text-slate-100">{person.name}</h4>
              <p className="text-xs text-cyan-500 font-medium mb-3">{person.role}</p>
              
              <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 font-mono uppercase">
                <div className="bg-slate-900 p-1.5 rounded">
                  ID: {person.id}
                </div>
                <div className="bg-slate-900 p-1.5 rounded">
                  LAST: {person.lastSeen}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-700/50">
                <p className="text-[9px] text-slate-500 mb-1">VECTOR SIGNATURE</p>
                <p className="text-[10px] text-slate-400 font-mono truncate">{person.embeddingId}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl mt-8">
        <h4 className="text-sm font-bold text-slate-300 uppercase mb-4">Database Health Statistics</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <p className="text-xs text-slate-500 mb-1">Index Fragmentation</p>
            <p className="text-xl font-black text-emerald-400">0.04%</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Query Latency (Avg)</p>
            <p className="text-xl font-black text-cyan-400">4.2ms</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Sync Nodes</p>
            <p className="text-xl font-black text-slate-100">12 / 12</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Storage Utilized</p>
            <p className="text-xl font-black text-slate-100">1.4 TB</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseManager;
