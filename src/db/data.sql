-- Insertion de fausses données dans la table "Users"
INSERT INTO Users (email, first_name, last_name, password, phone_number, created_at)
VALUES ('user1@test.com', 'John', 'Doe', 'abc', '1234567890', NOW()),
       ('user2@test.com', 'Jane', 'Smith', 'abc', '9876543210', NOW()),
       ('admin@test.com', 'Admin', 'User', 'abc', '5555555555', NOW());

-- Insertion de fausses données dans la table "Scooters"
INSERT INTO Scooters (name, battery_status, available, latitude, longitude, total_distance, created_at)
VALUES ('Scooter1', 80, true, 49.442420, 1.099750, 0, NOW()),
       ('Scooter2', 60, true, 49.436282, 1.089626, 0, NOW()),
       ('Scooter3', 90, true, 49.438972, 1.103632, 0, NOW()),
       ('Scooter4', 75, false, 49.441817, 1.096411, 0, NOW());

-- Insertion de fausses données dans la table "Rentals"
INSERT INTO Rentals (user_id, scooter_id, rental_start_time, rental_end_time, total_distance, total_amount, created_at)
VALUES (1, 1, '2023-06-25 09:00:00', '2023-06-25 10:00:00', 3.5, 5.0, NOW()),
       (2, 2, '2023-06-25 14:30:00', '2023-06-25 15:30:00', 4.2, 6.0, NOW()),
       (1, 3, '2023-06-25 17:45:00', '2023-06-25 18:30:00', 2.8, 4.0, NOW());

-- Insertion de fausses données dans la table "PaymentDetails"
INSERT INTO PaymentDetails (user_id, card_number, expiration_date, security_code)
VALUES (1, '**** **** **** 1234', '2025-12-01', 123),
       (2, '**** **** **** 5678', '2024-06-01', 456),
       (3, '1234 5678 9876 5678', '2026-02-01', 656);