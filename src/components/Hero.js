import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from 'styled-components';

const HeroSection = styled.section`
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000919;
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(0, 9, 25, 0.2) 0%,
    rgba(0, 9, 25, 0.4) 100%
  );
`;

const Title = styled(motion.h1)`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 8.5rem;
  color: #fff;
  position: relative;
  z-index: 1;
  text-align: center;
  font-weight: 600;
  letter-spacing: -2px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 80px rgba(0, 0, 0, 0.1);
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 4.5rem;
    letter-spacing: -1px;
  }
`;

const Hero = () => {
  const canvasRef = useRef(null);
  const timelineRef = useRef(0);
  const animationFrameId = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animating = true;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawGrid = (time) => {
      const gridSize = 50;
      const offset = time % gridSize;
      
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 0.5;

      // Draw vertical lines
      for (let x = offset; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let y = offset; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    // Define all scene drawing functions first
    const drawFutureScene = (progress, x, y) => {
      // AI network effect
      const nodes = 6;
      const radius = 80;
      
      // Draw nodes
      for (let i = 0; i < nodes; i++) {
        const angle = (i / nodes) * Math.PI * 2;
        const nodeX = x + Math.cos(angle) * radius;
        const nodeY = y + Math.sin(angle) * radius;
        
        // Node glow
        const gradient = ctx.createRadialGradient(
          nodeX, nodeY, 0, nodeX, nodeY, 15
        );
        gradient.addColorStop(0, `rgba(0, 255, 255, ${progress * 0.8})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, 15, 0, Math.PI * 2);
        ctx.fill();
        
        // Connect nodes
        for (let j = i + 1; j < nodes; j++) {
          const angle2 = (j / nodes) * Math.PI * 2;
          const node2X = x + Math.cos(angle2) * radius;
          const node2Y = y + Math.sin(angle2) * radius;
          
          // Animated connection
          const connectionProgress = Math.sin((progress * Math.PI + i * 0.5) % Math.PI);
          ctx.strokeStyle = `rgba(255, 215, 0, ${connectionProgress * 0.3})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(nodeX, nodeY);
          ctx.lineTo(node2X, node2Y);
          ctx.stroke();
        }
      }

      // Central AI core
      const coreGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      coreGradient.addColorStop(0, `rgba(255, 255, 255, ${progress * 0.2})`);
      coreGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawRealEstateScene = (progress, x, y) => {
      const buildingWidth = 60;
      const buildingHeight = 100;
      const numBuildings = 3;
      const spacing = buildingWidth * 1.5;
      
      // Draw multiple buildings
      for (let i = 0; i < numBuildings; i++) {
        const buildingX = x + (i - 1) * spacing;
        const height = buildingHeight * (0.7 + i * 0.3);
        const buildingProgress = Math.max(0, Math.min(1, progress * 3 - i * 0.3));
        
        ctx.strokeStyle = `rgba(255, 215, 0, ${buildingProgress})`;
        ctx.lineWidth = 2;
        
        // Building outline
        ctx.beginPath();
        ctx.rect(buildingX - buildingWidth/2, 
                y + buildingHeight/2 - height * buildingProgress,
                buildingWidth, height * buildingProgress);
        ctx.stroke();
        
        // Windows
        if (buildingProgress > 0.5) {
          const windowProgress = (buildingProgress - 0.5) * 2;
          ctx.strokeStyle = `rgba(0, 255, 255, ${windowProgress * 0.8})`;
          for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 3; col++) {
              ctx.beginPath();
              ctx.rect(buildingX - buildingWidth/3 + col * buildingWidth/3,
                      y + buildingHeight/2 - height * 0.8 + row * height/6,
                      buildingWidth/5, height/8);
              ctx.stroke();
            }
          }
        }
      }
    };

    const drawEdTechScene = (progress, x, y) => {
      // Cracking effect
      const size = 100;
      ctx.strokeStyle = `rgba(255, 255, 255, ${progress})`;
      ctx.lineWidth = 2;

      // Draw EdTech symbol
      ctx.beginPath();
      ctx.moveTo(x - size/2, y - size/2);
      ctx.lineTo(x + size/2, y + size/2);
      ctx.moveTo(x + size/2, y - size/2);
      ctx.lineTo(x - size/2, y + size/2);
      ctx.stroke();

      // Fracture effect
      if (progress > 0.5) {
        const fractures = 6;
        const fractureProg = (progress - 0.5) * 2;
        for (let i = 0; i < fractures; i++) {
          const angle = (i / fractures) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(
            x + Math.cos(angle) * size * fractureProg,
            y + Math.sin(angle) * size * fractureProg
          );
          ctx.strokeStyle = `rgba(255, 0, 0, ${(1 - fractureProg) * 0.5})`;
          ctx.stroke();
        }
      }
    };

    const drawIPOScene = (progress, x, y) => {
      ctx.save();
      ctx.translate(x, y);
      
      // Stock chart background
      const chartWidth = 100;
      const chartHeight = 60;
      const chartX = -chartWidth/2;
      const chartY = -chartHeight/2;
      
      // Draw stock ticker display
      ctx.fillStyle = `rgba(0, 20, 40, ${progress * 0.8})`;
      ctx.fillRect(chartX, chartY - 20, chartWidth, 15);
      
      // Draw "SISU" ticker text
      ctx.font = '12px Arial';
      
      // Price calculation with rise and crash
      let price;
      let priceColor;
      if (progress < 0.4) {
        // Initial steady at $10
        price = 10;
        priceColor = `rgba(0, 255, 0, ${progress})`;
      } else if (progress < 0.6) {
        // Rise to $13
        const riseProgress = (progress - 0.4) / 0.2;
        price = 10 + (riseProgress * 3);
        priceColor = `rgba(0, 255, 0, ${progress})`;
      } else {
        // Crash to $2
        const crashProgress = (progress - 0.6) / 0.4;
        price = 13 - (crashProgress * 11);
        priceColor = `rgba(255, 0, 0, ${progress})`;
      }
      
      // Draw ticker and price
      ctx.fillStyle = priceColor;
      ctx.textAlign = 'left';
      ctx.fillText('SISU', chartX + 5, chartY - 8);
      ctx.fillText(`$${price.toFixed(2)}`, chartX + 60, chartY - 8);
      
      // Draw stock chart
      ctx.beginPath();
      ctx.moveTo(chartX, chartY + chartHeight);
      
      // Calculate Y position based on price range
      const getYPosition = (price) => {
        const minPrice = 2;
        const maxPrice = 13;
        const priceRange = maxPrice - minPrice;
        const normalizedPrice = (price - minPrice) / priceRange;
        return chartY + chartHeight * (1 - normalizedPrice * 0.8); // Use 80% of chart height
      };
      
      for (let i = 0; i <= 20; i++) {
        const t = i / 20;
        const x = chartX + t * chartWidth;
        let currentPrice;
        
        if (t < progress) {
          if (t < 0.4) {
            // Steady at $10
            currentPrice = 10;
          } 
          else if (t < 0.6) {
            // Rise to $13
            const riseProgress = (t - 0.4) / 0.2;
            currentPrice = 10 + (riseProgress * 3);
          }
          else {
            // Crash to $2
            const crashProgress = (t - 0.6) / 0.4;
            currentPrice = 13 - (crashProgress * 11);
            
            // Add volatility during crash
            currentPrice += Math.sin(t * 50) * 0.5 * crashProgress;
          }
          
          const y = getYPosition(currentPrice);
          
          // Color transition
          if (t < 0.6) {
            ctx.strokeStyle = `rgba(0, 255, 0, ${progress})`;
          } else {
            ctx.strokeStyle = `rgba(255, 0, 0, ${progress})`;
          }
          ctx.lineWidth = 2;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
      }
      ctx.stroke();
      
      ctx.restore();
    };

    const drawSISUGrowthScene = (progress, x, y) => {
      // Napkin sketch effect
      if (progress < 0.3) {
        const sketchProgress = progress / 0.3;
        ctx.strokeStyle = `rgba(255, 255, 255, ${sketchProgress})`;
        ctx.lineWidth = 1;
        
        // Draw rough sketch lines
        for (let i = 0; i < 5; i++) {
          const length = sketchProgress * 100;
          const lineY = y - 50 + i * 10;
          ctx.beginPath();
          ctx.moveTo(x - length/2 + Math.random() * 5, lineY + Math.random() * 5);
          ctx.lineTo(x + length/2 + Math.random() * 5, lineY + Math.random() * 5);
          ctx.stroke();
        }
      }

      // Factory blueprint and growth
      if (progress > 0.3) {
        const buildProgress = (progress - 0.3) / 0.7;
        const factoryWidth = 200;
        const factoryHeight = 100;
        
        // Factory outline
        ctx.strokeStyle = `rgba(255, 215, 0, ${buildProgress})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.rect(x - factoryWidth/2, y - factoryHeight/2, 
                factoryWidth * buildProgress, factoryHeight);
        ctx.stroke();

        // Revenue graph
        if (buildProgress > 0.5) {
          const graphProgress = (buildProgress - 0.5) * 2;
          ctx.strokeStyle = 'rgba(0, 255, 255, 0.8)';
          ctx.beginPath();
          ctx.moveTo(x - factoryWidth/2, y + factoryHeight/2 + 25);
          
          for (let i = 0; i <= factoryWidth * graphProgress; i += 5) {
            ctx.lineTo(
              x - factoryWidth/2 + i,
              y + factoryHeight/2 + 25 - Math.pow(i/factoryWidth, 2) * 100
            );
          }
          ctx.stroke();
        }
      }
    };

    const drawCodingScene = (progress, x, y) => {
      // Monitor dimensions
      const monitorWidth = 160;
      const monitorHeight = 110;
      const screenWidth = monitorWidth - 16; // Thinner bezel
      const screenHeight = monitorHeight - 16;
      
      // Draw monitor frame
      ctx.strokeStyle = `rgba(255, 255, 255, ${progress})`;
      ctx.fillStyle = `rgba(50, 50, 50, ${progress * 0.8})`;
      ctx.lineWidth = 3;
      
      // Monitor outer case with more rounded corners
      ctx.beginPath();
      ctx.roundRect(
        x - monitorWidth/2,
        y - monitorHeight/2,
        monitorWidth,
        monitorHeight,
        12  // More rounded corners
      );
      ctx.fill();
      ctx.stroke();
      
      // Draw screen background (dark)
      ctx.fillStyle = `rgba(20, 30, 40, ${progress * 0.9})`;
      ctx.beginPath();
      ctx.roundRect(
        x - screenWidth/2,
        y - screenHeight/2,
        screenWidth,
        screenHeight,
        8  // Slightly rounded screen corners
      );
      ctx.fill();
      
      // Draw stand
      ctx.beginPath();
      // Stand neck (thinner rectangle)
      ctx.moveTo(x - 6, y + monitorHeight/2);
      ctx.lineTo(x + 6, y + monitorHeight/2);
      ctx.lineTo(x + 6, y + monitorHeight/2 + 15);
      ctx.lineTo(x - 6, y + monitorHeight/2 + 15);
      
      // Stand base (curved shape)
      ctx.moveTo(x - 25, y + monitorHeight/2 + 15);
      ctx.quadraticCurveTo(
        x, y + monitorHeight/2 + 18,
        x + 25, y + monitorHeight/2 + 15
      );
      ctx.stroke();
      
      // Set up clipping region for code (ensure text stays within screen)
      ctx.save();
      ctx.beginPath();
      ctx.rect(
        x - screenWidth/2 + 10,
        y - screenHeight/2 + 10,
        screenWidth - 20,
        screenHeight - 20
      );
      ctx.clip();
      
      // Draw code lines
      const lines = [
        'function code() {',
        '  const dream = true;',
        '  while (dream) {',
        '    learn();',
        '    build();',
        '  }',
        '}'
      ];
      
      const lineHeight = 14;
      const startX = x - screenWidth/2 + 15;
      const startY = y - screenHeight/2 + 20;
      
      ctx.font = '12px monospace';
      ctx.textAlign = 'left';
      
      lines.forEach((line, index) => {
        const lineProgress = Math.max(0, Math.min(1, 
          (progress * lines.length - index) * 2
        ));
        
        if (lineProgress > 0) {
          // Show characters one by one
          const visibleLength = Math.floor(line.length * lineProgress);
          const visibleText = line.substring(0, visibleLength);
          
          // Draw text with green color
          ctx.fillStyle = `rgba(0, 255, 0, ${progress * 0.8})`;
          ctx.fillText(visibleText, startX, startY + index * lineHeight);
          
          // Draw blinking cursor at end of current line
          if (visibleLength < line.length && progress > index/lines.length) {
            const cursorX = startX + ctx.measureText(visibleText).width;
            if (Math.sin(progress * 10) > 0) {
              ctx.fillRect(cursorX, startY + index * lineHeight - 10, 2, 12);
            }
          }
        }
      });
      
      ctx.restore(); // Remove clipping region
      
      // Add subtle screen glow
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, screenWidth/2);
      gradient.addColorStop(0, `rgba(0, 255, 0, ${progress * 0.05})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(
        x - screenWidth,
        y - screenHeight,
        screenWidth * 2,
        screenHeight * 2
      );
    };

    const drawLimoScene = (progress, x, y) => {
      ctx.save();
      ctx.translate(x, y);
      
      const bridgeRed = 'rgba(200, 40, 0, 1)';
      ctx.fillStyle = bridgeRed;
      ctx.strokeStyle = bridgeRed;
      
      // Draw towers with proper Golden Gate proportions
      const drawTower = (xPos) => {
        ctx.lineWidth = 3;
        
        // Main tower structure - iconic tapered design
        ctx.beginPath();
        // Left leg
        ctx.moveTo(xPos - 20, 0);
        ctx.lineTo(xPos - 15, -80); // Tapered top
        // Right leg
        ctx.moveTo(xPos + 20, 0);
        ctx.lineTo(xPos + 15, -80); // Tapered top
        ctx.stroke();
        
        // Horizontal crossbeams - iconic Golden Gate pattern
        [-70, -55, -40, -25].forEach(yPos => {
          ctx.beginPath();
          ctx.moveTo(xPos - 20, yPos);
          ctx.lineTo(xPos + 20, yPos);
          ctx.stroke();
        });
        
        // Top arch of tower
        ctx.beginPath();
        ctx.moveTo(xPos - 15, -80);
        ctx.lineTo(xPos + 15, -80);
        ctx.stroke();
      };
      
      // Draw towers
      drawTower(-60);
      drawTower(60);
      
      // Main suspension cables - iconic Golden Gate curve
      ctx.lineWidth = 2;
      
      // Draw main cables with proper catenary curve
      ctx.beginPath();
      // Left cable
      ctx.moveTo(-100, -20);
      ctx.lineTo(-60, -80); // Up to tower
      // Center span with proper sag
      ctx.bezierCurveTo(
        -20, -75, // Control point 1
        20, -75,  // Control point 2
        60, -80   // To right tower
      );
      ctx.lineTo(100, -20); // Down to deck
      ctx.stroke();
      
      // Vertical suspension cables - proper Golden Gate spacing
      ctx.lineWidth = 1;
      for (let i = -90; i <= 90; i += 6) {
        ctx.beginPath();
        const x = i;
        let y;
        
        // Calculate cable heights based on position
        if (x < -60) { // Left of left tower
          const progress = (-x - 60) / 40;
          y = -20 - (progress * 60);
        } else if (x > 60) { // Right of right tower
          const progress = (x - 60) / 40;
          y = -20 - (progress * 60);
        } else { // Between towers - proper catenary curve
          const progress = (x + 60) / 120;
          y = -80 + (Math.sin(progress * Math.PI) * 30);
        }
        
        ctx.moveTo(x, -20); // Start at deck
        ctx.lineTo(x, y);   // Up to main cable
        ctx.stroke();
      }
      
      // Road deck with proper thickness
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-100, -20);
      ctx.lineTo(100, -20);
      ctx.stroke();
      
      // Truss pattern below deck - iconic Golden Gate pattern
      ctx.lineWidth = 1;
      for (let i = -95; i < 95; i += 8) {
        ctx.beginPath();
        ctx.moveTo(i, -20);
        ctx.lineTo(i + 8, -15);
        ctx.moveTo(i + 8, -20);
        ctx.lineTo(i, -15);
        ctx.stroke();
      }
      
      // Animated white limo
      const limoX = -80 + progress * 160;
      
      // Limo body
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      ctx.strokeStyle = 'rgba(100, 100, 100, 1)';
      ctx.lineWidth = 1;
      
      ctx.beginPath();
      ctx.rect(limoX - 12, -28, 24, 8);
      ctx.fill();
      ctx.stroke();
      
      ctx.fillStyle = 'rgba(50, 50, 50, 1)';
      ctx.fillRect(limoX - 10, -27, 20, 3);
      
      ctx.fillStyle = 'rgba(40, 40, 40, 1)';
      ctx.beginPath();
      ctx.arc(limoX - 8, -20, 2, 0, Math.PI * 2);
      ctx.arc(limoX + 8, -20, 2, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };

    const drawRunnerScene = (progress, x, y) => {
      ctx.save();
      ctx.translate(x, y);
      
      // Trophy animation phase
      const trophyOpacity = Math.min(1, progress * 1.5);
      
      // Trophy colors
      ctx.strokeStyle = `rgba(255, 215, 0, ${trophyOpacity})`;
      ctx.fillStyle = `rgba(255, 215, 0, ${trophyOpacity * 0.3})`;
      ctx.lineWidth = 2;
      
      // Draw trophy
      // Cup body - tapered shape
      ctx.beginPath();
      // Top rim - wider at top
      ctx.moveTo(-20, -45);
      ctx.lineTo(20, -45);
      // Cup sides with elegant taper
      ctx.quadraticCurveTo(25, -45, 25, -35); // Wider curve at top
      ctx.quadraticCurveTo(18, -15, 10, 0);   // Taper to narrow bottom
      ctx.lineTo(-10, 0);  // Narrow base
      ctx.quadraticCurveTo(-18, -15, -25, -35); // Mirror taper on left side
      ctx.quadraticCurveTo(-25, -45, -20, -45);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
      
      // Handles - adjusted to match tapered cup
      // Left handle
      ctx.beginPath();
      ctx.moveTo(-25, -35); // Start at cup edge
      ctx.quadraticCurveTo(-35, -35, -35, -25); // Outer curve
      ctx.quadraticCurveTo(-35, -15, -25, -15); // Bottom curve
      ctx.lineTo(-25, -15); // Connect back to cup
      ctx.stroke();
      
      // Right handle
      ctx.beginPath();
      ctx.moveTo(25, -35); // Start at cup edge
      ctx.quadraticCurveTo(35, -35, 35, -25); // Outer curve
      ctx.quadraticCurveTo(35, -15, 25, -15); // Bottom curve
      ctx.lineTo(25, -15); // Connect back to cup
      ctx.stroke();
      
      // Base structure
      // Top platform - narrower to match cup bottom
      ctx.beginPath();
      ctx.moveTo(-10, 0);
      ctx.lineTo(10, 0);
      ctx.lineTo(8, 5);
      ctx.lineTo(-8, 5);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
      
      // Middle column - taller and more elegant
      ctx.beginPath();
      ctx.moveTo(-5, 5);
      ctx.lineTo(5, 5);
      ctx.lineTo(6, 20); // Taller middle section
      ctx.lineTo(-6, 20);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
      
      // Bottom base - proportional width
      ctx.beginPath();
      ctx.moveTo(-20, 20);
      ctx.lineTo(20, 20);
      ctx.lineTo(16, 25);
      ctx.lineTo(-16, 25);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
      
      // Add trophy glow
      if (progress > 0.5) {
        const glowOpacity = (progress - 0.5) * 2;
        const gradient = ctx.createRadialGradient(0, -20, 0, 0, -20, 60);
        gradient.addColorStop(0, `rgba(255, 215, 0, ${glowOpacity * 0.4})`);
        gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(-60, -60, 120, 120);
      }
      
      // Add sparkles
      if (progress > 0.7) {
        const sparkleOpacity = (progress - 0.7) * 3;
        for (let i = 0; i < 6; i++) {
          const angle = progress * 5 + i * Math.PI / 3;
          const radius = 40 + Math.sin(angle * 3) * 5;
          const sparkleX = Math.cos(angle) * radius;
          const sparkleY = Math.sin(angle) * radius - 20;
          
          ctx.strokeStyle = `rgba(255, 255, 255, ${sparkleOpacity * 0.8})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(sparkleX - 4, sparkleY);
          ctx.lineTo(sparkleX + 4, sparkleY);
          ctx.moveTo(sparkleX, sparkleY - 4);
          ctx.lineTo(sparkleX, sparkleY + 4);
          ctx.stroke();
        }
      }
      
      ctx.restore();
    };

    // Now define stages after all scene functions are defined
    const stages = [
      { 
        text: "2025+: ",
        line1: "The Next Chapter",
        line2: "I'll grow until I die",
        scene: drawFutureScene 
      },
      { 
        text: "2024:",
        line1: "Real Estate Investing",
        line2: "Cash Flow to Protect Family",
        scene: drawRealEstateScene 
      },
      { 
        text: "2023: ",
        line1: "Started EdTech Startup",
        line2: "Love The Mission, Failed.",
        scene: drawEdTechScene 
      },
      { 
        text: "2021-2022: ",
        line1: "SISU $1B IPO",
        line2: "Crashed After 100+ Hour Weeks",
        scene: drawIPOScene 
      },
      { 
        text: "2018-2021:",
        line1: "Started First Company",
        line2: "Built SISU to $100M",
        scene: drawSISUGrowthScene 
      },
      { 
        text: "2012-2018:",
        line1: "Taught Myself to Code",
        line2: "Lived the SF Dream",
        scene: drawCodingScene 
      },
      { 
        text: "2011-2012: ",
        line1: "Moved to SF",
        line2: "Drove Limo, Slept in Car",
        scene: drawLimoScene 
      },
      { 
        text: "2000-2010:",
        line1: "Nationally Ranked Runner",
        line2: "Got Injured & Lost Olympic Dream",
        scene: drawRunnerScene 
      }
    ];

    const drawTimeline = (time) => {
      const duration = 40000;
      const progress = Math.min(1, (time % duration) / duration);
      
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(0, 9, 25, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawGrid(time * 0.5);

      // Responsive sizing
      const isMobile = canvas.width < 768;
      const timelineCenterX = canvas.width / 2;
      const offsetX = isMobile ? 80 : 150;
      const stageSpacing = isMobile ? 250 : 300;
      const fontSize = isMobile ? 12 : 16;
      const sceneScale = isMobile ? 0.7 : 1;

      // Calculate base position for all elements
      const totalHeight = canvas.height * 2.5;
      const scrollOffset = progress * totalHeight;
      const baseY = canvas.height + (isMobile ? 1600 : 1900) - scrollOffset;

      // Draw "My Life Journey" title first
      const titleY = baseY - (stages.length * stageSpacing) - (isMobile ? 50 : 100);
      if (titleY < canvas.height + 100 && titleY > -100) {
        const fadeProgress = Math.max(0, Math.min(1,
          (canvas.height - titleY + 300) / 400
        ));
        
        // Center title above timeline
        ctx.font = `${isMobile ? 28 : 32}px ${theme.fonts.heading}`;
        ctx.textAlign = 'center';
        
        // Add text shadow for better visibility
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        
        // Draw main title
        ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * fadeProgress})`;
        ctx.fillText('My Life Journey', timelineCenterX, titleY);
        
        // Draw SISU definition below the title
        ctx.font = `${isMobile ? 16 : 20}px ${theme.fonts.heading}`;
        ctx.fillStyle = `rgba(255, 215, 0, ${0.9 * fadeProgress})`; // Yellow color
        ctx.fillText('SISU (n.) - Persevering against all odds', timelineCenterX, titleY + 40);
        
        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }

      // Draw timeline path starting below the title
      const timelineStartY = titleY + 70; // Changed from 40 to 70 to add more space
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = isMobile ? 2 : 3;
      ctx.beginPath();
      ctx.moveTo(timelineCenterX, timelineStartY);
      ctx.lineTo(timelineCenterX, canvas.height);
      ctx.stroke();

      // Draw stages
      stages.forEach((stage, index) => {
        const stageY = baseY - (index * stageSpacing);
        const isLeft = index % 2 === 0;
        
        // Center animations in each half for mobile
        const sceneX = isMobile ? 
          (isLeft ? canvas.width * 0.25 : canvas.width * 0.75) : // Center in each half on mobile
          timelineCenterX + (isLeft ? -offsetX : offsetX); // Desktop positioning
        
        // Only draw stages that are on screen
        if (stageY < canvas.height + 100 && stageY > -100) {
          // Calculate fade-in based on entry from bottom
          const fadeProgress = Math.max(0, Math.min(1,
            (canvas.height - stageY + 300) / 400
          ));

          // Calculate stage progress
          const stageProgress = Math.max(0, Math.min(1, 
            (canvas.height - stageY + 300) / canvas.height
          ));

          // Draw stage marker
          ctx.beginPath();
          ctx.arc(timelineCenterX, stageY, isMobile ? 3 : 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.5 * fadeProgress})`;
          ctx.fill();

          // Draw connection line to scene - extend 50px from timeline
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 * fadeProgress})`;
          ctx.beginPath();
          ctx.moveTo(timelineCenterX, stageY);
          
          // Line extends 50px from center
          const lineEndX = isLeft ? 
            timelineCenterX - 50 : // Left side: 50px to the left
            timelineCenterX + 50;  // Right side: 50px to the right
          
          ctx.lineTo(lineEndX, stageY);
          ctx.stroke();

          // Save context for scene scaling
          ctx.save();
          ctx.translate(sceneX, stageY);
          ctx.scale(sceneScale, sceneScale);
          ctx.translate(-sceneX, -stageY);

          // Draw stage scene with fade
          stage.scene(stageProgress * fadeProgress, sceneX, stageY);
          
          // Restore context
          ctx.restore();

          // Draw stage text with fade
          ctx.textAlign = 'center';

          // Calculate text position with proper spacing
          const dateY = stageY - (isMobile ? 105 : 140);
          const line1Y = stageY - (isMobile ? 85 : 115);
          const line2Y = stageY - (isMobile ? 65 : 95);

          // Split text into date and title
          const [date, ...titleParts] = stage.text.split(': ');
          const title = titleParts.join(': ');

          // Adjust font sizes
          ctx.font = `${fontSize}px Arial`; // Date font
          const dateWidth = ctx.measureText(date).width;
          const line1Width = ctx.measureText(stage.line1).width;
          const line2Width = ctx.measureText(stage.line2).width;

          // Calculate maximum width for background
          const maxWidth = Math.max(dateWidth, line1Width, line2Width);
          const padding = isMobile ? 10 : 20;
          const bgHeight = isMobile ? 65 : 75; // Increased from 65/75 to 85/95 to match new spacing

          // Calculate text position
          const textX = isMobile ? 
            (isLeft ? canvas.width * 0.25 : canvas.width * 0.75) : // Center in each half on mobile
            sceneX; // Desktop positioning

          // Draw text background
          const bgX = textX - maxWidth/2 - padding;
          ctx.fillStyle = `rgba(0, 9, 25, ${0.25 * fadeProgress})`;
          ctx.fillRect(
            bgX,
            dateY - fontSize - padding/2,
            maxWidth + padding * 2,
            bgHeight
          );

          // Draw date
          ctx.font = `${fontSize}px Arial`;
          ctx.fillStyle = `rgba(255, 255, 255, ${0.7 * stageProgress * fadeProgress})`;
          ctx.fillText(date, textX, dateY);

          // Draw line1
          ctx.font = `${fontSize - 2}px Arial`;
          ctx.fillStyle = `rgba(255, 255, 255, ${stageProgress * fadeProgress})`;
          ctx.fillText(stage.line1, textX, line1Y);

          // Draw line2
          ctx.fillStyle = `rgba(255, 255, 255, ${stageProgress * fadeProgress * 0.8})`; // Slightly more transparent
          ctx.fillText(stage.line2, textX, line2Y);
        }
      });

      // Draw runner following the timeline
      const runnerY = Math.max(100, Math.min(canvas.height - 100, baseY));
      drawRunner(timelineCenterX, runnerY, progress);
    };

    const drawRunner = (x, y, progress) => {
      const runnerSize = 20;
      const bounceOffset = Math.sin(progress * Math.PI * 8) * 5;
      
      // Runner glow
      const gradient = ctx.createRadialGradient(
        x, y + bounceOffset, 0,
        x, y + bounceOffset, runnerSize * 2
      );
      gradient.addColorStop(0, 'rgba(255, 215, 0, 0.3)');
      gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y + bounceOffset, runnerSize * 2, 0, Math.PI * 2);
      ctx.fill();

      // Runner core
      ctx.fillStyle = 'rgba(255, 215, 0, 0.8)';
      ctx.beginPath();
      ctx.arc(x, y + bounceOffset, runnerSize / 2, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = (timestamp) => {
      if (!animating) return;
      timelineRef.current = timestamp;
      drawTimeline(timestamp);
      animationFrameId.current = requestAnimationFrame(animate);
    };

    handleResize();
    animate(0);

    window.addEventListener('resize', handleResize);

    return () => {
      animating = false;
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <HeroSection id="hero">
      <Canvas ref={canvasRef} />
      <GradientOverlay />
      <Title
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1.2, 
          ease: [0.25, 0.1, 0, 1],
          delay: 0.2
        }}
      >
      </Title>
    </HeroSection>
  );
};

export default Hero; 