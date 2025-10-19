import React from "react";

const ProviderDashboard = () => {
  return (
    <div style={{
      marginLeft: '270px',
      minHeight: '100vh',
      background: '#fff',
      padding: '2.5rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      paddingRight: '2.5rem'
    }}>
      {/* Top Section - Your GPU and Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.8fr 1fr',
        gap: '1.5rem',
        marginBottom: '2.5rem'
      }}>
        {/* Left Column - Your GPU */}
        <div>
          <h2 style={{
            fontSize: '2.25rem',
            color: '#2d2d3a',
            fontWeight: '700',
            marginBottom: '1.25rem',
            marginTop: 0
          }}>Your GPU</h2>

          <div style={{
            background: 'linear-gradient(135deg, #7c5b93 0%, #9370a8 100%)',
            borderRadius: '16px',
            padding: '2.5rem',
            color: '#fff',
            boxShadow: '0 8px 24px rgba(107, 77, 138, 0.3)'
          }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              margin: '0 0 0.5rem 0'
            }}>NVIDIA RTX 4090</h1>
            <p style={{
              fontSize: '1.05rem',
              margin: '0 0 0.25rem 0',
              opacity: '0.95'
            }}>24GB VRAM · 16,384 CUDA</p>
            <p style={{
              fontSize: '1.05rem',
              margin: '0',
              opacity: '0.95'
            }}>Base Clock: 2.23 GHz · Boost: 2.52 GHz</p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              marginTop: '2rem'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{
                  fontSize: '0.875rem',
                  marginBottom: '0.5rem',
                  opacity: '0.9'
                }}>Status</div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '600'
                }}>Running Job</div>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{
                  fontSize: '0.875rem',
                  marginBottom: '0.5rem',
                  opacity: '0.9'
                }}>GPU Usage</div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '600'
                }}>95%</div>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{
                  fontSize: '0.875rem',
                  marginBottom: '0.5rem',
                  opacity: '0.9'
                }}>Temperature</div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '600'
                }}>78°C</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Stats Cards (Top 4) */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          paddingTop: '4.5rem'
        }}>
          {/* Total Earned */}
          <div style={{
            background: '#2d2d3a',
            borderRadius: '16px',
            padding: '1.75rem',
            color: '#fff'
          }}>
            <div style={{ fontSize: '0.875rem', opacity: '0.7', marginBottom: '0.5rem' }}>Total Earned</div>
            <div style={{ fontSize: '2.75rem', fontWeight: '700', marginBottom: '0.25rem', lineHeight: 1 }}>$30.24</div>
            <div style={{ color: '#4ade80', fontSize: '0.875rem', fontWeight: '500' }}>+12% this week</div>
          </div>

          {/* Jobs Completed */}
          <div style={{
            background: '#2d2d3a',
            borderRadius: '16px',
            padding: '1.75rem',
            color: '#fff'
          }}>
            <div style={{ fontSize: '0.875rem', opacity: '0.7', marginBottom: '0.5rem' }}>Jobs Completed</div>
            <div style={{ fontSize: '2.75rem', fontWeight: '700', lineHeight: 1 }}>134</div>
          </div>

          {/* Uptime */}
          <div style={{
            background: '#2d2d3a',
            borderRadius: '16px',
            padding: '1.75rem',
            color: '#fff'
          }}>
            <div style={{ fontSize: '0.875rem', opacity: '0.7', marginBottom: '0.5rem' }}>Uptime</div>
            <div style={{ fontSize: '2.75rem', fontWeight: '700', lineHeight: 1 }}>94.2%</div>
          </div>

          {/* Rating */}
          <div style={{
            background: '#2d2d3a',
            borderRadius: '16px',
            padding: '1.75rem',
            color: '#fff'
          }}>
            <div style={{ fontSize: '0.875rem', opacity: '0.7', marginBottom: '0.5rem' }}>Rating</div>
            <div style={{ 
              fontSize: '2.75rem', 
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              lineHeight: 1
            }}>
              4.9 <span style={{ fontSize: '2rem' }}>⭐</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Current Job and Recent Jobs side by side */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.8fr 1fr',
        gap: '1.5rem'
      }}>
        {/* Left Column - Current Job and Recent Jobs */}
        <div>
          {/* Current Job */}
          <h2 style={{
            fontSize: '2.25rem',
            color: '#2d2d3a',
            fontWeight: '700',
            marginBottom: '1.25rem',
            marginTop: 0
          }}>Current Job</h2>

          <div style={{
            background: '#2d2d3a',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2.5rem',
            color: '#fff'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '2rem',
              marginBottom: '1.75rem'
            }}>
              <div>
                <div style={{ fontSize: '0.875rem', opacity: '0.7', marginBottom: '0.5rem' }}>Job ID</div>
                <div style={{ fontSize: '1.125rem', fontWeight: '500' }}>J-8067</div>
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', opacity: '0.7', marginBottom: '0.5rem' }}>Type</div>
                <div style={{ fontSize: '1.125rem', fontWeight: '500' }}>ML Training</div>
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', opacity: '0.7', marginBottom: '0.5rem' }}>Time Elapsed</div>
                <div style={{ fontSize: '1.125rem', fontWeight: '500' }}>2hr 24min</div>
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', opacity: '0.7', marginBottom: '0.5rem' }}>Earnings</div>
                <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#4ade80' }}>$6.23</div>
              </div>
            </div>

            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.5rem'
              }}>
                <span style={{ fontSize: '0.875rem', opacity: '0.7' }}>Progress</span>
                <span style={{ fontSize: '0.875rem', opacity: '0.7' }}>52%</span>
              </div>
              <div style={{
                width: '100%',
                height: '10px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '5px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '52%',
                  height: '100%',
                  background: 'linear-gradient(90deg, #a855f7 0%, #ec4899 100%)',
                  borderRadius: '5px'
                }}></div>
              </div>
            </div>
          </div>

          {/* Recent Jobs */}
          <h2 style={{
            fontSize: '2.25rem',
            color: '#2d2d3a',
            fontWeight: '700',
            marginBottom: '1.25rem',
            marginTop: 0
          }}>Recent Jobs</h2>

          <div style={{
            background: '#2d2d3a',
            borderRadius: '16px',
            padding: '2rem'
          }}>
            {[
              { id: 'J-8045', type: 'ML Training', duration: '3hr 38min', earned: '$13.39', rating: 5 },
              { id: 'J-7892', type: 'ML Training', duration: '2hr 15min', earned: '$8.75', rating: 5 },
              { id: 'J-7654', type: 'Rendering', duration: '1hr 45min', earned: '$5.20', rating: 4 }
            ].map((job, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '80px 1.5fr 1fr 1fr 140px',
                alignItems: 'center',
                gap: '1.5rem',
                padding: '1.5rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                marginBottom: i < 2 ? '1rem' : '0'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #6b4d8a, #8b5da8)',
                  borderRadius: '8px'
                }}></div>
                <div style={{ color: '#fff' }}>
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem', fontSize: '1.05rem' }}>{job.type}</div>
                  <div style={{ fontSize: '0.875rem', opacity: '0.6' }}>{job.id}</div>
                </div>
                <div style={{ color: '#fff' }}>
                  <div style={{ fontSize: '0.8rem', opacity: '0.6', marginBottom: '0.25rem' }}>Duration</div>
                  <div style={{ fontSize: '0.95rem' }}>{job.duration}</div>
                </div>
                <div style={{ color: '#fff' }}>
                  <div style={{ fontSize: '0.8rem', opacity: '0.6', marginBottom: '0.25rem' }}>Earned</div>
                  <div style={{ color: '#4ade80', fontWeight: '600', fontSize: '0.95rem' }}>{job.earned}</div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '1.25rem', letterSpacing: '2px' }}>
                  {'⭐'.repeat(job.rating)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Empty space to align with stats cards above */}
        <div></div>
      </div>
    </div>
  );
};

export default ProviderDashboard;