use bcrypt::BcryptError;
use diesel::result;
use std::fmt;

#[derive(Debug)]
pub enum ValidationError {
    Username(&'static str),
    Email(&'static str),
}
#[derive(Debug)]
pub enum SmileError {
    HashError(BcryptError),
    DBError(result::Error),
    PasswordNotMatch(String),
    JwtError(jsonwebtoken::errors::Error),
    Validation(ValidationError),
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
            SmileError::Validation(error) => {
                let format: (&'static str, &'static str) = match error {
                    ValidationError::Email(email) => (email, "EMAIL_NOT_VALID"),
                    ValidationError::Username(username) => (username, "USERNAME_NOT_VALID"),
                };
                return juniper::FieldError::new(
                    format!("{}, exist", format.0),
                    graphql_value!({
                        "type": ( format.1 )
                    }),
                );
            }

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
            _ => write!(f, "other error"),
        }
    }
}
