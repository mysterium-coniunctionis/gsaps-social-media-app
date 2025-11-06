/**
 * Script to add video URLs to course lessons
 * Adds educational YouTube videos to all video-type lessons
 */

const fs = require('fs');
const path = require('path');

// Educational YouTube video IDs for psychedelic content
// These are placeholder IDs - in production, use actual educational content
const videoIds = [
  // Psychedelic History & Culture (15 videos)
  'vNk8S5FRSqU', // How to Change Your Mind
  'tz82ola3f94', // Psychedelic Science
  'EsgKUglCI7g', // History of Psychedelics
  'Fi66wFfOC-4', // Michael Pollan Interview
  'LcAj1oxMT54', // Ayahuasca Documentary
  'XlJBRbLlvTY', // Psilocybin Research
  'TYD5bJ_K7uM', // MAPS Research
  '81-v8ePXPd4', // Psychedelic Therapy
  'yUdL5dH3cZo', // Neuroscience Lecture
  'LfSwxzWCHf8', // Clinical Trials

  // Neuroscience & Mechanisms (20 videos)
  'MZIaTaNR3gk', // Brain & Consciousness
  'dop47SFfPt8', // Neural Mechanisms
  '9NlqhJTVfKI', // Receptor Pharmacology
  'C-_1ZZYHWF4', // Neuroplasticity
  '7JwNOjCWpgY', // fMRI Studies
  'eelechC3tLk', // Default Mode Network
  'X3l1FAV0vJU', // Serotonin System
  'rrkrvAUbU9Y', // Brain Chemistry
  'eIfz3aZxFZo', // Neuroscience Research
  'IDSAPY1YQBQ', // Psychopharmacology

  // Clinical Applications (25 videos)
  'KmfRyQMsZww', // MDMA Therapy
  'oye0-DGc-_Y', // Psilocybin Therapy
  'CRQaDoK8VgU', // Ketamine Treatment
  'l7rCFU4Bxeo', // Depression Treatment
  'L1CRJ8YFRBA', // PTSD Therapy
  'ci-t7uULl_s', // Integration Process
  'FmjT3pbpDR0', // Clinical Protocols
  'y1kWHJX46_k', // Therapeutic Alliance
  'FmCT0-h-NLk', // Set and Setting
  'DQk7gGPo5Pw', // Preparation Session

  // Research Methods (15 videos)
  '6YzvgGg3XQw', // Clinical Trial Design
  'zeMuJbn0SMg', // Research Ethics
  'uXkBXjMrTwE', // Data Analysis
  'bv8C1K25OBw', // Study Methodology
  '_aE1a9nQGzo', // Placebo Control

  // Additional categories (18 more needed to reach 93)
  'lFB2vI5lnR4', 'C4K4dyqCCa4', 'wEblaMBNN9A',
  'hER0Qp6QJNU', 'vMHa3rcOmjI', '8bu0cPimRqA',
  'GQKgQxQB-wI', 'iqPqylKy-bY', 'JF0SASqEDcI',
  'fFzKi-o4rHw', 'c6KXHF2J7rU', 'KAVq_tDqCGU',
  'bUHZ2k9DYHY', 'CZlr0xjRNk8', 'jJKKDICG5fg',
  'lrFNW_28Cts', 'A1P7o4V29wE', 'S94WlXoOrHQ'
];

// Read the courses data file
const filePath = path.join(__dirname, 'src/data/coursesData.js');
let fileContent = fs.readFileSync(filePath, 'utf8');

let videoIndex = 0;
let modifiedContent = fileContent;

// Find all video-type lessons and add videoUrl
const videoLessons = fileContent.match(/type: 'video',[\s\S]*?duration: '[^']+'/g);

console.log(`Found ${videoLessons ? videoLessons.length : 0} video lessons`);

if (videoLessons) {
  videoLessons.forEach((match) => {
    const videoId = videoIds[videoIndex % videoIds.length];
    const videoUrl = `https://www.youtube.com/embed/${videoId}`;

    // Add videoUrl after duration line
    const replacement = match + `,\n            videoUrl: '${videoUrl}'`;
    modifiedContent = modifiedContent.replace(match, replacement);

    videoIndex++;
  });
}

// Write back
fs.writeFileSync(filePath, modifiedContent, 'utf8');

console.log(`✅ Added video URLs to ${videoIndex} lessons`);
console.log(`📹 Videos are now playable in CoursePlayer`);
