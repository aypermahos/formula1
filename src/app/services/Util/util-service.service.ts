import { Injectable } from "@angular/core";
import { environment } from "@formula1.env/environment";

@Injectable({
  providedIn: "root"
})
export class UtilService {
  constructor() {}

  public static getUrl(url: string, params: any[] = null): string {
    url = environment.rest_api_url + url;

    // If params exist, assign the parameter name, with it's value
    if (params != null) {
      for (const param of params) {
        url = url.replace(param.k, param.v);
      }
    }
    return url;
  }
}
