import React from "react";

const Home: React.FC = () => {
  return (
    <div className="home-bg page-container">
      {/* Light beams */}
      {[0, 0.5, 1, 1.5, 2, 0.3, 1.2, 1.8].map((delay, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: "3px",
            height: "100%",
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
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "3rem",
          padding: "4rem",
          filter: "brightness(0.7)",
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
              animation: "gpuFloat 6s ease-in-out infinite",
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
              {i === 1 ? "AORUS" : "GIGABYTE"}
            </div>
          </div>
        ))}
      </div>
      {/* Centered Text Overlay */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          color: "#fff",
          fontSize: "2rem",
          fontWeight: "bold",
          textShadow: "0 2px 8px rgba(0,0,0,0.5)",
          zIndex: 10,
        }}
      >
        Just Describe your Task
      </div>
    </div>
  );
};

export default Home;
