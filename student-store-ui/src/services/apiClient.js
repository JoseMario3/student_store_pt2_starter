import axios from "axios";

class ApiClient {
    constructor(remoteHostUrl) {
        super();
        this.remoteHostUrl = remoteHostUrl;
        this.token = null;
    }

    setToken(token) {
        this.token = token;
    }

    async request({ endpoint, method = "GET", data = {} }) {
        const url = `${this.remoteHostUrl}/${endpoint}`;

        const headers = {
            "Content-Type": "application/json",
        };

        if (this.token) {
            headers["Authorization"] = `Bearer ${this.token}`;
        }

        try {
            const res = await axios({ url, method, data, headers });
            return { data: res.data, error: null };
        } catch (error) {
            console.error({ errorResponse: error.response });
            const message = error.response.data.error.message;
            return { data: null, error: message || String(error) };
        }
    }
}

export default new ApiClient(
    process.env.REACT_APP_REMOTE_HOST_URL || "http://localhost:3001"
);