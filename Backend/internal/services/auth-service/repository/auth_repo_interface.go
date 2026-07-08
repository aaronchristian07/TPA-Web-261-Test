package repository

import (
	"context"

	"github.com/aaronchristian07/TPA-Web-261-Test/services/auth-service/model"
)

type AuthRepoInterface interface {
	CreateUser(ctx context.Context, user *model.User) error
	UpdateUser(ctx context.Context, user *model.User) error

	FindByUsername(ctx context.Context, username string) (*model.User, error)
	FindByEmail(ctx context.Context, email string) (*model.User, error)

	SaveRefreshToken(ctx context.Context, token *model.RefreshToken) error
	FindRefreshToken(ctx context.Context, token string) (*model.RefreshToken, error)
	DeleteRefreshToken(ctx context.Context, token *model.RefreshToken) error
}
