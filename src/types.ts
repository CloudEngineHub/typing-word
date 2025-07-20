import bookFlag from "@/assets/img/flags/book.png";
import enFlag from "@/assets/img/flags/en.png";
import jaFlag from "@/assets/img/flags/ja.png";
import deFlag from "@/assets/img/flags/de.png";
import codeFlag from "@/assets/img/flags/code.png";
import myFlag from "@/assets/img/flags/my.png";

export type Word = {
  id?: string,
  custom?: boolean,
  word: string,
  phonetic0: string,
  phonetic1: string,
  trans: {
    pos: string,
    cn: string,
  }[],
  sentences: {
    c: string,//content
    cn: string,
  }[],
  phrases: {
    c: string,
    cn: string,
  }[],
  synos: {
    pos: string,
    cn: string,
    ws: string[]
  }[],
  relWords: {
    root: string,
    rels: {
      pos: string,
      words: {
        c: string,
        cn: string,
      }[],
    }[]
  },
  etymology: {
    t: string,//title
    d: string,//desc
  }[],
}

export function getDefaultWord(val?: any): Word {
  return {
    "word": "",
    "phonetic0": "",
    "phonetic1": "",
    "trans": [],
    "sentences": [],
    "phrases": [],
    "synos": [],
    "relWords": {
      "root": "",
      "rels": []
    },
    "etymology": [],
    ...val
  }
}

export const PronunciationApi = 'https://dict.youdao.com/dictvoice?audio='

export type TranslateLanguageType = 'en' | 'zh-CN' | 'ja' | 'de' | 'common' | ''
export type LanguageType = 'en' | 'ja' | 'de' | 'code'

export type DictResource = {
  id: string
  name: string
  description: string
  url: string
  length: number
  category: string
  tags: string[]
  translateLanguage: TranslateLanguageType
  type: DictType
  language: LanguageType
}

export enum DictType {
  collect = 'collect',
  simple = 'simple',
  wrong = 'wrong',
  known = 'known',
  collectWord = 'collect-word',
  word = 'word',
  article = 'article',
}

export interface ArticleWord extends Word {
  nextSpace: boolean,
  isSymbol: boolean,
  symbolPosition: 'start' | 'end' | '',
}

export function getDefaultArticleWord(val?: any): ArticleWord {
  return getDefaultWord({
    nextSpace: true,
    isSymbol: false,
    symbolPosition: '',
    ...val
  }) as ArticleWord
}

export interface Sentence {
  text: string,
  translate: string,
  words: ArticleWord[],
  audioPosition: number[]
}

export interface Article {
  id: string,
  title: string,
  titleTranslate: string,
  text: string,
  textTranslate: string,
  newWords: Word[],
  textAllWords: string[],
  sections: Sentence[][],
  audioSrc: string,
  lrcPosition: number[][],
  questions: {
    stem: string,
    options: string[],
    correctAnswer: string[],
    explanation: string
  }[]
}

export function getDefaultArticle(val: Partial<Article> = {}): Article {
  return {
    id: '',
    title: '',
    titleTranslate: '',
    text: '',
    textTranslate: '',
    newWords: [],
    textAllWords: [],
    sections: [],
    audioSrc: '',
    lrcPosition: [],
    questions: [],
    ...val
  }
}

export interface Statistics {
  startDate: number,//开始日期
  spend: number,//花费时间
  total: number//单词数量
  wrong: number//错误数
}

export interface DisplayStatistics extends Statistics {
  wrongWords: Word[]
  inputWordNumber: number//输入数
}

export const DefaultDisplayStatistics: DisplayStatistics = {
  startDate: Date.now(),
  spend: -1,
  total: -1,
  wrong: -1,
  inputWordNumber: -1,
  wrongWords: [],
}

export enum Sort {
  normal = 0,
  random = 1,
  reverse = 2
}

export const ShortcutKeyMap = {
  Show: 'Escape',
  Ignore: 'Tab',
  Remove: '`',
  Collect: 'Enter',
}

export enum ShortcutKey {
  ShowWord = 'ShowWord',
  EditArticle = 'EditArticle',
  Next = 'Next',
  Replay = 'Replay',
  Previous = 'Previous',
  ToggleSimple = 'ToggleSimple',
  ToggleCollect = 'ToggleCollect',
  NextChapter = 'NextChapter',
  PreviousChapter = 'PreviousChapter',
  RepeatChapter = 'RepeatChapter',
  //todo 废弃
  DictationChapter = 'DictationChapter',
  PlayWordPronunciation = 'PlayWordPronunciation',
  // PlayTranslatePronunciation = 'PlayTranslatePronunciation',
  ToggleShowTranslate = 'ToggleShowTranslate',
  ToggleDictation = 'ToggleDictation',
  OpenSetting = 'OpenSetting',
  //todo 废弃
  OpenDictDetail = 'OpenDictDetail',
  ToggleTheme = 'ToggleTheme',
  ToggleConciseMode = 'ToggleConciseMode',
  TogglePanel = 'TogglePanel'
}

export const DefaultShortcutKeyMap = {
  [ShortcutKey.EditArticle]: 'Ctrl+E',
  [ShortcutKey.ShowWord]: 'Escape',
  [ShortcutKey.Previous]: 'Alt+⬅',
  [ShortcutKey.Next]: 'Tab',
  [ShortcutKey.Replay]: 'Tab',
  [ShortcutKey.ToggleSimple]: '`',
  [ShortcutKey.ToggleCollect]: 'Enter',
  [ShortcutKey.PreviousChapter]: 'Ctrl+⬅',
  [ShortcutKey.NextChapter]: 'Ctrl+➡',
  [ShortcutKey.RepeatChapter]: 'Ctrl+Enter',
  [ShortcutKey.DictationChapter]: 'Alt+Enter',
  [ShortcutKey.PlayWordPronunciation]: 'Ctrl+P',
  // [ShortcutKey.PlayTranslatePronunciation]: 'Ctrl+O',
  [ShortcutKey.ToggleShowTranslate]: 'Ctrl+Z',
  [ShortcutKey.ToggleDictation]: 'Ctrl+I',
  [ShortcutKey.OpenSetting]: 'Ctrl+S',
  [ShortcutKey.ToggleTheme]: 'Ctrl+Q',
  [ShortcutKey.OpenDictDetail]: 'Ctrl+J',
  [ShortcutKey.ToggleConciseMode]: 'Ctrl+M',
  [ShortcutKey.TogglePanel]: 'Ctrl+L',
}

export enum TranslateEngine {
  Baidu = 0,
}

export const languageCategoryOptions = [
  {id: 'article', name: '文章', flag: bookFlag},
  {id: 'en', name: '英语', flag: enFlag},
  {id: 'ja', name: '日语', flag: jaFlag},
  {id: 'de', name: '德语', flag: deFlag},
  {id: 'code', name: 'Code', flag: codeFlag},
  {id: 'my', name: '我的', flag: myFlag},
]

export function getDefaultDict(val: Partial<Dict> = {}): Dict {
  return {
    id: '',
    name: '',
    lastLearnIndex: 0,
    perDayStudyNumber: 20,
    description: '',
    words: [],
    articles: [],
    statistics: [],
    isCustom: false,
    length: 0,
    /*资源属性*/
    resourceId: '',
    fileName: '',
    category: '',
    tags: [],
    dictType: DictType.word,
    langTypeStr: 'en',
    tranTypeStr: 'zh',
    version: 0,
    ...val
  }
}

export interface Dict {
  id: any,
  name: string,
  lastLearnIndex: number,
  perDayStudyNumber: number,
  description: string,
  words: Word[],
  articles: Article[],
  statistics: Statistics[],
  isCustom: boolean,
  length: number,
  /*资源属性*/
  resourceId: string,
  category: string
  tags: string[]
  dictType: DictType
  fileName: string,
  langTypeStr: string,
  tranTypeStr: string,
  version: number,
}

export interface ArticleItem {
  item: Article,
  index: number
}

export const SlideType = {
  HORIZONTAL: 0,
  VERTICAL: 1,
}

export interface StudyData {
  index: number,
  words: any[],
  wrongWords: any[],
}
