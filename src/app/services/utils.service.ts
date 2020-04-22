import { Injectable } from '@angular/core';
import { normalize } from 'normalize-diacritics';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  urlNormalize(url) {
    return normalize(url).then(norm => {
      return norm.replace(/\s/g, '-').toLowerCase();
    });
  }

  normalizeDiacritics(str) {
    return normalize(str);
  }
}
