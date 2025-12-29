
import { ModuleCategory, SystemModule, TechStackItem, Identity, WorkflowStep } from './types';

export const SYSTEM_MODULES: SystemModule[] = [
  {
    id: 'hw-layer',
    name: 'Hardware Layer',
    category: ModuleCategory.HARDWARE,
    description: 'Industrial-grade sensory input and edge compute nodes.',
    details: [
      'Dual-lens 4K IR Cameras for depth-sensing and anti-spoofing.',
      'Array Microphones with Beamforming for spatial audio capture.',
      'NVIDIA Jetson AGX Orin for 275 TOPS of local edge processing.',
      'Cisco Catalyst Switches for low-latency PoE+ networking.'
    ],
    tech: ['Hikvision IP IR', 'Shure Microphones', 'Jetson Orin', 'PoE+ Switches'],
    status: 'active'
  },
  {
    id: 'detect-engine',
    name: 'Face Detection Engine',
    category: ModuleCategory.AI_ENGINES,
    description: 'High-speed localization of faces within high-resolution streams.',
    details: [
      'RetinaFace algorithm for sub-millisecond detection on full HD frames.',
      'MTCNN for multi-scale pyramid face proposal in crowded environments.',
      'Real-time landmark localization (68-point) for alignment.',
      'Batch processing optimized for TensorRT acceleration.'
    ],
    tech: ['RetinaFace', 'TensorRT', 'CUDA', 'OpenCV'],
    status: 'active'
  },
  {
    id: 'liveness-engine',
    name: 'Liveness Detection',
    category: ModuleCategory.SECURITY,
    description: '3D passive and active anti-spoofing mechanism.',
    details: [
      'Frequency domain analysis to detect printed screen textures.',
      'Blink and microsaccade detection for behavioral validation.',
      'R-RGB (Depth) map verification using dual-lens sensors.',
      'Heart-rate estimation via remote photoplethysmography (rPPG).'
    ],
    tech: ['FAS-Net', 'Depth Mapping', 'rPPG Analysis'],
    status: 'active'
  },
  {
    id: 'recog-engine',
    name: 'Recognition Engine',
    category: ModuleCategory.AI_ENGINES,
    description: 'Vector embedding generation and identity matching.',
    details: [
      'ArcFace for discriminative embeddings.',
      'MagFace for adaptive embedding quality assessment.',
      'Partial face recognition for mask and glasses handling.',
      'Face aging adaptation via temporal embedding drift compensation.'
    ],
    tech: ['ArcFace', 'PyTorch', 'ONNX Runtime'],
    status: 'active'
  },
  {
    id: 'voice-fuse',
    name: 'Voice Verification',
    category: ModuleCategory.ADVANCED,
    description: 'Multi-modal fusion of face and voice biometrics.',
    details: [
      'Speaker ID via ECAPA-TDNN embedding matching.',
      'Noise-robust spectral subtraction for industrial environments.',
      'Lip-sync verification to prevent replay attacks.',
      'Context-aware voice activity detection (VAD).'
    ],
    tech: ['SpeechBrain', 'DeepFilterNet', 'STT-Whisper'],
    status: 'active'
  },
  {
    id: 'behavior-anal',
    name: 'Behavioral Analytics',
    category: ModuleCategory.ADVANCED,
    description: 'Anomaly detection and crowd intelligence.',
    details: [
      'Aggressive action detection (running, fighting, falling).',
      'Loitering alerts based on spatial-temporal dwell analysis.',
      'Crowd density heatmapping for facility management.',
      'Gait analysis as a tertiary authentication factor.'
    ],
    tech: ['VideoMAE', 'AlphaPose', 'Graph Neural Networks'],
    status: 'active'
  }
];

export const MOCK_IDENTITIES: Identity[] = [
  { id: 'ID-001', name: 'Dr. Sarah Chen', role: 'Head of Research', clearance: 'Alpha', lastSeen: '10 mins ago', enrollmentDate: '2023-01-15', embeddingId: 'vec_7721_alpha', avatar: 'https://i.pravatar.cc/150?u=sarah' },
  { id: 'ID-002', name: 'Marcus Thorne', role: 'Security Director', clearance: 'Alpha', lastSeen: 'Just now', enrollmentDate: '2022-11-04', embeddingId: 'vec_1102_alpha', avatar: 'https://i.pravatar.cc/150?u=marcus' },
  { id: 'ID-003', name: 'Elena Rossi', role: 'System Architect', clearance: 'Beta', lastSeen: '2 hours ago', enrollmentDate: '2023-05-20', embeddingId: 'vec_8832_beta', avatar: 'https://i.pravatar.cc/150?u=elena' },
  { id: 'ID-004', name: 'Sgt. Miller', role: 'Perimeter Guard', clearance: 'Gamma', lastSeen: '5 mins ago', enrollmentDate: '2023-08-12', embeddingId: 'vec_0045_gamma', avatar: 'https://i.pravatar.cc/150?u=miller' },
];

export const SYSTEM_WORKFLOW: WorkflowStep[] = [
  { step: 1, title: 'Auto-Discovery', description: 'Cameras heartbeat check and auto-start on edge nodes.' },
  { step: 2, title: 'Face Detection', description: 'Real-time multi-face localization via RetinaFace.' },
  { step: 3, title: 'Liveness Probe', description: '3D depth and texture analysis to prevent spoofing.' },
  { step: 4, title: 'Feature Extraction', description: 'Generation of 512-D ArcFace vector embeddings.' },
  { step: 5, title: 'Vector Search', description: 'Milvus database lookup across 10M+ stored records.' },
  { step: 6, title: 'Identity Logic', description: 'Threshold verification and confidence score generation.' },
  { step: 7, title: 'Voice Fusion', description: 'Cross-verification with speaker identification.' },
  { step: 8, title: 'Behavior Audit', description: 'Contextual anomaly detection (masks, unusual movements).' },
  { step: 9, title: 'Log Ingestion', description: 'Automatic entry into TimescaleDB and encrypted S3.' },
  { step: 10, title: 'Real-time Push', description: 'Dashboard updates via WebSocket / MQTT event stream.' },
  { step: 11, title: 'Alert Escalation', description: 'Automated SMS/Webhook triggers for anomalies.' }
];

export const TECH_STACK: TechStackItem[] = [
  { layer: 'Inference', technology: 'NVIDIA TensorRT / CUDA 12', purpose: 'Hardware acceleration for AI models.', advantage: '2x throughput on edge devices.' },
  { layer: 'Vector DB', technology: 'Milvus v2.3', purpose: 'Massive scale similarity search.', advantage: 'Sub-10ms lookup in billions of vectors.' },
  { layer: 'Backend', technology: 'FastAPI / Redis / RabbitMQ', purpose: 'Asynchronous event processing.', advantage: 'Handles 1000+ simultaneous cam streams.' },
  { layer: 'Security', technology: 'HashiCorp Vault / mTLS', purpose: 'Secrets and node identity management.', advantage: 'Military-grade encryption standards.' }
];
