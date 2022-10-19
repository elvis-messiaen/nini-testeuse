import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeProduit'
})
export class PipeProduitPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
