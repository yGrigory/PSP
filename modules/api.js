class Api {
  async request(url, options = {}) {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      },
      ...options
    });

    const data = response.status === 204 ? null : await response.json();

    if (!response.ok) {
      throw new Error(data?.error || `HTTP ${response.status}`);
    }

    return data;
  }

  get(url) {
    return this.request(url);
  }

  post(url, data) {
    return this.request(url, {
      method: "POST",
      body: JSON.stringify(data)
    });
  }

  patch(url, data) {
    return this.request(url, {
      method: "PATCH",
      body: JSON.stringify(data)
    });
  }

  delete(url) {
    return this.request(url, {
      method: "DELETE"
    });
  }
}

export const api = new Api();
