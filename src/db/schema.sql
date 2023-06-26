-- Table "Users"
CREATE TABLE Users
(
    ID           INT PRIMARY KEY AUTO_INCREMENT,
    email        VARCHAR(255),
    first_name   VARCHAR(255),
    last_name    VARCHAR(255),
    password     VARCHAR(255),
    phone_number VARCHAR(255),
    role         VARCHAR(255) DEFAULT 'User',
    created_at   DATETIME,
    tmp_token    VARCHAR(255)
);

-- Table "Scooters"
CREATE TABLE Scooters
(
    ID             INT PRIMARY KEY AUTO_INCREMENT,
    name           VARCHAR(255),
    battery_status INT,
    available      BOOLEAN,
    latitude       DECIMAL(9, 6),
    longitude      DECIMAL(9, 6),
    total_distance FLOAT,
    created_at     DATETIME
);

-- Table "Rentals"
CREATE TABLE Rentals
(
    ID                INT PRIMARY KEY AUTO_INCREMENT,
    user_id           INT,
    scooter_id        INT,
    rental_start_time DATETIME,
    rental_end_time   DATETIME,
    total_distance    FLOAT,
    total_amount      FLOAT,
    created_at        DATETIME,
    FOREIGN KEY (user_id) REFERENCES Users (ID),
    FOREIGN KEY (scooter_id) REFERENCES Scooters (ID)
);

-- Table "PaymentDetails"
CREATE TABLE PaymentDetails
(
    ID              INT PRIMARY KEY AUTO_INCREMENT,
    user_id         INT,
    card_number     VARCHAR(255),
    expiration_date DATE,
    security_code   INT,
    FOREIGN KEY (user_id) REFERENCES Users (ID)
);
