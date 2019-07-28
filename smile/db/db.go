package db

import (
	"database/sql"
	"fmt"
	"time"

	// import mysql
	_ "github.com/go-sql-driver/mysql"

	// import models from models
	"github.com/harapan21/Smile/smile/models"

	// import jwt
	"github.com/dgrijalva/jwt-go"
	// import resolver
)

const (
	username string = "root"
	password string = "Smile:)00"
	database string = "smile"
)

var (
	key = []byte("Smile:),make_your_day_better")
)

func dbConn() (db *sql.DB) {
	url := fmt.Sprintf("%s:%s@tcp(127.0.0.1:3306)/%s", username, password, database)
	db, err := sql.Open("mysql", url)
	if err != nil {
		fmt.Println(err.Error())
	}
	// make sure connection is available
	err = db.Ping()
	if err != nil {
		fmt.Println(err.Error())
	}
	return db
}

// InsertQuery function to input user to input data to mysql_db
func InsertQuery(user *models.UserField) (*models.Auth, error) {
	db := dbConn()

	defer db.Close()
	prepare, err := db.Prepare("INSERT usr_smile(username,email,fullname,password,avatar) VALUES(?,?,?,?,?)")
	if err != nil {
		fmt.Println("error di prepare insert")
	}
	defer prepare.Close()
	prepare.Exec(user.Username, user.Email, user.Fullname, user.Password, user.Avatar)

	userLoginPayload := &models.LoginUser{
		Username: user.Username,
		Password: user.Password,
	}
	return LoginQuery(userLoginPayload)
}

// LoginQuery login query to mysql db
func LoginQuery(user *models.LoginUser) (*models.Auth, error) {
	db := dbConn()
	defer db.Close()
	var result string
	err := db.QueryRow("SELECT user_id FROM usr_smile WHERE username=? AND password=?", user.Username, user.Password).Scan(&result)
	if err != nil {
		fmt.Println("error di query")
	}

	token, err := JwtTokenReturnKey(result)
	if err != nil {
		fmt.Println("error di token function")
	}
	auth := &models.Auth{
		Login: true,
		Token: token,
	}
	return auth, nil
}

// JwtTokenReturnKey convert id to token
func JwtTokenReturnKey(id string) (string, error) {

	// expiration time is 5 minutes
	expirationTime := time.Now().Add(24 * time.Minute)

	// Create the JWT claims, which includes the username and expiry time
	claims := &Claims{
		ID: id,
		StandardClaims: jwt.StandardClaims{
			// In JWT, the expiry time is expressed as unix milliseconds
			ExpiresAt: expirationTime.Unix(),
		},
	}
	// Declare the token with the algorithm used for signing, and the claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	// Create the JWT string
	tokenString, err := token.SignedString(key)

	if err != nil {
		panic(err.Error())
	}
	return tokenString, nil
}

// ParseJwtTokenReturnID convert token to id
func ParseJwtTokenReturnID(token string) (string, error) {
	claims := &Claims{}
	tkn, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		return key, nil
	})
	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			panic(err.Error())
		}
		panic(err.Error())
	}
	if !tkn.Valid {
		fmt.Println("not valid")
	}

	return claims.ID, nil
}

// InsertComment func to insert comment to db
func InsertComment(comment *models.CommentField) (bool, error) {
	db := dbConn()
	defer db.Close()
	prepare, err := db.Prepare("INSERT comment(postId, content,userId) VALUES(?,?,?)")
	if err != nil {
		fmt.Println("error di insert comment")
		return false, err
	}
	defer prepare.Close()
	fmt.Println(comment.ReplyID)
	prepare.Exec(comment.PostID, comment.Content, comment.UserID)

	return true, nil
}

// InserPost func to insert comment to db
func InserPost(post *models.PostField) (bool, error) {
	db := dbConn()
	defer db.Close()
	prepare, err := db.Prepare("INSERT post(author_id, title,content,status) VALUES(?,?,?,?)")
	if err != nil {
		fmt.Println("errror di insert post")
		return false, err
	}
	defer prepare.Close()
	prepare.Exec(post.AuthorID, post.Title, post.Content, post.Status)
	return true, nil
}

// GetPost function push to posts resolver
func (r *resolver.queryResolver) GetPost() ([]*PostDB, error) {
	db := dbConn()
	defer db.Close()
	result, err := db.Query("SELECT * FROM post limit 10")
	if err != nil {
		fmt.Println("error di getPost")
	}
	for result.Next() {
		var post PostDB
		err := result.Scan(&post.ID, &post.AuthorID, &post.Title, &post.CreatedAt, &post.Content, &post.Status, &post.LastEditedAt, &post.LastEditedBy)
		if err != nil {
			fmt.Println("error in scan")
		}
		r.posts = append(r.posts, post)
	}
	return r.posts, err
}

func (r *resolver.queryResolver) FindByID(input *models.GenericInput) ([]*models.Comment, error) {
	db := dbConn()
	defer db.Close()
	switch input.For {
	case models.GenericEnumUser:
		var user models.User
		err := db.QueryRow("SELECT * FROM usr_smile WHERE user_id=?", input.ID).Scan(&user.UserID, &user.Username, &user.JoinAt, &user.LastEditedAt, &user.Fullname, &user.Password, &user.Avatar, &user.IsAdmin)
	case models.GenericEnumPost:
		var post models.Post
		err := db.QueryRow("SELECT * FROM post WHERE id=?", input.ID).Scan()
	case models.GenericEnumComment:
		err := db.QueryRow("SELECT * FROM comment WHERE id=?", input.ID).Scan()
	default:
		query = ""
	}

	if err != nil {
		panic(err.Error())
	}
	return false, nil
}
