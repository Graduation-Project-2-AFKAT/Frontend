import { useCallback } from "react";
import * as yup from "yup";
import { loginSchema, registerSchema } from ".";

type SchemaType = "login" | "register";

//! delete this, its replaced with official 'yupResolver' from @hookform/resolvers/yup deps
//* benefits of the official yupResolver:
// Is maintained by the React Hook Form team
// Has better TypeScript integration
// Is optimized for performance
// Handles schema updates properly
// Is well-documented and widely used

/**
 * Custom hook that creates a validation resolver for React Hook Form using Yup
 *
 * @param schemaType - Which schema to use ("login" or "register")
 * @returns A validation resolver function compatible with React Hook Form
 */
const useYupValidationResolver = (schemaType: SchemaType) => {
  // Select the appropriate schema based on the type
  const schema = schemaType === "login" ? loginSchema : registerSchema;

  return useCallback(
    async (data: unknown) => {
      try {
        const values = await schema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        const validationErrors = errors as yup.ValidationError;
        return {
          values: {},
          errors: validationErrors.inner
            ? validationErrors.inner.reduce(
                (
                  allErrors: Record<string, { type: string; message: string }>,
                  currentError: yup.ValidationError,
                ) => ({
                  ...allErrors,
                  [currentError.path || "unknown"]: {
                    type: currentError.type ?? "validation",
                    message: currentError.message,
                  },
                }),
                {},
              )
            : {},
        };
      }
    },
    [schema], // Dependency is now the selected schema
  );
};

export default useYupValidationResolver;
