let uid = 1;

const errorHandler = xhr => {
  let msg = '';
  let { responseText, responseType, status, statusText } = xhr;
  if (!responseText && responseType === 'text') {
    try {
      msg = JSON.parse(responseText);
    } catch (error) {
      msg = responseText;
    }
  } else {
    msg = `${status} ${statusText}`;
  }

  const err = new Error(msg);
  err.status = status;
  return err;
};

const successHandler = xhr => {
  const response = xhr.responseText;
  if (response) {
    try {
      return JSON.parse(response);
    } catch (error) {}
  }

  return response;
};

class Uploader {
  constructor(option = {}) {
    // 默认配置项
    const defaultOption = {
      url: '',

      wrapper: document.body,
      multiple: false,
      limit: -1,
      autoUpload: true,
      accept: '*',

      headers: {},
      data: {},
      withCredentials: false
    };

    this.setting = Object.assign(defaultOption, option);
    this._init();
  }

  // 初始化配置，绑定事件
  _init() {
    this.uploadFiles = [];
    this.input = this._initInputElement(this.setting);

    this.changeHandler = e => {
      console.log(e);
      const files = e.target.files;
      const ret = this._callHook('choose', files);

      // 用户自己判断是否通过上传
      if (ret !== false) {
        this.loadFiles(ret || e.target.files);
      }
    };

    this.input.addEventListener('change', this.changeHandler);
    this.setting.wrapper.appendChild(this.input);
  }

  _initInputElement(setting) {
    const el = document.createElement('input');

    Object.entries({
      type: 'file',
      accept: setting.accept,
      multiple: setting.multiple,
      hidden: true
    }).forEach(([key, value]) => {
      el[key] = value;
    });

    return el;
  }

  // 绑定钩子，链式调用更优雅
  on(event, cb) {
    if (event && typeof cb === 'function') {
      this[`on${event}`] = cb;
    }

    return this;
  }

  // 统一派发已绑定的钩子事件
  _callHook(event, ...args) {
    if (event && this[`on${event}`]) {
      return this[`on${event}`].apply(this, args);
    }
  }

  // 模拟交互事件
  chooseFile() {
    this.input.value = '';
    this.input.click();
  }

  loadFiles(files) {
    if (!files) return false;

    const type = Object.prototype.toString.call(files);
    if (type === `[object FileList]`) {
      files = Array.prototype.slice.call(files);
    } else if (type === `[object Object]` || type === `[Object File]`) {
      files = [files];
    }

    if (this.limit !== -1 && files.length && files.length + this.uploadFiles.length > this.limit) {
      this._callHook('exceed', files);
      return false;
    }
    this.uploadFiles = this.uploadFiles.concat(
      files.map(file => {
        if (file.uid && file.rawFile) {
          return file;
        } else {
          return {
            uid: uid++,
            rawFile: file,
            fileName: file.name,
            size: file.size,
            status: 'ready'
          };
        }
      })
    );

    this._callHook('change', this.uploadFiles);
    this.setting.autoUpload && this.upload();

    return true;
  }

  removeFile(file) {
    const id = file.id || file;
    const index = this.uploadFiles.findIndex(el => el.id === id);

    if (index > -1) {
      this.uploadFiles.splice(index, 1);
      this._callHook('change', this.uploadFiles);
    }
  }

  clear() {
    this.uploadFiles = [];
    this._callHook('change', this.uploadFiles);
  }

  destory() {
    this.input.removeEventListener('change', this.changeHandler);
    this.setting.wrapper.removeChild(this.input);
  }

  // 上传处理
  upload(file) {
    if (!this.uploadFiles.length && !file) return;

    if (file) {
      const target = this.uploadFiles.find(el => el.uid === file.uid || el.uid === file);
      target && target.status !== 'success' && this._post(target);
      console.log('upload', 111);
    } else {
      this.uploadFiles.forEach(file => {
        file.status === 'ready' && this._post(file);
      });
    }
  }

  // 核心xhr发起请求
  _post(file) {
    if (!file.rawFile) return;

    const { headers, data, withCredentials } = this.setting;
    const xhr = new XMLHttpRequest();

    const formData = new FormData();
    formData.append('file', file.rawFile, file.fileName);

    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    Object.keys(headers).forEach(key => {
      xhr.setRequestHeader(key, headers[key]);
    });

    file.status = 'uploading';

    xhr.withCredentials = !!withCredentials;

    xhr.onload = () => {
      if (xhr.status < 200 || xhr.status >= 300) {
        file.status = 'error';
        this._callHook('error', errorHandler(xhr), file, this.uploadFiles);
      } else {
        file.status = 'success';
        this._callHook('success', successHandler(xhr), file, this.uploadFiles);
      }
    };

    xhr.onerror = e => {
      file.status = 'error';
      this._callHook('error', errorHandler(xhr), file, this.uploadFiles);
    };

    xhr.onprogress = e => {
      const { total, loaded } = e;
      e.percent = total > 0 ? (loaded / total) * 100 : 0;
      this._callHook('progress', e, file, this.uploadFiles);
    };

    xhr.open('post', this.setting.url, true);
    xhr.send(formData);
  }
}

export default Uploader;
