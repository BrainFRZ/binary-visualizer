export * from './BlocksConfig';
export * from './MainConfig';

/**
 * Gets the specified style of a prop from the element's node data or returns the default style
 * @param {String} prop
 * @param {String} defaultStyle
 */
export default function getStyle(prop, defaultStyle) {
  return element => {
    const style = element.data('style');
    if (style && style[prop])
      return style[prop];
    else
      return defaultStyle;
  }
}
