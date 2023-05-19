import { Schema } from 'joi';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

/**
 * Query parameters that are passed in queries (usually by a GET query)
 *
 * Example: GET http://example.com/endpoint?name=Max&active=true&ages[]=24&ages[]=25
 * Values: { name: "Max", age: "true", ages: ["24", "25"] }
 */
export type QueryValue = string[] | string;

/**
 * A
 */
export type Query = Partial<{ [key: string]: QueryValue }>;

/**
 *
 * Example: GET http://example.com/endpoint?name=Max&active=true&ages[]=24&ages[]=25
 * Values: { name: "Max", active: true, ages: [24, 25] }
 */
export type ParsedQueryValue = boolean | number | string;

/**
 *
 */
export type ParsedQuery = Partial<{
  [key: string]: ParsedQueryValue | ParsedQueryValue[];
}>;

/**
 *
 */
export type NextApiRequestWithValidatedQuery<S = any> = NextApiRequest & {
  query: S;
};

/**
 *
 */
export type NextApiHandlerWithValidatedQuery<S = any, T = any> = (
  req: NextApiRequestWithValidatedQuery<S>,
  res: NextApiResponse<T>
) => Promise<unknown> | unknown;

/**
 *
 */
export type NextApiRequestWithValidatedBody<S = any> = NextApiRequest & {
  body: S;
};

/**
 *
 */
export type NextApiHandlerWithValidatedBody<S = any, T = any> = (
  req: NextApiRequestWithValidatedBody<S>,
  res: NextApiResponse<T>
) => Promise<unknown> | unknown;

/**
 *
 */
export type QueryValidationHandler<S = any, T = any> = (
  handler: NextApiHandlerWithValidatedQuery<S, T>,
  schema: Schema<S>
) => NextApiHandler<T>;

/**
 *
 */
export type BodyValidationHandler<S = any, T = any> = (
  handler: NextApiHandlerWithValidatedBody<S, T>,
  schema: Schema<S>
) => NextApiHandler<T>;
