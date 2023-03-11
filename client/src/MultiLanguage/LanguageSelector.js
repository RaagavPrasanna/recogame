import React from 'react';
import i18n from './I18n';

const languages = {
  en: { nativeName: 'English', code: 'en' },
  fr: { nativeName: 'Français', code: 'fr' },
  zh: { nativeName: '中文简体', code: 'zh' }
};

const LanguageSelector = () => {
  return (
    <div>
      <form type='submit' onSubmit={(e) => e.preventDefault()}>
        <select
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          style={{ backgroundColor:'#6E7F80' }}
        >
          {Object.keys(languages).map((lng) => (
            <option value={lng} id={lng} key={lng.code}>
              {languages[lng].nativeName}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default LanguageSelector;
