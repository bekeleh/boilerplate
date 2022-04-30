import http from "./http-common";
import AuthHeader from "./client.auth.header";

const END_POINT = "client/";

class ClientAuthService {
    login(user) {
        return http.post(`${END_POINT}signin`, {
            email: user.email,
            password: user.password,
        });
    }

    logout() {
        return http.get(`${END_POINT}logout`, {
            headers: { Authorization: "Bearer " + AuthHeader() },
        });
    }

    register(data) {
        return http.post(`${END_POINT}signup`, data);
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
        return http.post(`${END_POINT}password/forgot-password`, data);
    }

    activationCode(data) {
        return http.post(`${END_POINT}verify/activation-code`, data, {
            headers: { Authorization: "Bearer " + AuthHeader() },
        });
    }

    forgotPasswordCode(data) {
        return http.post(`${END_POINT}verify/forgot-password-code`, data, {
            headers: { Authorization: "Bearer " + AuthHeader() },
        });
    }

    resetPassword(data) {
        return http.post(`${END_POINT}reset-password`, data);
    }

    checkToken(){
        return http.get(`${END_POINT}validate_token`, {
            headers: { Authorization: "Bearer " + AuthHeader() },
        });
    }
}

export default new ClientAuthService();
