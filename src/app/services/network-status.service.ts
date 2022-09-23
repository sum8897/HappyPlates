import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NetworkStatusService {

  networkStatus: string;

  constructor () {
      this.networkStatus = '';
  }

  setNetworkStatus(status: string) {
      this.networkStatus = status;
  }

  getNetworkStatus() {
      return this.networkStatus;
  }
}
