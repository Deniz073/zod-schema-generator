export interface ValidationRule {
  id: string;
  type: string;
  message: string;
  value: string;
}

export interface SchemaField {
  id: string;
  name: string;
  type: string;
  validations: ValidationRule[];
  params: {
    coerce?: boolean;
    description?: string;
    invalid_type_error?: string;
    required_error?: string;
  };
}