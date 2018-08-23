// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  apiUrl: 'https://play-app-juguemonosla.azurewebsites.net/api',
  firebase: {
    apiKey: 'AIzaSyDXNT_NZ3zXGCqT6KHIsHtM7hsZPKlvacE',
    authDomain: 'playapp-419eb.firebaseapp.com',
    databaseURL: 'https://playapp-419eb.firebaseapp.com',
    projectId: 'playapp-419eb',
    storageBucket: 'dibot-ui.appspot.com',
    messagingSenderId: '334774635687'
  }
};
