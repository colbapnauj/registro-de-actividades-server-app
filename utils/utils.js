export function validateUrl (value) {
  // expresion regular para esta url https://colab.research.google.com/drive/1SOMN07_j46tLY4BVF9GzC34l7MgOmKPF#scrollTo=vqVVkvFAw0oe

  const urlRegex = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i
  // const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
  return urlRegex.test(value)
}
