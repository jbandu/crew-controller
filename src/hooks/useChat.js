import { useState, useCallback } from 'react';
import { demoMessages } from '../data/demoScenarios';
import { sounds } from '../utils/sounds';
import {
  shiftStartScenarios,
  shiftEndScenarios,
  getRandomScenario,
  getRandomDisruption
} from '../data/rotatingScenarios';
import { getAIAnalysis } from '../services/anthropicService';
import { getMockResponse } from '../data/mockResponses';

const getResponseForInput = (content, demoStep) => {
  const lowerContent = content.toLowerCase();

  // Handle network map question
  if (lowerContent.includes('network') || lowerContent.includes('route')) {
    return {
      type: 'ai-analysis',
      content: `**Copa Airlines Route Network**

Displaying 3D interactive map of Copa's hub-and-spoke network from PTY.

**Network Overview:**
• Hub: Panama City (PTY) - Tocumen International
• Active Routes: 15 destinations
• Fleet: 18 aircraft (737-800, 737 MAX 9)
• Daily Operations: 82+ flights

**Key Destinations:**
• North America: MIA, LAX, JFK, MEX
• South America: BOG, MDE, LIM, GRU, EZE
• Caribbean: CUN, SJU, HAV
• Central America: SJO, SAL, GUA

Interactive features: Click markers for details, rotate globe to explore routes.`,
      visualization: 'NetworkMap',
      data: { weatherOverlay: false }
    };
  }

  // Handle live weather question
  if (lowerContent.includes('real-time weather') || lowerContent.includes('live weather')) {
    return {
      type: 'ai-analysis',
      content: `Fetching live weather data from OpenWeather API across Copa Airlines network...

This includes real-time conditions for PTY hub and all destinations, with operational impact analysis and recommendations.`,
      visualization: 'LiveWeatherExposure'
    };
  }

  // Handle weather exposure question
  if (lowerContent.includes('weather') || lowerContent.includes('exposure')) {
    return demoMessages.weatherResponse;
  }

  // Handle other questions with generic response
  return {
    type: 'ai-analysis',
    content: `Analyzing your request...

This is a demo response. In production, I would provide real-time analysis based on current operations data.`,
    visualization: 'OperationsOverview'
  };
};

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [demoStep, setDemoStep] = useState('init');

  const addMessage = useCallback((message) => {
    setMessages(prev => [...prev, { ...message, id: Date.now() + Math.random(), timestamp: new Date() }]);
  }, []);

  const sendMessage = useCallback(async (content) => {
    // Add user message
    addMessage({ type: 'user', content });
    setIsTyping(true);

    const lowerContent = content.toLowerCase();
    let response;

    // Check if this matches a pre-scripted response pattern
    const hasPreScriptedResponse =
      lowerContent.includes('network') ||
      lowerContent.includes('route') ||
      lowerContent.includes('real-time weather') ||
      lowerContent.includes('live weather') ||
      lowerContent.includes('weather') ||
      lowerContent.includes('exposure');

    // Try to use live AI for custom questions if API key is available
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY ||
                   import.meta.env.ANTHROPIC_API_KEY ||
                   localStorage.getItem('anthropic_api_key');

    if (!hasPreScriptedResponse && apiKey) {
      try {
        // Use live Anthropic AI
        const aiResponse = await getAIAnalysis(content, apiKey);
        response = {
          type: 'ai-analysis',
          content: `**🤖 Live AI Response**\n\n${aiResponse.content}\n\n---\n*Powered by Claude ${aiResponse.model}*`,
          visualization: 'OperationsOverview'
        };
      } catch (error) {
        console.error('Anthropic API error:', error);
        // Fall back to enhanced mock response
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = getMockResponse(content);
      }
    } else if (!hasPreScriptedResponse) {
      // No API key - use enhanced mock responses
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
      response = getMockResponse(content);
    } else {
      // Use pre-scripted demo response for suggested questions
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
      response = getResponseForInput(content, demoStep);
    }

    addMessage(response);
    setIsTyping(false);

    return response;
  }, [addMessage, demoStep]);

  const triggerGreeting = useCallback(() => {
    sounds.notification();
    // Get a random greeting scenario
    const greeting = getRandomScenario(shiftStartScenarios);
    addMessage(greeting);
    setDemoStep('greeting');
  }, [addMessage]);

  const triggerDisruption = useCallback(() => {
    sounds.alert();
    // Get a random disruption scenario
    const disruption = getRandomDisruption();
    addMessage(disruption);
    setDemoStep('disruption');
  }, [addMessage]);

  const selectOption = useCallback((option) => {
    sounds.message();
    addMessage({ type: 'user', content: `[Selected: ${option.label}]` });
    setIsTyping(true);

    setTimeout(() => {
      sounds.success();
      addMessage(demoMessages.resolution);
      setIsTyping(false);
      setDemoStep('resolved');
    }, 1500);
  }, [addMessage]);

  const triggerShiftEnd = useCallback(() => {
    sounds.notification();
    // Get a random shift end scenario
    const shiftEnd = getRandomScenario(shiftEndScenarios);
    addMessage(shiftEnd);
    setDemoStep('shiftEnd');
  }, [addMessage]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setDemoStep('init');
  }, []);

  return {
    messages,
    isTyping,
    sendMessage,
    triggerGreeting,
    triggerDisruption,
    selectOption,
    triggerShiftEnd,
    clearMessages,
    demoStep
  };
};
