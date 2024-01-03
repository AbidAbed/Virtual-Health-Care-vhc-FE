function useConfigFormState(config) {
  const configState = config.reduce((prev, curr) => {
    return { ...prev, [curr.stateName]: "" };
  }, {});
  return configState
}
export default useConfigFormState