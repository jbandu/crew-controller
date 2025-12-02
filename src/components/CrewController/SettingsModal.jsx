import { useState, useEffect } from 'react';
import { X, Key, Volume2, VolumeX } from 'lucide-react';
import { sounds } from '../../utils/sounds';

const SettingsModal = ({ isOpen, onClose, onSave }) => {
  const [apiKey, setApiKey] = useState('');
  const [aiMode, setAiMode] = useState('demo');
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    // Load saved settings from localStorage
    const savedApiKey = localStorage.getItem('anthropic_api_key') || '';
    const savedAiMode = localStorage.getItem('ai_mode') || 'demo';
    const savedSoundEnabled = localStorage.getItem('sound_enabled') !== 'false';

    setApiKey(savedApiKey);
    setAiMode(savedAiMode);
    setSoundEnabled(savedSoundEnabled);
  }, [isOpen]);

  const handleSave = () => {
    localStorage.setItem('anthropic_api_key', apiKey);
    localStorage.setItem('ai_mode', aiMode);
    localStorage.setItem('sound_enabled', soundEnabled.toString());

    sounds.toggle(soundEnabled);

    onSave({
      apiKey,
      aiMode,
      soundEnabled
    });

    onClose();
  };

  const handleToggleSound = () => {
    const newValue = !soundEnabled;
    setSoundEnabled(newValue);
    sounds.toggle(newValue);
    if (newValue) {
      sounds.notification();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-bg-card border border-white/20 rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Settings</h2>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* AI Mode Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-white mb-3">AI Mode</label>
          <div className="space-y-2">
            <label className="flex items-center gap-3 p-3 bg-bg-elevated rounded-lg cursor-pointer hover:bg-bg-card transition-colors">
              <input
                type="radio"
                name="aiMode"
                value="demo"
                checked={aiMode === 'demo'}
                onChange={(e) => setAiMode(e.target.value)}
                className="w-4 h-4"
              />
              <div className="flex-1">
                <div className="text-white font-medium">Demo Mode</div>
                <div className="text-sm text-text-muted">Pre-scripted responses for demonstration</div>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 bg-bg-elevated rounded-lg cursor-pointer hover:bg-bg-card transition-colors">
              <input
                type="radio"
                name="aiMode"
                value="live"
                checked={aiMode === 'live'}
                onChange={(e) => setAiMode(e.target.value)}
                className="w-4 h-4"
              />
              <div className="flex-1">
                <div className="text-white font-medium">Live AI Mode</div>
                <div className="text-sm text-text-muted">Real Claude API responses (requires API key)</div>
              </div>
            </label>
          </div>
        </div>

        {/* API Key Input */}
        {aiMode === 'live' && (
          <div className="mb-6">
            <label className="block text-sm font-semibold text-white mb-2">
              <Key size={16} className="inline mr-2" />
              Anthropic API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-ant-api03-..."
              className="w-full bg-bg-elevated border border-white/10 rounded-lg px-4 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-blue transition-colors"
            />
            <p className="text-xs text-text-muted mt-2">
              Get your API key from{' '}
              <a
                href="https://console.anthropic.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-blue hover:underline"
              >
                console.anthropic.com
              </a>
            </p>
          </div>
        )}

        {/* Sound Toggle */}
        <div className="mb-6">
          <label className="flex items-center justify-between p-3 bg-bg-elevated rounded-lg cursor-pointer hover:bg-bg-card transition-colors">
            <div className="flex items-center gap-3">
              {soundEnabled ? <Volume2 size={20} className="text-accent-blue" /> : <VolumeX size={20} className="text-text-muted" />}
              <div>
                <div className="text-white font-medium">Sound Effects</div>
                <div className="text-sm text-text-muted">Enable notification sounds</div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleToggleSound}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                soundEnabled ? 'bg-accent-blue' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  soundEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </label>
        </div>

        {/* Save Button */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-bg-elevated hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-accent-blue hover:bg-blue-600 text-white rounded-lg transition-colors font-semibold"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
