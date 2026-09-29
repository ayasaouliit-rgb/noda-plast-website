export function on(id, event, callback) {

  const element = document.getElementById(id);

  if (element) {
    element.addEventListener(event, callback);
  }
}