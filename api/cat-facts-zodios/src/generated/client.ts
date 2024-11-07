import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

type PageResult = {
  /**
   * @example 1
   */
  current_page: number;
  /**
   * @example "https://catfact.ninja/breeds?page=3"
   */
  next_page_url: string | null;
  /**
   * @example "https://catfact.ninja/breeds"
   */
  path: string;
  /**
   * @example 25
   */
  per_page: number;
  /**
   * @example "https://catfact.ninja/breeds?page=1"
   */
  prev_page_url: string | null;
  /**
   * @example 25
   */
  to: number;
  /**
   * @example 98
   */
  total: number;
  /**
   * @example "https://catfact.ninja/breeds?page=1"
   */
  first_page_url: string;
  /**
   * @example 1
   */
  from: number;
  /**
   * @example 4
   */
  last_page: number;
  /**
   * @example "https://catfact.ninja/breeds?page=4"
   */
  last_page_url: string;
  links: Array<Link>;
};
type Link = {
  /**
   * @example "https://catfact.ninja/breeds?page=2"
   */
  url: string | null;
  label: string;
  /**
   * @example true
   */
  active: boolean;
};

const Breed = z
  .object({
    breed: z.string().describe('Breed'),
    country: z.string().describe('Country'),
    origin: z.string().describe('Origin'),
    coat: z.string().describe('Coat'),
    pattern: z.string().describe('Pattern'),
  })
  .passthrough();
const Link: z.ZodType<Link> = z
  .object({
    url: z.string().nullable(),
    label: z.string(),
    active: z.boolean(),
  })
  .passthrough();
const PageResult: z.ZodType<PageResult> = z
  .object({
    current_page: z.number().int(),
    next_page_url: z.string().nullable(),
    path: z.string(),
    per_page: z.number().int(),
    prev_page_url: z.string().nullable(),
    to: z.number().int(),
    total: z.number().int(),
    first_page_url: z.string(),
    from: z.number().int(),
    last_page: z.number().int(),
    last_page_url: z.string(),
    links: z.array(Link),
  })
  .passthrough();
const CatFact = z
  .object({
    fact: z.string().describe('Fact'),
    length: z.number().int().describe('Length'),
  })
  .passthrough();

export const schemas = {
  Breed,
  Link,
  PageResult,
  CatFact,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/breeds',
    alias: 'getBreeds',
    description: `Returns a a list of breeds`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'page',
        type: 'Query',
        schema: z.number().int().describe('page number').optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z
          .number()
          .int()
          .describe('limit the amount of results returned')
          .optional(),
      },
    ],
    response: z
      .object({ data: z.array(Breed) })
      .partial()
      .passthrough()
      .and(PageResult),
  },
  {
    method: 'get',
    path: '/fact',
    alias: 'getRandomFact',
    description: `Returns a random fact`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'max_length',
        type: 'Query',
        schema: z
          .number()
          .int()
          .describe('maximum length of returned fact')
          .optional(),
      },
    ],
    response: CatFact,
    errors: [
      {
        status: 404,
        description: `Fact not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: 'get',
    path: '/facts',
    alias: 'getFacts',
    description: `Returns a a list of facts`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'max_length',
        type: 'Query',
        schema: z
          .number()
          .int()
          .describe('maximum length of returned fact')
          .optional(),
      },
      {
        name: 'page',
        type: 'Query',
        schema: z.number().int().describe('page number').optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z
          .number()
          .int()
          .describe('limit the amount of results returned')
          .optional(),
      },
    ],
    response: z.array(
      z
        .object({ data: z.array(CatFact) })
        .partial()
        .passthrough()
        .and(PageResult)
    ),
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
