// Avatar3D.js - User avatar representation in 3D space
// Stylized 3D avatars with name tags and presence indicators

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { avatarCustomization } from '../../data/virtualSpacesData';

/**
 * Name tag floating above avatar
 */
const NameTag = ({ name, position = [0, 2.5, 0] }) => {
  return (
    <Billboard position={position} follow={true}>
      <Text
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {name}
      </Text>
    </Billboard>
  );
};

/**
 * Speaking indicator - pulsing ring
 */
const SpeakingIndicator = ({ isSpeaking }) => {
  const ringRef = useRef();

  useFrame((state) => {
    if (ringRef.current && isSpeaking) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 5) * 0.2;
      ringRef.current.scale.set(scale, 1, scale);
    }
  });

  if (!isSpeaking) return null;

  return (
    <mesh ref={ringRef} position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.8, 1, 32]} />
      <meshBasicMaterial color="#00FF00" transparent opacity={0.6} />
    </mesh>
  );
};

/**
 * Presence state indicator - colored glow
 */
const PresenceGlow = ({ presenceState }) => {
  const presenceConfig = useMemo(() => {
    const stateObj = avatarCustomization.presenceStates.find(
      s => s.id === presenceState
    );
    return stateObj || avatarCustomization.presenceStates[0];
  }, [presenceState]);

  return (
    <pointLight
      position={[0, 1, 0]}
      color={presenceConfig.color}
      intensity={0.5}
      distance={5}
    />
  );
};

/**
 * Capsule avatar body (default style)
 */
const CapsuleAvatar = ({ color, height = 1.8 }) => {
  const bodyRef = useRef();

  return (
    <group ref={bodyRef}>
      {/* Body capsule */}
      <mesh position={[0, height / 2, 0]} castShadow>
        <capsuleGeometry args={[0.3, height - 0.6, 8, 16]} />
        <meshStandardMaterial
          color={color}
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>

      {/* Head sphere */}
      <mesh position={[0, height + 0.2, 0]} castShadow>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial
          color={color}
          roughness={0.6}
          metalness={0.4}
        />
      </mesh>
    </group>
  );
};

/**
 * Stylized humanoid avatar
 */
const HumanoidAvatar = ({ color, height = 1.8 }) => {
  const groupRef = useRef();

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh position={[0, height * 0.5, 0]} castShadow>
        <boxGeometry args={[0.5, height * 0.6, 0.3]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>

      {/* Head */}
      <mesh position={[0, height * 0.9, 0]} castShadow>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>

      {/* Left arm */}
      <mesh position={[-0.35, height * 0.5, 0]} castShadow>
        <boxGeometry args={[0.15, height * 0.5, 0.15]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>

      {/* Right arm */}
      <mesh position={[0.35, height * 0.5, 0]} castShadow>
        <boxGeometry args={[0.15, height * 0.5, 0.15]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>

      {/* Left leg */}
      <mesh position={[-0.15, height * 0.15, 0]} castShadow>
        <boxGeometry args={[0.15, height * 0.4, 0.15]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>

      {/* Right leg */}
      <mesh position={[0.15, height * 0.15, 0]} castShadow>
        <boxGeometry args={[0.15, height * 0.4, 0.15]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
    </group>
  );
};

/**
 * Abstract sphere avatar
 */
const AbstractAvatar = ({ color }) => {
  const sphereRef = useRef();

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.01;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      sphereRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={sphereRef} position={[0, 1, 0]} castShadow>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color={color}
        roughness={0.3}
        metalness={0.7}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

/**
 * Movement animation helper
 */
const useMovementAnimation = (position, targetPosition) => {
  const groupRef = useRef();
  const currentPos = useRef(new THREE.Vector3(...position));
  const targetPos = useRef(new THREE.Vector3(...position));

  useFrame(() => {
    if (!groupRef.current) return;

    // Update target if changed
    if (targetPosition) {
      targetPos.current.set(...targetPosition);
    }

    // Smooth interpolation
    currentPos.current.lerp(targetPos.current, 0.1);
    groupRef.current.position.copy(currentPos.current);

    // Add subtle bobbing animation when moving
    const isMoving = currentPos.current.distanceTo(targetPos.current) > 0.01;
    if (isMoving) {
      groupRef.current.position.y += Math.sin(Date.now() * 0.01) * 0.02;
    }
  });

  return groupRef;
};

/**
 * Main Avatar3D Component
 */
const Avatar3D = ({
  userId,
  name = 'Anonymous',
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  avatarStyle = 'default',
  color = '#2196F3',
  presenceState = 'available',
  isSpeaking = false,
  targetPosition = null,
  showNameTag = true,
  isCurrentUser = false
}) => {
  const groupRef = useMovementAnimation(position, targetPosition);

  // Parse rotation to radians if needed
  const rotationRadians = useMemo(() => {
    return rotation.map(r => typeof r === 'number' ? r : parseFloat(r) || 0);
  }, [rotation]);

  // Render appropriate avatar style
  const renderAvatarBody = () => {
    switch (avatarStyle) {
      case 'stylized':
      case 'humanoid':
        return <HumanoidAvatar color={color} />;
      case 'abstract':
        return <AbstractAvatar color={color} />;
      case 'default':
      default:
        return <CapsuleAvatar color={color} />;
    }
  };

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotationRadians}
      userData={{ userId, isAvatar: true }}
    >
      {/* Avatar Body */}
      {renderAvatarBody()}

      {/* Name Tag */}
      {showNameTag && <NameTag name={name} />}

      {/* Speaking Indicator */}
      <SpeakingIndicator isSpeaking={isSpeaking} />

      {/* Presence Glow */}
      <PresenceGlow presenceState={presenceState} />

      {/* Current user indicator (optional outline) */}
      {isCurrentUser && (
        <mesh position={[0, 1, 0]}>
          <ringGeometry args={[0.6, 0.7, 32]} />
          <meshBasicMaterial color="#FFD700" transparent opacity={0.5} />
        </mesh>
      )}
    </group>
  );
};

/**
 * Avatar Group - Render multiple avatars
 */
export const AvatarGroup = ({ avatars = [], currentUserId = null }) => {
  return (
    <group>
      {avatars.map(avatar => (
        <Avatar3D
          key={avatar.userId}
          userId={avatar.userId}
          name={avatar.name}
          position={avatar.position}
          rotation={avatar.rotation}
          avatarStyle={avatar.avatar?.style}
          color={avatar.avatar?.color}
          presenceState={avatar.presenceState}
          isSpeaking={avatar.isSpeaking}
          isCurrentUser={avatar.userId === currentUserId}
        />
      ))}
    </group>
  );
};

export default Avatar3D;
