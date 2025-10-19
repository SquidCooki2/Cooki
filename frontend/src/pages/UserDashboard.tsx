import React, { useState } from "react";

const UserDashboard = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm Cooki, your virtual assistant." },
    { role: 'user', content: "Hey, I need some power to run Call of Duty right now." },
    { role: 'assistant', content: "Perfect, I'll get that going for you. Please hold on one moment.", loading: true }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }]);
      setInput('');
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "I'm processing your request. This will just take a moment!",
          loading: false
        }]);
      }, 1000);
    }
  };

  return (
    <div style={{
      marginLeft: '270px',
      minHeight: '100vh',
      background: '#fff',
      padding: '2.5rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      paddingRight: '2.5rem',
      width: 'calc(100vw - 270px)',
      boxSizing: 'border-box'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        color: '#2d2d3a',
        fontWeight: '700',
        marginBottom: '1.5rem',
        marginTop: 0
      }}>Cooki Virtual Assistant</h1>

      {/* Chat Container */}
      <div style={{
        background: 'linear-gradient(135deg, #5a4668 0%, #8b5d9e 50%, #c9527b 100%)',
        borderRadius: '24px',
        padding: '3rem',
        minHeight: 'calc(100vh - 250px)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 10px 40px rgba(90, 70, 104, 0.4)',
        width: '100%'
      }}>
        {/* Messages Area */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          marginBottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                width: '100%'
              }}
            >
              <div style={{
                background: msg.role === 'user' 
                  ? 'rgba(201, 82, 123, 0.8)' 
                  : 'rgba(168, 85, 211, 0.6)',
                color: '#fff',
                padding: '1.25rem 1.75rem',
                borderRadius: '20px',
                maxWidth: '60%',
                fontSize: '1.05rem',
                lineHeight: '1.5',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
              }}>
                {msg.content}
                {msg.loading && (
                  <div style={{
                    marginTop: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      border: '3px solid rgba(255, 255, 255, 0.3)',
                      borderTop: '3px solid #fff',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center'
        }}>
          <div style={{
            flex: 1,
            background: 'rgba(168, 85, 211, 0.4)',
            borderRadius: '30px',
            padding: '0.5rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)'
          }}>
            <span style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '1.25rem',
              marginRight: '0.75rem'
            }}>+</span>
            <input
              type="text"
              placeholder="Describe what you need to compute..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#fff',
                fontSize: '1.05rem',
                padding: '1rem 0',
                fontFamily: 'inherit'
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </div>
  );
};

export default UserDashboard;