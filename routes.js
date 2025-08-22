const { createProxyMiddleware } = require("http-proxy-middleware");

function routes(app) {
  app.use("/users", createProxyMiddleware({ target: process.env.USER_SERVICE_URL, changeOrigin: true }));
  app.use("/auth", createProxyMiddleware({ target: process.env.AUTH_SERVICE_URL, changeOrigin: true }));
  app.use("/products", createProxyMiddleware({ target: process.env.PRODUCT_SERVICE_URL, changeOrigin: true }));
  app.use("/categories", createProxyMiddleware({ target: process.env.CATEGORY_SERVICE_URL, changeOrigin: true }));
  app.use("/cart", createProxyMiddleware({ target: process.env.CART_SERVICE_URL, changeOrigin: true }));
  app.use("/orders", createProxyMiddleware({ target: process.env.ORDER_SERVICE_URL, changeOrigin: true }));
  app.use("/payments", createProxyMiddleware({ target: process.env.PAYMENT_SERVICE_URL, changeOrigin: true }));
  app.use("/notifications", createProxyMiddleware({ target: process.env.NOTIFICATION_SERVICE_URL, changeOrigin: true }));
}

module.exports = routes;
