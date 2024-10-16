/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from 'fs';

// 修改app.js中的${resourceUrl}
const _assetsCSSPath = './dist/css/';
const _assetsJSPath = './dist/js/';
const _assetsIndexHtmlPath = './dist/index.html';
const _assetsPagesFolder = './dist/pages';
const _assetsMainJspPath = './dist/pages/main.jsp';

function modifyCss() {
  const files = fs.readdirSync(_assetsCSSPath);
  let numFilesProcessed = 0; // 跟踪已处理的文件数量
  const cssVariables = {};
  files.forEach(function (appCssName) {
    const cssName = _assetsCSSPath + appCssName;
    fs.readFile(cssName, (err, data) => {
      if (err) throw err;
      let newContent = data.toString();
      // eslint-disable-next-line no-template-curly-in-string
      const regex = /url\(\/\$%7BresourceUrl%7D(.*?)\)/g;
      newContent = newContent.replace(regex, (match, url) => {
        const cleanUrl = url.replace('/$%7BresourceUrl%7D', '');
        const variableName = `--var-image${Object.keys(cssVariables).length + 1}`;
        cssVariables[variableName] = cleanUrl;
        return `var(${variableName})`;
      });
      fs.writeFile(cssName, newContent, () => {
        console.log(`'修改 ${cssName} 完成'`);
        numFilesProcessed++; // 增加已处理文件的数量
        if (numFilesProcessed === files.length) {
          let jsCode = '';
          if (Object.keys(cssVariables).length > 0) {
            jsCode = '<script>const root = document.documentElement;';
            for (const key in cssVariables) {
              const variableValue = `"url("+g_resourceUrl+"${cssVariables[key]})"`;
              jsCode += `root.style.setProperty('${key}', ${variableValue});`;
            }
            jsCode += '</script>';
          }
          modifyMainJSP(jsCode);
        }
      });
    });
  });
}
function modifyJs() {
  const files = fs.readdirSync(_assetsJSPath);
  files.forEach(function (appJsName) {
    const jsName = _assetsJSPath + appJsName;
    fs.readFile(jsName, (err, data) => {
      if (err) throw err;
      let newContent = data.toString();
      // eslint-disable-next-line no-template-curly-in-string
      newContent = newContent.replace(/"\/\$%7BresourceUrl%7D\//g, ' g_resourceUrl+"');

      fs.writeFile(jsName, newContent, () => {
        console.log(`'修改 ${jsName} 完成'`);
      });
    });
  });
}
function modifyMainJSP(jsCode) {
  fs.readFile(_assetsIndexHtmlPath, (err) => {
    if (err) throw err;
    // eslint-disable-next-line no-template-curly-in-string
    // 创建pages文件夹
    fs.mkdirSync(_assetsPagesFolder, { recursive: true }); // 创建文件夹，recursive选项表示递归创建目录，如果目录已经存在则不报错
    console.log(`'创建 ${_assetsPagesFolder} 完成'`);
    // 修改index.html文件名为main.jsp
    fs.renameSync(_assetsIndexHtmlPath, _assetsMainJspPath);
    console.log(`'修改 ${_assetsIndexHtmlPath} 为 ${_assetsMainJspPath} 完成'`);
    // 修改main.jsp中${resourceUrl}转义的字符并去掉/
    fs.readFile(_assetsMainJspPath, (err, data) => {
      if (err) throw err;
      let newContent = data.toString();
      // eslint-disable-next-line no-template-curly-in-string
      newContent = newContent.replace(/\/\$%7BresourceUrl%7D\//g, '${resourceUrl}');
      if (jsCode) {
        newContent = newContent.replace('</html>', jsCode + '</html>');
      }
      fs.writeFile(_assetsMainJspPath, newContent, () => {
        console.log(`'修改 ${_assetsMainJspPath} 完成'`);
      });
    });
  });
}
modifyCss();
modifyJs();
