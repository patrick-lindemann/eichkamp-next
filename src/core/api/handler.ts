import { HttpMethod } from 'core/types/http';
import type { NextApiHandler } from 'next';
import { sendError } from './error';

export type Handlers = Partial<{
  [key in HttpMethod]: NextApiHandler;
}>;

/**
 * An API request handler wrapper for HTTP methods.
 * If no handler is specified for a given HTTP method, the response will be an HTTP Error 405.
 * @param handlers The request handlers for each HTTP method.
 * @returns The handler wrapper.
 */
export function handler(handlers: Handlers): NextApiHandler {
  return async (req, res) => {
    if (!req.method) {
      return sendError(res, 400);
    }
    // Retrieve the route for the specified request method
    const method = req.method.toLowerCase() as HttpMethod;
    const handler = handlers[method];
    if (!handler) {
      return sendError(res, 405);
    }
    try {
      return await handler(req, res);
    } catch (error) {
      return sendError(res, 500);
    }
  };
}
