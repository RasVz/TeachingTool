import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import UnoCSS from 'unocss/vite';
import { defineConfig, mergeConfig } from 'vite';
import { DEV_SCRIPT, PROD_MAIN_JSP_HEADER, PROD_SCRIPT } from './text';
import { svgBuilder } from './src/plugins/svgBuilder'; 


// https://vitejs.dev/config/
export default defineConfig(({ command }) => {

  

  const common_config = {
    plugins: [
      vue(),
      svgBuilder('./src/icons/svg/'),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false // css in js
          })
        ]
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    }
  };

  
  if (command === 'serve') {
    // 配置修改HTML代码的插件
    const htmlPlugin = () => {
      return {
        name: 'html-transform',
        transformIndexHtml(html: string) {
          return html.replace(/<script>(.*?)<\/script>/, DEV_SCRIPT);
        }
      };
    };
    return mergeConfig(common_config, {
      plugins: [htmlPlugin(), UnoCSS()],
      server: {
        host: '127.0.0.1',
        port: 8000,
        proxy: {
          '/actRunTool': {
            target: 'http://127.0.0.1:8081/', // 设置你调用的接口域名和端口号 别忘了加http
            changeOrigin: true, // 这里设置是否跨域
            rewrite: (path) => path.replace(/^\/actRunTool/, '/actRunTool'), // 路径重写规则，将请求路径中的/actRunTool替换为/actRunTool，使代理的请求路径和目标路径相同
            ws: false
          },
          '/v5': {
            target: 'http://localhost:18080/FileServer_war_exploded/v5', // 设置你调用的接口域名和端口号 别忘了加http
            changeOrigin: true, // 这里设置是否跨域
            rewrite: (path) => {
              return path.replace(/\/v5/, '/')
            } ,
            ws: false
          },
          '/tre': {
            target: 'https://www.wetoband.com/', //设置你调用的接口域名和端口号 别忘了加http
            changeOrigin: true, //这里设置是否跨域
            ws: false
          },
          '/core': {
            target: 'https://www.wetoband.com/core/', //设置你调用的接口域名和端口号 别忘了加http
            changeOrigin: true, //这里设置是否跨域
            ws: false
          }
        }
      }
    });
  } else {
    // 配置修改HTML代码的插件
    const htmlPlugin = () => {
      return {
        name: 'html-transform',
        transformIndexHtml(html: string) {
          html = PROD_MAIN_JSP_HEADER + html;
          return html.replace(/<script>(.*?)<\/script>/, PROD_SCRIPT);
        }
      };
    };
    // command === 'build'
    return mergeConfig(common_config, {
      plugins: [htmlPlugin()],
      base: '/${resourceUrl}',
      build: {
        rollupOptions: {
          output: {
            // assetFileNames: 'css/[name].[hash].css',
            assetFileNames: (assetInfo) => {
              if (assetInfo.type === 'asset' && /\.(jpe?g|png|gif|svg)$/i.test(assetInfo.name)) {
                return 'images/[name].[hash].[ext]';
              }
              if (assetInfo.type === 'asset' && /\.(ttf|woff|woff2|eot)$/i.test(assetInfo.name)) {
                return 'fonts/[name].[hash].[ext]';
              }
              return '[ext]/[name].[hash].[ext]';
            },
            chunkFileNames: 'js/[name].[hash].js',
            entryFileNames: 'js/[name].[hash].js'
          }
        }
      }
    });
  }
});
