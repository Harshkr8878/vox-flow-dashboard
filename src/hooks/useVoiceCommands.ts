import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '@/context/DashboardContext';
import { toast } from '@/hooks/use-toast';

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
  onstart: () => void;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item: (index: number) => SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item: (index: number) => SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export function useVoiceCommands() {
  const navigate = useNavigate();
  const {
    addTask,
    clearCompletedTasks,
    clearAllTasks,
    markLastTaskComplete,
    setVoiceStatus,
    setLastCommand,
    isListening,
    setIsListening,
    setTheme,
    toggleTheme,
  } = useDashboard();

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isInitializedRef = useRef(false);

  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  }, []);

  const processCommand = useCallback((command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    setLastCommand(command);
    setVoiceStatus('processing');

    // Navigation commands
    if (lowerCommand.includes('go home') || lowerCommand.includes('open home') || lowerCommand.includes('show home')) {
      navigate('/');
      speak('Navigating to home');
      toast({ title: 'Navigation', description: 'Going to home page' });
      return;
    }

    if (lowerCommand.includes('open task') || lowerCommand.includes('show task') || lowerCommand.includes('go to task')) {
      navigate('/tasks');
      speak('Opening tasks');
      toast({ title: 'Navigation', description: 'Opening tasks page' });
      return;
    }

    if (lowerCommand.includes('open analytics') || lowerCommand.includes('show analytics') || lowerCommand.includes('go to analytics')) {
      navigate('/analytics');
      speak('Opening analytics');
      toast({ title: 'Navigation', description: 'Opening analytics page' });
      return;
    }

    if (lowerCommand.includes('open calendar') || lowerCommand.includes('show calendar') || lowerCommand.includes('go to calendar')) {
      navigate('/calendar');
      speak('Opening calendar');
      toast({ title: 'Navigation', description: 'Opening calendar page' });
      return;
    }

    if (lowerCommand.includes('open settings') || lowerCommand.includes('show settings')) {
      navigate('/settings');
      speak('Opening settings');
      toast({ title: 'Navigation', description: 'Opening settings page' });
      return;
    }

    // Task commands
    if (lowerCommand.includes('add task')) {
      const taskMatch = lowerCommand.match(/add task[:\s]+(.+)/i);
      if (taskMatch && taskMatch[1]) {
        const taskTitle = taskMatch[1].trim();
        let priority: 'low' | 'medium' | 'high' = 'medium';
        
        if (lowerCommand.includes('high priority') || lowerCommand.includes('urgent')) {
          priority = 'high';
        } else if (lowerCommand.includes('low priority')) {
          priority = 'low';
        }
        
        addTask(taskTitle, priority);
        speak(`Task added: ${taskTitle}`);
        toast({ title: 'Task Added', description: taskTitle });
        return;
      }
    }

    if (lowerCommand.includes('clear completed') || lowerCommand.includes('delete completed')) {
      clearCompletedTasks();
      speak('Completed tasks cleared');
      toast({ title: 'Tasks Cleared', description: 'All completed tasks have been removed' });
      return;
    }

    if (lowerCommand.includes('clear all task') || lowerCommand.includes('delete all task')) {
      clearAllTasks();
      speak('All tasks cleared');
      toast({ title: 'Tasks Cleared', description: 'All tasks have been removed' });
      return;
    }

    if (lowerCommand.includes('mark last task complete') || lowerCommand.includes('complete last task')) {
      markLastTaskComplete();
      speak('Last task marked complete');
      toast({ title: 'Task Completed', description: 'Last task has been marked as complete' });
      return;
    }

    // Theme commands
    if (lowerCommand.includes('dark mode on') || lowerCommand.includes('enable dark mode') || lowerCommand.includes('switch to dark')) {
      setTheme('dark');
      speak('Dark mode enabled');
      toast({ title: 'Theme Changed', description: 'Dark mode activated' });
      return;
    }

    if (lowerCommand.includes('light mode on') || lowerCommand.includes('enable light mode') || lowerCommand.includes('switch to light') || lowerCommand.includes('dark mode off')) {
      setTheme('light');
      speak('Light mode enabled');
      toast({ title: 'Theme Changed', description: 'Light mode activated' });
      return;
    }

    if (lowerCommand.includes('toggle theme') || lowerCommand.includes('switch theme')) {
      toggleTheme();
      speak('Theme toggled');
      toast({ title: 'Theme Changed', description: 'Theme has been toggled' });
      return;
    }

    // If no command matched
    toast({ title: 'Command Not Recognized', description: `"${command}"`, variant: 'destructive' });
    setVoiceStatus('idle');
  }, [navigate, addTask, clearCompletedTasks, clearAllTasks, markLastTaskComplete, setTheme, toggleTheme, setLastCommand, setVoiceStatus, speak]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;
    
    try {
      recognitionRef.current.start();
      setIsListening(true);
      setVoiceStatus('listening');
    } catch (error) {
      console.error('Error starting recognition:', error);
    }
  }, [setIsListening, setVoiceStatus]);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    
    try {
      recognitionRef.current.stop();
      setIsListening(false);
      setVoiceStatus('idle');
    } catch (error) {
      console.error('Error stopping recognition:', error);
    }
  }, [setIsListening, setVoiceStatus]);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  useEffect(() => {
    if (isInitializedRef.current) return;
    
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognitionAPI) {
      console.warn('Speech recognition not supported');
      toast({
        title: 'Voice Not Supported',
        description: 'Your browser does not support voice recognition',
        variant: 'destructive',
      });
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const last = event.results.length - 1;
      const command = event.results[last][0].transcript;
      console.log('Voice command:', command);
      processCommand(command);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      setVoiceStatus('error');
      
      if (event.error !== 'aborted') {
        toast({
          title: 'Voice Error',
          description: `Error: ${event.error}`,
          variant: 'destructive',
        });
      }
    };

    recognition.onend = () => {
      if (isListening) {
        // Restart if we're supposed to be listening
        try {
          recognition.start();
        } catch (e) {
          console.error('Error restarting recognition:', e);
        }
      } else {
        setVoiceStatus('idle');
      }
    };

    recognition.onstart = () => {
      setVoiceStatus('listening');
    };

    recognitionRef.current = recognition;
    isInitializedRef.current = true;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [processCommand, setVoiceStatus, isListening]);

  return {
    isListening,
    startListening,
    stopListening,
    toggleListening,
    isSupported: typeof window !== 'undefined' && !!(window.SpeechRecognition || window.webkitSpeechRecognition),
  };
}
