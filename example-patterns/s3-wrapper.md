# S3 Javascript Wrapper

```javascript
export default {
  uploadFile: (file, { action: url, fields }, { onProgress } = {}) =>
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText,
          });
        }
      };
      xhr.onerror = function() {
        // TODO: remove when weird CORS issue with the redirect is fixed
        if (this.status === 0) {
          const successUrl = fields.find(
            field => field.name === "success_action_redirect"
          ).value;
          fetch(successUrl).then(resolve, reject);
        } else {
          reject({ status: this.status, statusText: xhr.statusText });
        }
      };

      if (typeof onProgress === "function") {
        // See bug in Microsoft Edge 15 for progress event
        // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12224510/
        xhr.upload.addEventListener(
          "progress",
          e => {
            const percentCompleted = +(e.loaded / e.total * 100).toFixed(2);
            onProgress(percentCompleted, xhr);
          },
          false
        );
      }

      const formData = [...fields, { name: "file", value: file }].reduce(
        (_formData, field) => {
          _formData.append(field.name, field.value);
          return _formData;
        },
        new FormData()
      );

      xhr.open("POST", url, true);
      xhr.send(formData);
    }),
};
```