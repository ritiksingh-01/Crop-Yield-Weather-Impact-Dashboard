import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, AlertCircle, Settings } from 'lucide-react';
import OpenAI from 'openai';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Hi there! I\'m your agricultural AI assistant, ready to help with all your farming questions. Whether you need advice on crop yields, weather impacts, pest management, or sustainable farming practices, I\'m here to provide practical, actionable insights. What would you like to know about today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiConfig, setApiConfig] = useState({
    apiKey: import.meta.env.VITE_GROQ_API_KEY || '',
    model: import.meta.env.VITE_DEFAULT_AI_MODEL || 'llama-3.1-8b-instant'
  });
  const [showApiConfig, setShowApiConfig] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load API config from localStorage
  useEffect(() => {
    const savedConfig = localStorage.getItem('chatApiConfig');
    if (savedConfig) {
      setApiConfig(JSON.parse(savedConfig));
    }
  }, []);

  // Save API config to localStorage
  const saveApiConfig = (config) => {
    setApiConfig(config);
    localStorage.setItem('chatApiConfig', JSON.stringify(config));
  };

  // Call Groq AI API
  const callChatAPI = async (userMessage) => {
    try {
      return await callGroq(userMessage);
    } catch (error) {
      console.error('Groq API Error:', error);
      return `Sorry, I encountered an error: ${error.message}. Please check your Groq API configuration.`;
    }
  };

  // Groq API integration using OpenAI client
  const callGroq = async (userMessage) => {
    if (!apiConfig.apiKey) {
      throw new Error('Groq API key not configured');
    }

    const systemPrompt = `You are an AI agricultural assistant specializing in crop yield predictions, weather impact analysis, farming recommendations, and agricultural best practices.

RESPONSE STYLE:
- Be conversational and friendly, like talking to a knowledgeable farming expert
- Keep responses concise but informative (2-4 sentences typically)
- Use natural language, avoid numbered lists unless specifically asked
- Focus on practical, actionable advice
- Ask follow-up questions to continue the conversation
- If the user asks about multiple topics, prioritize the most relevant one and offer to discuss others

EXPERTISE AREAS:
- Crop yield predictions and analysis
- Weather impact on agriculture
- Farming best practices and recommendations
- Pest and disease management
- Soil health and fertility
- Irrigation and water management
- Sustainable farming methods

Always provide specific, practical advice rather than generic information.`;

    try {
      // Initialize OpenAI client with Groq configuration
      const client = new OpenAI({
        apiKey: apiConfig.apiKey,
        baseURL: "https://api.groq.com/openai/v1",
        dangerouslyAllowBrowser: true // Required for client-side usage
      });

      const response = await client.chat.completions.create({
        model: apiConfig.model || 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        max_tokens: 1000,
        temperature: 0.7,
        stream: false
      });

      return response.choices[0]?.message?.content || 'No response received';
    } catch (error) {
      console.error('Groq API Error:', error);
      throw new Error(`Groq API error: ${error.message}`);
    }
  };  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Call real AI API
      const aiResponseContent = await callChatAPI(userMessage.content);
      
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponseContent,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      // Fallback to simulated response if API fails
      const fallbackResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: `I apologize, but I'm having trouble connecting to the AI service. Please check your API configuration in settings. Here's a general response: ${generateFallbackResponse(userMessage.content)}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback response generator (simplified version of the original)
  const generateFallbackResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('crop yield') || lowerMessage.includes('yield prediction')) {
      return "Consider factors like rainfall distribution, temperature variations, and soil moisture levels for crop yield predictions.";
    } else if (lowerMessage.includes('weather') || lowerMessage.includes('climate')) {
      return "Weather plays a crucial role in agricultural productivity. Monitor precipitation patterns and temperature variations.";
    } else {
      return "I'm here to help with agricultural questions. Please ensure your API is configured for more detailed responses.";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'ai',
        content: 'Hi there! I\'m your agricultural AI assistant, ready to help with all your farming questions. Whether you need advice on crop yields, weather impacts, pest management, or sustainable farming practices, I\'m here to provide practical, actionable insights. What would you like to know about today?',
        timestamp: new Date()
      }
    ]);
  };

  // API Configuration Component
  const ApiConfigModal = () => {
    const [localConfig, setLocalConfig] = useState(apiConfig);

    const handleSave = () => {
      saveApiConfig(localConfig);
      setShowApiConfig(false);
    };

    if (!showApiConfig) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Groq API Configuration</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                API Key
                <span className="text-xs text-blue-600 dark:text-blue-400 ml-1">
                  (From .env file)
                </span>
              </label>
              <input
                type="password"
                value={localConfig.apiKey}
                onChange={(e) => setLocalConfig({...localConfig, apiKey: e.target.value})}
                placeholder="Enter your Groq API key or use .env"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Groq API keys can be obtained from console.groq.com. For security, add VITE_GROQ_API_KEY to your .env file.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Model
              </label>
              <select
                value={localConfig.model}
                onChange={(e) => setLocalConfig({...localConfig, model: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="llama-3.1-8b-instant">Llama 3.1 8B Instant - Ultra Fast ⚡</option>
                <option value="llama-3.1-70b-versatile">Llama 3.1 70B Versatile - Best Quality ⭐</option>
                <option value="llama-3.2-3b-preview">Llama 3.2 3B Preview - Lightweight</option>
                <option value="llama-3.2-11b-vision-preview">Llama 3.2 11B Vision - Multi-modal</option>
                <option value="gemma2-9b-it">Gemma2 9B IT - Google's Latest</option>
                <option value="mixtral-8x7b-32768">Mixtral 8x7B - Long Context (if available)</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => setShowApiConfig(false)}
              className="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-md transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  const suggestedQuestions = [
    "How can I improve my rice crop yield this season?",
    "What should I watch for with the upcoming weather changes?",
    "How do I identify and treat common crop pests?",
    "What's the best irrigation schedule for wheat in dry conditions?",
    "How can I improve my soil health naturally?"
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <ApiConfigModal />
      
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Agricultural Assistant</h1>
          <p className="text-gray-600 dark:text-gray-300">Get instant help with farming and crop-related questions</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowApiConfig(true)}
            className="px-4 py-2 text-sm bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 rounded-lg transition-colors flex items-center gap-2"
          >
            <Settings size={16} />
            API Settings
          </button>
          <button
            onClick={clearChat}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
          >
            Clear Chat
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 py-4 min-h-0">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start gap-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-green-500 text-white'
                }`}>
                  {message.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                
                {/* Message Content */}
                <div className={`rounded-lg px-4 py-3 ${
                  message.type === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white'
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start gap-3 max-w-3xl">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                  <Bot size={16} />
                </div>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-gray-500 dark:text-gray-400" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">AI is thinking...</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggested Questions */}
      {messages.length <= 1 && (
        <div className="px-6 py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Try asking about:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(question)}
                  className="px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about crop yields, weather impact, farming techniques, or any agricultural questions..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
                disabled={isLoading}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Send size={18} />
              Send
            </button>
          </div>
          
          {/* Info */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <AlertCircle size={14} />
              <span>This AI assistant provides general agricultural guidance. For specific issues, consult with local agricultural experts.</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className={`w-2 h-2 rounded-full ${apiConfig.apiKey ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-gray-500 dark:text-gray-400">
                {apiConfig.apiKey ? 'Groq Connected' : 'API Not Configured'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;