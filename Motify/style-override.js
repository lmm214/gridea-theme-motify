const generateOverride = (params = {}) => {
  let result = ''
  // 网页背景色 - pageBgColor
  if (params.headerBgColor && params.headerBgColor !== '#515865') {
    result += `
      #header {
        background-color: ${params.headerBgColor};
      }
    `
  }
  if (params.customCss) {
    result += `
      ${params.customCss}
    `
  }
  return result
}
module.exports = generateOverride