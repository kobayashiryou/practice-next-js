import { theme } from "../themes"
import { Responsive, ResponsiveProp } from "../types/style"


/**
 * AppThemeの型をtypeofで格納している
 */
 type AppTheme = typeof theme

 /**
  * 各keyの型
  */
 type SpaceThemeKeys = keyof typeof theme.space
 type ColorThemeKeys = keyof typeof theme.colors
 type FontSizeThemeKeys = keyof typeof theme.fontSizes
 type LetterSpacingThemeKeys = keyof typeof theme.letterSpacings
 type LineHeightThemeKeys = keyof typeof theme.lineHeights

 /**
  * & {}をつけるとエディタの自動補完が効く
  */
 export type Space = SpaceThemeKeys | (string & {})
 export type Color = ColorThemeKeys | (string & {})
 export type FontSize = FontSizeThemeKeys | (string & {})
 export type letterSpacing = LetterSpacingThemeKeys | (string & {})
 export type LineHeight = LineHeightThemeKeys | (string & {})

 /**
  * この定数自体の型を定義
  */
 const BREAKPOINTS: { [key: string]: string } = {
   sm: '640px',
   md: '768px',
   lg: '1024px',
   xl: '1280px',
 }

 export function toPropValue<T>(
   propKey: string,
   prop?: Responsive<T>,
   theme?: AppTheme
   ) {
     if (prop === undefined) return undefined

     /** 渡した引数がTなのかResponsiveProp<T>なのかを判定している */
     if (isReponsivePropType(prop)) {
       const result = []

       for (const responsiveKey in prop) {
         if (responsiveKey === 'base') {
           result.push(
             `${propKey}: ${toThemeValueIfNeeded(
               propKey,
               prop[responsiveKey],
               theme
             )};`
           )
         } else if (
           responsiveKey === 'sm' ||
           responsiveKey === 'md' ||
           responsiveKey === 'lg' ||
           responsiveKey === 'xl'
         ) {
           const breakpoint = BREAKPOINTS[responsiveKey]
           const style = `${propKey}: ${toThemeValueIfNeeded(
             propKey,
             prop[responsiveKey],
             theme
           )};`

           result.push(`@media screen and (min-width: ${breakpoint}) {${style}}`)
         }
       }
       return result.join('\n')
     }

     return `${propKey}: ${toThemeValueIfNeeded(propKey, prop, theme)};`
 }

 /**
  * isは型推論を強めてくれる
  * 受け取った時点では、any型だが条件に合致すればこのpropの型はResponsiveProp<T>としてくれる
  * @param prop
  */
 function isReponsivePropType<T>(prop: any): prop is ResponsiveProp<T> {
   return (
     prop &&
     (prop.base !== undefined ||
       prop.sm !== undefined ||
       prop.md !== undefined ||
       prop.lg !== undefined ||
       prop.xl !== undefined)
   )
 }

 /**
  * Set関数
  * 重複する値を持てない
  * indexでのアクセスができない
  */
 const SPACE_KEYS = new Set([
   'margin',
   'margin-top',
   'margin-left',
   'margin-bottom',
   'margin-right',
   'padding',
   'padding-top',
   'padding-left',
   'padding-bottom',
   'padding-right',
 ])

 const COLOR_KEYS = new Set(['color', 'background-color'])
 const FONT_SIZE_KEYS = new Set(['font-size'])
 const LETTER_SPACING_KEYS = new Set(['letter-spacing'])
 const LINE_HEIGHT_KEYS = new Set(['line-height'])

 /**
  * テーマで定義されている値を返す
  * @param propKey
  * @param value
  * @param theme
  * @returns
  */
 function toThemeValueIfNeeded<T>(propKey: string, value: T, theme?: AppTheme) {
   if (
     theme &&
     theme.space &&
     SPACE_KEYS.has(propKey) &&
     isSpaceThemeKeys(value, theme)
   ) {
     return theme.space[value]
   } else if (
     theme &&
     theme.colors &&
     COLOR_KEYS.has(propKey) &&
     isColorThemeKeys(value, theme)
   ) {
     return theme.colors[value]
   } else if (
     theme &&
     theme.fontSizes &&
     FONT_SIZE_KEYS.has(propKey) &&
     isFontSizeThemeKeys(value, theme)
   ) {
     return theme.fontSizes[value]
   } else if (
     theme &&
     theme.letterSpacings &&
     LETTER_SPACING_KEYS.has(propKey) &&
     isLetterSpacingKeys(value, theme)
   ) {
     return theme.letterSpacings[value]
   } else if (
     theme &&
     theme.lineHeights &&
     LINE_HEIGHT_KEYS.has(propKey) &&
     isLineHeightKeys(value, theme)
   )

   return value
 }

 function isSpaceThemeKeys(prop: any, theme: AppTheme): prop is SpaceThemeKeys {
   /**
    * propは1とか2とかが入ってくる
    * 配列化した定数のキーと引数のキーが合致しているか確認している
    */
   return Object.keys(theme.space).filter((key) => key == prop).length > 0
 }

 function isColorThemeKeys(prop: any, theme: AppTheme): prop is ColorThemeKeys {
   return Object.keys(theme.colors).filter((key) => key == prop).length > 0
 }

 function isFontSizeThemeKeys(
   prop: any,
   theme: AppTheme
 ): prop is FontSizeThemeKeys {
   return Object.keys(theme.fontSizes).filter((key) => key == prop).length > 0
 }

 function isLetterSpacingKeys(prop: any, theme: AppTheme): prop is LetterSpacingThemeKeys {
   return Object.keys(theme.letterSpacings).filter((key) => key == prop).length > 0
 }

 function isLineHeightKeys(prop: any, theme: AppTheme): prop is LineHeightThemeKeys {
   return Object.keys(theme.lineHeights).filter((key) => key == prop).length > 0
 }