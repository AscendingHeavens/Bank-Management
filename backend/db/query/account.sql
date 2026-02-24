-- Create new account
-- name: CreateAccount :one
INSERT INTO accounts (
    id,
    user_id,
    balance,
    created_at
)
VALUES ($1, $2, $3, now())
RETURNING *;

-- Get account by ID
-- name: GetAccountByID :one
SELECT *
FROM accounts
WHERE id = $1;

-- Get accounts by user ID
-- name: GetAccountsByUserID :many
SELECT *
FROM accounts
WHERE user_id = $1;

-- Lock account row for transaction
-- name: GetAccountForUpdate :one
SELECT *
FROM accounts
WHERE id = $1
FOR UPDATE;

-- Update account balance
-- name: UpdateAccountBalance :one
UPDATE accounts
SET balance = balance + $2
WHERE id = $1
RETURNING *;

-- Delete account
-- name: DeleteAccount :exec
DELETE FROM accounts
WHERE id = $1;
