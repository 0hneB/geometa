import { getData } from '$lib/server/mapsCache';
import { MAPS_VIEW_MODE_COOKIE, parseViewMode } from '$lib/view-mode';
import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
  const mapsViewMode = parseViewMode(cookies.get(MAPS_VIEW_MODE_COOKIE), 'cards');

  if (env.SKIP_MAPS_LOAD === 'true') {
    return {
      mapsViewMode,
      regionList: Promise.resolve([]),
      allMaps: Promise.resolve([])
    };
  }

  const dataPromise = getData();
  return {
    mapsViewMode,
    regionList: dataPromise.then((data) => data.regionsList),
    allMaps: dataPromise.then((data) => data.allMaps)
  };
};
