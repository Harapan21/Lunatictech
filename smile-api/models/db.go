package models

import (
	"database/sql"
	"fmt"
	"log"
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

func (db *sql.DB) UserInput() {
	prepare, err := db.Prepare("INSERT INTO usr_smile (username,email,fullname,password,avatar) VALUES(?,?,?,?,?)")
	if err != nil {
		panic(err.Error())
	}
	defer prepare.Close()
}
