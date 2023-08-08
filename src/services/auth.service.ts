import axios from "axios";

const API_LOGIN = "http://localhost:8082/auth/authenticate";
const API_REGISTER = "http://localhost:8082/auth/register";

class AuthService {
    login(email: string, password: string) {
        return axios
            .post(API_LOGIN + "signin", {
                email,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(fistName: string, lastName : string, email: string, password: string) {
        return axios.post(API_REGISTER + "signup", {
            fistName,
            lastName,
            email,
            password
        });
    }

    getCurrentUser() {
        const userStr = localStorage.getItem("user");
        if (userStr) return JSON.parse(userStr);

        return null;
    }
}

export default new AuthService();