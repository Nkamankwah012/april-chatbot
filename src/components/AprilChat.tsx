import { useEffect, useState } from 'react';

export default function AprilChat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Wait for Botpress to load
    const checkBotpress = setInterval(() => {
      if (window.botpressWebChat) {
        clearInterval(checkBotpress);

        // Initialize with HIDE WIDGET + correct config
        window.botpressWebChat.init({
          botId: '4bc55b81-20c1-4907-95e8-b4eb5cc763ab',
          hostUrl: 'https://cdn.botpress.cloud/webchat/v3.3',
          messagingUrl: 'https://messaging.botpress.cloud',
          clientId: '7a37af73-17ed-43ef-895a-1d77238c02e7',
          hideWidget: true, // 👈 Hides default floating widget
        });

        // Listen for bot replies
        window.botpressWebChat.onEvent((event) => {
          if (event.type === 'MESSAGE.RECEIVED') {
            setMessages(prev => [...prev, { type: 'bot', text: event.text }]);
          }
        }, ['MESSAGE.RECEIVED']);
      }
    }, 500);

    return () => clearInterval(checkBotpress);
  }, []);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setMessages(prev => [...prev, { type: 'user', text: inputValue }]);

    window.botpressWebChat?.sendEvent({
      type: 'MESSAGE',
      text: inputValue,
    });

    setInputValue('');
  };

  const handleRefresh = () => {
    setMessages([]);
    window.botpressWebChat?.sendEvent({ type: 'RESET_SESSION' });
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <div style={{ 
        height: 400, 
        border: '1px solid #ccc', 
        padding: 10, 
        overflowY: 'auto',
        marginBottom: 10
      }}>
        {messages.map((msg, i) => (
          <div 
            key={i} 
            style={{ 
              textAlign: msg.type === 'user' ? 'right' : 'left',
              color: msg.type === 'bot' ? '#004080' : '#000'
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', marginBottom: 10 }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={handleSend} style={{ marginLeft: 8 }}>Send</button>
      </div>

      <button onClick={handleRefresh} style={{ padding: 6 }}>
        🔄 Refresh Chat
      </button>
    </div>
  );
}