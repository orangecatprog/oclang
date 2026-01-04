export function chalkText(text, color) {
    return {
        name: color(text),
        value: text
    };
}
