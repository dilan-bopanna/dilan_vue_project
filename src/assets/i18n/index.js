import en from './en.json'


export const defaultLocale = localStorage.getItem('selected') || 'en';
// document.documentElement.defaultLocale = defaultLocale;
export const languages = {
    en: en,


}