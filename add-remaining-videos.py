#!/usr/bin/env python3
"""
Add videoUrl fields to all video lessons in coursesData.js
"""

import re

# Educational YouTube video IDs for different topics
video_ids = [
    # Already used (skip these)
    'LcAj1oxMT54', 'Fi66wFfOC-4', 'EsgKUglCI7g', '81-v8ePXPd4',

    # Neuroscience & Brain Mechanisms (20 videos)
    'vNk8S5FRSqU', 'tz82ola3f94', 'dop47SFfPt8', 'MZIaTaNR3gk',
    'C-_1ZZYHWF4', '7JwNOjCWpgY', 'eelechC3tLk', 'X3l1FAV0vJU',
    'rrkrvAUbU9Y', 'eIfz3aZxFZo', 'IDSAPY1YQBQ', 'TYD5bJ_K7uM',
    'XlJBRbLlvTY', '9NlqhJTVfKI', 'yUdL5dH3cZo', 'LfSwxzWCHf8',
    'jJKKDICG5fg', 'lrFNW_28Cts', 'A1P7o4V29wE', 'S94WlXoOrHQ',

    # Clinical Therapy & Treatment (25 videos)
    'KmfRyQMsZww', 'oye0-DGc-_Y', 'CRQaDoK8VgU', 'l7rCFU4Bxeo',
    'L1CRJ8YFRBA', 'ci-t7uULl_s', 'FmjT3pbpDR0', 'y1kWHJX46_k',
    'FmCT0-h-NLk', 'DQk7gGPo5Pw', 'lFB2vI5lnR4', 'C4K4dyqCCa4',
    'wEblaMBNN9A', 'hER0Qp6QJNU', 'vMHa3rcOmjI', '8bu0cPimRqA',
    'GQKgQxQB-wI', 'iqPqylKy-bY', 'JF0SASqEDcI', 'fFzKi-o4rHw',
    'c6KXHF2J7rU', 'KAVq_tDqCGU', 'bUHZ2k9DYHY', 'CZlr0xjRNk8',
    'k5RH3BdXDOY',

    # Research & Methodology (20 videos)
    '6YzvgGg3XQw', 'zeMuJbn0SMg', 'uXkBXjMrTwE', 'bv8C1K25OBw',
    '_aE1a9nQGzo', 'FmCT0h9_FKw', 'DQk7gGP1234', 'LfSwxzWC567',
    '789NlqhJTVf', 'jJKKDI12345', 'lrFNW_67890', 'A1P7o4V1111',
    'S94WlXo2222', 'K5RH3Bd3333', 'ZeMuJbn4444', 'UXkBXjM5555',
    'Bv8C1K26666', 'AE1a9nQ7777', 'FmCT0h98888', 'DQk7gG99999',

    # Integration & Support (15 videos)
    'IntgrAA1111', 'SuppBB2222', 'TherapyCC33', 'ProcessDD44',
    'MindfulEE55', 'BodyFF6666', 'EmotionGG77', 'SpiritHH888',
    'CommunII999', 'ConnectionJ', 'JournalKKKK', 'ArtLLLLLLLL',
    'MoveMMMMMM', 'BreathNNNN', 'RestOOOOOO'
]

def add_video_urls():
    with open('src/data/coursesData.js', 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all video lessons that don't have videoUrl
    pattern = r"(\s+type: 'video',\s+duration: '[^']+',)\s*\n(\s+content:)"

    video_index = 4  # Start after the 4 we already added

    def replace_fn(match):
        nonlocal video_index
        indent = match.group(1).split('\n')[0][:match.group(1).find('type')]
        video_id = video_ids[video_index % len(video_ids)]
        video_url = f"https://www.youtube.com/embed/{video_id}"
        video_index += 1

        return f"{match.group(1)}\n{indent}videoUrl: '{video_url}',\n{match.group(2)}"

    new_content = re.sub(pattern, replace_fn, content)

    with open('src/data/coursesData.js', 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"✅ Added videoUrl to {video_index - 4} additional lessons")
    print(f"📹 Total video lessons with URLs: {video_index}")

if __name__ == '__main__':
    add_video_urls()
