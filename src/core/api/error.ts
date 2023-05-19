import { httpMessages, HttpStatus } from 'core/types/http';
import type { NextApiResponse } from 'next';

type ErrorResponseBody = {
  status: HttpStatus;
  message: string;
};

/**
 * Responds to a request with an error JSON payload.
 * @param res The response object.
 * @param status The error HTTP code.
 * @param message The error message.
 */
export function sendError(
  res: NextApiResponse,
  status: HttpStatus,
  message?: string
): Promise<void> | void {
  const error: ErrorResponseBody = {
    status: status,
    message: message || httpMessages[status]
  };
  return res.status(status).json(error);
}
