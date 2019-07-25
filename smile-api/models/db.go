package models

import (
	"database/sql"
	"fmt"
	"log"
	"time"

	"github.com/dgrijalva/jwt-go"
)

const (
	key = "WOW,MuchShibe,ToDogge"
)

// Connect function : connect to mysql db
func Connect() *sql.DB {
	db, err := sql.Open("mysql", "root:Smile:)00@tcp(localhost:3306)/smile")

	if err != nil {
		log.Print(err.Error())
	}
	err = db.Ping()
	fmt.Println(err)
	if err != nil {
		fmt.Println("MySQL db is not connected")
		fmt.Println(err.Error())
	}
	return db
}

// UserInput for register query
func UserInput(user *UserField) (*Auth, error) {
	// connect db
	db := Connect()
	defer db.Close()

	prepare, err := db.Prepare("INSERT INTO usr_smile (username,email,fullname,password,avatar) VALUES(?,?,?,?,?)")
	if err != nil {
		panic(err.Error())
	}
	defer prepare.Close()
	prepare.Exec(user.Username, user.Email, user.Fullname, user.Password, user.Avatar)

	if err != nil {
		panic(err.Error()) // proper error handling instead of panic in your app
	}
	login := &LoginUser{
		Username: user.Username,
		Password: user.Password,
	}
	return LoginInput(login)
}

// ID receive id from db
type ID struct {
	UserID string `json:"user_id"`
}

// LoginInput for login query
func LoginInput(user *LoginUser) (*Auth, error) {
	db := Connect()
	defer db.Close()

	var getID ID

	err := db.QueryRow("SELECT user_id FROM usr_smile WHERE username=? password=?", user).Scan(&getID.UserID)
	if err != nil {
		panic(err.Error()) // proper error handling instead of panic in your app
	}

	/* Create the token */
	token := jwt.New(jwt.SigningMethodHS256)

	/* Create a map to store our claims */
	claims := make(jwt.MapClaims)

	/* Set token claims */
	claims["id"] = getID.UserID
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()
	token.Claims = claims
	tokenString, err := token.SignedString(key)
	if err != nil {
		panic(err.Error())
	}

	auth := &Auth{
		Login: true,
		Token: tokenString,
	}

	return auth, nil
}

func InserPost(post *PostField) {
	db := Connect()
	defer db.Close()
	prepare, err := db.Prepare("INSERT post(author_id,title,content,status) VALUES(?,?,?,?)")
	if err != nil {
		panic(err.Error())
	}
	prepare.Exec(post)
	return
}
