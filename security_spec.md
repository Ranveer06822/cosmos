# Security Specification for Cosmos DJ App

## Data Invariants
1. A booking must have a valid `userId` matching the authenticated user.
2. Users can only read their own bookings.
3. Only admins can update the `status` of a booking.
4. Users cannot delete their own bookings once confirmed.
5. User profiles (`users` collection) are only readable/writable by the owner.

## The Dirty Dozen Payloads
1. Attempting to create a booking for another user (`userId` mismatch).
2. Attempting to update `status` to 'confirmed' by a non-admin user.
3. Attempting to read another user's booking document.
4. Attempting to list all bookings as a regular user.
5. Attempting to overwrite `createdAt` on update.
6. Attempting to inject a massive string into the `name` field.
7. Attempting to delete a booking without being the owner.
8. Attempting to modify `userId` after creation.
9. Attempting to create a user profile with `role: 'admin'`.
10. Attempting to update someone else's user profile.
11. Injecting invalid characters into document IDs.
12. Attempting a batch write that violates relational integrity.

## Test Runner
Testing will be performed via rule analysis and linting.
