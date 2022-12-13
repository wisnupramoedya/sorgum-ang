import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor() {}

  public camelize(text: string): string {
    text = text.toUpperCase();
    return text.substr(0, 1) + text.substr(1).toLowerCase();
  }

  public convertModelToFormData(
    model: any,
    parentKey: string | null = null,
    carryFormData: FormData | null = null
  ): FormData {
    const formData = carryFormData || new FormData();
    let index = 0;
    for (const key in model) {
      if (Object.prototype.hasOwnProperty.call(model, key)) {
        if (model[key] !== null && model[key] !== undefined) {
          let propName = parentKey || key;
          if (parentKey && this.isObject(model)) {
            propName = parentKey + '.' + key;
          }
          if (parentKey && this.isArray(model)) {
            propName = parentKey + '[' + index + ']';
          }
          if (model[key] instanceof File) {
            formData.append(propName, model[key]);
          } else if (model[key] instanceof FileList) {
            for (let j = 0; j < model[key].length; j++) {
              formData.append(propName + '[' + j + ']', model[key].item(j));
            }
          } else if (this.isArray(model[key]) || this.isObject(model[key])) {
            this.convertModelToFormData(model[key], propName, formData);
          } else if (typeof model[key] === 'boolean') {
            formData.append(propName, +model[key] ? '1' : '0');
          } else {
            const element = model[key];
            formData.append(propName, element);
          }
        }

        index++;
      }
    }
    return formData;
  }
  private isArray(val: any): boolean {
    const toString = {}.toString;
    return toString.call(val) === '[object Array]';
  }

  private isObject(val: any): boolean {
    return !this.isArray(val) && typeof val === 'object' && !!val;
  }
  public ConvertBase64ToFile(
    dataBase64: string,
    filename: string,
    type: string,
    pureBase64: boolean = false
  ): File {
    const blb = this.dataURItoBlob(dataBase64, type, pureBase64);
    const f: File = new File([blb], filename, { type, endings: 'native' });
    return f;
  }

  public dataURItoBlob(
    dataURI: string,
    type: string,
    pureBase64: boolean = false
  ): Blob {
    const data = pureBase64 ? dataURI : dataURI.split('base64,')[1];
    const byteString = atob(data);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const cf: BlobPropertyBag = {
      endings: 'native',
      type,
    };
    const blob = new Blob([ab], cf); // or mimeString if you want
    return blob;
  }
  public convertModelToHttpParams(obj: any): HttpParams {
    return this.addToHttpParams(new HttpParams(), obj, null);
  }

  private addToHttpParams(
    params: HttpParams,
    obj: any,
    prefix: string | null
  ): HttpParams {
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        let k = p;
        if (prefix) {
          if (p.match(/^-{0,1}\d+$/)) {
            k = prefix + '[' + p + ']';
          } else {
            k = prefix + '.' + p;
          }
        }
        const v = obj[p];
        if (v !== null && typeof v === 'object' && !(v instanceof Date)) {
          params = this.addToHttpParams(params, v, k);
        } else if (v !== undefined) {
          if (v instanceof Date) {
            params = params.set(k, (v as Date).toISOString()); // serialize date as you want
          } else {
            params = params.set(k, v);
          }
        }
      }
    }
    return params;
  }
}
