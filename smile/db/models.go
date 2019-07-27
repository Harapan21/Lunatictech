package db

import (
	// import jwt
	"github.com/dgrijalva/jwt-go"
)

// Claims Create a struct that will be encoded to a JWT.
type Claims struct {
	ID string
	jwt.StandardClaims
}
