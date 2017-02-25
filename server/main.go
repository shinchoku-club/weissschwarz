package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

type GameServer struct {
}

func ping(c *gin.Context) {
	c.JSON(200, gin.H{
		"msg": "hello, world",
	})
}

func get_games(c *gin.Context) {
	c.JSON(200, gin.H{
		"games": []string{"abc", "cde"},
	})
}

func put_game(c *gin.Context) {
	c.Status(204)
}

func index(c *gin.Context) {
	c.HTML(200, "index.html", nil)
}

type GameAction struct {
	StageID int `json:"stage_id"`
}

func (gs *GameServer) run() {
	router := gin.Default()
	router.LoadHTMLGlob("static/index.html")
	router.Static("/static", "./static")
	router.GET("/", index)
	router.GET("/ping", ping)
	router.GET("/game", get_games)
	router.PUT("/game", put_game)

	router.PUT("/action", func(c *gin.Context) {
		var body GameAction
		c.BindJSON(&body)
		fmt.Println(body.StageID)
	})
	router.Run()
}

func main() {
	server := GameServer{}
	server.run()
}
