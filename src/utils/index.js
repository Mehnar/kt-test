export function removeLocalNamespaces(types) {
  const typesKeys = Object.keys(types);
  const localTypes = {};

  typesKeys.forEach((type) => {
    const localType = type.split('/')[1] || type;

    localTypes[localType] = localType;
  });

  return localTypes;
}

export const MAX_PAGE_SIZE = 10;