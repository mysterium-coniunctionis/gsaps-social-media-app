// Space3D.js - Core 3D renderer for virtual spaces
// Uses React-Three-Fiber for 3D rendering

import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  Sky,
  Stars,
  Loader
} from '@react-three/drei';
import { Box, Typography, CircularProgress } from '@mui/material';
import { spacePresets } from '../../data/virtualSpacesData';

/**
 * Ground plane component
 */
const Ground = ({ size = 100 }) => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.01, 0]}>
      <planeGeometry args={[size, size]} />
      <meshStandardMaterial
        color="#1a1a2e"
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  );
};

/**
 * Stage object for symposium
 */
const Stage = ({ position, scale }) => {
  return (
    <mesh position={position} scale={scale} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#8B4513"
        roughness={0.7}
        metalness={0.1}
      />
    </mesh>
  );
};

/**
 * Podium object
 */
const Podium = ({ position, scale }) => {
  return (
    <group position={position}>
      <mesh scale={scale} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#654321"
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>
    </group>
  );
};

/**
 * Seating rows
 */
const Seating = ({ rows, seatsPerRow, startPosition }) => {
  const seats = [];
  const seatSpacing = 1.5;
  const rowSpacing = 2;

  for (let row = 0; row < rows; row++) {
    for (let seat = 0; seat < seatsPerRow; seat++) {
      const x = (seat - seatsPerRow / 2) * seatSpacing;
      const z = startPosition[2] + row * rowSpacing;
      seats.push(
        <mesh
          key={`seat-${row}-${seat}`}
          position={[x, 0.5, z]}
          castShadow
        >
          <boxGeometry args={[0.8, 0.5, 0.8]} />
          <meshStandardMaterial color="#4A4A4A" roughness={0.7} />
        </mesh>
      );
    }
  }

  return <group>{seats}</group>;
};

/**
 * Conversation Pod
 */
const Pod = ({ position, scale, seats }) => {
  const podSeats = [];
  const radius = scale[0] / 2;

  for (let i = 0; i < seats; i++) {
    const angle = (i / seats) * Math.PI * 2;
    const x = position[0] + Math.cos(angle) * radius;
    const z = position[2] + Math.sin(angle) * radius;

    podSeats.push(
      <mesh key={`pod-seat-${i}`} position={[x, 0.5, z]} castShadow>
        <boxGeometry args={[0.7, 0.5, 0.7]} />
        <meshStandardMaterial color="#2196F3" roughness={0.6} />
      </mesh>
    );
  }

  return (
    <group>
      {/* Pod base */}
      <mesh position={position} castShadow receiveShadow>
        <cylinderGeometry args={[scale[0], scale[0], 0.2, 8]} />
        <meshStandardMaterial
          color="#1976D2"
          roughness={0.5}
          metalness={0.3}
          opacity={0.3}
          transparent
        />
      </mesh>
      {/* Seats */}
      {podSeats}
    </group>
  );
};

/**
 * Table
 */
const Table = ({ position, scale }) => {
  return (
    <mesh position={position} scale={scale} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#8B7355" roughness={0.6} />
    </mesh>
  );
};

/**
 * Chair
 */
const Chair = ({ position, rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#444444" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.8, -0.25]} castShadow>
        <boxGeometry args={[0.6, 0.8, 0.1]} />
        <meshStandardMaterial color="#444444" roughness={0.7} />
      </mesh>
    </group>
  );
};

/**
 * Bookshelf
 */
const Bookshelf = ({ position, scale }) => {
  return (
    <mesh position={position} scale={scale} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#654321" roughness={0.8} />
    </mesh>
  );
};

/**
 * Plant decoration
 */
const Plant = ({ position, scale }) => {
  return (
    <group position={position}>
      <mesh position={[0, scale[1] / 2, 0]} castShadow>
        <coneGeometry args={[scale[0] * 0.5, scale[1], 8]} />
        <meshStandardMaterial color="#228B22" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.4, 8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.7} />
      </mesh>
    </group>
  );
};

/**
 * Bar/Counter
 */
const Bar = ({ position, scale }) => {
  return (
    <mesh position={position} scale={scale} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#2C3E50"
        roughness={0.3}
        metalness={0.6}
      />
    </mesh>
  );
};

/**
 * Pedestal
 */
const Pedestal = ({ position, scale }) => {
  return (
    <mesh position={[...position.slice(0, 2), position[2], position[1] + scale[1] / 2]} castShadow receiveShadow>
      <cylinderGeometry args={[scale[0] / 2, scale[0] / 2, scale[1], 8]} />
      <meshStandardMaterial
        color="#FFFFFF"
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
};

/**
 * Whiteboard
 */
const Whiteboard = ({ position, scale, rotation = [0, 0, 0] }) => {
  return (
    <mesh position={position} scale={scale} rotation={rotation} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#FFFFFF" roughness={0.1} metalness={0.5} />
    </mesh>
  );
};

/**
 * Render space objects based on configuration
 */
const SpaceObjects = ({ objects }) => {
  if (!objects) return null;

  return (
    <group>
      {objects.map((obj, index) => {
        const key = `object-${index}`;

        switch (obj.type) {
          case 'stage':
            return <Stage key={key} position={obj.position} scale={obj.scale} />;
          case 'podium':
            return <Podium key={key} position={obj.position} scale={obj.scale} />;
          case 'seating':
            return <Seating key={key} rows={obj.rows} seatsPerRow={obj.seatsPerRow} startPosition={obj.startPosition} />;
          case 'pod':
            return <Pod key={key} position={obj.position} scale={obj.scale} seats={obj.seats} />;
          case 'table':
            return <Table key={key} position={obj.position} scale={obj.scale} />;
          case 'chair':
            return <Chair key={key} position={obj.position} rotation={obj.rotation} />;
          case 'bookshelf':
            return <Bookshelf key={key} position={obj.position} scale={obj.scale} />;
          case 'plant':
            return <Plant key={key} position={obj.position} scale={obj.scale} />;
          case 'bar':
            return <Bar key={key} position={obj.position} scale={obj.scale} />;
          case 'pedestal':
            return <Pedestal key={key} position={obj.position} scale={obj.scale} />;
          case 'whiteboard':
            return <Whiteboard key={key} position={obj.position} scale={obj.scale} rotation={obj.rotation} />;
          // VirtualScreen and poster handled by separate components
          default:
            return null;
        }
      })}
    </group>
  );
};

/**
 * Lighting setup based on space type
 */
const SpaceLighting = ({ spaceType }) => {
  const preset = spacePresets[spaceType] || spacePresets.networking;
  const { lighting } = preset;

  return (
    <>
      <ambientLight intensity={lighting.ambient} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={lighting.directional}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      {lighting.spotlights && (
        <>
          <spotLight
            position={[0, 10, 0]}
            angle={0.5}
            penumbra={0.5}
            intensity={0.5}
            castShadow
          />
          <spotLight
            position={[-10, 8, -10]}
            angle={0.4}
            penumbra={0.6}
            intensity={0.3}
            castShadow
          />
        </>
      )}
    </>
  );
};

/**
 * Loading fallback
 */
const LoadingFallback = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
      }}
    >
      <CircularProgress size={60} />
      <Typography variant="h6" sx={{ mt: 2, color: 'white' }}>
        Loading 3D Space...
      </Typography>
    </Box>
  );
};

/**
 * Main Space3D Component
 */
const Space3D = ({
  spaceData,
  children,
  cameraPosition = [0, 5, 20],
  enableControls = true,
  performanceProfile = 'medium'
}) => {
  const canvasRef = useRef();
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  useEffect(() => {
    // Check WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    setIsWebGLSupported(!!gl);
  }, []);

  if (!isWebGLSupported) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#1a1a2e',
          color: 'white',
          p: 4,
          textAlign: 'center'
        }}
      >
        <Box>
          <Typography variant="h5" gutterBottom>
            WebGL Not Supported
          </Typography>
          <Typography variant="body1">
            Your browser doesn't support WebGL, which is required for 3D spaces.
            Please try a modern browser like Chrome, Firefox, or Edge.
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        ref={canvasRef}
        shadows
        camera={{ position: cameraPosition, fov: 75 }}
        style={{ background: '#0a0a1a' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <SpaceLighting spaceType={spaceData?.type || 'networking'} />

          {/* Environment */}
          {spaceData?.environment?.skybox === 'sunset' && (
            <Sky sunPosition={[100, 20, 100]} />
          )}
          {spaceData?.environment?.skybox === 'evening' && (
            <Sky sunPosition={[100, 10, 100]} turbidity={8} />
          )}
          {spaceData?.environment?.skybox === 'gallery' && (
            <color attach="background" args={['#1a1a2e']} />
          )}
          {!spaceData?.environment?.skybox && <Stars />}

          {/* Ground */}
          <Ground />

          {/* Space Objects */}
          {spaceData?.objects && <SpaceObjects objects={spaceData.objects} />}

          {/* Children (Avatars, Screens, UI) */}
          {children}

          {/* Camera Controls */}
          {enableControls && (
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              maxPolarAngle={Math.PI / 2}
              minDistance={5}
              maxDistance={50}
            />
          )}

          {/* Environment lighting helper */}
          <Environment preset="warehouse" />
        </Suspense>
      </Canvas>

      {/* React-three-fiber loader */}
      <Loader
        containerStyles={{
          background: 'rgba(0, 0, 0, 0.9)'
        }}
        innerStyles={{
          background: '#2196F3'
        }}
        barStyles={{
          background: '#1976D2'
        }}
        dataStyles={{
          color: 'white'
        }}
      />
    </Box>
  );
};

export default Space3D;
