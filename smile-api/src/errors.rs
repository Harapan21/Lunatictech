use bcrypt::BcryptError;
use diesel::result;
use std::fmt;

pub enum SmileError {
    HashError(BcryptError),
    DBError(result::Error),
    PasswordNotMatch(String),
    JwtError(jsonwebtoken::errors::Error),
    WrongPassword(String),
}

impl From<BcryptError> for SmileError {
    fn from(error: BcryptError) -> Self {
        SmileError::HashError(error)
    }
}

impl From<jwt::errors::Error> for SmileError {
    fn from(error: jwt::errors::Error) -> Self {
        SmileError::JwtError(error)
    }
}

// We need this to performs a conversion from diesel::result::Error to SmileError
impl From<result::Error> for SmileError {
    fn from(error: result::Error) -> Self {
        SmileError::DBError(error)
    }
}

impl fmt::Display for SmileError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            SmileError::HashError(error) => write!(f, "{}", error),
            SmileError::DBError(error) => write!(f, "{}", error),
            SmileError::PasswordNotMatch(error) => write!(f, "{}", error),
            SmileError::WrongPassword(error) => write!(f, "{}", error),
            SmileError::JwtError(error) => write!(f, "{}", error),
        }
    }
}
