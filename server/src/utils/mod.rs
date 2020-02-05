use crate::errors::SmileError;
use chrono::{Duration, Local};
use jwt::{decode, encode, Algorithm, DecodingKey, EncodingKey, Header, Validation};

// lazy_static! {
//     static ref PRIVATE_KEY: Vec<u8> = fs::read("src/utils/key/jwtRS256.key").unwrap();
//     static ref PUBLIC_KEY: Vec<u8> = fs::read("src/utils/key/jwtRS256.key.pub").unwrap();
// }

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    id: String,
    exp: usize,
}

#[derive(Debug, Serialize, Deserialize, juniper::GraphQLObject)]
pub struct Auth {
    pub token: Option<String>,
    pub login: Option<bool>,
}

impl Claims {
    pub fn new(id: String) -> Self {
        Claims { id, exp: (Local::now() + Duration::hours(24)).timestamp() as usize }
    }

    pub fn create_token(&self) -> Result<String, SmileError> {
        let key = EncodingKey::from_rsa_pem(include_bytes!("./key/mykey.pem"))?;
        Ok(encode(&Header::new(Algorithm::RS256), self, &key).map_err(SmileError::JwtError)?)
    }

    pub fn translate_token(token: String) -> Result<Claims, SmileError> {
        let key = DecodingKey::from_rsa_pem(include_bytes!("./key/pubkey.pem"))?;
        decode::<Claims>(&token, &key, &Validation::new(Algorithm::RS256))
            .map(|data| data.claims.into())
            .map_err(SmileError::JwtError)
    }
}

impl From<String> for Auth {
    fn from(token: String) -> Self {
        Auth { token: Some(token), login: None }
    }
}
impl Default for Auth {
    fn default() -> Self {
        Auth { token: None, login: Some(false) }
    }
}
impl Auth {
    pub fn new(id: &String) -> Self {
        let claim = Claims::new(id.clone());
        match claim.create_token() {
            Ok(token) => Auth { token: Some(token), login: Some(true) },
            Err(_) => Default::default(),
        }
    }
    pub fn verify(self) -> Result<String, SmileError> {
        let token = self.token.unwrap();
        Claims::translate_token(token).map(|e| e.id.into())
    }
}
#[cfg(test)]
mod tests {
    // Note this useful idiom: importing names from outer (for mod tests) scope.
    use super::*;

    #[test]
    fn test_token_is_valid() -> Result<(), SmileError> {
        let id = "dummy".to_string();
        let auth = Auth::new(&id).verify()?;
        assert_eq!(id, auth);
        Ok(())
    }
}
