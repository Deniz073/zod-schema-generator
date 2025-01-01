import { generateZodSchema } from "@/lib/generate-schema";
import { SchemaField } from "@/lib/types";
import { expect, test } from "vitest";

test('should handle missing field names gracefully', () => {
  const fields: SchemaField[] = [{
    id: '1',
    name: '',
    type: 'string',
    validations: [],
    params: {}
  }];
  expect(() => generateZodSchema(fields)).not.toThrow();
});

test('should handle invalid validation combinations gracefully', () => {
  const fields: SchemaField[] = [{
    id: '1',
    name: 'test',
    type: 'number',
    validations: [
      { id: '1', type: 'email', message: 'Invalid', value: '' } // Invalid for number
    ],
    params: {}
  }];
  expect(() => generateZodSchema(fields)).not.toThrow();
});