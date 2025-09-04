const { createProxyMiddleware } = require("http-proxy-middleware");

function routes(app) {
  // Default service URLs if environment variables are not set
  const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3001';
  const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3002';
  const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3003';
  const CATEGORY_SERVICE_URL = process.env.CATEGORY_SERVICE_URL || 'http://localhost:3004';
  const CART_SERVICE_URL = process.env.CART_SERVICE_URL || 'http://localhost:3005';
  const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || 'http://localhost:3006';
  const PAYMENT_SERVICE_URL = process.env.PAYMENT_SERVICE_URL || 'http://localhost:3007';
  const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3008';

  const proxyOptions = {
    changeOrigin: true,
    timeout: 30000, // 30 second timeout
    proxyTimeout: 30000,
    onError: (err, req, res) => {
      console.error(`Proxy error for ${req.url}:`, err.message);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Service temporarily unavailable' });
      }
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log(`[Gateway] Proxying ${req.method} ${req.url}`);
    }
  };

  app.use("/users", createProxyMiddleware({ 
    ...proxyOptions,
    target: USER_SERVICE_URL,
    pathRewrite: { '^/users': '/api/users' }
  }));
  
  app.use("/auth", createProxyMiddleware({ 
    ...proxyOptions,
    target: AUTH_SERVICE_URL,
    pathRewrite: { '^/auth': '/api/auth' }
  }));
  
  app.use("/products", createProxyMiddleware({ 
    ...proxyOptions,
    target: PRODUCT_SERVICE_URL,
    pathRewrite: { '^/products': '/api/products' }
  }));
  
  app.use("/categories", createProxyMiddleware({ 
    ...proxyOptions,
    target: CATEGORY_SERVICE_URL,
    pathRewrite: { '^/categories': '/api/categories' }
  }));
  
  app.use("/cart", createProxyMiddleware({ 
    ...proxyOptions,
    target: CART_SERVICE_URL,
    pathRewrite: { '^/cart': '/api/cart' }
  }));
  
  app.use("/orders", createProxyMiddleware({ 
    ...proxyOptions,
    target: ORDER_SERVICE_URL,
    pathRewrite: { '^/orders': '/api/orders' }
  }));
  
  app.use("/payments", createProxyMiddleware({ 
    ...proxyOptions,
    target: PAYMENT_SERVICE_URL,
    pathRewrite: { '^/payments': '/api/payments' }
  }));
  
  app.use("/notifications", createProxyMiddleware({ 
    ...proxyOptions,
    target: NOTIFICATION_SERVICE_URL,
    pathRewrite: { '^/notifications': '/api/notifications' }
  }));
}

module.exports = routes;
