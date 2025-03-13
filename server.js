/* eslint-disable @typescript-eslint/no-require-imports */
const express = require("express");

const cors = require("cors");
const pool = require("./db");

const nodemailer = require("nodemailer");

const app = express();

const bcrypt = require("bcrypt");

const stripe = require("stripe")(
  "sk_test_51QjLIuCQUfncnbXmMQO0IrE8ZXEERnlpAmpKvj9JiqJA9u7o3lgi9WuJ29DuTEAJBT9Y5Wz56AoH0QwMZOubwX1O00zdICRJsi"
);

app.use(cors());
app.use(express.json());

app.get("/products", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products");
    res.json(rows);
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: "Продукт не найден" });
    }
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

app.get("/characteristics", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products_characteristics");
    res.json(rows);
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

app.get("/characteristics/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM products_characteristics WHERE productId = ?",
      [id]
    );
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: "Продукт не найден" });
    }
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

app.post("/comment", async (req, res) => {
  const { userId, productId, comment, commentRating } = req.body;

  try {
    const commentId = Date.now();
    const commentDate = new Date();

    await pool.query(
      "INSERT INTO users_comments (commentId, productId, userId, comment, commentRating, commentLikes, commentDislikes, commentDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [commentId, productId, userId, comment, commentRating, 0, 0, commentDate]
    );

    res.status(201).json({ message: "Comment saved successfully" });
  } catch (error) {
    console.error("Error saving comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/update-products/:id", async (req, res) => {
  const { id } = req.params;
  const { commentRating } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT rating, reviewAmounts FROM products WHERE id = ?",
      [id]
    );
    const product = rows[0];

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { rating, reviewAmounts } = product;
    const newReviewAmounts = reviewAmounts + 1;
    const newRating =
      (rating * reviewAmounts + commentRating) / newReviewAmounts;

    await pool.query(
      "UPDATE products SET rating = ?, reviewAmounts = ? WHERE id = ?",
      [newRating, newReviewAmounts, id]
    );

    res.status(200).json({ message: "Product rating updated successfully" });
  } catch (error) {
    console.error("Error updating product rating:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/update-comment/:id", async (req, res) => {
  const { id } = req.params;
  const { userId, like, dislike } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM comment_votes WHERE userId = ? AND commentId = ?",
      [userId, id]
    );

    if (rows.length > 0) {
      const previousVote = rows[0].voteType;

      if (like && previousVote === "like") {
        await pool.query(
          "UPDATE users_comments SET commentLikes = commentLikes - 1 WHERE commentId = ?",
          [id]
        );
        await pool.query(
          "DELETE FROM comment_votes WHERE userId = ? AND commentId = ?",
          [userId, id]
        );
        return res.status(200).json({ message: "Лайк убран" });
      }

      if (dislike && previousVote === "dislike") {
        await pool.query(
          "UPDATE users_comments SET commentDislikes = commentDislikes - 1 WHERE commentId = ?",
          [id]
        );
        await pool.query(
          "DELETE FROM comment_votes WHERE userId = ? AND commentId = ?",
          [userId, id]
        );
        return res.status(200).json({ message: "Дизлайк убран" });
      }

      if (like && previousVote === "dislike") {
        await pool.query(
          "UPDATE users_comments SET commentDislikes = commentDislikes - 1, commentLikes = commentLikes + 1 WHERE commentId = ?",
          [id]
        );
        await pool.query(
          "UPDATE comment_votes SET voteType = 'like' WHERE userId = ? AND commentId = ?",
          [userId, id]
        );
        return res
          .status(200)
          .json({ message: "Дизлайк убран, лайк добавлен" });
      }

      if (dislike && previousVote === "like") {
        await pool.query(
          "UPDATE users_comments SET commentLikes = commentLikes - 1, commentDislikes = commentDislikes + 1 WHERE commentId = ?",
          [id]
        );
        await pool.query(
          "UPDATE comment_votes SET voteType = 'dislike' WHERE userId = ? AND commentId = ?",
          [userId, id]
        );
        return res
          .status(200)
          .json({ message: "Лайк убран, дизлайк добавлен" });
      }
    } else {
      if (like) {
        await pool.query(
          "UPDATE users_comments SET commentLikes = commentLikes + 1 WHERE commentId = ?",
          [id]
        );
        await pool.query(
          "INSERT INTO comment_votes (userId, commentId, voteType) VALUES (?, ?, 'like')",
          [userId, id]
        );
        return res.status(200).json({ message: "Лайк добавлен" });
      }

      if (dislike) {
        await pool.query(
          "UPDATE users_comments SET commentDislikes = commentDislikes + 1 WHERE commentId = ?",
          [id]
        );
        await pool.query(
          "INSERT INTO comment_votes (userId, commentId, voteType) VALUES (?, ?, 'dislike')",
          [userId, id]
        );
        return res.status(200).json({ message: "Дизлайк добавлен" });
      }
    }
  } catch (error) {
    console.error("Ошибка при обновлении голосов:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

app.get("/comments/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    const [comments] = await pool.query(
      "SELECT * FROM users_comments WHERE productId = ? ORDER BY commentId DESC",
      [productId]
    );

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/register", async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;

  try {
    const [existingUsers] = await pool.query(
      "SELECT * FROM users WHERE userEmail = ?",
      [userEmail]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ message: "Email is already in use" });
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const userId = Date.now();

    await pool.query(
      "INSERT INTO users (userId, userName, userEmail, userPassword) VALUES (?, ?, ?, ?)",
      [userId, userName, userEmail, hashedPassword]
    );

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: userId,
        name: userName,
        email: userEmail,
      },
    });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { userEmail, userPassword } = req.body;

  try {
    const [users] = await pool.query(
      "SELECT * FROM users WHERE userEmail = ?",
      [userEmail]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: "Email not found" });
    }

    const user = users[0];

    const isPasswordValid = await bcrypt.compare(
      userPassword,
      user.userPassword
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.userId,
        name: user.userName,
        email: user.userEmail,
        address: user.userAddress,
        postalCode: user.userPostalCode,
        phoneNumber: user.userPhoneNumber,
        notifications: user.userNotifications,
        debitCard: user.userDebitCard,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE userId = ?", [
      id,
    ]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: "Пользователь не найден" });
    }
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

app.post("/user-info", async (req, res) => {
  const {
    userId,
    userName,
    userEmail,
    userAddress,
    userPostalCode,
    userPhoneNumber,
  } = req.body;

  try {
    const [users] = await pool.query("SELECT * FROM users WHERE userId = ?", [
      userId,
    ]);

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    await pool.query(
      "UPDATE users SET userName = ?, userEmail = ?, userAddress = ?, userPostalCode = ?, userPhoneNumber = ? WHERE userId = ?",
      [
        userName,
        userEmail,
        userAddress,
        userPostalCode,
        userPhoneNumber,
        userId,
      ]
    );

    res.status(200).json({
      message: "User info updated successfully",
    });
  } catch (error) {
    console.error("Error handling user info:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/user-info/password", async (req, res) => {
  const { userId, userOldPassword, userPassword } = req.body;

  try {
    const [users] = await pool.query("SELECT * FROM users WHERE userId = ?", [
      userId,
    ]);

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = users[0];

    const passwordMatch = await bcrypt.compare(
      userOldPassword,
      user.userPassword
    );
    if (!passwordMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10);

    await pool.query("UPDATE users SET userPassword = ? WHERE userId = ?", [
      hashedPassword,
      userId,
    ]);

    res.status(200).json({
      message: "User info updated successfully",
    });
  } catch (error) {
    console.error("Error handling user info:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/account/orders/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const [users] = await pool.query("SELECT * FROM users WHERE userId = ?", [
      userId,
    ]);
    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const [rows] = await pool.query("SELECT * FROM orders WHERE userId = ?", [
      userId,
    ]);
    res.json(rows);
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

app.post("/cart/create-checkout-session", async (req, res) => {
  const { productsWithQuantity, discount, shippingMethod, serviseCommission } =
    req.body;

  const discountCoefficient = 0.2;
  const shipmentCost =
    shippingMethod === "free" ? 0 : shippingMethod === "regular" ? 7.5 : 22.5;

  const lineItems = productsWithQuantity.map((product) => {
    let discountedPrice = product.price;
    if (discount !== 0) {
      discountedPrice = Math.floor(product.price * (1 - discountCoefficient));
    }
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          images: [product.image],
        },
        unit_amount: Math.floor(discountedPrice * 100),
      },
      quantity: product.quantity,
    };
  });

  lineItems.push(
    {
      price_data: {
        currency: "usd",
        product_data: {
          name: "Shipping",
        },
        unit_amount: Math.floor(shipmentCost * 100),
      },
      quantity: 1,
    },
    {
      price_data: {
        currency: "usd",
        product_data: {
          name: "Service Comission",
        },
        unit_amount: Math.floor(serviseCommission * 100),
      },
      quantity: 1,
    }
  );

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `http://localhost:3000/cart/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: "http://localhost:3000/cart/error",
  });

  res.json({ id: session.id });
});

app.post("/cart/save-order", async (req, res) => {
  const {
    sessionId,
    userId,
    productsIds,
    productsCounts,
    totalPrice,
    userAddress,
    userPhoneNumber,
    userName,
    userPostalCode,
    userEmail,
  } = req.body;
  let amount_total, customer_details;

  try {
    if (/[a-zA-Z]/.test(sessionId)) {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      amount_total = session.amount_total;
      customer_details = session.customer_details;
    }

    const orderData = {
      orderId: sessionId,
      userId: userId,
      productsIds: productsIds,
      productsCounts: productsCounts,
      orderDate: new Date(),
      totalPrice: amount_total !== undefined ? amount_total / 100 : totalPrice,
      userAddress: userAddress,
      userPhoneNumber: userPhoneNumber,
      userName: userName,
      userPostalCode: userPostalCode,
      userEmail: userEmail,
    };

    const [rows] = await pool.query(
      "SELECT orderId, orderDate, totalPrice FROM orders WHERE orderId = ?",
      [orderData.orderId]
    );

    if (rows.length > 0) {
      return res.json({
        message: "Order already exists",
        email: customer_details?.email || userEmail,
        orderDate: rows[0].orderDate,
        totalPrice: rows[0].totalPrice,
      });
    }

    await pool.query(
      "INSERT INTO orders (orderId, userId, productsIds, productsCounts, orderDate, totalPrice, userAddress, userPhoneNumber, userName, userPostalCode, userEmail) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        orderData.orderId,
        orderData.userId,
        orderData.productsIds,
        JSON.stringify(orderData.productsCounts),
        orderData.orderDate,
        orderData.totalPrice,
        orderData.userAddress,
        orderData.userPhoneNumber,
        orderData.userName,
        orderData.userPostalCode,
        orderData.userEmail,
      ]
    );

    const productIdsArray = productsIds.split(",").map(Number);
    const productCountsArray = Array.isArray(productsCounts)
      ? productsCounts.map(Number)
      : [];

    if (productIdsArray.length !== productCountsArray.length) {
      return res.status(400).json({
        error: "Mismatch between product IDs and counts",
      });
    }

    const updateQueries = productIdsArray.map((productId, index) => {
      const count = productCountsArray[index];
      return pool.query(
        "UPDATE products SET sellsAmount = sellsAmount + ? WHERE id = ?",
        [count, productId]
      );
    });

    await Promise.all(updateQueries);

    res.json({
      message: "Order saved successfully",
      email:
        customer_details !== undefined ? customer_details.email : userEmail,
      orderDate: orderData.orderDate,
      amountTotal: orderData.totalPrice,
    });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/contact-us/submit", async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "illadmitrenko666@gmail.com",
      pass: "eiav cuyc fizp munq",
    },
  });

  const mailOptions = {
    from: '"Form Submission" <illadmitrenko666@gmail.com>',
    to: "illadmitrenko666@gmail.com",
    subject: "New Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
});

app.post("/delete-user", async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE userId = ?", [
      id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    await pool.query("DELETE FROM users WHERE userId = ?", [id]);

    res.json({ message: "User deleted successfully", deletedUser: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
