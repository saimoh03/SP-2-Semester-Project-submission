export function getQueryParam(param) {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  return params.get(param);
}
