// Simple rate limiting in-memory (pour production, utilisez Redis)
const rateLimit = new Map()

export function checkRateLimit(identifier, maxRequests = 3, windowMs = 60000) {
  const now = Date.now()
  const userRequests = rateLimit.get(identifier) || []
  
  // Nettoyer les anciennes requêtes
  const recentRequests = userRequests.filter(time => now - time < windowMs)
  
  if (recentRequests.length >= maxRequests) {
    return false
  }
  
  recentRequests.push(now)
  rateLimit.set(identifier, recentRequests)
  return true
}