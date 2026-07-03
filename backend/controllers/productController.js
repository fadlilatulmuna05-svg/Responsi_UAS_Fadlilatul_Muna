const db = require("../config/db");

// Menampilkan semua data
exports.getProducts = (req, res) => {
    db.query("SELECT * FROM products", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

// Menambah data
exports.addProduct = (req, res) => {
    const { nama, harga, stok } = req.body;

    const sql = "INSERT INTO products (nama, harga, stok) VALUES (?, ?, ?)";

    db.query(sql, [nama, harga, stok], (err, result) => {
        if (err) return res.status(500).json(err);

        res.json({
            message: "Data berhasil ditambahkan"
        });
    });
};

// Mengubah data
exports.updateProduct = (req, res) => {

    const { id } = req.params;
    const { nama, harga, stok } = req.body;

    const sql = "UPDATE products SET nama=?, harga=?, stok=? WHERE id=?";

    db.query(sql, [nama, harga, stok, id], (err, result) => {

        if (err) return res.status(500).json(err);

        res.json({
            message: "Data berhasil diubah"
        });

    });

};

// Menghapus data
exports.deleteProduct = (req, res) => {

    const { id } = req.params;

    db.query(
        "DELETE FROM products WHERE id=?",
        [id],
        (err, result) => {

            if (err) return res.status(500).json(err);

            res.json({
                message: "Data berhasil dihapus"
            });

        }
    );

};