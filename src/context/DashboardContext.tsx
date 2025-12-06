import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}

export type VoiceStatus = 'idle' | 'listening' | 'processing' | 'error';
export type ThemeMode = 'dark' | 'light';

interface DashboardContextType {
  // Tasks
  tasks: Task[];
  addTask: (title: string, priority?: 'low' | 'medium' | 'high') => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  clearCompletedTasks: () => void;
  clearAllTasks: () => void;
  markLastTaskComplete: () => void;
  
  // Voice
  voiceStatus: VoiceStatus;
  setVoiceStatus: (status: VoiceStatus) => void;
  lastCommand: string;
  setLastCommand: (command: string) => void;
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
  
  // Theme
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  
  // Navigation
  currentPage: string;
  setCurrentPage: (page: string) => void;
  
  // Stats
  stats: {
    tasksCompletedToday: number;
    streak: number;
    totalCompleted: number;
  };
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  // Tasks state
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Complete voice dashboard', completed: false, priority: 'high', createdAt: new Date() },
    { id: '2', title: 'Review analytics data', completed: false, priority: 'medium', createdAt: new Date() },
    { id: '3', title: 'Update project documentation', completed: true, priority: 'low', createdAt: new Date() },
  ]);
  
  // Voice state
  const [voiceStatus, setVoiceStatus] = useState<VoiceStatus>('idle');
  const [lastCommand, setLastCommand] = useState('');
  const [isListening, setIsListening] = useState(false);
  
  // Theme state
  const [theme, setThemeState] = useState<ThemeMode>('dark');
  
  // Navigation state
  const [currentPage, setCurrentPage] = useState('home');
  
  // Stats
  const [stats] = useState({
    tasksCompletedToday: 5,
    streak: 7,
    totalCompleted: 42,
  });

  // Task actions
  const addTask = useCallback((title: string, priority: 'low' | 'medium' | 'high' = 'medium') => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      priority,
      createdAt: new Date(),
    };
    setTasks(prev => [newTask, ...prev]);
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }, []);

  const clearCompletedTasks = useCallback(() => {
    setTasks(prev => prev.filter(task => !task.completed));
  }, []);

  const clearAllTasks = useCallback(() => {
    setTasks([]);
  }, []);

  const markLastTaskComplete = useCallback(() => {
    setTasks(prev => {
      const lastIncomplete = [...prev].reverse().find(t => !t.completed);
      if (lastIncomplete) {
        return prev.map(task => 
          task.id === lastIncomplete.id ? { ...task, completed: true } : task
        );
      }
      return prev;
    });
  }, []);

  // Theme actions
  const toggleTheme = useCallback(() => {
    setThemeState(prev => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.remove('dark', 'light');
      document.documentElement.classList.add(newTheme);
      return newTheme;
    });
  }, []);

  const setTheme = useCallback((newTheme: ThemeMode) => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(newTheme);
    setThemeState(newTheme);
  }, []);

  return (
    <DashboardContext.Provider value={{
      tasks,
      addTask,
      deleteTask,
      toggleTask,
      clearCompletedTasks,
      clearAllTasks,
      markLastTaskComplete,
      voiceStatus,
      setVoiceStatus,
      lastCommand,
      setLastCommand,
      isListening,
      setIsListening,
      theme,
      toggleTheme,
      setTheme,
      currentPage,
      setCurrentPage,
      stats,
    }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
