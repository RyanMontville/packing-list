const express = require('express');
const pool = require('./db');
const app = express();
const port = 3000;

app.use(express.json());

// Get all users
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Get a user by username
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Create a new user
app.post('/users', async (req, res) => {
  const { username, user_key } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO public.users(username, user_key) VALUES (?, ?) RETURNING user_id;',
      [username, user_key]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Get lists for username
app.get('/lists/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT list_id, list_name, date_leaving FROM public.lists JOIN users on lists.user_id = users.user_id WHERE username = $1;', [id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Create a new list
app.post('/lists', async (req, res) => {
  const { user_id, list_name, date_leaving } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO public.lists(user_id, list_name, date_leaving) VALUES ($1, $2, $3) RETURNING list_id;',
      [user_id, list_name, date_leaving]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Update date leaving for list
app.put('/lists/:id', async (req, res) => {
  const { id } = req.params;
  const { date_leaving } = req.body;
  try {
    const result = await pool.query(
      'UPDATE public.lists SET date_leaving = $1 WHERE list_id = $2 RETURNING *;',
      [date_leaving, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Get items for list_id
app.get('/items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT item_id, item_name, is_item_checked, is_item_deleted FROM public.items WHERE list_id = $1;', [id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// add an item to list
app.post('/items', async (req, res) => {
  const { user_id, list_name, date_leaving } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO public.items(list_id, item_name) VALUES ($1, $2); RETURNING item_id;',
      [list_id, item_name]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// change item completed status
app.put('/items/:id', async (req, res) => {
  const { id } = req.params;
  const { is_item_checked } = req.body;
  try {
    const result = await pool.query(
      'UPDATE public.items SET is_item_checked = $1 WHERE item_id = $2 RETURNING *;',
      [is_item_checked, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// mark item as deleted
app.put('/delete-item/:id', async (req, res) => {
  const { id } = req.params;
  const { is_item_deleted } = req.body;
  try {
    const result = await pool.query(
      'UPDATE public.items SET is_item_deleted = TRUE WHERE item_id = $2 RETURNING *;',
      [is_item_checked, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
