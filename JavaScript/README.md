You need firebase-cli to execute the deploy command so make sure that `npm install -g firebase-tools` is installed.
In your console check if it's installed of not by running: `firebase --version`

To Deploy index.html changes to firebase hosting simple do:
`firebase deploy --only hosting:intuitive-ai`