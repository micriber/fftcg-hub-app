# fftcg-collection-app

## Setup

Follow the instructions to setup this project. But first, make sure you have a standard installation of android-studio,
avd manager, sdk manager.

- You need to have a `.env` file in the root folder, you can simply copy/paste the `.env.dist` file and replace the
values. Or, if you have all of the environment variables setup you can run this command:
`envsubst < ".env.dist" > ".env"`

- You need to have a google-services.json file placed in android/app/ folder. To create one, use this command:
`./.github/scripts/decrypt_secret.sh`, this script will ask you for the passphrase,
you can retrieve it [here](https://start.1password.com/open/i?a=IKJM5VUB2RFBJAUDDVWQAPK5NE&h=my.1password.com&i=dbe2jw4bejmaad4ioxpuly66si&v=2fkjkdj3wbyycogwphul6jocxq)

- Simply run a `yarn` command to install the project dependency.
- Then, `yarn run android`
