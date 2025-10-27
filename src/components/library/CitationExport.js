import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  ButtonGroup,
  Paper,
  IconButton,
  Tooltip,
  Snackbar
} from '@mui/material';
import {
  ContentCopy as CopyIcon,
  Download as DownloadIcon
} from '@mui/icons-material';

/**
 * CitationExport Component
 * Generate and export citations in multiple formats
 */
const CitationExport = ({ paper }) => {
  const [format, setFormat] = useState('bibtex');
  const [copySuccess, setCopySuccess] = useState(false);

  // Generate citation key from first author and year
  const getCitationKey = () => {
    if (!paper.authors || paper.authors.length === 0) return 'unknown';
    const firstAuthor = typeof paper.authors[0] === 'string'
      ? paper.authors[0]
      : paper.authors[0].name;
    const lastName = firstAuthor.split(' ').pop().toLowerCase();
    return `${lastName}${paper.year}`;
  };

  // Format author list for citations
  const formatAuthors = (citationFormat) => {
    if (!paper.authors || paper.authors.length === 0) return '';

    const authorNames = paper.authors.map(author =>
      typeof author === 'string' ? author : author.name
    );

    switch (citationFormat) {
      case 'bibtex':
        return authorNames.join(' and ');

      case 'apa':
        if (authorNames.length === 1) {
          return authorNames[0];
        } else if (authorNames.length === 2) {
          return `${authorNames[0]} & ${authorNames[1]}`;
        } else if (authorNames.length <= 20) {
          const lastAuthor = authorNames[authorNames.length - 1];
          const otherAuthors = authorNames.slice(0, -1).join(', ');
          return `${otherAuthors}, & ${lastAuthor}`;
        } else {
          // More than 20 authors - list first 19 then ellipsis then last
          const first19 = authorNames.slice(0, 19).join(', ');
          const lastAuthor = authorNames[authorNames.length - 1];
          return `${first19}, ... ${lastAuthor}`;
        }

      case 'mla':
        if (authorNames.length === 1) {
          return authorNames[0];
        } else if (authorNames.length === 2) {
          return `${authorNames[0]} and ${authorNames[1]}`;
        } else {
          return `${authorNames[0]}, et al.`;
        }

      default:
        return authorNames.join(', ');
    }
  };

  // Generate citation in selected format
  const generateCitation = () => {
    const citationKey = getCitationKey();
    const authors = formatAuthors(format);

    switch (format) {
      case 'bibtex':
        return `@article{${citationKey},
  author = {${authors}},
  title = {${paper.title}},
  journal = {${paper.journal}},
  year = {${paper.year}},
  volume = {${paper.volume || ''}},
  number = {${paper.issue || ''}},
  pages = {${paper.pages || ''}},
  doi = {${paper.doi || ''}}
}`;

      case 'apa':
        let apa = `${authors} (${paper.year}). ${paper.title}. `;
        apa += `${paper.journal}`;
        if (paper.volume) apa += `, ${paper.volume}`;
        if (paper.issue) apa += `(${paper.issue})`;
        if (paper.pages) apa += `, ${paper.pages}`;
        if (paper.doi) apa += `. https://doi.org/${paper.doi}`;
        return apa;

      case 'mla':
        let mla = `${authors}. "${paper.title}." `;
        mla += `${paper.journal}`;
        if (paper.volume) mla += `, vol. ${paper.volume}`;
        if (paper.issue) mla += `, no. ${paper.issue}`;
        mla += `, ${paper.year}`;
        if (paper.pages) mla += `, pp. ${paper.pages}`;
        if (paper.doi) mla += `. doi:${paper.doi}`;
        return mla + '.';

      default:
        return '';
    }
  };

  const handleCopy = async () => {
    const citation = generateCitation();
    try {
      await navigator.clipboard.writeText(citation);
      setCopySuccess(true);
    } catch (err) {
      console.error('Failed to copy citation:', err);
    }
  };

  const handleDownload = () => {
    const citation = generateCitation();
    const blob = new Blob([citation], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${getCitationKey()}.${format === 'bibtex' ? 'bib' : 'txt'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const citation = generateCitation();

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Cite this Paper
      </Typography>

      {/* Format Selection */}
      <ButtonGroup size="small" sx={{ mb: 2 }}>
        <Button
          variant={format === 'bibtex' ? 'contained' : 'outlined'}
          onClick={() => setFormat('bibtex')}
        >
          BibTeX
        </Button>
        <Button
          variant={format === 'apa' ? 'contained' : 'outlined'}
          onClick={() => setFormat('apa')}
        >
          APA
        </Button>
        <Button
          variant={format === 'mla' ? 'contained' : 'outlined'}
          onClick={() => setFormat('mla')}
        >
          MLA
        </Button>
      </ButtonGroup>

      {/* Citation Display */}
      <Paper
        sx={{
          p: 2,
          mb: 2,
          bgcolor: 'grey.50',
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          position: 'relative'
        }}
      >
        {citation}

        {/* Copy Button */}
        <Tooltip title="Copy to clipboard">
          <IconButton
            size="small"
            onClick={handleCopy}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'white',
              '&:hover': {
                bgcolor: 'grey.100'
              }
            }}
          >
            <CopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Paper>

      {/* Actions */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          variant="outlined"
          startIcon={<CopyIcon />}
          onClick={handleCopy}
          sx={{ textTransform: 'none' }}
        >
          Copy Citation
        </Button>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
          sx={{ textTransform: 'none' }}
        >
          Download
        </Button>
      </Box>

      {/* Copy Success Snackbar */}
      <Snackbar
        open={copySuccess}
        autoHideDuration={2000}
        onClose={() => setCopySuccess(false)}
        message="Citation copied to clipboard!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};

export default CitationExport;
