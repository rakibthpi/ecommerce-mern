const handleDuplicateValue = (error: any) => {
  const fieldName = Object.keys(error.keyValue)[0]; // Extract the field name causing the duplication
  const duplicateValue = error.keyValue[fieldName]; // Extract the duplicated value

  return {
    statusCode: 409, // Conflict HTTP status code
    message: `Duplicate value found for ${fieldName}: ${duplicateValue}. Please use a different value.`,
    errorSources: [
      {
        path: fieldName,
        message: `The value ${duplicateValue} for the field ${fieldName} already exists.`,
      },
    ],
  };
};

export default handleDuplicateValue;
