class Repository {
  async readAccounts(type) {
    const response = await fetch(this.#urlPathQuery("/api/accounts", {
      type: type
    }), {
      method: 'GET'
    });
    const data = await response.json();
    return data;
  }

  async readAccount(id) {
    const response = await fetch(this.#urlPathQuery(`/api/accounts/${id}`, {}), {
      method: "GET",
    });
    const data = response.json();
    return data;
  }

  async createAccount(body) {
    const response = await fetch(this.#urlPathQuery(`/api/accounts/`, {}), {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(body),
    });
    const data = response.json();
    return data;
  }

  async updateAccount(id, body) {
    const response = await fetch(this.#urlPathQuery(`/api/accounts/${id}`, {}), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(body),
    });
    const data = response.json();
    return data;
  }

  async deleteAccount(id) {
    const response = await fetch(this.#urlPathQuery(`/api/accounts/${id}`, {}), {
      method: "DELETE",
    });
    return response;
  }

  async createTransaction(id, body) {
    const response = await fetch(this.#urlPathQuery(`/api/accounts/${id}/transaction`, {}), {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(body),
    });
    const data = response.json();
    return data;
  }

  #urlPathQuery(path, query) {
    const url = new URL([location.protocol, "//", location.host, path].join(""));
    url.search = new URLSearchParams(query);
    return url.toString();
  }
}

export default new Repository();
