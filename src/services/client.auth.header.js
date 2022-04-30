// export default function authHeader() {
//     let clientToken = localStorage.getItem("clientToken");

//     if (clientToken) {
//         return { Authorization: "Bearer " + clientToken };
//     } else {
//         return {};
//     }
// }

export default function authHeader() {
    let clientToken = localStorage.getItem("clientToken");

    if (clientToken) {
        return clientToken;
    } else {
        return null;
    }
}
