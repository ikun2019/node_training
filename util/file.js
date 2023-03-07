const fs = require('fs');

const deleteFile = (filePath) => {
  // unlinkメソッドは指定されたアイルを非同期で削除するメソッド
  fs.unlink(filePath, (err) => {
    if (err) {
      throw (err);
    }
  });
};

exports.deleteFile = deleteFile;