// This file provides mock data services that would normally connect to the FIWARE Context Broker
// In a real application, these would make actual API calls to the FIWARE and NiFi services

import { AxiosResponse } from 'axios';

// Mock delay function to simulate API latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// System Status data
export const fetchSystemStatus = async () => {
  await delay(800); // Simulate network latency
  
  return {
    dockerStatus: "running",
    containerCount: 6,
    fiwareStatus: "healthy",
    orionStatus: "running",
    nifiStatus: "healthy",
    activeFlows: 3,
    securityStatus: "Secure",
    threatsDetected: 0,
    securityThreat: Math.random() > 0.7, // Randomly simulate threats
    eavesdroppingCount: Math.floor(Math.random() * 3), // Random eavesdropping count
    activeChannels: 4,
    alertLevel: ["Normal", "Medium", "High"][Math.floor(Math.random() * 3)], // Random alert level
    cpuUsage: Math.floor(Math.random() * 30) + 20, // Random CPU usage between 20-50%
    memoryUsage: Math.floor(Math.random() * 40) + 30, // Random memory usage between 30-70%
    networkTraffic: Math.floor(Math.random() * 50) + 10, // Random network traffic
    systemOverview: {
      processorCount: 4,
      totalMemory: "16 GB",
      diskSpace: "100 GB",
      osType: "Linux",
      uptime: "3d 4h 12m",
      networkInterfaces: 2,
      systemLoad: Math.random() * 1.5
    }
  };
};

// Service Health data
export const fetchServiceHealth = async () => {
  await delay(600);
  
  return [
    {
      name: "Orion Context Broker",
      status: "healthy",
      uptime: "3d 4h 12m",
      version: "3.7.0",
      endpoint: "http://orion:1026",
      responseTime: Math.floor(Math.random() * 100) + 50,
      lastRestartTime: "2025-03-10T08:30:00Z"
    },
    {
      name: "MongoDB",
      status: "healthy",
      uptime: "3d 4h 12m",
      version: "4.4",
      endpoint: "mongodb://mongo:27017",
      responseTime: Math.floor(Math.random() * 50) + 20,
      lastRestartTime: "2025-03-10T08:30:00Z"
    },
    {
      name: "IoT Agent",
      status: "healthy",
      uptime: "3d 4h 10m",
      version: "2.1.0",
      endpoint: "http://iot-agent:4041",
      responseTime: Math.floor(Math.random() * 80) + 40,
      lastRestartTime: "2025-03-10T08:32:00Z"
    },
    {
      name: "NiFi Service",
      status: "healthy",
      uptime: "3d 4h 08m",
      version: "1.19.0",
      endpoint: "http://nifi:8080/nifi",
      responseTime: Math.floor(Math.random() * 150) + 70,
      lastRestartTime: "2025-03-10T08:34:00Z"
    },
    {
      name: "MISO Simulator",
      status: Math.random() > 0.8 ? "degraded" : "healthy", // Occasionally show degraded
      uptime: "3d 4h 00m",
      version: "1.0.0",
      endpoint: "http://miso-sim:5000",
      responseTime: Math.floor(Math.random() * 200) + 100,
      lastRestartTime: "2025-03-10T08:42:00Z"
    },
    {
      name: "Frontend Service",
      status: "healthy",
      uptime: "3d 3h 55m",
      version: "1.0.0",
      endpoint: "http://frontend:80",
      responseTime: Math.floor(Math.random() * 70) + 30,
      lastRestartTime: "2025-03-10T08:47:00Z"
    }
  ];
};

// Generate mock time series data for secrecy rates
const generateTimeSeriesData = (hours = 24, interval = 30) => {
  const data = [];
  const now = new Date();
  
  for (let i = 0; i < (hours * 60) / interval; i++) {
    const timestamp = new Date(now.getTime() - (i * interval * 60 * 1000)).toISOString();
    const snr = 15 + Math.random() * 10; // SNR between 15-25 dB
    
    // Basic formula to simulate secrecy rate based on SNR
    const theoreticalMax = Math.log2(1 + snr / 5) * 2.5;
    
    // Add some noise and trends to make the data look realistic
    const trend = Math.sin(i / 20) * 0.5; // Add a sinusoidal trend
    
    // Simulate eavesdropping impact - occasionally reduce the secrecy rate
    const eavesdroppingFactor = Math.random() > 0.85 ? Math.random() * 0.6 + 0.2 : 0;
    
    const secrecyRate = Math.max(0, theoreticalMax - eavesdroppingFactor * theoreticalMax + trend);
    const eavesdroppingImpact = eavesdroppingFactor > 0 ? secrecyRate : 0;
    
    data.push({
      timestamp,
      snr,
      secrecyRate,
      theoreticalMax,
      eavesdroppingImpact,
      scenario: ['Standard', 'High Interference', 'Low SNR', 'Optimal'][Math.floor(Math.random() * 4)]
    });
  }
  
  return data.reverse(); // Return in chronological order
};

// Generate critical points data for scatter plots
const generateCriticalPoints = () => {
  const points = [];
  
  for (let i = 0; i < 8; i++) {
    const snr = 5 + Math.random() * 25; // SNR between 5-30 dB
    
    // Critical points have lower secrecy rates than expected
    const secrecyRate = Math.log2(1 + snr / 10);
    
    points.push({
      snr,
      secrecyRate,
      timestamp: new Date().toISOString(),
      criticalityLevel: Math.floor(Math.random() * 3) + 1 // 1-3 criticality
    });
  }
  
  return points;
};

// Secrecy Rate data
export const fetchSecrecyRateData = async (scenario = 'default') => {
  await delay(1000);
  
  const timeSeriesData = generateTimeSeriesData();
  const criticalPoints = generateCriticalPoints();
  
  // Calculate average secrecy rate
  const avgSecrecyRate = timeSeriesData.reduce((acc, curr) => acc + curr.secrecyRate, 0) / timeSeriesData.length;
  
  // Use the last 10 data points to calculate trends
  const recentData = timeSeriesData.slice(-10);
  const oldAvg = recentData.slice(0, 5).reduce((acc, curr) => acc + curr.secrecyRate, 0) / 5;
  const newAvg = recentData.slice(-5).reduce((acc, curr) => acc + curr.secrecyRate, 0) / 5;
  const avgRateTrend = ((newAvg - oldAvg) / oldAvg) * 100;
  
  return {
    timeSeriesData,
    detailedData: timeSeriesData,
    criticalPoints,
    avgSecrecyRate,
    avgRateTrend,
    channelQuality: avgSecrecyRate > 2.5 ? 'Excellent' : avgSecrecyRate > 1.5 ? 'Good' : 'Poor',
    qualityTrend: Math.random() > 0.5 ? 5.2 : -3.1, // Random trend value
    securityScore: Math.floor(avgSecrecyRate * 30) + 10,
    securityTrend: Math.random() > 0.5 ? 8.3 : -2.7, // Random trend value
    vulnerabilityIndex: 10 - (avgSecrecyRate * 2), // Inverse of secrecy rate
    vulnerabilityTrend: Math.random() > 0.5 ? 12.7 : -6.3 // Random trend value
  };
};

// Scenario data
export const fetchScenarioData = async () => {
  await delay(300);
  
  return [
    { id: 'scenario1', name: 'Urban Environment' },
    { id: 'scenario2', name: 'High Interference' },
    { id: 'scenario3', name: 'Rural Setting' },
    { id: 'scenario4', name: 'Industrial Environment' },
    { id: 'scenario5', name: 'Mobile Eavesdropper' },
    { id: 'scenario6', name: 'Static Eavesdropper' }
  ];
};