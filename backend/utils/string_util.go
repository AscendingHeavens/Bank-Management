package utils

import (
	"strings"

	"github.com/stytchauth/stytch-go/v16/stytch/consumer/users"
)

func GetStytchName(name string) users.Name {
	parts := strings.Fields(strings.TrimSpace(name))
	n := len(parts)

	if n == 0 {
		return users.Name{}
	}

	first := parts[0]
	last := ""
	if n > 1 {
		last = parts[n-1]
	}

	return users.Name{
		FirstName:  first,
		MiddleName: "",
		LastName:   last,
	}
}
