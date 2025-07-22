import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() { }

  isWeb() {
    return true;
    // const isWeb = Capacitor.getPlatform() === 'web';
    // console.log(isWeb);
    // return isWeb;
  }
}
