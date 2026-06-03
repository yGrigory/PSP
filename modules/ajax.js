class Ajax {
  get(url, callback) {
    const xhr = this.createRequest("GET", url, callback);
    xhr.send();
  }

  post(url, data, callback) {
    const xhr = this.createRequest("POST", url, callback);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
  }

  patch(url, data, callback) {
    const xhr = this.createRequest("PATCH", url, callback);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
  }

  delete(url, callback) {
    const xhr = this.createRequest("DELETE", url, callback);
    xhr.send();
  }

  createRequest(method, url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        this.handleResponse(xhr, callback, url);
      }
    };

    xhr.onerror = () => {
      console.error(
        `CORS/network error: browser blocked XMLHttpRequest to ${url}. ` +
          "Open lab_5 through Live Server on a port different from backend port 3000."
      );
      callback(null, 0);
    };

    return xhr;
  }

  handleResponse(xhr, callback, url) {
    if (xhr.status === 0) {
      console.error(
        `CORS/network error: response from ${url} is not available. ` +
          "Most likely the frontend and backend are running on different origins."
      );
      callback(null, xhr.status);
      return;
    }

    try {
      const data = xhr.responseText ? JSON.parse(xhr.responseText) : null;
      callback(data, xhr.status);
    } catch (error) {
      console.error("JSON parse error:", error);
      callback(null, xhr.status);
    }
  }
}

export const ajax = new Ajax();

