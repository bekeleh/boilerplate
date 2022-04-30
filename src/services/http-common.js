import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8000/api/v1/",
    // baseURL: "https://vaspartnersportal.ethiotelecom.et/api/v1/",
    // headers: {
    //     "Content-type": "application/json"
    // }
});
