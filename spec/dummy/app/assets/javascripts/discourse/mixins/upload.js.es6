export default Em.Mixin.create({
  uploading: false,
  uploadProgress: 0,

  uploadDone: function() {
    Em.warn("You should implement `uploadDone`");
  },

  deleteDone: function() {
    Em.warn("You should implement `deleteDone`");
  },

  _initializeUploader: function() {
    // NOTE: we can't cache this as fileupload replaces the input after upload
    // cf. https://github.com/blueimp/jQuery-File-Upload/wiki/Frequently-Asked-Questions#why-is-the-file-input-field-cloned-and-replaced-after-each-selection
    var $upload = this.$('input[type=file]'),
       self = this;

    $upload.fileupload({
      url: this.get('uploadUrl'),
      dataType: "json",
      fileInput: $upload,
      dropZone: this.$(),
      pasteZone: this.$()
    });

    $upload.on('fileuploadsubmit', function (e, data) {
      var isValid = Discourse.Utilities.validateUploadedFiles(data.files, true);
      var form = { image_type: self.get('type') };
      if (self.get("data")) { form = $.extend(form, self.get("data")); }
      data.formData = form;
      self.setProperties({ uploadProgress: 0, uploading: isValid });
      return isValid;
    });

    $upload.on("fileuploadprogressall", function(e, data) {
      var progress = parseInt(data.loaded / data.total * 100, 10);
      self.set("uploadProgress", progress);
    });

    $upload.on("fileuploaddone", function(e, data) {
      if(data.result.url) {
        self.uploadDone(data);
      } else {
        if (data.result.message) {
          bootbox.alert(data.result.message);
        } else {
          bootbox.alert(I18n.t('post.errors.upload'));
        }
      }
    });

    $upload.on("fileuploadfail", function(e, data) {
      Discourse.Utilities.displayErrorForUpload(data);
    });

    $upload.on("fileuploadalways", function() {
      self.setProperties({ uploading: false, uploadProgress: 0});
    });
  }.on('didInsertElement'),

  _destroyUploader: function() {
    this.$('input[type=file]').fileupload('destroy');
  }.on('willDestroyElement'),

  actions: {
    selectFile: function() {
      this.$('input[type=file]').click();
    }
  }
});
