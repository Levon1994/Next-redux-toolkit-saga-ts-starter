import { v4 as uuid } from 'uuid';

/**
 * Custom function to generate modalId with prefix and id or uuid
 */
export const generateModalId = (prefix: string, additionalId?: string): { uuid?: string; id: string } => {
  if (additionalId) return { id: `${prefix}-${additionalId}` };

  const id = uuid();

  return {
    uuid: id,
    id: `${prefix}-${id}`,
  };
};
