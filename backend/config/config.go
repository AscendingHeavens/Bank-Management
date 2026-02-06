package config

import (
	"github.com/spf13/viper"
)

type Config struct {
	//Enter app.env details
	Port            string `mapstructure:"PORT"`
	DBUrl           string `mapstructure:"DATABASE_URL"`
	StytchProjectID string `mapstructure:"STYTCH_PROJECT_ID"`
	StytchSecret    string `mapstructure:"STYTCH_SECRET"`
	StytchEnv       string `mapstructure:"STYTCH_ENV"`
	Mode            string `mapstructure:"MODE"`
}

func LoadConfig(path string) (config Config, err error) {
	viper.SetConfigFile(path + "/.env")

	viper.AutomaticEnv()

	if err = viper.ReadInConfig(); err != nil {
		return
	}
	err = viper.Unmarshal(&config)
	return
}
