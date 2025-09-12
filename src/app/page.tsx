"use client";

import { useState, useEffect } from "react";
import { Mic, MicOff, Zap, Cloud, Users, BarChart3, Settings, Power } from "lucide-react";
import { toast } from "sonner";

// Voice Command Interface
const VoiceCommandCenter = ({ onCommand }: { onCommand: (cmd: string) => void }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      toast.success("Voice recognition activated", {
        description: "Speak your command now..."
      });
    } else {
      toast.info("Voice recognition stopped");
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 blackbox-glow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gradient">Voice Command Center</h2>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-success animate-pulse' : 'bg-gray-500'}`}></div>
          <span className="text-sm">{isListening ? 'Listening' : 'Idle'}</span>
        </div>
      </div>

      <div className="relative mb-6">
        <img 
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/26788174-71a3-41d7-8265-0ba2b30e0c5b.png" 
          alt="Enterprise Voice AI Dashboard with Real-time BlackBox Integration and Cloud Worker Orchestration System"
          className="w-full h-32 object-cover rounded-lg opacity-30"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={toggleListening}
            className={`p-6 rounded-full transition-all duration-300 ${
              isListening 
                ? 'bg-voice-primary voice-listening' 
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {isListening ? <Mic size={32} /> : <MicOff size={32} />}
          </button>
        </div>
      </div>

      {transcript && (
        <div className="bg-gray-700 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-300">Last Command:</p>
          <p className="text-white font-medium">{transcript}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        <button 
          onClick={() => onCommand('Deploy worker')}
          className="bg-voice-primary hover:bg-voice-secondary p-3 rounded-lg text-sm transition-colors"
        >
          Deploy Worker
        </button>
        <button 
          onClick={() => onCommand('Scale up')}
          className="bg-blackbox-accent hover:bg-purple-700 p-3 rounded-lg text-sm transition-colors"
        >
          Scale Up
        </button>
        <button 
          onClick={() => onCommand('System health')}
          className="bg-success hover:bg-green-600 p-3 rounded-lg text-sm transition-colors"
        >
          Health Check
        </button>
        <button 
          onClick={() => onCommand('Generate report')}
          className="bg-warning hover:bg-yellow-600 p-3 rounded-lg text-sm transition-colors"
        >
          Generate Report
        </button>
      </div>
    </div>
  );
};

// Cloud Worker Console
const CloudWorkerConsole = () => {
  const [workers, setWorkers] = useState([
    { id: 'worker-001', status: 'active', region: 'us-east-1', requests: 1234 },
    { id: 'worker-002', status: 'deploying', region: 'eu-central-1', requests: 0 },
    { id: 'worker-003', status: 'active', region: 'us-west-1', requests: 856 }
  ]);

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <Cloud className="mr-2" size={20} />
          Cloud Workers
        </h2>
        <span className="bg-success text-white px-2 py-1 rounded text-sm">
          {workers.filter(w => w.status === 'active').length} Active
        </span>
      </div>

      <div className="space-y-3">
        {workers.map((worker) => (
          <div key={worker.id} className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="font-medium">{worker.id}</p>
              <p className="text-sm text-gray-400">{worker.region}</p>
            </div>
            <div className="text-right">
              <p className="text-sm">{worker.requests.toLocaleString()} requests</p>
              <span className={`px-2 py-1 rounded text-xs ${
                worker.status === 'active' ? 'bg-success' :
                worker.status === 'deploying' ? 'bg-warning worker-deploying' :
                'bg-gray-500'
              }`}>
                {worker.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// System Health Panel
const SystemHealthPanel = () => {
  const [wakeLock, setWakeLock] = useState(true);
  const [systemStats, setSystemStats] = useState({
    uptime: '99.97%',
    responseTime: '245ms',
    activeUsers: 1,
    pipelineSuccess: '98.9%'
  });

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <BarChart3 className="mr-2" size={20} />
          System Health
        </h2>
        <div className="flex items-center space-x-2">
          <Power 
            size={16} 
            className={wakeLock ? 'text-success' : 'text-gray-500'} 
          />
          <span className="text-sm">Wake Lock: {wakeLock ? 'Active' : 'Inactive'}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-700 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-success">{systemStats.uptime}</p>
          <p className="text-sm text-gray-400">Uptime</p>
        </div>
        <div className="bg-gray-700 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-voice-primary">{systemStats.responseTime}</p>
          <p className="text-sm text-gray-400">Response Time</p>
        </div>
        <div className="bg-gray-700 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-blackbox-accent">{systemStats.activeUsers}</p>
          <p className="text-sm text-gray-400">Active Users</p>
        </div>
        <div className="bg-gray-700 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-warning">{systemStats.pipelineSuccess}</p>
          <p className="text-sm text-gray-400">Pipeline Success</p>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard
export default function VoiceBlackBoxDashboard() {
  const [lastCommand, setLastCommand] = useState<string>("");

  const handleVoiceCommand = async (command: string) => {
    setLastCommand(command);
    toast.success(`Executing: ${command}`, {
      description: "Processing with BlackBox AI..."
    });

    try {
      // Call BlackBox API
      const response = await fetch('/api/voice/blackbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          command,
          user: process.env.USER_EMAIL || 'louiewong4@gmail.com',
          timestamp: new Date().toISOString()
        })
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success("Command executed successfully", {
          description: result.message || "BlackBox AI processed your request"
        });
      }
    } catch (error) {
      toast.error("Command execution failed", {
        description: "Check system health and try again"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gradient">Voice BlackBox Dashboard</h1>
            <p className="text-gray-400">Enterprise Cloud Orchestration • louiewong4@gmail.com</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm">System Online</span>
            </div>
            <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
              <Settings size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        {/* Last Command Display */}
        {lastCommand && (
          <div className="bg-blackbox-accent/20 border border-blackbox-accent/50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-300">Last Voice Command:</p>
            <p className="text-lg font-medium text-white">{lastCommand}</p>
          </div>
        )}

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <VoiceCommandCenter onCommand={handleVoiceCommand} />
          <CloudWorkerConsole />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SystemHealthPanel />
          
          {/* Collaborative Features */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold flex items-center mb-4">
              <Users className="mr-2" size={20} />
              Collaborative
            </h2>
            <div className="space-y-3">
              <div className="bg-gray-700 rounded-lg p-3">
                <p className="text-sm">Recent Activity</p>
                <p className="text-xs text-gray-400">Worker deployed to us-east-1</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-3">
                <p className="text-sm">Pipeline Status</p>
                <p className="text-xs text-gray-400">3 pipelines running</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-3">
                <p className="text-sm">Cost Optimization</p>
                <p className="text-xs text-gray-400">Saved $2.45 today</p>
              </div>
            </div>
          </div>

          {/* BlackBox Integration */}
          <div className="bg-gray-800 rounded-lg p-6 blackbox-glow">
            <h2 className="text-xl font-bold flex items-center mb-4">
              <Zap className="mr-2" size={20} />
              BlackBox AI
            </h2>
            <div className="bg-gradient-to-r from-blackbox-accent/20 to-voice-primary/20 rounded-lg p-4">
              <p className="text-sm mb-2">AI Integration Status</p>
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-xs">Connected to BlackBox API</span>
              </div>
              <p className="text-xs text-gray-400">
                Ready to process voice commands with advanced AI optimization
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}