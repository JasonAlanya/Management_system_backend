import { pool } from "../database/db.js";

//Get multiple products associated with the order from the db
export const getProductSummary = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT product_order.*,product.name,product.price,CONCAT(category.name) as category FROM product_order INNER JOIN product ON product_order.id_product=product.id INNER JOIN category ON product.id_category=category.id WHERE product_order.id_order=? ORDER BY id ASC",
      [req.params.id]
    );

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Create a product associated with an order in the db
export const createProductsSummary = async (req, res) => {
  try {
    const { id_order, id_product, quantity } = req.body;
    const [result] = await pool.query(
      "INSERT INTO product_order(id_order,id_product,quantity) VALUES (?,?,?)",
      [id_order, id_product, quantity]
    );
    res.json({
      id: result.insertId,
      id_order,
      id_product,
      quantity,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Update a product associated with an order in the db
export const updateProductsSummary = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE product_order SET ? WHERE id= ?",
      [req.body, req.params.id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Result no found" });
    } else {
      res.json("Changed item");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Delete a product associated with an order from the db
export const deleteProductsSummary = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM product_order WHERE id=?", [
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
