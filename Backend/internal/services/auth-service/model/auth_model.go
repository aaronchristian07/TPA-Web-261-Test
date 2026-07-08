package model

type User struct {
	UserID       string `gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	Email        string `gorm:"uniqueIndex;not null"`
	PasswordHash string `gorm:"uniqueIndex;not null"`
}

type RefreshToken struct {
	ID     string `gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	UserID string `gorm:"not null; index"`
	Token  string `gorm:"not null;uniqueIndex"`
}
