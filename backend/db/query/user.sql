-- Create new user
-- name: CreateUser :one
INSERT INTO users (
    id,
    full_name,
    email,
    phone,
    created_at
)
VALUES ($1, $2, $3, $4, now())
RETURNING *;

-- Get user by ID
-- name: GetUserByID :one
SELECT * FROM users WHERE id = $1;

-- Get user by email
-- name: GetUserByEmail :one
SELECT * FROM users WHERE email = $1;

-- Get user by phone
-- name: GetUserByPhone :one
SELECT * FROM users WHERE phone = $1;

-- Update User
-- name: UpdateUser :one
UPDATE users
SET
    full_name = $2,
    email = $3,
    phone = $4
WHERE id = $1
RETURNING *;

-- Delete user
-- name: DeleteUser :exec
DELETE FROM users WHERE id = $1;


