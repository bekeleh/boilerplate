import moment from "moment";
import { Parser } from "json2csv";

export default {
    data() {
        return {
            moment: moment,
        };
    },
    methods: {
        exportToCsv(data, fields, extension, prefix) {
            const fileName = prefix + "_" + Date.now() + extension;
            const json2csvParser = new Parser({ fields: fields });
            const expo = json2csvParser.parse(data);

            const url = window.URL.createObjectURL(new Blob([expo]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
        },
        momentDate(date) {
            if (!this.isNullOrEmpty(date))
                return moment.utc(date).format("MMM DD YYYY hh:mm");
            return "";
        },
        fromNow(date) {
            if (!this.isNullOrEmpty(date)) return moment.utc(date).fromNow();
            return "";
        },
        getRandomId() {
            return `${Date.now()}-${parseInt(Math.random() * 1000)}`;
        },
        slugify(string) {
            const a =
                "àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;";
            const b =
                "aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------";
            const p = new RegExp(a.split("").join("|"), "g");

            return string
                .toString()
                .toLowerCase()
                .replace(/\s+/g, "-") // Replace spaces with -
                .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
                .replace(/&/g, "-and-") // Replace & with 'and'
                .replace(/[^\w-]+/g, "") // Remove all non-word characters
                .replace(/--+/g, "-") // Replace multiple - with single -
                .replace(/^-+/, "") // Trim - from start of text
                .replace(/-+$/, ""); // Trim - from end of text
        },
        isNullOrEmpty(value) {
            return value === null || value === undefined || value.length === 0;
        },
    },
};
