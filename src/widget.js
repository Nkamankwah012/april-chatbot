// Simple widget entry point
console.log('April Chatbot Widget Loaded');

// Create and append the iframe
const iframe = document.createElement('iframe');
iframe.src = 'https://april-chatbot.lovable.app';
iframe.style.position = 'fixed';
iframe.style.bottom = '20px';
iframe.style.right = '20px';
iframe.style.width = '400px';
iframe.style.height = '600px';
iframe.style.border = 'none';
iframe.style.borderRadius = '10px';
iframe.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
iframe.style.zIndex = '9999';

document.body.appendChild(iframe);
