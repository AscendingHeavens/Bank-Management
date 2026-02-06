# Bank Management System – Internal Project

IMPORTANT:
Read this README fully before starting.

If you cannot read and understand this document end to end, you are way too dumb to take this project and should not have accepted it in the first place.

## Overview

This project is an internal engineering exercise designed to test and improve discipline, execution, coordination, and ownership.

It is not a college-style assignment and not a casual demo.

It is meant to simulate real-world development in a controlled scope.

The goal is not perfection.
The goal is professionalism.

---

## Why This Project Exists

This project exists to convert discussion and documentation into action.

It is a practical test of:

* Consistency
* Focus
* Technical execution
* Communication
* Collaboration
* Accountability

It is also meant to identify gaps in workflow and habits so they can be corrected early.

---

## Team Structure

This project is built by:
* Rishi (Goated Individual)
* Nikx (Backend / ML / Systems)
* Sarvesh (Frontend / UI / Product)

One repository.
Individual branches.
Shared responsibility.

All work must follow proper Git workflow.

---

## Technical Stack

### Frontend

* Next.js (inside `/frontend` directory)
* TypeScript
* Tailwind CSS
* UI Library of choice

### Backend

* Go (inside `/backend` directory)
* Echo
* Database integration

### Database

* Postgres

### Infra
* GCP

---

## Core Features

The system must support the following core functionality in a complete and reliable manner.

### Authentication

* User signup with validation
* User login with secure password handling
* Basic session or token-based authentication
* Protected routes for authenticated users

### Account Management

* Create and manage user accounts
* Store basic profile and account data
* Maintain account balance

### Money Transfer

* Transfer money between users
* Validate sender balance before transfer
* Update balances correctly after transfer
* Prevent negative balances
* Ensure consistency in all transfer operations

All money transfers must use proper database transactions to ensure:

* Atomicity (all-or-nothing updates)
* Consistency
* No partial updates
* No corrupted balances

### Transactions

* Create payment and transfer records
* Store sender, receiver, amount, and timestamp
* Validate transaction inputs
* Reject invalid or duplicate requests

### Transaction History

* View complete transaction history
* Show incoming and outgoing transfers
* Filter by date or type (optional)

### Data Persistence

* All important data must be stored in the database
* No in-memory-only systems
* No temporary-only storage

---

## Scope and Complexity

This project is intentionally limited in scope, but not careless.

It requires basic security and data safety.

It DOES require:

* Secure password handling
* Input validation
* Basic authorization checks
* Safe database transactions
* Proper error handling

It does NOT require:

* Enterprise-grade security
* External payment gateways
* Heavy encryption systems
* Large-scale distributed architecture

Focus on correctness, safety, and completion.

---

## Development Expectations

Each developer is expected to:

* Start immediately
* Work consistently until completion
* Maintain visible progress
* Communicate blockers early
* Follow agreed timelines

This is a short-term project.

Steady daily progress is required.

Last-day rushes are discouraged.

---

## Git Workflow

All contributors must:

* Clone the repository
* Create personal development branches
* Rebase with main before PR
* Submit pull requests for review
* Avoid direct pushes to main (SKILL ISSUE IF YOU DO TS)

---

## Code Quality Standards

All code must be:

* Readable
* Reasonably documented
* Structured logically
* Free of obvious hacks (READ AI SECTION BOZO)

Temporary shortcuts must be justified and documented.

---

## Documentation

The project must include:

* Updated README (if needed)
* Basic setup instructions
* Environment configuration notes

Anyone should be able to run the project with minimal friction.
Suggestion would be to make a new "Launch.MD"
---

## Review and Evaluation

Evaluation is based on:

* Consistency of work
* Feature completeness
* Git discipline
* Communication quality
* Ability to finish

Not on raw lines of code.

---

## Timeline

Target completion: By Sunday .

Late completion does not erase earlier delays.

Do Not try to be a Hero and do everything in 1 hour as it is not meant to be.

---

## Use of AI Tools

Use of AI tools (including ChatGPT, Copilot, Cursor or similar) for generating core code, logic, frontend work or architecture is strictly prohibited.

This project is meant to test your own thinking, problem-solving, and execution.

If AI-generated code is used (I would know), it will immediately signal that the DEV is a worthless piece of shit that cannot handle a basic CRUD app like this and should not be hired for any job at all.

Google, official documentation, and Stack Overflow are allowed for reference and learning.

However, copy-pasting logic, blindly reusing solutions, or coding without understanding is not acceptable.

This project requires thinking, not assembling fragments.

Debugging help and documentation lookup are acceptable.
Code generation is not.

Rishi (me) will help with setting up debugger if required

---

## Final Note

This project is not meant to pressure.
It is meant to develop professional habits.

Take it seriously.

The habits built here will matter more than this specific codebase.
