-- Create transaction entry
-- name: CreateTransaction :one
INSERT INTO transactions (
    id,
    sender_account_id,
    receiver_account_id,    
    amount,
    created_at
)
VALUES ($1, $2, $3, $4, now())
RETURNING *;

-- Get transaction by ID
-- name: GetTransactionByID :one
SELECT *
FROM transactions
WHERE id = $1;

-- Get transactions by sender account ID
-- name: GetTransactionsByAccountID :many
SELECT *
FROM transactions
WHERE sender_account_id = $1
ORDER BY created_at DESC;

-- Get transactions by receiver account ID
-- name: GetTransactionsByReceiverAccountID :many
SELECT *
FROM transactions
WHERE receiver_account_id = $1  
ORDER BY created_at DESC;


