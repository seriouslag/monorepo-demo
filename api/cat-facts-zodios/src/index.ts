import { createApiClient } from './generated/client';
import { ZodiosHooks } from '@zodios/react';

const url = 'https://catfact.ninja/';

export * from './generated/client';
export const catFactsZodios = createApiClient(url);
export const catFactsZodiosHooks = new ZodiosHooks('catfacts', catFactsZodios);
