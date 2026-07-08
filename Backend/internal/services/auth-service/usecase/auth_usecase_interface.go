package usecase

import (
	"context"

	"github.com/aaronchristian07/TPA-Web-261-Test/services/auth-service/dto"
)

type AuthUsecaseInterface interface {
	Register(ctx context.Context, req *dto.RegisterRequest) (*dto.MessageResponse, error)
	Login(ctx context.Context, req *dto.LoginRequest) (*dto.AuthResponse, error)
	ForgotPassword(ctx context.Context, req *dto.ForgotPassword) (*dto.MessageResponse, error)
	RefreshToken(ctx context.Context, refresh string) (*dto.AuthResponse, error)
}
