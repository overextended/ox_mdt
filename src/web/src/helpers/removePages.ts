import { queryClient } from '../main';

export function removePages(queryKey: string[]) {
  queryClient.setQueriesData<{ pages: unknown[][]; pageParams: number[] }>(queryKey, (data) => {
    // for some reason this is receiving player data data,
    // not sure where from at the writing of this comment
    if (!data || !data.pages || !data.pageParams) return;

    return {
      pages: data.pages.slice(0, 1),
      pageParams: data.pageParams.slice(0, 1),
    };
  });
}
