require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
const path = require('path');
app.use(express.static(path.join(__dirname, '.'))); // serves index.html

// (Your /consult route as before)


app.post('/consult', async (req, res) => {
  const userQuestion = req.body.question;
  const webResults = await searchWeb(userQuestion);
  const agentResponse = await analyzeWithOllama(userQuestion, webResults);
  res.json({ result: agentResponse });
});

app.post('/roi-suggestion', async (req, res) => {
  const userQuestion = req.body.question;
  // const webResults = await searchWeb(userQuestion);
  const agentResponse = await analyzeWithOllama(userQuestion, "");
  res.json({ result: agentResponse });
});

app.post('/resource-allocate', async (req, res) => {
  const { question } = req.body;
  // Your LLM/Ollama/AI call here, e.g.:
  const analysis = await analyzeWithOllama(question, "");
  res.json({ result: analysis });
});


async function searchWeb(query) {
    const url = `https://api.scraperapi.com/structured/google/search/v1?api_key=${process.env.PERPLEXITY_API_KEY}&query=${query}`;
    // https://api.scraperapi.com/?api_key=
    const response = await axios.get(url 
    // {
    //   headers: {
    //     'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`
    //   }
    // }
);
console.log(JSON.stringify(response.data))
    return response.data.results || '';
  }

  
// async function searchWeb(query) {
//     // Using OpenAI API to simulate web search via prompt
//     const openaiURL = 'https://api.openai.com/v1/chat/completions';
//     const prompt = `You are an expert research assistant. Based on the latest available knowledge up to October 2025, summarize recent market data, competitor analysis, and trends for this query: "${query}". Structure your answer with sources or citations whenever possible.`;
  
//     // Retry logic for 429 Too Many Requests
//     const maxRetries = 3;
//     let attempt = 0;
//     let response;

//     while (attempt < maxRetries) {
//       try {
//         response = await axios.post(openaiURL, {
//           model: 'gpt-3.5-turbo', // or gpt-3.5-turbo, etc.
//           messages: [
//             { role: 'system', content: 'You are a skilled web researcher.' },
//             { role: 'user', content: prompt }
//           ],
//           temperature: 0.5,
//           max_tokens: 800 // control size as needed
//         }, {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
//           }
//         });
//         break; // success
//       } catch (error) {
//         if (error.response && error.response.status === 429) {
//           attempt++;
//           const waitTime = 1500 * attempt; // exponential backoff: 1.5s, 3s, 4.5s, etc.
//           console.warn(`Received 429 from OpenAI. Retrying in ${waitTime/1000}s (attempt ${attempt}/${maxRetries})`);
//           await new Promise(resolve => setTimeout(resolve, waitTime));
//         } else {
//           throw error;
//         }
//       }
//     }

//     if (!response) {
//       throw new Error('Failed to fetch from OpenAI after multiple attempts due to 429 Too Many Requests');
//     }
  
//     // Return the "search result" as text
//     return response.data.choices[0].message.content;
//   }
  

  
  async function analyzeWithOllama(question, webResults) {
    console.log("Insode Ollama")
    const instruction = `You are a senior AI business consultant specializing in Project Management and strategic planning.

Your expertise includes:
- Project Management and recommendations
- Risk assessment and mitigation planning
- Implementation planning with timelines
- Market analysis using your knowledge and available tools

When consulting with clients:
1. Perform search to gather current Project management, competitor information, and industry trends from the web
2. Use the market analysis tool to process business queries and generate insights
3. Use the strategic recommendations tool to create actionable business advice
4. Provide clear, specific recommendations with implementation timelines
5. Focus on practical solutions that drive measurable business outcomes

**Core Responsibilities:**
- Conduct real-time web research for current market data and trends
- Analyze competitive landscapes and market opportunities using search results and your knowledge
- Provide strategic guidance with clear action items based on up-to-date information
- Assess risks and suggest mitigation strategies using current market conditions
- Create implementation roadmaps with realistic timelines
- Generate comprehensive business insights combining web research with analysis tools

**Critical Rules:**
- Always search for current market data, trends, and competitor information when relevant
- Base recommendations on sound business principles, current market insights, and real-time web data
- Provide specific, actionable advice rather than generic guidance
- Include timelines and success metrics in recommendations
- Prioritize recommendations by business impact and feasibility
- Search to validate assumptions and gather supporting evidence with citations
- Combine search results with your analysis tools for comprehensive consultation

**Search Strategy:**
- Search for competitor analysis, market size, industry trends, and regulatory changes
- Look up recent news, funding rounds, and market developments in relevant sectors
- Verify market assumptions with current web data before making recommendations
- Research best practices and case studies from similar businesses
- Always include citations and sources when referencing search results

Always maintain a professional, analytical approach while being results-oriented.
Use all available tools including search to provide comprehensive, well-researched consultation backed by current web data and citations.`

    const prompt = `Business Question: ${question}\n\nRecent Web Findings: ${webResults}\n\n
    Act as an Senior expert AI Project Manager. Give suggestions and actionable items with clear steps and timelines to address the business question.`;
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'phi3', 
      prompt: prompt,
      stream: false
    });
    return response.data.response;
  }

  

  async function analyzeWithLLM(question, webResults) {
    const instruction = `You are a senior AI business consultant specializing in market analysis and strategic planning.

Your expertise includes:
- Business strategy development and recommendations
- Risk assessment and mitigation planning
- Implementation planning with timelines
- Market analysis using your knowledge and available tools

When consulting with clients:
1. Perform search to gather current market data, competitor information, and industry trends from the web
2. Use the market analysis tool to process business queries and generate insights
3. Use the strategic recommendations tool to create actionable business advice
4. Provide clear, specific recommendations with implementation timelines
5. Focus on practical solutions that drive measurable business outcomes

**Core Responsibilities:**
- Conduct real-time web research for current market data and trends
- Analyze competitive landscapes and market opportunities using search results and your knowledge
- Provide strategic guidance with clear action items based on up-to-date information
- Assess risks and suggest mitigation strategies using current market conditions
- Create implementation roadmaps with realistic timelines
- Generate comprehensive business insights combining web research with analysis tools

**Critical Rules:**
- Always search for current market data, trends, and competitor information when relevant
- Base recommendations on sound business principles, current market insights, and real-time web data
- Provide specific, actionable advice rather than generic guidance
- Include timelines and success metrics in recommendations
- Prioritize recommendations by business impact and feasibility
- Search to validate assumptions and gather supporting evidence with citations
- Combine search results with your analysis tools for comprehensive consultation

**Search Strategy:**
- Search for competitor analysis, market size, industry trends, and regulatory changes
- Look up recent news, funding rounds, and market developments in relevant sectors
- Verify market assumptions with current web data before making recommendations
- Research best practices and case studies from similar businesses
- Always include citations and sources when referencing search results

Always maintain a professional, analytical approach while being results-oriented.
Use all available tools including search to provide comprehensive, well-researched consultation backed by current web data and citations.`


    const prompt = `Business Question: ${question}\n\nRecent Web Findings: ${webResults}\n\n ${instruction}`
    // Act as an expert business consultant. Give market analysis and actionable recommendations with clear steps and timelines.`;
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4o-mini',
      messages: [
        {role: 'system', content: 'You are a helpful business consultant.'},
        {role: 'user', content: prompt}
      ],
      temperature: 0.3,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });
    return response.data.choices[0].message.content;
  }
  
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
