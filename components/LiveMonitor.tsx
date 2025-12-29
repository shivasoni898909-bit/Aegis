
import React, { useRef, useEffect, useState } from 'react';
import { RecognitionEvent } from '../types';
import { explainDecision } from '../services/geminiService';

const LiveMonitor: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [logs, setLogs] = useState<RecognitionEvent[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [activeCam, setActiveCam] = useState("NORTH-01");
  const [voiceWave, setVoiceWave] = useState(false);

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera error:", err);
      }
    }
    setupCamera();
  }, []);

  const simulateRecognition = async () => {
    setIsScanning(true);
    setVoiceWave(true);
    setAiAnalysis("Processing biometric fusion... Analyzing voice signature & facial geometry.");
    
    await new Promise(r => setTimeout(r, 2000));

    const names = ["Dr. Sarah Chen", "Marcus Thorne", "Unknown Entity", "Elena Rossi", "Sgt. Miller"];
    const emotions = ["Neutral", "Focused", "Anxious", "Calm", "Happy"];
    const id = Math.random().toString(36).substr(2, 9);
    const person = names[Math.floor(Math.random() * names.length)];
    const isUnknown = person === "Unknown Entity";

    const newEvent: RecognitionEvent = {
      id,
      timestamp: new Date().toLocaleTimeString(),
      personName: person,
      confidence: isUnknown ? 0.38 : 0.96 + Math.random() * 0.03,
      cameraId: `CAM-${activeCam}`,
      emotion: emotions[Math.floor(Math.random() * emotions.length)],
      status: isUnknown ? 'denied' : 'granted',
      imageUrl: `https://picsum.photos/seed/${id}/200/200`,
      voiceVerified: !isUnknown
    };

    setLogs(prev => [newEvent, ...prev].slice(0, 10));
    setIsScanning(false);
    setVoiceWave(false);

    const explanation = await explainDecision(newEvent, `Security Checkpoint ${activeCam}`);
    setAiAnalysis(explanation);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        {/* Multi-Cam Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {["NORTH-01", "SOUTH-04", "ELEVATOR-B", "VAULT-MAIN", "GATE-PARKING"].map(cam => (
            <button 
              key={cam}
              onClick={() => setActiveCam(cam)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all border ${
                activeCam === cam ? 'bg-cyan-600 border-cyan-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
              }`}
            >
              {cam}
            </button>
          ))}
        </div>

        <div className="relative group rounded-2xl overflow-hidden border border-slate-700 bg-black aspect-video shadow-2xl shadow-cyan-900/10">
          <video 
            ref={videoRef} 
            autoPlay 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
          />
          
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-4 left-4 flex gap-2">
              <div className="bg-red-600/80 px-3 py-1 text-[10px] font-bold rounded flex items-center gap-2 animate-pulse">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                LIVE FEED • {activeCam}
              </div>
              <div className="bg-slate-900/80 px-3 py-1 text-[10px] font-bold rounded text-slate-300 border border-slate-700">
                AI SENSOR: ACTIVE
              </div>
            </div>

            {/* Voice Wave Visualizer */}
            {voiceWave && (
              <div className="absolute top-4 right-4 flex items-end gap-0.5 h-8">
                {[1, 2, 3, 4, 5, 6, 4, 3, 2, 5].map((h, i) => (
                  <div key={i} className="w-1 bg-cyan-400 animate-bounce" style={{ height: `${h * 10}%`, animationDelay: `${i * 0.1}s` }}></div>
                ))}
              </div>
            )}
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
               <div className="w-64 h-64 border border-cyan-500/30 rounded-full animate-[pulse_2s_infinite]"></div>
            </div>

            {isScanning && (
              <div className="absolute inset-x-0 h-1 bg-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.5)] animate-scan"></div>
            )}
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-auto flex gap-4">
            <button 
              onClick={simulateRecognition}
              disabled={isScanning}
              className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full font-bold shadow-xl shadow-cyan-900/40 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {isScanning ? "Processing Fusion..." : "Identify Subject"}
            </button>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 min-h-[160px] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.727 2.182a2 2 0 00.351 1.933l2.25 2.25a2 2 0 001.933.351l2.182-.727a2 2 0 001.414-1.96l-.477-2.387a2 2 0 00-.547-1.022z" />
             </svg>
          </div>
          <h4 className="text-cyan-400 font-bold mb-3 flex items-center gap-2 text-sm">
             <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
             AI Forensic Analysis
          </h4>
          <div className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap font-mono">
            {aiAnalysis || "Standing by for biometric input..."}
          </div>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden flex flex-col h-[700px]">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900">
          <h3 className="font-bold text-slate-100 text-sm">Event Stream</h3>
          <span className="text-[10px] text-slate-500 font-mono">ENCRYPTED TUNNEL</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
          {logs.map(log => (
            <div key={log.id} className="bg-slate-800/40 border border-slate-700 p-3 rounded-xl flex items-center gap-4 animate-fadeIn">
              <div className="relative">
                <img src={log.imageUrl} alt="ID" className="w-12 h-12 rounded-lg bg-slate-700 grayscale hover:grayscale-0 transition-all" />
                {log.voiceVerified && (
                  <div className="absolute -top-1 -right-1 bg-cyan-500 rounded-full p-0.5">
                    <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0 5 5 0 01-10 0 1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"/></svg>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <p className="font-bold text-sm text-slate-200 truncate">{log.personName}</p>
                  <span className="text-[9px] text-slate-500">{log.timestamp}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase ${log.status === 'granted' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                    {log.status}
                  </span>
                  <p className="text-[10px] text-cyan-500 font-bold">MATCH: {(log.confidence * 100).toFixed(0)}%</p>
                </div>
              </div>
            </div>
          ))}
          {logs.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center opacity-20 py-20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm">NO RECENT EVENTS</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 10%; }
          50% { top: 90%; }
          100% { top: 10%; }
        }
        .animate-scan {
          animation: scan 3s infinite ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LiveMonitor;
