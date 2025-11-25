import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Avatar,
  Typography,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Person as PersonIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { SearchTextField } from '../components/common';

/**
 * Members directory page
 * Browse and search GSAPS community members
 * Optimized with useMemo for filtering
 */
const Members = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterInterest, setFilterInterest] = useState('all');

  const interests = ['All', 'Psychedelics', 'Neuroscience', 'Psychology', 'Research', 'Therapy'];

  useEffect(() => {
    // TODO: Fetch members from API
    // For now, use mock data
    setTimeout(() => {
      const mockMembers = [
        {
          id: 1,
          username: 'alice_researcher',
          name: 'Dr. Alice Johnson',
          avatar_url: 'https://i.pravatar.cc/150?img=1',
          bio: 'PhD candidate at UC Berkeley studying MDMA-assisted therapy for PTSD. Published 12 papers on trauma healing.',
          interests: ['Psychedelics', 'Therapy', 'Research'],
          location: 'Berkeley, CA',
          memberSince: '2024-01-15'
        },
        {
          id: 2,
          username: 'bob_neuroscience',
          name: 'Prof. Robert Williams',
          avatar_url: 'https://i.pravatar.cc/150?img=12',
          bio: 'Neuroscience professor at MIT studying consciousness and neural correlates of psychedelic experiences.',
          interests: ['Neuroscience', 'Psychology', 'Research'],
          location: 'Boston, MA',
          memberSince: '2024-02-01'
        },
        {
          id: 3,
          username: 'carol_therapist',
          name: 'Carol Davis, LMFT',
          avatar_url: 'https://i.pravatar.cc/150?img=5',
          bio: 'Licensed marriage and family therapist integrating ketamine-assisted psychotherapy into my practice.',
          interests: ['Therapy', 'Psychology'],
          location: 'Portland, OR',
          memberSince: '2024-01-20'
        },
        {
          id: 4,
          username: 'david_student',
          name: 'David Martinez',
          avatar_url: 'https://i.pravatar.cc/150?img=13',
          bio: 'Graduate student in clinical psychology at NYU. Researching psilocybin for treatment-resistant depression.',
          interests: ['Psychology', 'Research', 'Psychedelics'],
          location: 'New York, NY',
          memberSince: '2024-03-01'
        },
        {
          id: 5,
          username: 'sarah_maps',
          name: 'Dr. Sarah Chen',
          avatar_url: 'https://i.pravatar.cc/150?img=9',
          bio: 'Clinical psychologist and MAPS-trained therapist specializing in MDMA therapy. 15 years experience in trauma work.',
          interests: ['Therapy', 'Psychedelics', 'Research'],
          location: 'San Francisco, CA',
          memberSince: '2024-01-10'
        },
        {
          id: 6,
          username: 'michael_integration',
          name: 'Michael Thompson, MA',
          avatar_url: 'https://i.pravatar.cc/150?img=14',
          bio: 'Integration coach helping clients process and integrate psychedelic experiences. Certified in somatic therapy.',
          interests: ['Therapy', 'Psychology'],
          location: 'Boulder, CO',
          memberSince: '2024-02-15'
        },
        {
          id: 7,
          username: 'emily_pharmacology',
          name: 'Dr. Emily Rodriguez',
          avatar_url: 'https://i.pravatar.cc/150?img=10',
          bio: 'Pharmacologist researching novel psychedelic compounds. PhD from Johns Hopkins. Focus on 5-HT2A receptor mechanisms.',
          interests: ['Research', 'Neuroscience', 'Psychedelics'],
          location: 'Baltimore, MD',
          memberSince: '2024-01-25'
        },
        {
          id: 8,
          username: 'james_anthropology',
          name: 'Prof. James O\'Neill',
          avatar_url: 'https://i.pravatar.cc/150?img=15',
          bio: 'Medical anthropologist studying indigenous ayahuasca traditions in the Amazon. Author of 3 books on plant medicine.',
          interests: ['Research', 'Psychedelics'],
          location: 'Seattle, WA',
          memberSince: '2024-02-20'
        },
        {
          id: 9,
          username: 'priya_psychiatrist',
          name: 'Dr. Priya Sharma, MD',
          avatar_url: 'https://i.pravatar.cc/150?img=20',
          bio: 'Board-certified psychiatrist conducting clinical trials on psilocybin for major depressive disorder.',
          interests: ['Therapy', 'Research', 'Psychedelics'],
          location: 'Los Angeles, CA',
          memberSince: '2024-01-05'
        },
        {
          id: 10,
          username: 'alex_neuropharm',
          name: 'Alex Kim, PhD',
          avatar_url: 'https://i.pravatar.cc/150?img=33',
          bio: 'Neuropharmacologist at Stanford studying LSD microdosing effects on cognition and mood regulation.',
          interests: ['Neuroscience', 'Research', 'Psychedelics'],
          location: 'Palo Alto, CA',
          memberSince: '2024-03-10'
        },
        {
          id: 11,
          username: 'rachel_harm_reduction',
          name: 'Rachel Green, MPH',
          avatar_url: 'https://i.pravatar.cc/150?img=24',
          bio: 'Harm reduction specialist and peer counselor. Co-founder of a psychedelic integration circle in Austin.',
          interests: ['Psychology', 'Therapy'],
          location: 'Austin, TX',
          memberSince: '2024-02-28'
        },
        {
          id: 12,
          username: 'daniel_mycology',
          name: 'Daniel Foster',
          avatar_url: 'https://i.pravatar.cc/150?img=51',
          bio: 'Mycologist and cultivation expert. Teaching courses on psilocybin mushroom biology and identification.',
          interests: ['Research', 'Psychedelics'],
          location: 'Eugene, OR',
          memberSince: '2024-03-05'
        },
        {
          id: 13,
          username: 'olivia_neuroscience',
          name: 'Dr. Olivia Patterson',
          avatar_url: 'https://i.pravatar.cc/150?img=32',
          bio: 'Cognitive neuroscientist using fMRI to map brain networks during psychedelic experiences. Published in Nature.',
          interests: ['Neuroscience', 'Research'],
          location: 'London, UK',
          memberSince: '2024-01-18'
        },
        {
          id: 14,
          username: 'marcus_counseling',
          name: 'Marcus Washington, LPC',
          avatar_url: 'https://i.pravatar.cc/150?img=11',
          bio: 'Licensed professional counselor specializing in ketamine-assisted therapy for depression and anxiety.',
          interests: ['Therapy', 'Psychology', 'Psychedelics'],
          location: 'Denver, CO',
          memberSince: '2024-02-10'
        },
        {
          id: 15,
          username: 'sophia_ethnobotany',
          name: 'Dr. Sophia Morales',
          avatar_url: 'https://i.pravatar.cc/150?img=44',
          bio: 'Ethnobotanist researching traditional ceremonial use of San Pedro cactus in Peru. 20 years fieldwork experience.',
          interests: ['Research', 'Psychedelics'],
          location: 'Santa Fe, NM',
          memberSince: '2024-01-30'
        },
        {
          id: 16,
          username: 'nathan_student',
          name: 'Nathan Brooks',
          avatar_url: 'https://i.pravatar.cc/150?img=52',
          bio: 'Undergraduate studying neuroscience at UC Santa Cruz. Passionate about psychedelic research and policy reform.',
          interests: ['Neuroscience', 'Psychology', 'Research'],
          location: 'Santa Cruz, CA',
          memberSince: '2024-03-15'
        },
        {
          id: 17,
          username: 'jessica_clinical',
          name: 'Dr. Jessica Turner, PsyD',
          avatar_url: 'https://i.pravatar.cc/150?img=47',
          bio: 'Clinical psychologist and certified psychedelic-assisted therapist. Training therapists in MDMA protocol.',
          interests: ['Therapy', 'Psychedelics', 'Research'],
          location: 'Chapel Hill, NC',
          memberSince: '2024-02-05'
        },
        {
          id: 18,
          username: 'william_policy',
          name: 'William Cooper, JD',
          avatar_url: 'https://i.pravatar.cc/150?img=56',
          bio: 'Drug policy attorney working on psychedelic decriminalization initiatives. Former prosecutor turned reformer.',
          interests: ['Psychology', 'Research'],
          location: 'Washington, DC',
          memberSince: '2024-01-22'
        },
        {
          id: 19,
          username: 'amanda_integration',
          name: 'Amanda Rivera, MA',
          avatar_url: 'https://i.pravatar.cc/150?img=16',
          bio: 'Transpersonal psychologist offering integration therapy and breathwork. Trained in Holotropic Breathwork.',
          interests: ['Therapy', 'Psychology'],
          location: 'Asheville, NC',
          memberSince: '2024-02-25'
        },
        {
          id: 20,
          username: 'chris_biochem',
          name: 'Prof. Christopher Lee, PhD',
          avatar_url: 'https://i.pravatar.cc/150?img=60',
          bio: 'Biochemistry professor researching DMT production in the pineal gland. Teaching psychedelic chemistry courses.',
          interests: ['Neuroscience', 'Research', 'Psychedelics'],
          location: 'Ann Arbor, MI',
          memberSince: '2024-01-12'
        },
        {
          id: 21,
          username: 'isabella_yoga',
          name: 'Isabella Santos',
          avatar_url: 'https://i.pravatar.cc/150?img=43',
          bio: 'Yoga instructor and somatic therapist integrating mindfulness with psychedelic preparation and integration.',
          interests: ['Therapy', 'Psychology'],
          location: 'Sedona, AZ',
          memberSince: '2024-03-08'
        },
        {
          id: 22,
          username: 'kevin_data',
          name: 'Kevin Patel, MS',
          avatar_url: 'https://i.pravatar.cc/150?img=68',
          bio: 'Data scientist analyzing clinical trial outcomes for psychedelic therapies. Building predictive models for treatment response.',
          interests: ['Research', 'Neuroscience'],
          location: 'San Diego, CA',
          memberSince: '2024-02-18'
        },
        {
          id: 23,
          username: 'lauren_nursing',
          name: 'Lauren Mitchell, RN',
          avatar_url: 'https://i.pravatar.cc/150?img=28',
          bio: 'Psychiatric nurse practitioner supporting patients through ketamine infusion therapy. 12 years in mental health.',
          interests: ['Therapy', 'Psychedelics'],
          location: 'Minneapolis, MN',
          memberSince: '2024-01-08'
        },
        {
          id: 24,
          username: 'ryan_philosophy',
          name: 'Dr. Ryan Anderson',
          avatar_url: 'https://i.pravatar.cc/150?img=70',
          bio: 'Philosophy professor exploring consciousness, phenomenology, and the philosophy of psychedelics.',
          interests: ['Psychology', 'Research'],
          location: 'Berkeley, CA',
          memberSince: '2024-03-12'
        },
        {
          id: 25,
          username: 'maya_indigenous',
          name: 'Maya Whitehorse',
          avatar_url: 'https://i.pravatar.cc/150?img=41',
          bio: 'Indigenous medicine keeper and cultural liaison. Educating on respectful engagement with sacred plant medicines.',
          interests: ['Psychedelics', 'Research'],
          location: 'Taos, NM',
          memberSince: '2024-02-12'
        }
      ];
      setMembers(mockMembers);
      setLoading(false);
    }, 500);
  }, []);

  // Memoize filtered and sorted members to prevent recalculation on every render
  const filteredMembers = useMemo(() => {
    // Filter and search members
    let filtered = [...members];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(query) ||
        member.username.toLowerCase().includes(query) ||
        member.bio.toLowerCase().includes(query)
      );
    }

    // Apply interest filter
    if (filterInterest !== 'all') {
      filtered = filtered.filter(member =>
        member.interests.includes(filterInterest)
      );
    }

    // Apply sorting
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.memberSince) - new Date(a.memberSince));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.memberSince) - new Date(b.memberSince));
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [searchQuery, sortBy, filterInterest, members]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box sx={{ py: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Members Directory
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Connect with {members.length} GSAPS community members
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <SearchTextField
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Interest</InputLabel>
                <Select
                  value={filterInterest}
                  onChange={(e) => setFilterInterest(e.target.value)}
                  label="Interest"
                >
                  <MenuItem value="all">All Interests</MenuItem>
                  {interests.filter(i => i !== 'All').map((interest) => (
                    <MenuItem key={interest} value={interest}>{interest}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  label="Sort By"
                >
                  <MenuItem value="newest">Newest First</MenuItem>
                  <MenuItem value="oldest">Oldest First</MenuItem>
                  <MenuItem value="name">Name (A-Z)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Members Grid */}
      {filteredMembers.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <PersonIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No members found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search or filters
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {filteredMembers.map((member) => (
            <Grid item xs={12} sm={6} md={4} key={member.id}>
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
                onClick={() => navigate(`/profile/${member.username}`)}
              >
                <CardContent>
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Avatar
                      src={member.avatar_url}
                      sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
                    >
                      {member.name.charAt(0)}
                    </Avatar>
                    <Typography variant="h6" gutterBottom>
                      {member.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      @{member.username}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      minHeight: 40,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {member.bio}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                    {member.interests.slice(0, 3).map((interest) => (
                      <Chip
                        key={interest}
                        label={interest}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>

                  <Typography variant="caption" color="text.secondary">
                    {member.location}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Members;
