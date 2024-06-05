import multer from 'multer';

 const storageartist= multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/artists')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname )
    }
  })

  export const uploadArtist = multer({ storage: storageartist})

