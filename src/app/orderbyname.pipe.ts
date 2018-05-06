import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "orderby"
    })
  export class OrderByPipe {
    transform(array: Array<Location>, args: string): Array<Location> {
      array.sort((a: any, b: any) => {
        if (a < b) {
          return -1;
        } else if (a > b) {
          return 1;
        } else {
          return 0;
        }
      });
      return array;
    }
  }