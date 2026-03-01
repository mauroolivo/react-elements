/**
 * Simple localStorage utility hook scoped to a single key.
 *
 * Provides helper methods to set, read, and remove JSON-serialized values.
 * Errors are caught and logged to avoid breaking UI execution.
 *
 * @param key localStorage key used by all returned operations.
 */
export default function useLocalStorage(key: string) {
  /**
   * Stores a value under the configured key after JSON serialization.
   *
   * @param value Any serializable value.
   */
  const setItem = (value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting localStorage item", error);
    }
  };

  /**
   * Reads and parses the JSON value for the configured key.
   *
   * @returns Parsed value, or `undefined` when the key is missing or parsing fails.
   */
  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      console.error("Error getting localStorage item", error);
      return undefined;
    }
  };

  /**
   * Removes the value stored under the configured key.
   */
  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing localStorage item", error);
    }
  };
  return { setItem, getItem, removeItem };
}
