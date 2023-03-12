/**
 * {base: "block", sm: "flex"}
 * みたいなpropsを渡せば、レスポンシブを実現できる
 * Tは型、状況に応じていろんな型にできるのがジェネリクス型
 */
export type ResponsiveProp<T> = {
  base?: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
}

/**
 * {"block"}みたいなpropsを渡しても成立するように
 */
export type Responsive<T> = T | ResponsiveProp<T>

type SelfPosition =
| 'center'
| 'end'
| 'flex-end'
| 'flex-start'
| 'self-end'

type ContentPosition =
| 'center'
| 'end'
| 'flex-end'
| 'flex-start'
| 'self-end'

type ContentDistribution =
| 'space-around'
| 'space-between'
| 'space-evenly'
| 'strech'

type CSSPropertyGlobals =
| '-moz-initial'
| 'inherit'
| 'initial'
| 'revert'
| 'unset'

export type CSSPropertyAlignItems =
| CSSPropertyGlobals
| SelfPosition
| 'baseline'
| 'normal'
| 'strech'
| (string & {})

export type CSSPropertyAlignContent =
| CSSPropertyGlobals
| ContentDistribution
| 'center'
| 'end'
| 'flex-end'
| 'flex-start'
| 'baseline'
| 'normal'
| (string & {})

export type CSSPropertyJustifyItems =
| CSSPropertyGlobals
| SelfPosition
| 'baseline'
| 'left'
| 'legacy'
| 'normal'
| 'right'
| 'strech'
| (string & {})

export type CSSPropertyJustifyContent =
| CSSPropertyGlobals
| ContentDistribution
| ContentPosition
| 'left'
| 'normal'
| 'right'
| (string & {})

export type CSSPropertyFlexWrap =
| CSSPropertyGlobals
| 'nowrap'
| 'wrap'
| 'wrap-reverse'

export type CSSPropertyFlexDirection =
| CSSPropertyGlobals
| 'column'
| 'column-reverse'
| 'row'
| 'row-reverse'

export type CSSPropertyJustifySelf =
| CSSPropertyGlobals
| SelfPosition
| 'auto'
| 'baseline'
| 'left'
| 'normal'
| 'right'
| 'strech'
| (string & {})

export type CSSPropertyAlignSelf =
| CSSPropertyGlobals
| SelfPosition
| 'auto'
| 'baseline'
| 'normal'
| 'strech'
| (string & {})

type GridLine = 'auto' | (string & {})

export type CSSPropertyGridColumn =
| CSSPropertyGlobals
| GridLine
| (string & {})

export type CSSPropertyGridRow = CSSPropertyGlobals | GridLine | (string & {})

export type CSSPropertyGridAutoFlow =
| CSSPropertyGlobals
| 'column'
| 'dense'
| 'row'
| (string & {})

export type CSSPropertyGridArea = CSSPropertyGlobals | GridLine | (string & {})