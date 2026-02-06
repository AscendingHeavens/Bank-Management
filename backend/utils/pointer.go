package utils

func ConvertToPointer[T any](value T) *T {
	return &value
}

func ConvertFromPointer[T any](pointer *T) T {
	if pointer == nil {
		var zeroValue T
		return zeroValue
	}
	return *pointer
}
