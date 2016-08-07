let Ajax = {};

Ajax.get = async function(url) {
  let request = new XMLHttpRequest();
  request.open('GET', url, true);

  return new Promise((resolve, reject) => {
    request.onload = () => {
      (request.status === 200) ? resolve(request.responseText) : reject();
    };
    request.onerror = reject;
    request.send();
  });
}

export default Ajax;