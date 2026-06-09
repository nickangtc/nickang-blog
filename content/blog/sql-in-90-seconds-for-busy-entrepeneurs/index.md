---
title: "SQL in 90 seconds (for busy entrepeneurs)"
date_published: "2024-12-06"
date_updated: "2024-12-06"
excerpt: "Use this as your starting point."
tags: ["Tech", "Tutorial", "Business"]
fav: false
backlinks:
ai_summary: "The post gives a quick introduction to SQL for entrepreneurs, explaining that it is used to retrieve, manage, and organise data stored in tables with defined types and constraints. It highlights core features such as SELECT, JOIN, INSERT/UPDATE/DELETE, transactions, sorting and aggregation, and indexes, with the main point that SQL is a practical tool for keeping business data accurate and efficiently queryable."
---

## SQL is for managing and querying data

SQL is a programming language that enables you to retrieve, update, delete, and organise data efficiently.

- Query: retrieve
- Manage: update, delete, organise

What may be surprising is SQL was designed by IBM in the 1970s for **business analysts**, not programmers, so it tries (maybe not terribly well) to resemble plain English.

## Top 3 SQL databases worldwide

For most entrepreneurs, these open-source options dominate ([DB-Engines](https://db-engines.com/en/ranking)):

1. **MySQL**
2. **PostgreSQL**
3. **SQLite**

Open-source means no licensing fees and long-term reliability.

## Tables as the foundation

Data in SQL is stored in _tables_. Think spreadsheets with rows (records) and columns (attributes/fields).

An important differentiator of SQL data is that each column has a defined data type. The common ones are:

- integer
- text
- boolean (true/false)
- timestamp

If you try to insert a boolean value into a text field, you get a slap on the risk and the create/update op will fail with an error.

Another difference is the baked-in understanding of table relationships and validation. This means you can apply a schema that allow only the 'right' data type to be inserted.

A few examples:

- data must be NOT NULL (i.e. not empty)
- data must be UNIQUE (i.e. no other row should have the same value, e.g. ID)
- data must exist as a FOREIGN KEY (i.e. the value here must be an ID in a related table)

## Retrieve data with SELECT

```
SELECT
	first_name,
	last_login_at,
FROM customers
WHERE
	country = "Singapore"
```

This extracts and filters specific rows (customers that are in Singapore) and columns (their first name and last login timestamp).

You could also write all that in a single line. Indentation in SQL is purely for human readability and so is capitalisation (i.e. you can write `select` instead of `SELECT`).

## Combine data with JOIN

You can use `JOIN` operations to combine data. For example, combining a `Customers` table and `Orders` table to find who bought what:

```
SELECT *
FROM customers
JOIN orders
ON customers.id = orders.customer_id;
```

If there were 1000 orders, this query will return 1000 rows and have all columns in `Customers` **and** `Orders` tables.

## Manipulate data with INSERT, UPDATE, DELETE

You can add (`INSERT`), change (`UPDATE`), or remove (`DELETE`) data in tables:

For example:

```
INSERT INTO products (name, price) VALUES ('Laptop', 1200);
```

You probably won't ever insert data into a database yourself using an `INSERT` statement. Either your developers would write code that automates that based on user actions, or you're doing it wrong.

## Ensure data consistency with transactions

**Transactions** allow multiple queries to succeed or fail together.

For example, when a customer places an order in an e-commerce store, you can use a transaction to wrap around the following operations:

- Create new order,
- update inventory (e.g. quantity -1), and
- create payment record (e.g. $100 paid by card).

If creating a `Payments` record succeeds but creating a new row in `Orders` fails, then the database will do a rollback. A **rollback** is a set of reverse operations to bring the relevant tables back to the original state, as if nothing ever happened.

In this case, the database ensures that the new `Payments` record is deleted.

But if all 3 succeed, it'd be as though 3 separate operations just happened successfully.

## Organise data with ORDER BY, GROUP BY, SUM, and COUNT

SQL includes features for sorting (`ORDER BY`), grouping (`GROUP BY`), and aggregating (e.g., `SUM`, `COUNT`, `AVG`).

For example, you can order products by descending price:

```
SELECT
	*
FROM products
ORDER BY price DESC;
```

Or, you can count the number of products that are above 1000 dollars:

```
select COUNT(*) from products where price > 1000;
```

This would output 1 row with 1 column with a single value: the count of products whose prices are above 1000.

## Indexes speed up queries

Indexes act like a database's yellow pages, speeding up data retrieval for frequently queried fields (e.g., customer names or order IDs).

Because of internal optimisations like indexing, you can find 1 row in a table with 1 million rows in less than 1/100th of a second.
