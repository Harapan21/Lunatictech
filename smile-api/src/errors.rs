use bcrypt::BcryptError;
use diesel::result;
use std::fmt;

#[derive(Debug)]
pub enum SmileError {
    HashError(BcryptError),
    DBError(result::Error),
    PasswordNotMatch(String),
    JwtError(jsonwebtoken::errors::Error),
    Unauthorized,
    WrongPassword(String),
    Unreachable(&'static str),
}

impl juniper::IntoFieldError for SmileError {
    fn into_field_error(self) -> juniper::FieldError {
        match self {
            SmileError::Unauthorized => juniper::FieldError::new(
                "You mush login first",
                graphql_value!({
                    "type": "Unauthorized"
                }),
            ),
            SmileError::DBError(result::Error::DatabaseError(_, err)) => {
                let message = err.column_name().unwrap();
                println!("{}", err.details().unwrap());
                let format = match message {
                    "username" => "EMAIL_NOT_VALID",
                    "email" => "USERNAME_NOT_VALID",
                    _ => unreachable!(),
                };
                return juniper::FieldError::new(
                    format!("{}, exist", message),
                    graphql_value!({ "type": (format) }),
                );
            }
            SmileError::DBError(result::Error::NotFound) => juniper::FieldError::new(
                "User Not found",
                graphql_value!({
                    "type": "NOT_FOUND"
                }),
            ),
            SmileError::WrongPassword(msg) => juniper::FieldError::new(
                msg,
                graphql_value!({
                    "type": "PASSWORD_WRONG"
                }),
            ),
            _ => juniper::FieldError::new(
                "Internal server Error",
                graphql_value!({
                    "type": "InternalServerError"
                }),
            ),
        }
    }
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
            SmileError::Unreachable(location) => write!(f, "unreachable in {}", location),
            SmileError::Unauthorized => write!(f, "access graphql without token"),
            // _ => write!(f, "other error"),
        }
    }
}
