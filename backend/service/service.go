package services

import (
	db "backend/db/sqlc"

	"github.com/stytchauth/stytch-go/v16/stytch/consumer/stytchapi"
)

type Service struct {
	AuthService AuthService
}

func NewService(client *stytchapi.API, store db.Store) *Service {
	return &Service{
		AuthService: NewStytchAuthService(client, store),
	}
}
