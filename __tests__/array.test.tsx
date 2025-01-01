import { generateZodSchema } from "@/lib/generate-schema";
import { SchemaField } from "@/lib/types";
import { expect, test } from "vitest";

test('should handle basic array with element type', () => {
  const fields: SchemaField[] = [{
    id: '1',
    name: 'tags',
    type: 'array',
    validations: [],
    params: {
      elementType: 'string'
    }
  }];
  const result = generateZodSchema(fields);
  expect(result).toContain('tags: z.array(z.string())');
});

test('should handle tuple type correctly', () => {
  const fields: SchemaField[] = [{
    id: '1',
    name: 'coordinate',
    type: 'array',
    validations: [],
    params: {
      isTuple: true,
      tupleTypes: ['number', 'number']
    }
  }];
  const result = generateZodSchema(fields);
  expect(result).toContain('coordinate: z.tuple([z.number(), z.number()])');
});

test('should handle array validations correctly', () => {
  const fields: SchemaField[] = [{
    id: '1',
    name: 'items',
    type: 'array',
    validations: [
      { id: '1', type: 'min', message: 'Too few items', value: '1' },
      { id: '2', type: 'max', message: 'Too many items', value: '10' },
      { id: '3', type: 'nonempty', message: 'Cannot be empty', value: '' }
    ],
    params: {
      elementType: 'string'
    }
  }];
  const result = generateZodSchema(fields);
  expect(result).toContain('.min(1, { message: "Too few items" })');
  expect(result).toContain('.max(10, { message: "Too many items" })');
  expect(result).toContain('.nonempty({ message: "Cannot be empty" })');
});