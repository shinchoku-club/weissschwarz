package model

type CardType int

type Card struct {
	Id         string   `json:"id"`
	Type       CardType `json:"type"`
	Name       string   `json:"name"`
	Level      int      `json:"level"`
	Cost       int      `json:"cost"`
	Counter    bool     `json:"counter"`
	Trigger    int      `json:"trigger"`
	Text       string   `json:"text"`
	Power      int      `json:"power"`
	Soul       int      `json:"soul"`
	Attributes []string `json:"attributes"`
	Color      string   `json:"color"`
	Side       string   `json:"side"`
}

type Board struct {
}
