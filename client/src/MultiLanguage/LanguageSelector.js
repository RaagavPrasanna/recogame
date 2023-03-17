import React from 'react';
import i18n from './I18n';

const languages = {
  en: { nativeName: 'English' },
  fr: { nativeName: 'Français' },
  zh: { nativeName: '中文简体' },
};

const LanguageSelector = ({ className }) => {
  return (
    <div className={className}>
      <form type="submit" onSubmit={(e) => e.preventDefault()}>
        <select
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          style={{ backgroundColor: '#6E7F80' }}
        >
          {Object.keys(languages).map((lng) => (
            <option value={lng} key={lng}>
              {languages[lng].nativeName}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default LanguageSelector;
