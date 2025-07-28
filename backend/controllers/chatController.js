const axios = require('axios');
require('dotenv').config();

exports.handlePrompt = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' });
  }

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-4o',
        max_tokens: 1000,
        messages: [
          {
            role: 'system',
            content: `You are a helpful UI generator AI. Reply ONLY with valid JSON like:
{
  "jsx": "<button class='btn'>Click</button>",
  "css": ".btn { background-color: blue; color: white; padding: 10px; }"
}`
          },
          {
            role: 'user',
            content: prompt
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'http://localhost:3000',
          'Content-Type': 'application/json'
        }
      }
    );

    const text = response.data.choices?.[0]?.message?.content;
    if (!text) throw new Error('No response from GPT-4o');

    let json;
    try {
      const jsonStart = text.indexOf('{');
      const jsonEnd = text.lastIndexOf('}');
      const jsonString = text.substring(jsonStart, jsonEnd + 1);
      json = JSON.parse(jsonString);
    } catch (parseErr) {
      console.error('❌ Failed to parse JSON:\n', text);
      return res.status(500).json({ message: 'Could not parse GPT-4o response', raw: text });
    }

    res.json({ jsx: json.jsx, css: json.css });

  } catch (err) {
    console.error('GPT-4o OpenRouter Error:', err.response?.data || err.message);
    res.status(500).json({ message: 'GPT-4o request failed', error: err.message });
  }
};
