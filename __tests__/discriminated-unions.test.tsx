import { generateZodSchema } from "@/lib/generate-schema";
import { SchemaField } from "@/lib/types";
import { expect, test } from "vitest";

test('should generate correct discriminated union schema', () => {
  const fields: SchemaField[] = [{
    id: '1',
    name: 'shape',
    type: 'object',
    validations: [],
    params: {
      isDiscriminatedUnion: true,
      discriminatedUnion: {
        discriminator: 'type',
        cases: {
          circle: {
            value: 'circle',
            fields: [
              {
                id: '2',
                name: 'type',
                type: 'string',
                validations: [],
                params: {}
              },
              {
                id: '3',
                name: 'radius',
                type: 'number',
                validations: [],
                params: {}
              }
            ]
          },
          square: {
            value: 'square',
            fields: [
              {
                id: '4',
                name: 'type',
                type: 'string',
                validations: [],
                params: {}
              },
              {
                id: '5',
                name: 'size',
                type: 'number',
                validations: [],
                params: {}
              }
            ]
          }
        }
      }
    }
  }];

  const result = generateZodSchema(fields);

  // Test the complete structure
  expect(result).toContain('z.discriminatedUnion("type"');
  expect(result).toContain('type: z.literal("circle")');
  expect(result).toContain('type: z.literal("square")');
  expect(result).toContain('radius: z.number()');
  expect(result).toContain('size: z.number()');
});