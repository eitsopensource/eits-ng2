export function format(text: string, args: any[]): string {
    let formattedString = text;
    text.match(/\{\d+\}/g).forEach(placeholder => {
        const index = parseInt(placeholder.substring(1));
        formattedString = formattedString.replace(placeholder, args[index]);
    });
    return formattedString;
}