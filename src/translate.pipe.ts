import { PipeTransform, Pipe } from '@angular/core';
import { translate } from './translate.service';

@Pipe({name: 'translate'})
export class TranslatePipe implements PipeTransform {
    transform(value: string, ...args: any[]): string {
        return translate(value, ...args);
    }
}