import { createContext, useState } from "react";
import * as Localization from "expo-localization";
import {I18n} from "i18n-js";

import { en, es } from '../utils/localizations';

interface UIContextProps {
    loading: string | null,
    setLoading: React.Dispatch<React.SetStateAction<string | null>>,
    i18n: I18n,
    setLocale: React.Dispatch<React.SetStateAction<string>>,
    locale: string,
    getErrorMessage: (code: string) => string
};

export const UIContext = createContext<UIContextProps>({} as UIContextProps);

export const UIProvider = ({children}: {children: React.ReactNode}) => {

    const i18n = new I18n(); 

    const [loading, setLoading] = useState<string | null>(null);
    const [locale, setLocale] = useState<string>(Localization.locale);

    i18n.translations = {en, es}
    i18n.locale = locale;
    i18n.enableFallback = true;
    i18n.defaultLocale = "en";

    function getErrorMessage(code: string): string {
        switch (code) {
          case 'auth/claims-too-large':
            return i18n.t('auth/claims-too-large');
          case 'auth/email-already-exists':
            return i18n.t('auth/email-already-exists');
          case 'auth/id-token-expired':
            return i18n.t('auth/id-token-expired');
          case 'auth/id-token-revoked':
            return i18n.t('auth/id-token-revoked');
          case 'auth/insufficient-permission':
            return i18n.t('auth/insufficient-permission');
          case 'auth/internal-error':
            return i18n.t('auth/internal-error');
          case 'auth/invalid-argument':
            return i18n.t('auth/invalid-argument');
          case 'auth/invalid-claims':
            return i18n.t('auth/invalid-claims');
          case 'auth/invalid-continue-uri':
            return i18n.t('auth/invalid-continue-uri');
          case 'auth/invalid-creation-time':
            return i18n.t('auth/invalid-creation-time');
          case 'auth/invalid-credential':
            return i18n.t('auth/invalid-credential');
          case 'auth/invalid-disabled-field':
            return i18n.t('auth/invalid-disabled-field');
          case 'auth/invalid-display-name':
            return i18n.t('auth/invalid-display-name');
          case 'auth/invalid-dynamic-link-domain':
            return i18n.t('auth/invalid-dynamic-link');
          case 'auth/invalid-email':
            return i18n.t('auth/invalid-email');
          case 'auth/invalid-email-verified':
            return i18n.t('auth/invalid-email-verified');
          case 'auth/invalid-hash-algorithm':
            return i18n.t('auth/invalid-hash-algorithm');
          case 'auth/invalid-hash-block-size':
            return i18n.t('auth/invalid-hash-block');
          case 'auth/invalid-hash-derived-key-length':
            return i18n.t('auth/invalid-hash-derived');
          case 'auth/invalid-hash-key':
            return i18n.t('auth/invalid-hash-key');
          case 'auth/invalid-hash-memory-cost':
            return i18n.t('auth/invalid-hash-memory');
          case 'auth/invalid-hash-parallelization':
            return i18n.t('auth/invalid-hash-parallelization');
          case 'auth/invalid-hash-rounds':
            return i18n.t('auth/invalid-hash-rounds');
          case 'auth/invalid-hash-salt-separator':
            return i18n.t('auth/invalid-hash-salt');
          case 'auth/invalid-id-token':
            return i18n.t('auth/invalid-id-token');
          case 'auth/invalid-last-sign-in-time':
            return i18n.t('auth/invalid-last-sign');
          case 'auth/invalid-page-token':
            return i18n.t('auth/invalid-page-token');
          case 'auth/invalid-password':
            return i18n.t('auth/invalid-password');
          case 'auth/invalid-password-hash':
            return i18n.t('auth/invalid-password-hash');
          case 'auth/invalid-password-salt':
            return i18n.t('auth/invalid-password-salt');
          case 'auth/invalid-phone-number':
            return i18n.t('auth/invalid-phone-number');
          case 'auth/invalid-photo-url':
            return i18n.t('auth/invalid-photo-url');
          case 'auth/invalid-provider-data':
            return i18n.t('auth/invalid-provider-data');
          case 'auth/invalid-provider-id':
            return i18n.t('auth/invalid-provider-id');
          case 'auth/invalid-oauth-responsetype':
            return i18n.t('auth/invalid-oauth-responsetype');
          case 'auth/invalid-session-cookie-duration':
            return i18n.t('auth/invalid-session-cookie');
          case 'auth/invalid-uid':
            return i18n.t('auth/invalid-uid');
          case 'auth/invalid-user-import':
            return i18n.t('auth/invalid-user-import');
          case 'auth/maximum-user-count-exceeded':
            return i18n.t('auth/maximum-user-count');
          case 'auth/missing-android-pkg-name':
            return i18n.t('auth/missing-android-pkg');
          case 'auth/missing-continue-uri':
            return i18n.t('auth/missing-continue-uri');
          case 'auth/missing-hash-algorithm':
            return i18n.t('auth/missing-hash-algorithm');
          case 'auth/missing-ios-bundle-id':
            return i18n.t('auth/missing-ios-bundle');
          case 'auth/missing-uid':
            return i18n.t('auth/missing-uid');
          case 'auth/missing-oauth-client-secret':
            return i18n.t('auth/missing-oauth-client');
          case 'auth/operation-not-allowed':
            return i18n.t('auth/operation-not');
          case 'auth/phone-number-already-exists':
            return i18n.t('auth/phone-number-already');
          case 'auth/project-not-found':
            return i18n.t('auth/project-not-found');
          case 'auth/reserved-claims':
            return i18n.t('auth/reserved-claims');
          case 'auth/session-cookie-expired':
            return i18n.t('auth/session-cookie-expired');
          case 'auth/session-cookie-revoked':
            return i18n.t('auth/session-cookie-revoked');
          case 'auth/uid-already-exists':
            return i18n.t('auth/uid-already-exists');
          case 'auth/unauthorized-continue-uri':
            return i18n.t('auth/unauthorized-continue');
          case 'auth/user-not-found':
            return i18n.t('auth/user-not-found');
          case 'auth/wrong-password':
            return i18n.t('auth/wrong-password');
          default:
            return i18n.t('auth/unkown-error');
        }
      }

    return (
        <UIContext.Provider value={{
            loading,
            setLoading,
            i18n,
            setLocale,
            locale,
            getErrorMessage
        }}>
            {children}
        </UIContext.Provider>
    )

}