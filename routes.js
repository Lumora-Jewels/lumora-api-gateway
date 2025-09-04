const { createProxyMiddleware } = require("http-proxy-middleware");

function routes(app) {
  app.use("/users", createProxyMiddleware({ 
    target: process.env.USER_SERVICE_URL, 
    changeOrigin: true,
    pathRewrite: { '^/users': '/api/users' }
  }));
  app.use("/auth", createProxyMiddleware({ 
    target: process.env.AUTH_SERVICE_URL, 
    changeOrigin: true,
    pathRewrite: { '^/auth': '/api/auth' }
  }));
  app.use("/products", createProxyMiddleware({ 
    target: process.env.PRODUCT_SERVICE_URL, 
    changeOrigin: true,
    pathRewrite: { '^/products': '/api/products' }
  }));
  app.use("/categories", createProxyMiddleware({ 
    target: process.env.CATEGORY_SERVICE_URL, 
    changeOrigin: true,
    pathRewrite: { '^/categories': '/api/categories' }
  }));
  app.use("/cart", createProxyMiddleware({ 
    target: process.env.CART_SERVICE_URL, 
    changeOrigin: true,
    pathRewrite: { '^/cart': '/api/cart' }
  }));
  app.use("/orders", createProxyMiddleware({ 
    target: process.env.ORDER_SERVICE_URL, 
    changeOrigin: true,
    pathRewrite: { '^/orders': '/api/orders' }
  }));
  app.use("/payments", createProxyMiddleware({ 
    target: process.env.PAYMENT_SERVICE_URL, 
    changeOrigin: true,
    pathRewrite: { '^/payments': '/api/payments' }
  }));
  app.use("/notifications", createProxyMiddleware({ 
    target: process.env.NOTIFICATION_SERVICE_URL, 
    changeOrigin: true,
    pathRewrite: { '^/notifications': '/api/notifications' }
  }));
}

module.exports = routes;
