echo "Injecting secrets..."

echo "updating appcenter JSON"
echo $APPCENTER_CONFIG_JSON | base64 --decode > "$APPCENTER_SOURCE_DIRECTORY/android/app/src/main/assets/appcenter-config.json"

echo "Updating Google JSON"
echo $GOOGLE_SERVICES_JSON | base64 --decode > "$APPCENTER_SOURCE_DIRECTORY/android/app/google-services.json"

echo "Updating sentry"
echo $SENTRY_JSON | base64 --decode > "$APPCENTER_SOURCE_DIRECTORY/android/sentry.properties"

echo "Updating firebase"
echo $FIREBASE_JSON | base64 --decode > "$APPCENTER_SOURCE_DIRECTORY/firebase.json"

envsubst < "$APPCENTER_SOURCE_DIRECTORY/.env.dist" > "$APPCENTER_SOURCE_DIRECTORY/.env"

echo "Finished injecting secrets."
