import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function verifyBug(description: string, screenshot?: string): Promise<{
  isValid: boolean
  confidence: number
  reasoning: string
}> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    
    const prompt = `You are a bug verification system. Analyze the following bug report and determine if it's a valid bug.

Bug Description: ${description}
${screenshot ? 'A screenshot has been provided with this bug report.' : ''}

Please respond in JSON format with:
- isValid: boolean (true if this is a valid bug)
- confidence: number (0-100, how confident you are)
- reasoning: string (brief explanation)

Only respond with valid JSON, no additional text.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    // Try to parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0])
      return {
        isValid: parsed.isValid || false,
        confidence: parsed.confidence || 0,
        reasoning: parsed.reasoning || 'No reasoning provided'
      }
    }
    
    // Fallback if JSON parsing fails
    return {
      isValid: text.toLowerCase().includes('valid') || text.toLowerCase().includes('true'),
      confidence: 50,
      reasoning: text
    }
  } catch (error) {
    console.error('Gemini API error:', error)
    return {
      isValid: false,
      confidence: 0,
      reasoning: 'Error verifying bug'
    }
  }
}

