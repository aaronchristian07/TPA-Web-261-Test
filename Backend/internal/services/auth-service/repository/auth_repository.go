package repository

import (
	"context"

	"github.com/aaronchristian07/TPA-Web-261-Test/services/auth-service/model"
	"gorm.io/gorm"
)

type AuthRepository struct {
	db *gorm.DB
}

func NewAuthConnection(db *gorm.DB) AuthRepoInterface {
	return &AuthRepository{db: db}
}

func (h *AuthRepository) CreateUser(ctx context.Context, user *model.User) error {
	return h.db.WithContext(ctx).Create(user).Error
}

func (h *AuthRepository) UpdateUser(ctx context.Context, user *model.User) error {
	return h.db.WithContext(ctx).Save(user).Error
}

func (h *AuthRepository) FindByUsername(ctx context.Context, username string) (*model.User, error) {
	var user model.User
	err := h.db.WithContext(ctx).Where("username = ?", username).First(&user).Error
	return &user, err
}

func (h *AuthRepository) FindByEmail(ctx context.Context, email string) (*model.User, error) {
	var user model.User
	err := h.db.WithContext(ctx).Where("email = ?", email).First(&user).Error
	return &user, err
}

func (h *AuthRepository) SaveRefreshToken(ctx context.Context, token *model.RefreshToken) error {
	return h.db.WithContext(ctx).Create(token).Error
}

func (h *AuthRepository) FindRefreshToken(ctx context.Context, token string) (*model.RefreshToken, error) {
	var rt model.RefreshToken
	err := h.db.WithContext(ctx).Where("token = ?", token).First(&rt).Error
	return &rt, err
}

func (h *AuthRepository) DeleteRefreshToken(ctx context.Context, token *model.RefreshToken) error {
	return h.db.WithContext(ctx).Where("token = ?", token).Delete(&model.RefreshToken{}).Error
}
