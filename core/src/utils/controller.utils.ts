export function ModelToResponseBodyMapper(model: any) {
  const responseObj: any = {};

  for (const key in model) {
    const camelCaseKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
    const value = model[key];

    if (Array.isArray(value)) {
      responseObj[camelCaseKey] = value.map(ModelObjectToResponseBody);
    } else {
      responseObj[camelCaseKey] = ModelObjectToResponseBody(value);
    }
  }

  return responseObj;
}

function ModelObjectToResponseBody(modelObj: any) {
  if (!(typeof modelObj === 'object') || !modelObj || modelObj instanceof Date) return modelObj;

  const responseObj: any = {};

  for (const key in modelObj) {
    const camelCaseKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
    const value = modelObj[key];

    if (Array.isArray(value)) {
      responseObj[camelCaseKey] = value.map(ModelObjectToResponseBody);
    } else {
      responseObj[camelCaseKey] = ModelObjectToResponseBody(value);
    }
  }

  return responseObj;
}
