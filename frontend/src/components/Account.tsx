"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, CreditCard } from "lucide-react"

interface AccountProps {
  user?: { id: string; name: string; email: string } | null
}

type UserCard = {
  id: string
  type: "DEBIT" | "CREDIT"
  holder: string
  last4: string
  expiry: string
}

export function Account({ user }: AccountProps) {
  const [activeTab, setActiveTab] = useState<"profile" | "cards">("profile")

  const nameParts = user?.name?.split(" ") || ["User", ""]
  const [profile, setProfile] = useState({
    firstName: nameParts[0],
    lastName: nameParts[1],
    email: user?.email || "user@example.com",
    phone: "",
  })

  const [cards, setCards] = useState<UserCard[]>([])
  const [showAddCard, setShowAddCard] = useState(false)
  const [newCard, setNewCard] = useState({
    type: "DEBIT",
    number: "",
    holder: "",
    expiry: "",
  })

  return (
    <div className="min-h-screen bg-muted/30 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <h1 className="text-3xl font-bold tracking-tight mb-8">
          Account Settings
        </h1>

        {/* Tabs */}
        <div className="flex gap-2 rounded-xl bg-muted p-1 w-fit mb-10">
          {[
            { id: "profile", label: "Profile", icon: User },
            { id: "cards", label: "Cards", icon: CreditCard },
          ].map(({ id, label, icon: Icon }) => {
            const active = activeTab === id
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition ${
                  active
                    ? "bg-background shadow text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            )
          })}
        </div>

        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <Card className="rounded-2xl border bg-background shadow-sm p-8">
            <h2 className="text-xl font-semibold mb-6">
              Personal Information
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input
                className="h-11"
                placeholder="First name"
                value={profile.firstName}
                onChange={(e) =>
                  setProfile({ ...profile, firstName: e.target.value })
                }
              />
              <Input
                className="h-11"
                placeholder="Last name"
                value={profile.lastName}
                onChange={(e) =>
                  setProfile({ ...profile, lastName: e.target.value })
                }
              />
            </div>

            <Input
              className="h-11 mb-4"
              placeholder="Email address"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />

            <Input
              className="h-11 mb-6"
              placeholder="Phone number"
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
            />

            <Button className="w-full h-11">
              Save Changes
            </Button>
          </Card>
        )}

        {/* CARDS TAB */}
        {activeTab === "cards" && (
          <Card className="rounded-2xl border bg-background shadow-sm p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">My Cards</h2>
              <Button onClick={() => setShowAddCard(true)}>
                Add Card
              </Button>
            </div>

            <div className="grid gap-4">
              {cards.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No cards added yet.
                </p>
              )}

              {cards.map((card) => (
                <div
                  key={card.id}
                  className={`rounded-2xl p-6 text-white shadow-lg ${
                    card.type === "DEBIT"
                      ? "bg-gradient-to-br from-slate-800 to-slate-900"
                      : "bg-gradient-to-br from-purple-700 to-pink-700"
                  }`}
                >
                  <p className="text-xs uppercase tracking-wide opacity-70 mb-6">
                    {card.type} Card
                  </p>

                  <p className="text-xl font-semibold tracking-widest mb-6">
                    •••• •••• •••• {card.last4}
                  </p>

                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="opacity-70">Cardholder</p>
                      <p className="font-medium">{card.holder}</p>
                    </div>
                    <div>
                      <p className="opacity-70">Expires</p>
                      <p className="font-medium">{card.expiry}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* ADD CARD MODAL */}
      {showAddCard && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
          <Card className="w-full max-w-md rounded-2xl bg-background shadow-xl p-6">
            <h3 className="text-lg font-semibold mb-4">
              Add New Card
            </h3>

            <select
              className="w-full h-11 rounded-lg border px-3 mb-3"
              value={newCard.type}
              onChange={(e) =>
                setNewCard({ ...newCard, type: e.target.value })
              }
            >
              <option value="DEBIT">Debit Card</option>
              <option value="CREDIT">Credit Card</option>
            </select>

            <Input
              className="h-11 mb-3"
              placeholder="Card number"
              maxLength={16}
              value={newCard.number}
              onChange={(e) =>
                setNewCard({ ...newCard, number: e.target.value })
              }
            />

            <Input
              className="h-11 mb-3"
              placeholder="Cardholder name"
              value={newCard.holder}
              onChange={(e) =>
                setNewCard({ ...newCard, holder: e.target.value })
              }
            />

            <Input
              className="h-11 mb-6"
              placeholder="Expiry (MM/YY)"
              value={newCard.expiry}
              onChange={(e) =>
                setNewCard({ ...newCard, expiry: e.target.value })
              }
            />

            <div className="flex gap-3">
              <Button
                className="flex-1"
                onClick={() => {
                  setCards((prev) => [
                    ...prev,
                    {
                      id: crypto.randomUUID(),
                      type: newCard.type as "DEBIT" | "CREDIT",
                      holder: newCard.holder,
                      last4: newCard.number.slice(-4),
                      expiry: newCard.expiry,
                    },
                  ])
                  setShowAddCard(false)
                  setNewCard({
                    type: "DEBIT",
                    number: "",
                    holder: "",
                    expiry: "",
                  })
                }}
              >
                Save Card
              </Button>

              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowAddCard(false)}
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
