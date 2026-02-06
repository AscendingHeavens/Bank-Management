package server

import (
	"net/http"

	"backend/config"

	"github.com/go-playground/validator"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type Server struct {
	router *echo.Echo
	config config.Config
}

// Validator wraps go-playground/validator and implements echo.Validator interface
type Validator struct {
	validator *validator.Validate
}

func (v *Validator) Validate(i any) error {
	return v.validator.Struct(i)
}

func NewServer(config config.Config) (*Server, error) {
	server := &Server{
		config: config,
	}
	server.setupRouter()
	return server, nil
}

func (s *Server) setupRouter() {
	router := echo.New()

	// Use validator
	router.Validator = &Validator{validator: validator.New()}

	// Middleware
	router.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "method=${method}, uri=${uri}, status=${status}\n",
		Skipper: func(c echo.Context) bool {
			// Skip logging in production
			return s.config.Mode == "production"
		},
	}))

	router.Use(middleware.Recover())
	router.GET("/hello", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})

	s.router = router
}

func (s *Server) Start(address string) error {
	return s.router.Start(address)
}
