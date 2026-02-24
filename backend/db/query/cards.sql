-- Create card for an account
-- name: CreateCard :one
INSERT INTO cards (id, account_id, card_number, expiry_date, pin)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- delete card by ID
-- name: DeleteCard :exec
DELETE FROM cards
WHERE id = $1;

-- get card by ID
-- name: GetCardByID :one
SELECT *
FROM cards
WHERE id = $1;

-- get cards by account ID
-- name: GetCardsByAccountID :many
SELECT *
FROM cards
WHERE account_id = $1;