function filterByType(data, type) {
  const types = data.map((el) => el[type]);
  const result = Array.from(new Set(types));
  return result;
}

const actions = {
  filterByType,
};

onmessage = (e) => {
  const func = e.data.functionName;
  const params = e.data.params;

  const result = actions[func](...params);
  postMessage(result);
};
