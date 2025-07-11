/**
 * Checks if all required fields in a payload are filled
 * @param payload Object containing the fields to check
 * @param fields Array of field names that are required
 * @throws Error if any required field is empty
 */
export function checkRequiredFields<T extends Record<string, unknown>>(payload: T, fields: string[]) {
    for (const field of fields) {
        if (!payload[field as keyof T]) {
            throw new Error('All required fields must be filled');
        }
    }
}
