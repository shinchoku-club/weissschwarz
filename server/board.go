package main

import (
	"fmt"
)

type Board struct {
	x int
}

func (b *Board) Hoge() {
	fmt.Println("hoge")
}
