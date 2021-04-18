# fftcg-collection-app

[![Build status](https://build.appcenter.ms/v0.1/apps/9a7e5ee1-3173-43d1-872d-3f399d9876a7/branches/master/badge)](https://appcenter.ms)

## Setup

Follow the instructions to setup this project. But first, make sure you have a standard installation of android-studio,
avd manager, sdk manager.

- You need to have a `.env` file in the root folder, you can simply copy/paste the `.env.dist` file and replace the
values. Or, if you have all of the environment variables setup you can run this command:
`envsubst < ".env.dist" > ".env"`

- You need to have a google-services.json file placed in android/app/ folder. To create one, use this command:
`PASSPHRASE=${my_passphrase} ./.github/scripts/decrypt_secret.sh`,
you can retrieve it [here](https://start.1password.com/open/i?a=IKJM5VUB2RFBJAUDDVWQAPK5NE&h=my.1password.com&i=dbe2jw4bejmaad4ioxpuly66si&v=2fkjkdj3wbyycogwphul6jocxq)

- You need to have an `appcenter-config.json` file, and place it : `android/app/src/main/assets/appcenter-config.json`.
You can retrieve it from our 1password account [here](https://start.1password.com/open/i?a=IKJM5VUB2RFBJAUDDVWQAPK5NE&h=my.1password.com&i=qy4g7kys3magmygzjc32wi3cm4&v=2fkjkdj3wbyycogwphul6jocxq)


- Simply run a `yarn` command to install the project dependency.
- Then, `yarn run android`
