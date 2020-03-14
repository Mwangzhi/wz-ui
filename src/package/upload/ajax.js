
export default function (options) {
    const xhr = new XMLHttpRequest();
    const action = options.action;
    const fd = new FormData();
    fd.append(options.filename, options.file)
    xhr.open('post', action, true);
    xhr.onerror = function (err) {
        options.onError(err);
    }
    xhr.onload = function () {
        let text = xhr.responseText || xhr.response;
        options.onSuccess(JSON.parse(text));
    }
    xhr.upload.onprogress = function (e) {
        if (e.total > 0) {
            e.percent = e.loaded / e.total * 100;
        }
        options.onProgress(e);
    }
    xhr.send(fd);
    return xhr;
}
