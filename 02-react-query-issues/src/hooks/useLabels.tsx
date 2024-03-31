import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../api/githubApi';
import { Label } from '../interfaces/label';
import { sleep } from '../helpers/sleep';

const getLabels = async (): Promise<Label[]> => {
  await sleep(2);
  const { data } = await githubApi.get<Label[]>('/labels?per_page=100');
  return data;
};

const placeholderLabels: Label[] = [
  {
    id: 791921801,
    node_id: 'MDU6TGFiZWw3OTE5MjE4MDE=',
    url: 'https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F',
    name: '❤️',
    color: 'ffffff',
    default: false,
    description: 'null',
  },
  {
    id: 69105358,
    node_id: 'MDU6TGFiZWw2OTEwNTM1OA==',
    url: 'https://api.github.com/repos/facebook/react/labels/Browser:%20Safari',
    name: 'Browser: Safari',
    color: 'c7def8',
    default: false,
    description: 'null',
  },
];

export const useLabels = () => {
  const labelsQuery = useQuery({
    queryKey: ['labels'],
    queryFn: getLabels,
    refetchOnWindowFocus: false,
    staleTime: 10000 * 60,
    // initialData: placeholderLabels,
    // placeholderData: placeholderLabels,
  });
  return labelsQuery;
};
