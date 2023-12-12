import OneSignal from "react-onesignal";

const ONE_SIGNAL_APP_ID = "c357b411-637d-4fad-a823-aaec67af5bff";

export default async function runOneSignal() {
  await OneSignal.init({
    appId: ONE_SIGNAL_APP_ID,
    allowLocalhostAsSecureOrigin: true,
  });
  OneSignal.Slidedown.promptPush();
}
