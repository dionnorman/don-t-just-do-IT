// Bridge Interactive Visualization Script

document.addEventListener('DOMContentLoaded', function() {
  // Initialize the bridge visualization
  initBridgeVisualization();
  
  // Create and position particles
  createParticles();
});

function initBridgeVisualization() {
  const bridgeContainer = document.querySelector('.bridge-interactive');
  if (!bridgeContainer) return;
  
  // Create 3D container for better perspective
  const bridge3DContainer = document.createElement('div');
  bridge3DContainer.className = 'bridge-3d-container';
  bridgeContainer.appendChild(bridge3DContainer);
  
  // Create water effect
  const waterElement = document.createElement('div');
  waterElement.className = 'bridge-water';
  
  const waterAnimation = document.createElement('div');
  waterAnimation.className = 'water-animation';
  waterElement.appendChild(waterAnimation);
  
  bridge3DContainer.appendChild(waterElement);
  
  // Create travelers (moving dots on the bridge)
  const travelersContainer = document.createElement('div');
  travelersContainer.className = 'bridge-travelers';
  
  for (let i = 1; i <= 4; i++) {
    const traveler = document.createElement('div');
    traveler.className = `traveler traveler-${i}`;
    travelersContainer.appendChild(traveler);
  }
  
  bridge3DContainer.appendChild(travelersContainer);
  
  // Create support cables
  const cablesContainer = document.createElement('div');
  cablesContainer.className = 'bridge-cables';
  
  for (let i = 1; i <= 5; i++) {
    const cable = document.createElement('div');
    cable.className = `cable cable-${i}`;
    cablesContainer.appendChild(cable);
  }
  
  bridge3DContainer.appendChild(cablesContainer);
  
  // Create particles container
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles-container';
  bridge3DContainer.appendChild(particlesContainer);
  
  // Move existing elements into the 3D container
  const elementsToMove = [
    '.bridge-banks',
    '.bridge-pillars-container',
    '.bridge-span',
    '.bridge-gap'
  ];
  
  elementsToMove.forEach(selector => {
    const element = bridgeContainer.querySelector(selector);
    if (element) {
      bridge3DContainer.appendChild(element);
    }
  });
  
  // Add interactive mouse movement effect
  bridgeContainer.addEventListener('mousemove', handleMouseMove);
}

function handleMouseMove(e) {
  const container = e.currentTarget;
  const { left, top, width, height } = container.getBoundingClientRect();
  
  // Calculate mouse position relative to the container
  const x = (e.clientX - left) / width - 0.5;
  const y = (e.clientY - top) / height - 0.5;
  
  // Apply subtle rotation based on mouse position
  const bridge3D = container.querySelector('.bridge-3d-container');
  if (bridge3D) {
    bridge3D.style.transform = `rotateX(${8 - y * 5}deg) rotateY(${x * 10}deg)`;
  }
  
  // Add depth effect to pillars
  const pillars = container.querySelectorAll('.bridge-pillar');
  pillars.forEach((pillar, index) => {
    const depth = (index - 2) * 5;
    pillar.style.transform = `translateZ(${depth}px)`;
  });
}

function createParticles() {
  const container = document.querySelector('.particles-container');
  if (!container) return;
  
  // Create particles
  for (let i = 0; i < 25; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random size
    const size = Math.random() * 2 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random animation delay
    particle.style.animationDelay = `${Math.random() * 15}s`;
    
    // Random animation duration
    particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
    
    container.appendChild(particle);
  }
}

// Add pillar pulse effect
function addPillarPulseEffect() {
  const pillars = document.querySelectorAll('.bridge-pillar');
  
  pillars.forEach((pillar, index) => {
    // Create a pulsing glow effect
    const glowEffect = document.createElement('div');
    glowEffect.className = 'pillar-glow';
    glowEffect.style.animationDelay = `${index * 0.5}s`;
    
    pillar.appendChild(glowEffect);
  });
}

// Initialize the pillar info panels
function initPillarInfo() {
  const pillarGroups = document.querySelectorAll('.bridge-pillar-group');
  
  pillarGroups.forEach(group => {
    const infoPanel = group.querySelector('.pillar-info');
    if (infoPanel) {
      // Add icon to the info panel
      const icon = document.createElement('div');
      icon.className = 'pillar-icon';
      
      // Determine which icon to use based on the pillar class
      const pillar = group.querySelector('.bridge-pillar');
      if (pillar.classList.contains('pillar-iste')) {
        icon.innerHTML = '<i class="fas fa-certificate"></i>';
      } else if (pillar.classList.contains('pillar-cbam')) {
        icon.innerHTML = '<i class="fas fa-users"></i>';
      } else if (pillar.classList.contains('pillar-vision')) {
        icon.innerHTML = '<i class="fas fa-eye"></i>';
      } else if (pillar.classList.contains('pillar-capacity')) {
        icon.innerHTML = '<i class="fas fa-cogs"></i>';
      } else if (pillar.classList.contains('pillar-ethics')) {
        icon.innerHTML = '<i class="fas fa-balance-scale"></i>';
      }
      
      infoPanel.appendChild(icon);
    }
  });
}

// Run additional initializations when the window loads
window.addEventListener('load', function() {
  addPillarPulseEffect();
  initPillarInfo();
});