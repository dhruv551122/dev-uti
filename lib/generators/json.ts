export type JsonFieldType =
  | "string"
  | "number"
  | "boolean"
  | "email"
  | "date";

export interface JsonField {
  id: string;
  name: string;
  type: JsonFieldType;
}

const randomString = (length = 8) => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  return Array.from({ length }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
};

const randomEmail = () => {
  return `${randomString(8).toLowerCase()}@example.com`;
};

const randomNumber = () => {
  return Math.floor(Math.random() * 1000);
};

const randomBoolean = () => {
  return Math.random() > 0.5;
};

const randomDate = () => {
  const start = new Date(2020, 0, 1).getTime();
  const end = new Date().getTime();

  return new Date(
    start + Math.random() * (end - start)
  ).toISOString();
};

const generateValue = (type: JsonFieldType) => {
  switch (type) {
    case "number":
      return randomNumber();

    case "boolean":
      return randomBoolean();

    case "email":
      return randomEmail();

    case "date":
      return randomDate();

    case "string":
    default:
      return randomString();
  }
};

export function generateJson(
  fields: JsonField[],
  count: number
): Record<string, unknown>[] {
  if (count < 1) {
    throw new Error(
      "Number of records must be at least 1."
    );
  }

  if (count > 10000) {
    throw new Error(
      "Number of records cannot exceed 10,000."
    );
  }

  const validFields = fields.filter(
    (field) => field.name.trim().length > 0
  );

  if (validFields.length === 0) {
    throw new Error(
      "At least one field is required."
    );
  }

  return Array.from({ length: count }, () => {
    const object: Record<string, unknown> = {};

    validFields.forEach((field) => {
      object[field.name.trim()] =
        generateValue(field.type);
    });

    return object;
  });
}