export const getMockNotifications = () => ([
  {
    id: 1,
    type: 'like',
    user: {
      id: 101,
      name: 'Sarah Chen',
      username: 'sarah_chen',
      avatar_url: 'https://i.pravatar.cc/150?img=1'
    },
    message: 'Sarah Chen liked your post',
    postId: 123,
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    read: false
  },
  {
    id: 2,
    type: 'comment',
    user: {
      id: 102,
      name: 'Marcus Johnson',
      username: 'marcus_j',
      avatar_url: 'https://i.pravatar.cc/150?img=2'
    },
    message: 'Marcus Johnson commented on your post',
    postId: 123,
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false
  },
  {
    id: 3,
    type: 'follow',
    user: {
      id: 103,
      name: 'Emily Rodriguez',
      username: 'emily_r',
      avatar_url: 'https://i.pravatar.cc/150?img=3'
    },
    message: 'Emily Rodriguez started following you',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: false
  },
  {
    id: 4,
    type: 'group_invite',
    user: {
      id: 104,
      name: 'David Park',
      username: 'david_park',
      avatar_url: 'https://i.pravatar.cc/150?img=4'
    },
    message: 'David Park invited you to join Psychedelic Research Group',
    groupId: 5,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    read: true
  },
  {
    id: 5,
    type: 'event_reminder',
    user: {
      id: 105,
      name: 'GSAPS',
      username: 'gsaps_official',
      avatar_url: 'https://i.pravatar.cc/150?img=5'
    },
    message: 'Reminder: Monthly Meetup starts in 1 hour',
    eventId: 10,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true
  },
  {
    id: 6,
    type: 'like',
    user: {
      id: 106,
      name: 'Lisa Wang',
      username: 'lisa_wang',
      avatar_url: 'https://i.pravatar.cc/150?img=6'
    },
    message: 'Lisa Wang and 3 others liked your comment',
    postId: 125,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    read: true
  },
  {
    id: 7,
    type: 'comment',
    user: {
      id: 107,
      name: 'Michael Brown',
      username: 'michael_brown',
      avatar_url: 'https://i.pravatar.cc/150?img=7'
    },
    message: 'Michael Brown mentioned you in a comment',
    postId: 130,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    read: true
  },
  {
    id: 8,
    type: 'follow',
    user: {
      id: 108,
      name: 'Natalie Kim',
      username: 'natalie_kim',
      avatar_url: 'https://i.pravatar.cc/150?img=8'
    },
    message: 'Natalie Kim started following you',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    read: true
  },
  {
    id: 9,
    type: 'group_invite',
    user: {
      id: 109,
      name: 'Psychedelic Therapists',
      username: 'psychedelic_therapists',
      avatar_url: 'https://i.pravatar.cc/150?img=9'
    },
    message: 'New discussion in Psychedelic Therapists group',
    groupId: 7,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    read: true
  },
  {
    id: 10,
    type: 'event_reminder',
    user: {
      id: 110,
      name: 'GSAPS Events',
      username: 'gsaps_events',
      avatar_url: 'https://i.pravatar.cc/150?img=10'
    },
    message: 'Workshop: Integrative Approaches starts tomorrow',
    eventId: 12,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    read: true
  }
]);
