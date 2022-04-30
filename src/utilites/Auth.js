import Storage from "./Storage";

class Auth {
    get loggedIn() {
        return Storage.has("accessToken");
    }

    get token() {
        return Storage.get("accessToken");
    }

    login(payload) {
        const entries = Object.entries(payload);

        entries.forEach((item) => {
            Storage.record(item[0], item[1]);
        });
    }

    logOut() {
        Storage.clear();
    }
}

export default new Auth();
