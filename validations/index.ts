/**
 * Tests if a given string matches a specified regular expression.
 *
 * @param str - The input string to validate.
 * @param regEx - The regular expression to test the string against.
 * @returns `true` if the trimmed string matches the regular expression, otherwise `false`.
 */
export function testStringRegEx(str: string, regEx: RegExp): boolean {
    return regEx.test(str.trim());
}

export const allRequiredFieldsFilled = (fields: string[]) => {
    return fields.every((field) => {
        return field.length > 0;
    });
};
