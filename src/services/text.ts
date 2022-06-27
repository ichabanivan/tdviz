
export class TextService {
  // NOTE formatting html to plain text
  static escapeHtml (html = '') {
    return String(html).replace(/<[^>]*>?/gm, '');
  }

  // NOTE handle string and make enum from it
  static toEnum (string = '') {
    return String(string)
      .replace(/[^\w\d\s]/gi, '')
      .replace(/[\s]+/g, '_')
      .replace(/^_+|_+$/g, '')
      .toUpperCase();
  }

  // NOTE formatting string with server side to human pretty view
  static humanize (string = '') {
    return String(string)
      // from camel case
      .replace(/([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g, '$1$4 $2$3$5')
      // spec
      .replace(/[_-]+/g, ' ')
      // normalize
      .replace(/\s+/g, ' ')
      // trim
      .replace(/^\s*|\s*$/g, '')
      // capitalize
      .toLowerCase()
      .replace(/^.{1,1}/, function (sib) { return sib.toUpperCase(); });
  }
}

export default TextService;
