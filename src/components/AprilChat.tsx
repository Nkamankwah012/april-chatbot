import { useEffect, useState } from 'react';

export default function AprilChat() {
  const [messages, setMessages] = useState([]);
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

    // Add user message to UI
    setMessages(prev => [...prev, { type: 'user', text: inputValue }]);

    // Send to Botpress
    window.botpressWebChat?.sendEvent({
      type: 'MESSAGE',
      text: inputValue,
    });

    setInputValue('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ 
        height: '400px', 
        border: '1px solid #ccc', 
        padding: '10px', 
        overflowY: 'auto',
        marginBottom: '10px'
      }}>
        {messages.map((msg, i) => (
          <div 
            key={i} 
            style={{ 
              textAlign: msg.type === 'user' ? 'right' : 'left',
              margin: '5px 0',
              fontWeight: msg.type === 'bot' ? 'bold' : 'normal',
              color: msg.type === 'bot' ? '#004080' : '#000'
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          style={{ flex: 1, padding: '8px', marginRight: '8px' }}
          placeholder="Type your message..."
        />
        <button onClick={handleSend} style={{ padding: '8px 16px' }}>
          Send
        </button>
      </div>
    </div>
  );
}