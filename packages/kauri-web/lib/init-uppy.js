// @flow
import cookie from 'cookie'
const Uppy = require('uppy/lib/core')
const Url = require('uppy/lib/plugins/Url')
const Dashboard = require('uppy/lib/plugins/Dashboard')
const XHRUpload = require('uppy/lib/plugins/XHRUpload')
const request = require('superagent')
const config = require('../config').default

export function parseCookies (ctx = {}, options = {}) {
  let cookieToParse = ctx.req && ctx.req.headers.cookie && ctx.req.headers.cookie
  if (global.window) cookieToParse = window.document.cookie
  if (!cookieToParse) return {}
  return cookie.parse(cookieToParse, options)
}

class myXHR extends XHRUpload {
  processfile = imageURL => request.get(`/image-proxy?url=${imageURL}`).responseType('blob')

  downloadRemoteFileAsBlob = async (fileUrl, fileName) => {
    const result = await this.processfile(fileUrl)
    function blobToFile (theBlob) {
      theBlob = new File([theBlob], fileName, { type: theBlob.type, lastModified: Date.now() })
      return theBlob
    }
    return blobToFile(result.body)
  }

  uploadBundle = async files => {
    return new Promise(async (resolve, reject) => {
      const endpoint = this.opts.endpoint
      const method = this.opts.method

      const formData = new FormData()
      const file = files[0]
      const opts = this.getOptions(file)
      if (file.isRemote) {
        file.data = await this.downloadRemoteFileAsBlob(file.remote.body.url, file.name)
      }
      formData.append(opts.fieldName, file.data)

      const xhr = new XMLHttpRequest()

      const timer = this.createProgressTimeout(this.opts.timeout, error => {
        xhr.abort()
        emitError(error)
        reject(error)
      })

      const emitError = error => {
        files.forEach(file => {
          this.uppy.emit('upload-error', file, error)
        })
      }

      xhr.upload.addEventListener('loadstart', ev => {
        this.uppy.log('[XHRUpload] started uploading bundle')
        timer.progress()
      })

      xhr.upload.addEventListener('progress', ev => {
        timer.progress()

        if (!ev.lengthComputable) return

        files.forEach(file => {
          this.uppy.emit('upload-progress', file, {
            uploader: this,
            bytesUploaded: ev.loaded,
            bytesTotal: ev.total,
          })
        })
      })

      xhr.addEventListener('load', ev => {
        timer.done()

        if (ev.target.status >= 200 && ev.target.status < 300) {
          const resp = this.opts.getResponseData(xhr.responseText, xhr)
          files.forEach(file => {
            this.uppy.emit('upload-success', file, resp)
          })
          return resolve()
        }

        const error = this.opts.getResponseError(xhr.responseText, xhr) || new Error('Upload error')
        error.request = xhr
        emitError(error)
        return reject(error)
      })

      xhr.addEventListener('error', ev => {
        timer.done()

        const error = this.opts.getResponseError(xhr.responseText, xhr) || new Error('Upload error')
        emitError(error)
        return reject(error)
      })

      this.uppy.on('cancel-all', () => {
        xhr.abort()
      })

      xhr.open(method.toUpperCase(), endpoint, true)

      Object.keys(this.opts.headers).forEach(header => {
        xhr.setRequestHeader(header, this.opts.headers[header])
      })

      xhr.send(formData)

      files.forEach(file => {
        this.uppy.emit('upload-started', file)
      })
    })
  }
}

const initUppy = (options) => {
  const uppyConfig = options && options.allowGifs === false? config.uppyConfig.restrictions.allowedFileTypes.pop() : config.uppyConfig;
  const parsedToken = parseCookies({})['TOKEN']
  const uppy = Uppy(config.uppyConfig)
    .use(Dashboard, {
      closeModalOnClickOutside: true,
      disableThumbnailGenerator: true,
      showProgressDetails: true,
      proudlyDisplayPoweredByUppy: false,
      note: `PNG ${!options ? ', GIF' : ''} or JPEG images only, up to 10 MB`,
      locale: {
        strings: {
          dropPaste: 'Drop image here, paste or',
          dropPasteImport: 'Drop image here, paste, import from url above or',
        },
      },
      bundle: true,
    })
    .use(Url, {
      target: Dashboard,
      host: 'https://api2.transloadit.com/uppy-server',
      headers: {
        'X-Auth-Token': `Bearer ${parsedToken}`,
      },
    })
    .use(myXHR, {
      limit: 1,
      endpoint: `https://${config.getApiURL()}:443/ipfs/`,
      method: 'post',
      formData: true,
      headers: {
        'X-Auth-Token': `Bearer ${parsedToken}`,
      },
      fieldName: 'file',
      bundle: true,
    })

  return uppy
}

export { initUppy }
export default initUppy
