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

  return `${imports}const schema = z.object({\n${schemaFields}\n});`;
}

function generateValidations(field: SchemaField): string {
  const params: string[] = [];

  if (field.params.coerce) params.push('coerce: true');
  if (field.params.description) params.push(`description: "${field.params.description}"`);
  if (field.params.invalid_type_error) params.push(`invalid_type_error: "${field.params.invalid_type_error}"`);
  if (field.params.required_error) params.push(`required_error: "${field.params.required_error}"`);

  let schema = `z.${field.type}(${params.length ? `{ ${params.join(', ')} }` : ''})`;

  field.validations.forEach((validation) => {
    const { type, value, message } = validation;
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
      case "nonempty":
        schema += `.nonempty(${addMessage})`;
        break;
    }
  });

  return schema;
}