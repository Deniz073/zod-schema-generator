import { generateZodSchema } from "@/lib/generate-schema";
import { SchemaField } from "@/lib/types";
import { expect, test } from "vitest";

test('should generate correct function schema', () => {
  const fields: SchemaField[] = [{
    id: '1',
    name: 'callback',
    type: 'function',
    validations: [],
    params: {
      functionParams: [
        { name: 'id', type: 'string' },
        { name: 'count', type: 'number', optional: true }
      ],
      returnType: 'boolean'
    }
  }];
  const result = generateZodSchema(fields);
  expect(result).toContain('callback: z.function()');
  expect(result).toContain('.args(z.string(), z.number().optional())');
  expect(result).toContain('.returns(z.boolean())');
});