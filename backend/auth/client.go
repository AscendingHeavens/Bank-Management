package auth

import (
	"fmt"

	"github.com/stytchauth/stytch-go/v16/stytch/consumer/stytchapi"
)

func InitializeStytch(projectID, secret string) (*stytchapi.API, error) {
	stytchAPIClient, err := stytchapi.NewClient(projectID, secret)
	if err != nil {
		return nil, fmt.Errorf("failed to initialize Stytch client: %v", err)
	}

	fmt.Println("Stytch client initialized successfully")

	return stytchAPIClient, nil
}
