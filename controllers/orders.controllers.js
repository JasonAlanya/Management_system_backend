import { pool } from "../database/db.js";

//Get multiple orders from the db
export const getOrders = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM orders ORDER BY id ASC");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Get one order from the db
export const getOrder = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM orders WHERE id=?", [
      req.params.id,
    ]);

    if (result.length === 0)
      res.status(404).json({ message: "Result no found" });
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Create an order in the db
export const createOrder = async (req, res) => {
  try {
    const {
      order_status,
      date,
      customer,
      city_tax,
      county_tax,
      state_tax,
      federal_tax,
      total_taxes,
      total_amount,
    } = req.body;
    const [result] = await pool.query(
      "INSERT INTO orders(order_status,date,customer,city_tax,county_tax,state_tax,federal_tax,total_taxes,total_amount) VALUES (?,?,?,?,?,?,?,?,?)",
      [
        order_status,
        date,
        customer,
        city_tax,
        county_tax,
        state_tax,
        federal_tax,
        total_taxes,
        total_amount,
      ]
    );
    res.json({
      id: result.insertId,
      order_status,
      date,
      customer,
      city_tax,
      county_tax,
      state_tax,
      federal_tax,
      total_taxes,
      total_amount,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Update an order in the db
export const updateOrder = async (req, res) => {
  try {
    const [result] = await pool.query("UPDATE orders SET ? WHERE id= ?", [
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

//Delete an order from the db
export const deleteOrder = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM orders WHERE id=?", [
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
