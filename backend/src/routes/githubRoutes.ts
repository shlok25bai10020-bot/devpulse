import { Router } from 'express';

const router = Router();

router.get('/repos/:username', async (req, res) => {
  try {
    const mockRepos = [
      { id: 1, name: 'devpulse-core', description: 'Main architecture repository', html_url: '#', stargazers_count: 12 },
      { id: 2, name: 'mern-api-setup', description: 'Express and Mongoose core files', html_url: '#', stargazers_count: 5 },
      { id: 3, name: 'portfolio-v3', description: 'Personal branding workspace', html_url: '#', stargazers_count: 8 }
    ];
    res.json(mockRepos);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch github metrics' });
  }
});

export default router;