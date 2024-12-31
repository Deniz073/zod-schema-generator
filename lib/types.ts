export interface FunctionParameter {
  name: string;
  type: string;
  optional?: boolean;
}

export interface ValidationRule {
  id: string;
  type: string;
  message: string;
  value: string;
  transform?: string;
  keyType?: string;
  valueType?: string;
  discriminator?: string;
  cases?: { [key: string]: SchemaField[] };
}

export interface SchemaField {
  id: string;
  name: string;
  type: string;
  validations: ValidationRule[];
  params: {
    ipVersion?: string;
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
    isDiscriminatedUnion?: boolean;
    discriminator?: string;
    functionParams?: FunctionParameter[];
    returnType?: string;
    stringOptions?: {
      datetime?: {
        offset?: boolean;
        precision?: number;
      };
      ip?: {
        version?: 'v4' | 'v6';
      };
    };
    timezoneOptions?: {
      offset?: boolean;
      precision?: number;
    };
    discriminatedUnion?: {
      discriminator: string;
      cases: {
        [key: string]: {
          value: string;
          fields: SchemaField[];
        };
      };
    };
  };
}