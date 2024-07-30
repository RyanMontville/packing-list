BEGIN TRANSACTION;

DROP TABLE IF EXISTS users, lists, items;

CREATE TABLE users (
	user_id serial,
	username text NOT NULL UNIQUE,
	CONSTRAINT pk_users PRIMARY KEY(user_id)
);

CREATE TABLE lists (
	list_id serial,
	user_id int NOT NULL,
	list_name text NOT NULL UNIQUE,
	date_leaving date,
	CONSTRAINT pk_lists PRIMARY KEY(list_id),
	CONSTRAINT fk_lists_users FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE items (
	item_id serial,
	list_id int NOT NULL,
	item_name text NOT NULL,
	is_item_checked boolean DEFAULT false NOT NULL,
	is_item_deleted boolean DEFAULT false NOT NULL,
	CONSTRAINT pk_items PRIMARY KEY(item_id),
	CONSTRAINT fk_items_lists FOREIGN KEY(list_id) REFERENCES lists(list_id)
);

COMMIT;