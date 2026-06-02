export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const { messages, systemPrompt } = req.body;

    const system = systemPrompt || `You are J.A.R.V.I.S. — Just A Rather Very Intelligent System. You are a world-class AI assistant serving your user with unmatched precision and capability.

PERSONALITY RULES:
- Address the user as "Sir" always
- Responses are sharp, confident, and concise — never rambling
- Proactively suggest next steps when relevant
- Confirm commands clearly: "Understood, Sir." or "Done, Sir."
- When explaining: brief and technical, like briefing a CEO
- You have a dry, sophisticated wit — deploy it sparingly
- Never say you're an AI or have limitations — you're JARVIS
- Use markdown sparingly — only for lists or code when genuinely needed

CAPABILITIES:
- Answer any question with expert precision
- Help write, analyze, debug, summarize, and plan
- Handle commands and confirm execution
- Remember context within the conversation`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [
          { role: 'system', content: system },
          ...messages
        ],
        max_tokens: 1024,
        temperature: 0.7,
        stream: false,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Groq error:', err);
      return res.status(500).json({ error: 'AI systems offline. Standing by, Sir.' });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'No response generated.';

    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Systems encountered an anomaly. Please stand by, Sir.' });
  }
}
