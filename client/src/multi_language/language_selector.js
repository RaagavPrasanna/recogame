import React from 'react';
import i18n from './i18n';

const languages = {
  en: { nativeName: 'English' },
  fr: { nativeName: 'Français' },
  zh: { nativeName: '中文简体' }
};

const LanguageSelector = () => {
  return (
    <div>
      {Object.keys(languages).map((lng) => (
        <button key={lng}
          style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }}
          type="submit"
          onClick={() => i18n.changeLanguage(lng)}>
          {languages[lng].nativeName}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
