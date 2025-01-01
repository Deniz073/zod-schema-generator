import { expect, test } from 'vitest';
import { generateZodSchema } from '../lib/generate-schema';
import type { SchemaField } from '../lib/types';

test('should handle all string validations correctly', () => {
  const fields: SchemaField[] = [{
    id: '1',
    name: 'email',
    type: 'string',
    validations: [
      { id: '1', type: 'email', message: 'Invalid email', value: '' },
      { id: '2', type: 'min', message: 'Too short', value: '5' },
      { id: '3', type: 'max', message: 'Too long', value: '100' }
    ],
    params: {}
  }];
  const result = generateZodSchema(fields);
  expect(result).toContain('.email({ message: "Invalid email" })');
  expect(result).toContain('.min(5, { message: "Too short" })');
  expect(result).toContain('.max(100, { message: "Too long" })');
});

test('should handle datetime options correctly', () => {
  const fields: SchemaField[] = [{
    id: '1',
    name: 'createdAt',
    type: 'string',
    validations: [],
    params: {
      stringOptions: {
        datetime: {
          offset: true,
          precision: 3
        }
      }
    }
  }];
  const result = generateZodSchema(fields);
  expect(result).toContain('.datetime({ "offset": true, "precision": 3 })');
});

test('should handle IP validation options correctly', () => {
  const fields: SchemaField[] = [{
    id: '1',
    name: 'ipAddress',
    type: 'string',
    validations: [],
    params: {
      stringOptions: {
        ip: {
          version: 'v4'
        }
      }
    }
  }];
  const result = generateZodSchema(fields);
  expect(result).toContain('.ip({ version: "v4" })');
});