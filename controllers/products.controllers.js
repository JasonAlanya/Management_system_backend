import { pool } from "../database/db.js";

//Get products quantity from the db
export const getProductsQuantity = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT COUNT(*) AS counter FROM product;"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Get multiple products from the db
export const getProducts = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT product.*,CONCAT(category.name) as category FROM category INNER JOIN product ON product.id_category=category.id ORDER BY id ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Get multiple products by pagination from the db
export const getProductsPagination = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT product.*,CONCAT(category.name) as category FROM category INNER JOIN product ON product.id_category=category.id ORDER BY id ASC LIMIT ?,?",
      [Number(req.params.initial_post), Number(req.params.post_per_page)]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Get one product from the db
export const getProduct = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT product.*,CONCAT(category.name) as category FROM category INNER JOIN product ON product.id_category=category.id WHERE product.id=?",
      [req.params.id]
    );

    if (result.length === 0)
      res.status(404).json({ message: "Result no found" });
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Create an product in the db
export const createProducts = async (req, res) => {
  try {
    const { id_category, name, price, product_state } = req.body;
    const [result] = await pool.query(
      "INSERT INTO product(id_category, name, price, product_state) VALUES (?,?,?,?)",
      [id_category, name, price, product_state]
    );
    res.json({
      id: result.insertId,
      id_category,
      name,
      price,
      product_state,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Update an product in the db
export const updateProducts = async (req, res) => {
  try {
    const [result] = await pool.query("UPDATE product SET ? WHERE id= ?", [
      req.body,
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Result no found" });
    } else {
      res.json("Changed item");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Delete an product from the db
export const deleteProducts = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM product WHERE id=?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Result no found" });
    } else {
      res.json("Deleted item");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
