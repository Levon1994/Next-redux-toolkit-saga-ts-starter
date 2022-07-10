/**
 * This helper function provides a way of getting an interface type
 * @param name - the name of the property name
 * Example:
 *    nameOf<IExample>('name')

 */
export const nameOf = <T>(name: keyof T): keyof T => name;

/**
 * This helper function generates a method that could be used for getting a way interface types
 * Example:
 *    const nameOfExample = nameOfFactory<IExample>();
 *
 *    nameOfExample('name')
 */
export const nameOfFactory =
  <T>() =>
  (name: keyof T): keyof T =>
    name;
