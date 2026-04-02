export const config = {
  appName: 'AZ-900 Quiz App',
  domains: [
    'Cloud Concepts',
    'Azure Architecture and Services',
    'Azure Management and Governance'
  ],
  questionsPerKeyTerm: 1, // for now 1, later 5
  randomizeAnswers: true,
  showExplanation: true,
  theme: 'light' as 'light' | 'dark',
};