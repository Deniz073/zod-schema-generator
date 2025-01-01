import { generateZodSchema } from "@/lib/generate-schema";
import { SchemaField } from "@/lib/types";
import { expect, test } from "vitest";

test('should handle all number validations correctly', () => {
  const fields: SchemaField[] = [{
    id: '1',
    name: 'age',
    type: 'number',
    validations: [
      { id: '1', type: 'min', message: 'Too young', value: '18' },
      { id: '2', type: 'max', message: 'Too old', value: '100' },
      { id: '3', type: 'int', message: 'Must be integer', value: '' },
      { id: '4', type: 'positive', message: 'Must be positive', value: '' }
    ],
    params: {}
  }];
  const result = generateZodSchema(fields);
  expect(result).toContain('.min(18, { message: "Too young" })');
  expect(result).toContain('.max(100, { message: "Too old" })');
  expect(result).toContain('.int({ message: "Must be integer" })');
  expect(result).toContain('.positive({ message: "Must be positive" })');
});