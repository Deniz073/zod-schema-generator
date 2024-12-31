// lib/types.ts
export interface ValidationRule {
  id: string;
  type: string;
  message: string;
  value: string;
  transform?: string;
  keyType?: string;  
  valueType?: string; 
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
    enumValues?: string[];
    unionTypes?: string[];
    isStrict?: boolean;
    isPassthrough?: boolean;
    pickOmitFields?: string[];
    pickOmitType?: 'pick' | 'omit';
    elementType?: string;
    keyType?: string;
    valueType?: string;
    isTuple?: boolean;
    tupleTypes?: string[];
    isAsync?: boolean;
  };
}