# PWA Webpack Sample
This is a blank PWA setup providing 100% result under Chrome Lighthouse audit

<center><img alt="PWA lighthouse best results" src="screenshots/pwa-results.png"></center>

## Prerequisites

- nodejs: https://nodejs.org
- mkcert: https://github.com/FiloSottile/mkcert
- yarn: ``npm i -g yarn``

## Setup
If you havent already installed mkcert for browser then run
```
mkcert -install
```

Re-open the chrome browser to enable the installed certificates.

Create a certificate for localhost domain

```
mkcert localhost
```

You will see a result similar as below

<center><img alt="Intall Certificate results" src="screenshots/certificate-install.png"></center>

Copy the path of local CA and update your webpack.config.js. Remeber to add `rootCA.pem` at end of root CA path
```js
https: {
    key: fs.readFileSync('./localhost-key.pem'),
    cert: fs.readFileSync('./localhost.pem'),
    ca: fs.readFileSync('/home/{user-home}/.local/share/mkcert/rootCA.pem')
},
```

Install the modules
```sh
$ yarn install
```

### STOP ALL LOCAL SERVERS ON PORT 80, 8080 AND 443

Start the project with HTTP 2.0
```sh
$ yarn start
```

Start the project for PWA Score
```sh
$ sudo yarn start:pwa
```
Go to Chrome and open https://localhost with developers tool. Go to Audits tab and hit `Run audits`

<center><img alt="PWA audit Init" src="screenshots/pwa-audit-init.png"></center>

## Final Result

You will see a result similar to below image for HTTP2 `yarn start`

<center><img alt="PWA audit Result" src="screenshots/pwa-audit-result.png"></center>

View the perfect PWA score with `sudo yarn start:pwa`
<center><img alt="PWA audit Result" src="screenshots/pwa-audit-result-pwa.png"></center>
