import { expect, test } from 'vitest';
import { generateZodSchema } from '../lib/generate-schema';
import type { SchemaField } from '../lib/types';

test('generateZodSchema should return empty schema when no fields are provided', () => {
  const result = generateZodSchema([]);
  expect(result).toBe('// Add fields to generate schema\n\nconst schema = z.object({});');
});

test('should generate a basic schema with a single string field', () => {
  const fields: SchemaField[] = [{
    id: '1',
    name: 'username',
    type: 'string',
    validations: [],
    params: {}
  }];
  const result = generateZodSchema(fields);
  expect(result).toContain('username: z.string()');
});

test('should include schema parameters when provided', () => {
  const fields: SchemaField[] = [{
    id: '1',
    name: 'age',
    type: 'number',
    validations: [],
    params: {
      description: "User's age",
      invalid_type_error: "Must be a number",
      required_error: "Age is required"
    }
  }];
  const result = generateZodSchema(fields);
  expect(result).toContain('description: "User\'s age"');
  expect(result).toContain('invalid_type_error: "Must be a number"');
  expect(result).toContain('required_error: "Age is required"');
});