import getUrlParams from './getUrlParams';

export function getLanguage() {
  const lang = getUrlParams('lang') || navigator.language || navigator.userLanguage;

  return lang;
}

export function setLanguage() {
  const currentLang = getLanguage();
  const lang = currentLang === 'en-US' ? 'zh-CN' : 'en-US';
  const urlPathname = window.location.pathname;

  window.location = `${urlPathname}?lang=${lang}`;
}
