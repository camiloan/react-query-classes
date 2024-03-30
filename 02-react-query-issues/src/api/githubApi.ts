import axios from 'axios';

export const githubApi = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',
  headers: {
    Authorization:
      'Bearer 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',
  },
});
