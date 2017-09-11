import { format } from './translate';

export class TranslateService {
    static bundle: {[key: string]: string} = {};
    static bundleLoaded: boolean = false;

    static loadBundle(path: string): Promise<void> {
        return new Promise<void>(resolve => {
            if(this.bundleLoaded) {
                resolve();
            } else {
                const request = new XMLHttpRequest();
                request.open('GET', path, true);
                request.onload = () => {
                    if(request.status == 200) {
                        this.bundle = JSON.parse(request.responseText);
                        this.bundleLoaded = true;
                    }
                    resolve();
                };
                request.onerror = () => resolve();
                request.send();
            }
        });
    }
}

export function translate(key: string, ...args: any[]): string {
    if(args.length > 0) {
        return format(TranslateService.bundle[key], args);
    } else {
        return TranslateService.bundle[key] || key;
    }
}