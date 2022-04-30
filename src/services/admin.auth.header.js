// export default function authHeader() {
//     let userToken = localStorage.getItem("userToken");

//     if (userToken) {
//         return { Authorization: "Bearer " + userToken };

//     } else {
//         return {};
//     }
// }

export default function authHeader() {
    let userToken = localStorage.getItem("userToken");
    if (userToken) {
        return userToken;
    } else {
        return null;
    }
}
