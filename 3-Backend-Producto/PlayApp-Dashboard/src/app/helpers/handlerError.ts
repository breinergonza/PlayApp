import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Http, RequestOptions, Headers } from '@angular/http';

export function handlerError(error: any) {
  // debugger;
  console.log(error);
  const applicationError = error.headers.get('Application-Error');

  if (applicationError) {
    return Observable.throw(applicationError);
  }

  const serverError = error.json();

  let modelStateError = '';

  if (serverError) {
    for (const key in serverError) {
      if (serverError[key]) {
        modelStateError += serverError[key] + '\n';
      }
    }
  }

  return Observable.throw(modelStateError || 'Server error');
}

export function requestOption() {
  const headers = new Headers({ 'Content-Type': 'application/json' });

  const options = new RequestOptions({ headers });
  return options;
}
