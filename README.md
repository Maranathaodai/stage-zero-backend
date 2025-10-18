# Dynamic Profile Endpoint

A RESTful API endpoint that returns profile information along with dynamic cat facts fetched from an external API.

## 🚀 Features

- **GET /me** endpoint that returns profile information with a random cat fact
- Dynamic UTC timestamp in ISO 8601 format
- Integration with Cat Facts API (https://catfact.ninja/fact)
- Graceful error handling with fallback cat facts
- CORS support for cross-origin requests
- Health check endpoint
- Comprehensive logging

## 📋 API Endpoints

### GET /me
Returns profile information with a dynamic cat fact.

**Response Format:**
```json
{
  "status": "success",
  "user": {
    "email": "your.email@example.com",
    "name": "Your Full Name",
    "stack": "Node.js/Express"
  },
  "timestamp": "2025-01-15T12:34:56.789Z",
  "fact": "A random cat fact from the Cat Facts API"
}
```

### GET /health
Health check endpoint for monitoring.

### GET /
Root endpoint with API information.

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (version 14.0.0 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd dynamic-profile-endpoint
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables (optional)**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   USER_EMAIL=your.email@example.com
   USER_NAME=Your Full Name
   USER_STACK=Node.js/Express
   ```

4. **Run the application**
   
   **Development mode (with auto-restart):**
   ```bash
   npm run dev
   ```
   
   **Production mode:**
   ```bash
   npm start
   ```

5. **Test the endpoint**
   ```bash
   curl http://localhost:3000/me
   ```

## 🧪 Testing

Run the included test script:
```bash
npm test
```

Or test manually:
```bash
# Test the main endpoint
curl http://localhost:3000/me

# Test health check
curl http://localhost:3000/health

# Test with verbose output
curl -v http://localhost:3000/me
```

## 📦 Dependencies

### Production Dependencies
- **express**: Web framework for Node.js
- **cors**: Cross-Origin Resource Sharing middleware
- **axios**: HTTP client for making API requests

### Development Dependencies
- **nodemon**: Development tool for auto-restarting the server

## 🌐 Deployment

### Railway
1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically

### Deploying to Railway (step-by-step)

If you want to deploy this project to Railway, follow these steps. Railway is a good fit for small Node.js apps and supports automatic deploys from GitHub.

1. Create a Railway account and log in at https://railway.app
2. From the Railway dashboard click "New Project" -> "Deploy from GitHub"
3. Connect your GitHub account and select the repository for this project
4. Railway will detect this is a Node.js app. For the build/start command use the defaults (Railway will run `npm install` then `npm start`)
5. Add the required environment variables in Railway (Project Settings -> Variables):
   - `PORT` (optional; Railway will provide one automatically) 
   - `USER_EMAIL` — your email address (e.g. `you@example.com`)
   - `USER_NAME` — your full name (e.g. `Jane Doe`)
   - `USER_STACK` — your backend stack (e.g. `Node.js/Express`)
   - Optionally override: `CAT_FACTS_API_URL`, `API_TIMEOUT`
6. Click Deploy. Railway will build and start your app. When deployment finishes, Railway gives you a public URL (e.g. `https://my-app.up.railway.app`)
7. Test the endpoint from your browser or curl:

```bash
curl https://<your-railway-app>.up.railway.app/me
```

Notes and tips:
- Railway sets `PORT` automatically; you do not need to set it unless you want a specific value.
- If the Cat Facts API fails, the app uses a local fallback fact list and still returns a `200` with `status: "success"`.
- Check the Railway deployment logs for build/runtime errors.
- For automated GitHub deploys, enable the GitHub integration and push to the branch you configured.

Alternative: Deploy via Railway CLI

1. Install Railway CLI: `npm i -g railway` or follow instructions at https://railway.app/docs/cli
2. From the repo directory run:

```bash
railway init    # link or create a project
railway up      # deploys the current branch
```

3. Set environment variables in the Railway project settings (or via `railway variables set`)

Common issues:
- Build fails with native module errors: make sure Node version in Railway matches `engines.node` in `package.json` or set a `.nvmrc`.
- App crashes on start: check `USER_EMAIL` / `USER_NAME` variables and logs. Run the included `test.js` locally to verify behavior.


## 🔧 Configuration

### Environment Variables
- `PORT`: Server port (default: 3000)
- `USER_EMAIL`: Your email address
- `USER_NAME`: Your full name
- `USER_STACK`: Your backend technology stack

### API Configuration
- **Cat Facts API**: https://catfact.ninja/fact
- **Timeout**: 5 seconds
- **Fallback**: Predefined cat facts if API fails

## 🛡️ Error Handling

The API includes comprehensive error handling:
- Network timeouts for external API calls
- Fallback cat facts if Cat Facts API is unavailable
- Proper HTTP status codes
- Detailed error logging
- Graceful server shutdown

## 📊 Monitoring

- Health check endpoint at `/health`
- Request logging with timestamps
- Uptime monitoring
- Error tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill process using port 3000
npx kill-port 3000
```

**Dependencies not installing:**
```bash
# Clear npm cache
npm cache clean --force
# Reinstall
rm -rf node_modules package-lock.json
npm install
```

**API not responding:**
- Check if the server is running
- Verify the port is correct
- Check firewall settings
- Ensure all dependencies are installed

## 📞 Support

If you encounter any issues, please:
1. Check the logs for error messages
2. Verify your environment variables
3. Test the health endpoint
4. Create an issue in the repository

---

**Built with ❤️ for Backend Wizards Stage 0**
