import { ValidationException } from '../exceptions/validation-exception.exception';

export const profileImageOptions = {
  fileFilter: (req, file, callback) => {
    // Mime-Type Überprüfung
    if (!file.mimetype.startsWith('image')) {
      return callback(
        new ValidationException(['Nur Bilder sind erlaubt']),
        false,
      );
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024, // Dateigröße auf 1 MB beschränken
  },
};
