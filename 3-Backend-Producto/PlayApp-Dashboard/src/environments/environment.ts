// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// 'https://dbasister.azurewebsites.net/api'

export const environment = {
  production: true,
  apiUrl: 'http://localhost:3978/api',
  firebase: {
    apiKey: 'AIzaSyD_I7TZMSY45OO_1BP81g63ZL83N4EosBc',
    authDomain: 'dibot-ui.firebaseapp.com',
    databaseURL: 'https://dibot-ui.firebaseio.com',
    projectId: 'dibot-ui',
    storageBucket: 'dibot-ui.appspot.com',
    messagingSenderId: '334774635687'
  }
};
