# AI Business Consultant

A modern web application that provides AI-powered business consultation with real-time web research capabilities and ROI calculation tools. Built with Node.js, Express, and integrated with Ollama for local AI processing.

## Features

- 🤖 **AI-Powered Business Consultation**: Get expert advice on business challenges using local AI models via Ollama
- 🔍 **Real-Time Web Research**: Automatically searches the web for current market data, competitor information, and industry trends
- 📊 **ROI Calculator**: Built-in ROI calculator with AI-powered suggestions and insights
- 💼 **Strategic Planning**: Receive actionable recommendations with timelines and implementation strategies
- 🎨 **Modern UI**: Clean, responsive interface built with vanilla HTML/CSS/JavaScript

## Tech Stack

- **Backend**: Node.js with Express
- **AI Engine**: Ollama (phi3 model)
- **Web Research**: ScraperAPI integration
- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Environment**: dotenv for configuration

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Ollama installed and running locally
- A ScraperAPI key (for web research functionality)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-consultant-node
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
touch .env
```

4. Add your API keys to the `.env` file:
```env
PERPLEXITY_API_KEY=your_scraperapi_key_here
```

5. Start Ollama and ensure the phi3 model is available:
```bash
ollama serve
ollama pull phi3
```

## Usage

1. Start the server:
```bash
node ai_consultant_ollama.js
```

2. Open your browser and navigate to:
```
http://localhost:3000
```

3. **Using the AI Consultant**:
   - Enter your business question in the text area
   - Click "Get Analysis" to receive AI-powered recommendations
   - The system will automatically search the web for relevant information
   
4. **Using the ROI Calculator**:
   - Click the "ROI Calculator" chip
   - Enter your initial investment and net profit
   - Click "Calculate" to get ROI percentage and AI-powered business insights

## API Endpoints

### POST `/consult`
Submit a business question and receive AI consultation.

**Request Body:**
```json
{
  "question": "Your business question here"
}
```

**Response:**
```json
{
  "result": "AI-generated analysis and recommendations"
}
```

### POST `/roi-suggestion`
Get ROI calculation with AI-powered business suggestions.

**Request Body:**
```json
{
  "question": "Your ROI query"
}
```

**Response:**
```json
{
  "result": "ROI analysis and recommendations"
}
```

## Project Structure

```
ai-consultant-node/
├── ai_consultant_ollama.js  # Main server file with API routes
├── index.html                # Frontend interface
├── package.json             # Dependencies and scripts
├── .gitignore              # Git ignore rules
├── .env                    # Environment variables (not in repo)
└── README.md               # This file
```

## Configuration

### Environment Variables

- `PERPLEXITY_API_KEY`: Your ScraperAPI key for web search functionality

### AI Model Configuration

The application uses Ollama with the `phi3` model. To use a different model:

1. Pull your preferred model:
```bash
ollama pull <model-name>
```

2. Update the model name in `ai_consultant_ollama.js`:
```javascript
model: 'your-model-name'
```

## Features in Detail

### Web Research Integration
- Automatically searches current web data using ScraperAPI
- Provides cited sources for recommendations
- Enhances AI responses with real-time information

### AI Consultation
- Focused on Project Management and strategic planning
- Provides actionable items with clear steps and timelines
- Risk assessment and mitigation planning
- Implementation roadmaps

### ROI Calculator
- Quick ROI percentage calculation
- AI-powered interpretation of results
- Business improvement suggestions
- Follow-up questions for better guidance

## Troubleshooting

### Issue: "Cannot connect to Ollama"
**Solution**: Ensure Ollama is running:
```bash
ollama serve
```

### Issue: "Model not found"
**Solution**: Pull the required model:
```bash
ollama pull phi3
```

### Issue: "API key error"
**Solution**: Verify your `.env` file contains the correct API key

### Issue: Port 3000 already in use
**Solution**: Change the PORT in `ai_consultant_ollama.js`:
```javascript
const PORT = 3001; // or any available port
```

## Development

To run in development mode with auto-reload:

```bash
# Install nodemon globally if needed
npm install -g nodemon

# Run with nodemon
nodemon ai_consultant_ollama.js
```

## Dependencies

- **express**: Web framework for Node.js
- **axios**: HTTP client for API requests
- **cors**: Enable CORS for API access
- **dotenv**: Environment variable management

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues, questions, or suggestions, please open an issue in the repository.

## Author

AI Consultant Node - Business Intelligence Application
