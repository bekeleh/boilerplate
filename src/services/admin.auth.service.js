import http from "./http-common";
import AuthHeader from "./admin.auth.header";

const END_POINT = "admin/";

class AdminAuthService {
    login(user) {
        return http.post(`${END_POINT}login`, {
            email: user.email,
            password: user.password,
        });
    }

    logout() {
        return http.get(`${END_POINT}logout`, {
            headers: { Authorization: "Bearer " + AuthHeader() },
            // headers: AuthHeader() ,
        });
    }

    register(data) {
        return http.post(`${END_POINT}register`, data);
    }

    fetchProfile() {
        return http.get(`${END_POINT}fetch_profile`, {
            headers: { Authorization: "Bearer " + AuthHeader() },
        });
    }

    updateProfile(data) {
        return http.post(`${END_POINT}update_profile`, data, {
            headers: { Authorization: "Bearer " + AuthHeader() },
        });
    }

    changePassword(data) {
        return http.post(`${END_POINT}change_password`, data, {
            headers: { Authorization: "Bearer " + AuthHeader() },
        });
    }

    emailResend() {
        return http.get(`${END_POINT}email/resend/`, {
            headers: { Authorization: "Bearer " + AuthHeader() },
        });
    }

    forgotPassword(data) {
        return http.post(`${END_POINT}password/admin-forgot-password`, data);
    }

    resetPassword(data) {
        return http.post(`${END_POINT}admin-reset-password`, data);
    }

    checkToken(){
        return http.get(`${END_POINT}validate_token`, {
            headers: { Authorization: "Bearer " + AuthHeader() },
        });
    }
}

export default new AdminAuthService();
