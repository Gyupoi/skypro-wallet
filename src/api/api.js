const API_URL = "https://wedev-api.sky.pro/api";

async function request(url, options = {}) {
  const response = await fetch(`${API_URL}${url}`, {
    ...options,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    console.error("API error:", {
      status: response.status,
      url,
      data,
    });

    throw new Error(
      data?.message ||
        data?.error ||
        `Ошибка сервера: ${response.status}`,
    );
  }

  return data;
}

export async function registerUser({ login, name, password }) {
  return request("/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      name,
      password,
    }),
  });
}

export async function loginUser({ login, password }) {
  return request("/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  });
}