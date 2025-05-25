export const requiredFieldsFilled = (fields: string[]) => {
    return fields.every((field) => {
        return field.length > 0;
    });
};
