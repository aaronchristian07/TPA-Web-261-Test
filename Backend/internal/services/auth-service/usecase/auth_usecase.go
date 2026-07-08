package usecase

import (
	"context"
	"encoding/hex"
	"errors"
	"math/rand/v2"
	"os"
	"time"

	"github.com/aaronchristian07/TPA-Web-261-Test/services/auth-service/dto"
	"github.com/aaronchristian07/TPA-Web-261-Test/services/auth-service/model"
	"github.com/aaronchristian07/TPA-Web-261-Test/services/auth-service/repository"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

type authUsecase struct {
	repo repository.AuthRepoInterface
}

func NewAuthUsecase(repo repository.AuthRepoInterface) *authUsecase {
	{
		return &authUsecase{repo: repo}
	}
}

func generateAccessToken(userID string) (string, error) {
	claims := jwt.MapClaims{
		"sub": userID,
		"exp": time.Now().Add(15 * time.Minute).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(os.Getenv("JWT_SECRET")))
}

func generateRefreshToken() (string, error) {
	b := make([]byte, 32)

	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	return hex.EncodeToString(b), nil
}

func (h *authUsecase) Register(ctx context.Context, req *dto.RegisterRequest) (*dto.MessageResponse, error) {
	_, err := h.repo.FindByEmail(ctx, req.Email)
	if err == nil {
		return nil, errors.New("Email already exist")
	}

	_, err = h.repo.FindByUsername(ctx, req.Username)
	if err == nil {
		return nil, errors.New("Usename already exist")
	}

	hashed, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, errors.New("Password fucked up")
	}

	user := &model.User{
		UserID:       req.Username,
		Email:        req.Email,
		PasswordHash: string(hashed),
	}

	if err := h.repo.CreateUser(ctx, user); err != nil {
		return nil, errors.New("Fucked Up")
	}

	return &dto.MessageResponse{
		Message: "Regis success nigga",
	}, nil
}

func (h *authUsecase) Login(ctx context.Context, req *dto.LoginRequest) (*dto.MessageResponse, error) {
	user, err := h.repo.FindByUsername(ctx, req.Username)
	if err == nil {
		return nil, errors.New("ga ketemu usernamenya")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password)); err != nil {
		return nil, errors.New("invalid creden")
	}

}

func (h *authUsecase) ForgotPassword(ctx context.Context, req *dto.ForgotPassword) (*dto.MessageResponse, error) {
	return nil, errors.New("testing")
}

func (h *authUsecase) RefreshToken(ctx context.Context, refresh string) (*dto.AuthResponse, error) {
	return nil, errors.New("testing")
}
