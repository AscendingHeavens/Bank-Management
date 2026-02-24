package server

import (
	"backend/errors"
	services "backend/service"
	"backend/utils"
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
)

type SignUpUserRequest struct {
	Name     string `json:"name" validate:"required"`
	Email    string `json:"email" validate:"required"`
	Phone    string `json:"phone" validate:"required"`
	Password string `json:"password"`
}

type AuthResponse struct {
	Id           string `json:"id"`
	Name         string `json:"name"`
	Email        string `json:"email"`
	Phone        string `json:"phone"`
	SessionJWT   string `json:"session_jwt"`
	SessionToken string `json:"session_token"`
}

type LoginUserRequest struct {
	Email    string `json:"email" validate:"required"`
	Password string `json:"password" validate:"required"`
}

func (s *Server) SignUpUser(ctx echo.Context) error {
	var request SignUpUserRequest
	if err := ctx.Bind(&request); err != nil {
		return ctx.JSON(http.StatusBadRequest, errors.ErrorResponse(err, "Invalid user information", 400))
	}
	fmt.Println("Signup Request:", request)

	stytchDetails := services.StytchSignUpDetails{
		Name:     utils.GetStytchName(request.Name),
		Email:    request.Email,
		Phone:    request.Phone,
		Password: request.Password,
	}
	resp, err := s.Services.AuthService.SignUpUser(ctx.Request().Context(), stytchDetails)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, errors.ErrorResponse(err, "Failed to sign up user", 500))
	}

	data := AuthResponse{
		Id:           resp.UserID,
		Name:         resp.Name,
		Email:        resp.Email,
		Phone:        resp.Phone,
		SessionJWT:   resp.SessionJWT,
		SessionToken: resp.SessionToken,
	}
	ctx.Set("user_id", resp.UserID)

	return ctx.JSON(http.StatusOK, errors.SuccessResponse(data))
}

func (s *Server) LoginUser(ctx echo.Context) error {
	var request LoginUserRequest
	if err := ctx.Bind(&request); err != nil {
		return ctx.JSON(http.StatusBadRequest, errors.ErrorResponse(err, "Invalid user information", 400))
	}

	resp, err := s.Services.AuthService.LoginUser(ctx.Request().Context(), services.StytchLoginDetails{
		Email:    request.Email,
		Password: request.Password,
	})
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, errors.ErrorResponse(err, "Failed to log in user", 500))
	}

	data := AuthResponse{
		Id:           resp.UserID,
		Name:         resp.Name,
		Email:        resp.Email,
		Phone:        resp.Phone,
		SessionJWT:   resp.SessionJWT,
		SessionToken: resp.SessionToken,
	}
	return ctx.JSON(http.StatusOK, errors.SuccessResponse(data))
}
