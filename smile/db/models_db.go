package db

import (
	// import jwt
	"time"

	"github.com/dgrijalva/jwt-go"
)

// Claims Create a struct that will be encoded to a JWT.
type Claims struct {
	ID string
	jwt.StandardClaims
}

// PostDB struct for get data frm mysql
type PostDB struct {
	ID           int       `json:"id"`
	AuthorID     string    `json:"author_id"`
	Title        string    `json:"title"`
	CreatedAt    time.Time `json:"createdAt"`
	Content      string    `json:"content"`
	Status       string    `json:"status"`
	LastEditedAt time.Time `json:"last_edited_at"`
	LastEditedBy string    `json:"last_edited_by"`
}
