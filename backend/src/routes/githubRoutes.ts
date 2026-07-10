import { Router } from 'express';
import { getGitHubRepositories } from '../controllers/githubcontroller';

const router = Router();
router.get('/:username', getGitHubRepositories);

export default router;