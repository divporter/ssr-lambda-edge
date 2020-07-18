'use strict';

const path = require('path')
const { join } = require('path')
const { createBundleRenderer } = require('vue-server-renderer')
const fs = require('fs')
const serverBundle = require('./dist/vue-ssr-server-bundle.json')
const template = fs.readFileSync(join(__dirname,'./index.html'), 'utf-8')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const minify = require('html-minifier').minify;
const zlib = require('zlib');
const {Crawler} = require('es6-crawler-detect')

const handler = async (event, context) => {

  const request = event.Records[0].cf.request;

  try{  
    if ((!path.extname(request.uri) && !request.uri.startsWith('/api')) || (request.uri === '/index.html')) {
      const userAgent = request.headers['user-agent'].map(x => x.value).join(' ').trim()
  
      let CrawlerDetector = new Crawler();
      if (CrawlerDetector.isCrawler(userAgent)) {
        const renderedHTML = await new Promise((resolve, reject) => {
          const renderer = createBundleRenderer(serverBundle, {
            runInNewContext: false, // recommended
            template,
            clientManifest
          })
          
          renderer.renderToString({}, (err, html) => {
            if (err) throw err
            let minified = minify(html, {
              caseSensitive: true,
              collapseWhitespace: true,
              preserveLineBreaks: true,
              removeAttributeQuotes: true,
              removeComments: true
            })
            const response = {
              status: '200',
              statusDescription: 'OK',
              headers: {
                'content-type': [{ 
                  key: 'Content-Type',
                  value: 'text/html; charset=utf-8'
                }],
                'content-encoding': [{
                  key: 'Content-Encoding',
                  value: 'gzip'
                }]
              },
              body: zlib.gzipSync(minified).toString('base64'),
              bodyEncoding: 'base64'
            }
            resolve(response)
        
          }, reject)
        })
        return renderedHTML;
      }
    }
    return request;
  }
  catch{
    return request
  }
}

exports.handler = handler;