CREATE TABLE `Challenge`(
	`assumptions` VARCHAR(256),
	`chat` VARCHAR(256),
	`CreatedBy` VARCHAR(32),
	`CreatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`id` VARCHAR(40) NOT NULL,
	`indicators` VARCHAR(256),
	`issues` VARCHAR(256),
	`LastUpdatedBy` VARCHAR(32),
	`LastUpdatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`lob` VARCHAR(40),
	`motivation` VARCHAR(256),
	`name` VARCHAR(80),
	`resolution` DATETIME(3),
	`reviewer` VARCHAR(40),
	`schedule` VARCHAR(256),
	`SoftDeleteFlag` BOOLEAN,
	`solution` VARCHAR(40),
	`status` VARCHAR(40),
	`submission` DATETIME(3),
	PRIMARY KEY(`id`)
);
ALTER TABLE `Challenge`
	ADD CONSTRAINT `467dc8e6820935e71c6f96670bdbf5` UNIQUE KEY(`id`);
