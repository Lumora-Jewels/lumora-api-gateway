require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`[Gateway] ${req.method} ${req.originalUrl}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Service URLs
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3001';
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3002';
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3003';
const CATEGORY_SERVICE_URL = process.env.CATEGORY_SERVICE_URL || 'http://localhost:3004';
const CART_SERVICE_URL = process.env.CART_SERVICE_URL || 'http://localhost:3005';
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || 'http://localhost:3006';
const PAYMENT_SERVICE_URL = process.env.PAYMENT_SERVICE_URL || 'http://localhost:3007';
const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3008';

// Proxy configuration
const proxyOptions = {
  changeOrigin: true,
  timeout: 30000,
  proxyTimeout: 30000,
  onError: (err, req, res) => {
    console.error(`Proxy error for ${req.url}:`, err.message);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Service temporarily unavailable' });
    }
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log(`[Gateway] Proxying ${req.method} ${req.url} to ${proxyReq.getHeader('host')}`);
  }
};

// Set up proxies
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on port ${PORT}`);
  console.log(`📡 Category Service: ${CATEGORY_SERVICE_URL}`);
});
