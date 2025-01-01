import { generateZodSchema } from "@/lib/generate-schema";
import { SchemaField } from "@/lib/types";
import { expect, test } from "vitest";

test('should handle object with strict mode', () => {
  const fields: SchemaField[] = [{
    id: '1',
    name: 'settings',
    type: 'object',
    validations: [],
    params: {
      isStrict: true
    }
  }];
  const result = generateZodSchema(fields);
  expect(result).toContain('settings: z.object({}).strict()');
});

test('should handle object with passthrough', () => {
  const fields: SchemaField[] = [{
    id: '1',
    name: 'metadata',
    type: 'object',
    validations: [],
    params: {
      isPassthrough: true
    }
  }];
  const result = generateZodSchema(fields);
  expect(result).toContain('metadata: z.object({}).passthrough()');
});