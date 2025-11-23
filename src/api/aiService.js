const delay = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms));

const buildSummary = (notes = []) => {
  const latest = notes.slice(-3).map((n) => `• ${n.body}`).join('\n');
  return `Live symposium summary:\n${latest || 'No notes captured yet.'}`;
};

export const generateSummary = async (notes) => {
  await delay();
  return buildSummary(notes);
};

export const actionItems = async (notes) => {
  await delay();
  const base = notes?.[notes.length - 1]?.body || 'Capture safety checklist and follow-up sessions.';
  return [
    `Assign QA to validate dosing timeline — derived from: ${base}`,
    'Share integration survey link with attendees',
    'Summon moderators to approve citations before publishing'
  ];
};

export const citationSuggestions = async (notes) => {
  await delay();
  const keyword = notes?.[0]?.body?.split(' ')[0] || 'psychedelic therapy';
  return [
    {
      id: 'cit-ai-1',
      title: `${keyword} outcomes in 2024 multi-site trial`,
      doi: '10.1000/ai.cited.2024.001'
    },
    {
      id: 'cit-ai-2',
      title: 'Integration frameworks with community facilitators',
      doi: '10.1000/ai.cited.2024.002'
    }
  ];
};

export default {
  generateSummary,
  actionItems,
  citationSuggestions
};
