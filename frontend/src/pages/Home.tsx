import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      navigate('/user-dashboard');
    }, 800);
  };

  return (
    <div style={{
      position: 'fixed',
      left: '270px',
      top: 0,
      right: 0,
      bottom: 0,
      background: '#25223F',
      overflow: 'hidden'
    }}>
      {[0, 0.5, 1, 1.5, 2, 0.3, 1.2, 1.8].map((delay, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: "3px",
            height: "100%",
            top: 0,
            background:
              i % 2 === 0
                ? "linear-gradient(180deg, transparent 0%, rgba(186, 85, 211, 0.6) 20%, rgba(138, 43, 226, 0.4) 50%, rgba(186, 85, 211, 0.6) 80%, transparent 100%)"
                : "linear-gradient(180deg, transparent, rgba(255, 140, 0, 0.4), transparent)",
            left: `${15 + i * 10}%`,
            animation: "beam 3s ease-in-out infinite",
            animationDelay: `${delay}s`,
            opacity: 0.6,
          }}
        />
      ))}

      {/* GPU Cards Background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "3rem",
          filter: isAnimating ? "brightness(1.5) blur(10px)" : "brightness(0.7)",
          transition: "all 0.8s ease",
        }}
      >
        {[
          { rotate: "-15deg", delay: "0s", scale: 1 },
          { rotate: "0deg", delay: "-2s", scale: 1.15 },
          { rotate: "15deg", delay: "-4s", scale: 1 },
        ].map((gpu, i) => (
          <div
            key={i}
            style={{
              width: "280px",
              height: "420px",
              background:
                i === 1
                  ? "linear-gradient(135deg, rgba(186, 85, 211, 0.2), rgba(138, 43, 226, 0.2))"
                  : "linear-gradient(135deg, rgba(147, 112, 219, 0.15), rgba(138, 43, 226, 0.15))",
              borderRadius: "12px",
              border:
                i === 1
                  ? "2px solid rgba(186, 85, 211, 0.5)"
                  : "2px solid rgba(147, 112, 219, 0.3)",
              position: "relative",
              transform: `perspective(800px) rotateY(${gpu.rotate}) scale(${gpu.scale})`,
              boxShadow:
                i === 1
                  ? "0 0 60px rgba(186, 85, 211, 0.5), 0 0 120px rgba(138, 43, 226, 0.3)"
                  : "0 0 40px rgba(147, 112, 219, 0.3), 0 0 80px rgba(138, 43, 226, 0.2)",
              animation: `gpuFloat${i} 6s ease-in-out infinite`,
              animationDelay: gpu.delay,
              zIndex: i === 1 ? 2 : 1,
            }}
          >
            {/* GPU Fans */}
            {[80, 180, 280].slice(0, i === 1 ? 2 : 3).map((top, j) => (
              <div
                key={j}
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(200, 160, 255, 0.3), rgba(147, 112, 219, 0.1))",
                  border: "2px solid rgba(186, 85, 211, 0.4)",
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  top: `${top}px`,
                }}
              />
            ))}

            {/* GPU Brand */}
            <div
              style={{
                position: "absolute",
                bottom: "30px",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "0.75rem",
                color: "rgba(255, 255, 255, 0.6)",
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              {/* add words to the bottom of the animated gpu */}
              {/* {i === 1 ? "cooki" : ""} */}
            </div>
          </div>
        ))}
      </div>

      {/* Centered Text Overlay */}
      <div
        onClick={handleClick}
        className={isAnimating ? "text-animating" : ""}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#fff",
          fontSize: "3rem",
          fontWeight: "bold",
          textShadow: "0 2px 8px rgba(0,0,0,0.1)",
          zIndex: 10,
          textAlign: 'center',
          whiteSpace: 'nowrap',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform, text-shadow',
          backfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'antialiased',
        }}
      >
        just describe the task
      </div>

      <style>{`
        @keyframes beam {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes gpuFloat0 {
          0%, 100% {
            transform: perspective(800px) rotateY(-15deg) scale(1) translateY(0px);
          }
          50% {
            transform: perspective(800px) rotateY(-15deg) scale(1) translateY(-20px);
          }
        }

        @keyframes gpuFloat1 {
          0%, 100% {
            transform: perspective(800px) rotateY(0deg) scale(1.15) translateY(0px);
          }
          50% {
            transform: perspective(800px) rotateY(0deg) scale(1.15) translateY(-20px);
          }
        }

        @keyframes gpuFloat2 {
          0%, 100% {
            transform: perspective(800px) rotateY(15deg) scale(1) translateY(0px);
          }
          50% {
            transform: perspective(800px) rotateY(15deg) scale(1) translateY(-20px);
          }
        }

        @keyframes textPulse {
          0% {
            transform: translate(-50%, -50%) scale(1) translateZ(0);
            text-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.5) translateZ(0);
            text-shadow: 
              0 0 30px rgba(186, 85, 211, 1),
              0 0 60px rgba(138, 43, 226, 0.8),
              0 0 90px rgba(186, 85, 211, 0.6);
          }
          100% {
            transform: translate(-50%, -50%) scale(1) translateZ(0);
            text-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
        }

        /* Hover effect */
        div[style*="cursor: pointer"]:hover:not(.text-animating) {
          transform: translate(-50%, -50%) scale(1.15) translateZ(0) !important;
          text-shadow: 
            0 0 20px rgba(186, 85, 211, 0.8),
            0 0 40px rgba(138, 43, 226, 0.6) !important;
        }

        /* Click animation */
        .text-animating {
          animation: textPulse 0.8s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
      `}</style>
    </div>
  );
};

export default Home;