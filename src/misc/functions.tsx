export function licence(lic: string) {
    switch (lic) {
        case "https://creativecommons.org/licenses/by/4.0/":
        case "https://creativecommons.org/licenses/by/4.0":
        case "http://creativecommons.org/licenses/by/4.0/":
            return "CC BY 4.0";
        case "https://creativecommons.org/licenses/by-sa/4.0/":
        case "http://creativecommons.org/licenses/by-sa/4.0/":
            return "CC BY-SA 4.0";
        case "https://creativecommons.org/publicdomain/zero/1.0/":
        case "http://creativecommons.org/publicdomain/zero/1.0/":
            return "CC0 1.0";
        default:
            return "";

    }
}