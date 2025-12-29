
export enum ModuleCategory {
  HARDWARE = 'Hardware',
  AI_ENGINES = 'AI Engines',
  INFRASTRUCTURE = 'Infrastructure',
  SECURITY = 'Security',
  OPERATIONS = 'Operations',
  ADVANCED = 'Advanced & Future'
}

export interface SystemModule {
  id: string;
  name: string;
  category: ModuleCategory;
  description: string;
  details: string[];
  tech: string[];
  status: 'active' | 'configuring' | 'standby';
}

export interface RecognitionEvent {
  id: string;
  timestamp: string;
  personName: string;
  confidence: number;
  cameraId: string;
  emotion: string;
  status: 'granted' | 'denied';
  imageUrl: string;
  voiceVerified?: boolean;
}

export interface TechStackItem {
  layer: string;
  technology: string;
  purpose: string;
  advantage: string;
}

export interface Identity {
  id: string;
  name: string;
  role: string;
  clearance: 'Alpha' | 'Beta' | 'Gamma';
  lastSeen: string;
  enrollmentDate: string;
  embeddingId: string;
  avatar: string;
}

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
}
