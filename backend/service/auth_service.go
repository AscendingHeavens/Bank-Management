package services

import (
	db "backend/db/sqlc"
	"context"
	"errors"
	"fmt"
	"log"

	"github.com/stytchauth/stytch-go/v16/stytch/consumer/passwords"
	"github.com/stytchauth/stytch-go/v16/stytch/consumer/stytchapi"
	"github.com/stytchauth/stytch-go/v16/stytch/consumer/users"
)

type StytchSignUpDetails struct {
	Name     users.Name
	Email    string
	Phone    string
	Password string
	Verified bool
}

type StytchLoginDetails struct {
	Email    string
	Password string
}

type StytchResponse struct {
	UserID       string
	SessionJWT   string
	SessionToken string
	Name         string
	Email        string
	Phone        string
}

type AuthService interface {
	SignUpUser(ctx context.Context, input StytchSignUpDetails) (StytchResponse, error)
	LoginUser(ctx context.Context, input StytchLoginDetails) (StytchResponse, error)
}

type StytchAuthService struct {
	client *stytchapi.API
	store  db.Store
}

const SessionDurationMinutes = 15

func NewStytchAuthService(client *stytchapi.API, store db.Store) *StytchAuthService {
	return &StytchAuthService{
		client: client,
		store:  store,
	}
}

func (s *StytchAuthService) SignUpUser(ctx context.Context, details StytchSignUpDetails) (StytchResponse, error) {
	fmt.Println("Signup Request Details:", details)
	if details.Email == "" || details.Password == "" {
		return StytchResponse{}, errors.New("email and password required")
	}

	existingByEmail, err := s.store.GetUserByEmail(ctx, details.Email)
	if err == nil && existingByEmail.ID != "" {
		return StytchResponse{}, errors.New("email already in use")
	}

	existingByPhone, err := s.store.GetUserByPhone(ctx, details.Phone)
	if err == nil && existingByPhone.ID != "" {
		return StytchResponse{}, errors.New("phone already in use")
	}

	params := &passwords.CreateParams{
		Name:     &details.Name,
		Email:    details.Email,
		Password: details.Password,
	}
	resp, err := s.client.Passwords.Create(ctx, params)
	if err != nil {
		log.Printf("Stytch sign up error: %v", err)
		return StytchResponse{}, err
	}

	// Authenticate
	authResp, err := s.client.Passwords.Authenticate(ctx, &passwords.AuthenticateParams{
		Email:                  details.Email,
		Password:               details.Password,
		SessionDurationMinutes: SessionDurationMinutes,
	})
	if err != nil {
		log.Printf("Stytch authenticate after signup error: %v", err)
		return StytchResponse{}, err
	}

	// Insert user in DB
	arg := db.CreateUserParams{
		ID:       resp.UserID,
		FullName: details.Name.FirstName + " " + details.Name.LastName,
		Email:    details.Email,
		Phone:    details.Phone,
	}
	dbResp, err := s.store.CreateUser(context.Background(), arg)
	if err != nil {
		log.Printf("DB create user error: %v", err)
		return StytchResponse{}, err
	}

	return StytchResponse{
		UserID:       dbResp.ID,
		SessionJWT:   authResp.SessionJWT,
		SessionToken: authResp.SessionToken,
		Name:         dbResp.FullName,
		Email:        dbResp.Email,
		Phone:        dbResp.Phone,
	}, nil
}

func (s *StytchAuthService) LoginUser(ctx context.Context, details StytchLoginDetails) (StytchResponse, error) {
	params := &passwords.AuthenticateParams{
		Email:                  details.Email,
		Password:               details.Password,
		SessionDurationMinutes: SessionDurationMinutes,
	}
	resp, err := s.client.Passwords.Authenticate(ctx, params)
	if err != nil {
		log.Printf("Stytch login error: %v", err)
		return StytchResponse{}, err
	}

	// Fetch user from DB
	dbResp, err := s.store.GetUserByID(ctx, resp.UserID)
	if err != nil {
		log.Printf("DB fetch user error: %v", err)
		return StytchResponse{}, err
	}

	return StytchResponse{
		UserID:       dbResp.ID,
		SessionJWT:   resp.SessionJWT,
		SessionToken: resp.SessionToken,
		Name:         dbResp.FullName,
		Email:        dbResp.Email,
		Phone:        dbResp.Phone,
	}, nil
}
