const BASE_URL = 'https://api.weatherapi.com/v1/';

function getAll(endpoint: string) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', BASE_URL + endpoint, true);

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          resolve(data);
        } catch (error) {
          reject(new Error('Failed to parse response JSON'));
        }
      } else {
        reject(new Error(xhr.statusText || 'An error occurred'));
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network error'));
    };

    xhr.send();
  });
}

const controller = {
  getAll,
};

export default controller;
