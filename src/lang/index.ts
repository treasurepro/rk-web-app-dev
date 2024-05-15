import { createI18n } from "vue-i18n";
import EN from "./en";
import ZH from "./zh-cn";
import TW from "./zh-tw";

// 获取浏览器界面语言，默认语言
let currentLanguage = navigator.language.replace(/-(\S*)/, "");
// 如果本地缓存记录了语言环境，则使用本地缓存
let lsLocale = localStorage.getItem("locale") || "";
if (lsLocale) {
  currentLanguage = lsLocale;
}

const messages = {
  en: {
    ...EN,
  },
  zh: {
    ...ZH,
  },
  tw: {
    ...TW,
  },
};
//进行类型配置，可根据不同类型进行不同配置
const i18n = createI18n({
  legacy: false, //使用Composition APT模式，需要将其设置为false
  globalInjection: true, //全局生效$t
  locale: currentLanguage, //默认使用的语言
  messages: messages, //es6解构
});
export default i18n;
