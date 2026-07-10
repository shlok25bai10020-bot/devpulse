import { Request, Response } from 'express';

export const getGitHubRepositories = async (req: Request, res: Response) => {
  const { username } = req.params;

  if (!username) {
    return res.status(400).json({ message: 'GitHub username is required' });
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'User-Agent': 'DevPulse-App'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from GitHub API');
    }

    const repos = (await response.json()) as any[];
    
    const formattedRepos = repos.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      stargazers_count: repo.stargazers_count,
      language: repo.language
    }));

    res.json(formattedRepos);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error communicating with GitHub' });
  }
};