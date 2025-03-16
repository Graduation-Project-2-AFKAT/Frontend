import { useCallback } from "react";
import * as yup from "yup";

const useYupValidationResolver = (validationSchema: yup.ObjectSchema<any>) =>
  useCallback(
    async (data: any) => {
      try {
        const values = await validationSchema.validate(data, {
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
                  currentError: any,
                ) => ({
                  ...allErrors,
                  [currentError.path]: {
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
    [validationSchema],
  );

export default useYupValidationResolver;
