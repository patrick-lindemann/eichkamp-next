import { sendError } from 'core/api/error';
import { Schema } from 'joi';
import {
  BodyValidationHandler,
  ParsedQuery,
  ParsedQueryValue,
  Query,
  QueryValidationHandler
} from './types';

/**
 * Adds
 * @param handler
 * @param schema
 * @returns
 */
export const withQueryValidator: QueryValidationHandler = (handler, schema) => {
  return async (req, res) => {
    let query: ParsedQuery;
    try {
      query = parseQuery(req.query, schema);
    } catch (error: any) {
      return sendError(res, 400, error.message);
    }
    const { value, error } = schema.validate(query);
    if (error) {
      return sendError(res, 400, error.message);
    }
    req.query = value;
    return await handler(req, res);
  };
};

/**
 *
 * @param handler
 * @param schema
 * @returns
 */
export const withBodyValidator: BodyValidationHandler = (handler, schema) => {
  return async (req, res) => {
    const { value, error } = schema.validate(req.body);
    if (error) {
      return sendError(res, 400, error.message);
    }
    req.body = value;
    return await handler(req, res);
  };
};

function parseQuery<S>(query: Query, schema: Schema<S>): ParsedQuery {
  const result: ParsedQuery = {};
  // eslint-disable-next-line prefer-const
  for (let [key, value] of Object.entries(query)) {
    if (value === undefined) {
      continue;
    }
    // Special case: Axios passes array parameters with trailing
    // brackets in the key name ("key[]" instead of "key")
    // Remove those brackets from the key before continuing
    key = key.replace(/\[\]$/, '');
    const type = schema.extract(key).type as string;
    if (type === 'array') {
      const itemType = schema.extract(key).$_terms.items[0].type;
      const array: string[] = Array.isArray(value) ? value : value.split(',');
      const parsedArray = array.map((item) => parseValue(key, item, itemType));
      result[key] = parsedArray;
    } else {
      if (Array.isArray(value)) {
        throw new Error(
          `Multiple values ${value} were defined for query parameter ${key}, but only one value is allowed.`
        );
      }
      const parsedValue = parseValue(key, value, type);
      result[key] = parsedValue;
    }
  }
  return result;
}

function parseValue(
  key: string,
  value: string,
  type: string
): ParsedQueryValue {
  switch (type) {
    case 'boolean':
      return parseBoolean(key, value);
    case 'number':
      return parseNumber(key, value);
    case 'string':
    default:
      return value;
  }
}

function parseNumber(key: string, value: string): number {
  const str = value.trim().toLowerCase();
  const number = parseFloat(str);
  if (isNaN(number)) {
    throw new Error(
      `Invalid numeric value "${value}" specified for parameter "${key}".`
    );
  }
  return number;
}

function parseBoolean(key: string, value: string): boolean {
  const str = value.trim().toLowerCase();
  if (str !== 'true' && str !== 'false') {
    throw new Error(
      `Invalid boolean value "${value}" specified for parameter "${key}".`
    );
  }
  return str === 'true';
}
