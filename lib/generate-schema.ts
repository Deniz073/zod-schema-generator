// lib/generate-schema.ts
import type { SchemaField } from "./types";

export function generateZodSchema(fields: SchemaField[]): string {
  if (fields.length === 0) {
    return '// Add fields to generate schema\n\nconst schema = z.object({});';
  }

  const imports = 'import { z } from "zod";\n\n';

  const schemaFields = fields
    .map((field) => {
      const validations = generateValidations(field);
      return `  ${field.name}: ${validations}`;
    })
    .join(",\n");

  return `${imports}const schema = z.object({\n${schemaFields}\n})${fields.some(f => f.params.isAsync) ? '.parseAsync' : '.parse'
    };`;
}

function generateValidations(field: SchemaField): string {
  const params: string[] = [];

  if (field.params.coerce) params.push('coerce: true');
  if (field.params.description) params.push(`description: "${field.params.description}"`);
  if (field.params.invalid_type_error) params.push(`invalid_type_error: "${field.params.invalid_type_error}"`);
  if (field.params.required_error) params.push(`required_error: "${field.params.required_error}"`);

  const paramsString = params.length ? `, { ${params.join(', ')} }` : '';
  let schema = '';

  switch (field.type) {
    case 'array':
      if (field.params.isTuple && field.params.tupleTypes?.length) {
        schema = `z.tuple([${field.params.tupleTypes.map(t => `z.${t}()`).join(', ')}])`;
      } else {
        schema = `z.array(z.${field.params.elementType || 'string'}()${paramsString})`;
      }
      break;

    case 'record':
      schema = `z.record(z.${field.params.keyType || 'string'}(), z.${field.params.valueType || 'string'}()${paramsString})`;
      break;

    case 'map':
      schema = `z.map(z.${field.params.keyType || 'string'}(), z.${field.params.valueType || 'string'}()${paramsString})`;
      break;

    case 'set':
      schema = `z.set(z.${field.params.elementType || 'string'}()${paramsString})`;
      break;

    case 'bigint':
      schema = `z.bigint(${params.length ? `{ ${params.join(', ')} }` : ''})`;
      break;

    case 'any':
      schema = 'z.any()';
      break;

    case 'unknown':
      schema = 'z.unknown()';
      break;

    case 'void':
      schema = 'z.void()';
      break;

    case 'enum':
      if (field.params.enumValues?.length) {
        schema = `z.enum([${field.params.enumValues.map(v => `"${v}"`).join(', ')}]${paramsString})`;
      }
      break;

    case 'object':
      schema = `z.object({}${paramsString})`;
      if (field.params.isStrict) schema += '.strict()';
      if (field.params.isPassthrough) schema += '.passthrough()';
      if (field.params.pickOmitFields?.length) {
        schema += `.${field.params.pickOmitType || 'pick'}({${field.params.pickOmitFields.map(f => `${f}: true`).join(', ')
          }})`;
      }
      break;

    default:
      if (field.params.unionTypes?.length) {
        schema = `z.union([${field.params.unionTypes.map(t => `z.${t}()`).join(', ')}]${paramsString})`;
      } else {
        schema = `z.${field.type}(${params.length ? `{ ${params.join(', ')} }` : ''})`;
      }
  }

  // Add validations
  field.validations.forEach((validation) => {
    const { type, value, message, transform } = validation;
    const addMessage = message ? `, { message: "${message}" }` : "";

    switch (type) {
      case "optional":
        schema += ".optional()";
        break;
      case "nullable":
        schema += ".nullable()";
        break;
      case "default":
        schema += `.default(${value})`;
        break;
      case "transform":
        if (transform) {
          schema += `.transform((val) => ${transform})`;
        }
        break;
      case "min":
        schema += `.min(${value}${addMessage})`;
        break;
      case "max":
        schema += `.max(${value}${addMessage})`;
        break;
      case "length":
        schema += `.length(${value}${addMessage})`;
        break;
      case "email":
        schema += `.email(${addMessage})`;
        break;
      case "url":
        schema += `.url(${addMessage})`;
        break;
      case "uuid":
        schema += `.uuid(${addMessage})`;
        break;
      case "regex":
        schema += `.regex(${value}${addMessage})`;
        break;
      case "startsWith":
        schema += `.startsWith("${value}"${addMessage})`;
        break;
      case "endsWith":
        schema += `.endsWith("${value}"${addMessage})`;
        break;
      case "trim":
        schema += `.trim()`;
        break;
      case "toLowerCase":
        schema += `.toLowerCase()`;
        break;
      case "toUpperCase":
        schema += `.toUpperCase()`;
        break;
      case "int":
        schema += `.int(${addMessage})`;
        break;
      case "positive":
        schema += `.positive(${addMessage})`;
        break;
      case "negative":
        schema += `.negative(${addMessage})`;
        break;
      case "multipleOf":
        schema += `.multipleOf(${value}${addMessage})`;
        break;
      case "finite":
        schema += `.finite(${addMessage})`;
        break;
      case "safe":
        schema += `.safe(${addMessage})`;
        break;
      case "nonempty":
        schema += `.nonempty(${addMessage})`;
        break;
      case "element":
        if (field.type === 'array' && !field.params.isTuple) {
          const elementParams = params.length ? `, { ${params.join(', ')} }` : '';
          schema = `z.array(z.${value}()${elementParams})`;
        }
        break;
      case "async":
        schema += `.refine(async (val) => ${value}, ${addMessage})`;
        break;
      case "min":
        if (field.type === 'bigint') {
          schema += `.min(BigInt(${value})${addMessage})`;
        } else {
          schema += `.min(${value}${addMessage})`;
        }
        break;
      case "max":
        if (field.type === 'bigint') {
          schema += `.max(BigInt(${value})${addMessage})`;
        } else {
          schema += `.max(${value}${addMessage})`;
        }
        break;
      case "multipleOf":
        if (field.type === 'bigint') {
          schema += `.multipleOf(BigInt(${value})${addMessage})`;
        } else {
          schema += `.multipleOf(${value}${addMessage})`;
        }
        break;
      case "size":
        if (field.type === 'set') {
          schema += `.size(${value}${addMessage})`;
        }
        break;  
    }
  });

  return schema;
}