import { getAccessToken } from "../lib/actions";

const apiService = {
    get: async function (url: string): Promise<any> {
    console.log("GET Request URL:", url);

        const token = await getAccessToken();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        method: "GET",
                headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("GET request failed:", response);
        throw new Error("GET request failed");
      }

      const json = await response.json();
      console.log("GET Response:", json);
      return json;
    } catch (error) {
      console.error("GET request error:", error);
      throw error;
    }
    },

  post: async function (url: string, data: any): Promise<any> {
    console.log("POST Request URL:", url, "Data:", data);

        const token = await getAccessToken();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        method: "POST",
        body: JSON.stringify(data),
                headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("POST request failed:", response);
        throw new Error("POST request failed");
      }

      const json = await response.json();
      console.log("POST Response:", json);
      return json;
    } catch (error) {
      console.error("POST request error:", error);
      throw error;
    }
    },

  postWithoutToken: async function (url: string, data: any): Promise<any> {
    console.log("POST Without Token Request URL:", url, "Data:", data);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        method: "POST",
        body: JSON.stringify(data),
                headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("POST Without Token request failed:", response);
        throw new Error("POST Without Token request failed");
      }

      const json = await response.json();
      console.log("POST Without Token Response:", json);
      return json;
    } catch (error) {
      console.error("POST Without Token request error:", error);
      throw error;
    }
  },
};

export default apiService;
