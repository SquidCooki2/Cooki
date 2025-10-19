import React, { useState } from "react";

const Wallet: React.FC = () => {
  const [customAmount, setCustomAmount] = useState<string>("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const presetAmounts = [10, 25, 50, 100, 200];

  const calculateBonus = (amount: number): number => {
    if (amount >= 200) return amount * 0.15;
    if (amount >= 100) return amount * 0.10;
    return 0;
  };

  const currentAmount = selectedAmount || parseFloat(customAmount) || 0;
  const bonus = calculateBonus(currentAmount);
  const totalCredits = currentAmount + bonus;

  const handleCheckout = () => {
    if (currentAmount > 0) {
      alert(`Processing payment of $${currentAmount.toFixed(2)}\nBonus: $${bonus.toFixed(2)}\nTotal Credits: $${totalCredits.toFixed(2)}`);
      // Reset after checkout
      setSelectedAmount(null);
      setCustomAmount("");
    }
  };

  return (
    <div style={{
      marginLeft: '270px',
      minHeight: '100vh',
      background: '#fff',
      padding: '2.5rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#2d2d3a'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        color: '#2d2d3a',
        fontWeight: '700',
        marginBottom: '2rem',
        marginTop: 0
      }}>Wallet</h1>

      {/* Top Section: Balance + Monthly Invoices */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {/* Available Balance Card */}
        <div style={{
          background: 'linear-gradient(135deg, #6b4d8a 0%, #8b5da8 100%)',
          borderRadius: '20px',
          padding: '2.5rem',
          boxShadow: '0 8px 24px rgba(107, 77, 138, 0.3)'
        }}>
          <div style={{
            fontSize: '1.125rem',
            marginBottom: '1rem',
            opacity: 0.9,
            color: '#fff'
          }}>Available Balance</div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <div style={{
              fontSize: '4.5rem',
              fontWeight: '700',
              lineHeight: 1,
              color: '#fff'
            }}>$145.50</div>
            
            <div style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              padding: '1.25rem 1.5rem',
              borderRadius: '16px',
              textAlign: 'right',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{
                fontSize: '0.875rem',
                opacity: 0.8,
                marginBottom: '0.5rem',
                color: '#fff'
              }}>This Month</div>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                lineHeight: 1,
                color: '#fff'
              }}>$73.15</div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '1rem'
          }}>
            <button style={{
              flex: 1,
              padding: '1rem',
              background: 'rgba(168, 85, 211, 0.5)',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '1.125rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}>
              Withdraw
            </button>
            <button style={{
              flex: 1,
              padding: '1rem',
              background: 'rgba(138, 93, 168, 0.5)',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '1.125rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}>
              Export
            </button>
          </div>
        </div>

        {/* Monthly Invoices Card */}
        <div style={{
          background: '#2d2d3a',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 8px 24px rgba(45, 45, 58, 0.3)',
          border: '2px solid #00a8ff'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            margin: '0 0 1.5rem 0',
            color: '#fff'
          }}>Monthly Invoices</h2>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {[
              { month: 'October 2024', amount: 127.45 },
              { month: 'September 2024', amount: 192.89 },
              { month: 'April 2024', amount: 121.05 }
            ].map((invoice, idx) => (
              <div key={idx} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                background: 'rgba(107, 77, 138, 0.2)',
                borderRadius: '12px',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}>
                <div>
                  <div style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    marginBottom: '0.25rem',
                    color: '#fff'
                  }}>{invoice.month}</div>
                  <div style={{
                    fontSize: '1rem',
                    color: '#a855f7'
                  }}>${invoice.amount}</div>
                </div>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(168, 85, 211, 0.3)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  color: '#fff'
                }}>↓</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Add Credits + Payment Methods */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr',
        gap: '1.5rem'
      }}>
        {/* Add Credits Section */}
        <div>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            margin: '0 0 1.5rem 0',
            color: '#2d2d3a'
          }}>Add Credits</h2>

          <div style={{
            background: '#2d2d3a',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#fff'
            }}>Select Amount</div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '0.75rem',
              marginBottom: '2rem'
            }}>
              {presetAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount("");
                  }}
                  style={{
                    padding: '1rem',
                    background: selectedAmount === amount 
                      ? 'rgba(168, 85, 211, 0.8)' 
                      : 'rgba(107, 77, 138, 0.5)',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  ${amount}
                </button>
              ))}
            </div>

            <div style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              marginBottom: '0.75rem',
              color: '#fff'
            }}>Or Enter Custom Amount</div>

            <div style={{
              position: 'relative'
            }}>
              <span style={{
                position: 'absolute',
                left: '1.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '1.5rem',
                fontWeight: '700',
                color: 'rgba(255, 255, 255, 0.5)'
              }}>$</span>
              <input
                type="number"
                placeholder="Enter Custom Amount"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                style={{
                  width: '100%',
                  padding: '1.25rem 1.5rem 1.25rem 3rem',
                  background: 'rgba(138, 93, 168, 0.3)',
                  border: '1px solid rgba(168, 85, 211, 0.3)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '1.125rem',
                  outline: 'none',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* Bonus Credits Card */}
          <div style={{
            background: 'linear-gradient(135deg, #4a3a5a 0%, #5a4a6a 100%)',
            borderRadius: '20px',
            padding: '2rem',
            border: '2px solid rgba(168, 85, 211, 0.3)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <span style={{
                fontSize: '1.5rem',
                marginRight: '0.75rem'
              }}>🎁</span>
              <span style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#fff'
              }}>Bonus Credits!</span>
            </div>

            <p style={{
              fontSize: '0.95rem',
              opacity: 0.8,
              marginBottom: '1.5rem',
              color: '#fff',
              margin: '0 0 1.5rem 0'
            }}>
              Add $100+ and get 10% bonus • Add $200+ and get 15% bonus
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1.5rem',
              padding: '1.5rem',
              background: 'rgba(107, 77, 138, 0.2)',
              borderRadius: '12px',
              marginBottom: '1.5rem'
            }}>
              <div>
                <div style={{
                  fontSize: '0.875rem',
                  opacity: 0.7,
                  marginBottom: '0.5rem',
                  color: '#fff'
                }}>Amount</div>
                <div style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#fff'
                }}>${currentAmount.toFixed(2)}</div>
              </div>
              <div>
                <div style={{
                  fontSize: '0.875rem',
                  opacity: 0.7,
                  marginBottom: '0.5rem',
                  color: '#fff'
                }}>Bonus</div>
                <div style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#fbbf24'
                }}>${bonus.toFixed(2)}</div>
              </div>
              <div>
                <div style={{
                  fontSize: '0.875rem',
                  opacity: 0.7,
                  marginBottom: '0.5rem',
                  color: '#fff'
                }}>Total Credits</div>
                <div style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#4ade80'
                }}>${totalCredits.toFixed(2)}</div>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={currentAmount === 0}
              style={{
                width: '100%',
                padding: '1.25rem',
                background: currentAmount > 0 
                  ? 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' 
                  : 'rgba(107, 77, 138, 0.3)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '1.25rem',
                fontWeight: '700',
                cursor: currentAmount > 0 ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
                opacity: currentAmount > 0 ? 1 : 0.5
              }}
            >
              {currentAmount > 0 
                ? `Checkout - $${totalCredits.toFixed(2)}` 
                : 'Select Amount to Checkout'}
            </button>
          </div>
        </div>

        {/* Payment Methods Section */}
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              margin: 0,
              color: '#2d2d3a'
            }}>Payment Methods</h2>
            <button style={{
              padding: '0.5rem 1rem',
              background: 'transparent',
              border: 'none',
              color: '#a855f7',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ fontSize: '1.25rem' }}>+</span> Add New
            </button>
          </div>

          {/* Single Payment Methods Container */}
          <div style={{
            background: '#2d2d3a',
            borderRadius: '20px',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            {[
              { type: 'Visa', lastFour: '42', expiry: '12/26', isDefault: true },
              { type: 'Mastercard', lastFour: '58', expiry: '01/32', isDefault: false }
            ].map((method, idx) => (
              <div key={idx} style={{
                background: 'rgba(138, 93, 168, 0.3)',
                borderRadius: '16px',
                padding: '1.75rem',
                border: '1px solid rgba(168, 85, 211, 0.3)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: 'rgba(168, 85, 211, 0.3)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>💳</div>
                    <div>
                      <div style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        marginBottom: '0.25rem',
                        color: '#fff'
                      }}>{method.type}</div>
                      <div style={{
                        fontSize: '0.95rem',
                        opacity: 0.8,
                        marginBottom: '0.25rem',
                        color: '#fff'
                      }}>••••{method.lastFour}</div>
                      <div style={{
                        fontSize: '0.85rem',
                        opacity: 0.6,
                        color: '#fff'
                      }}>Expires {method.expiry}</div>
                    </div>
                  </div>
                  {method.isDefault && (
                    <div style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(168, 85, 211, 0.6)',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      color: '#fff'
                    }}>Default</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
        input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
        button:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(168, 85, 211, 0.4);
        }
      `}</style>
    </div>
  );
};

export default Wallet;