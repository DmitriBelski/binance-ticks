export default function newConnection(symbol) {
  let ticker = symbol.toLowerCase()
  let ws = new WebSocket(`wss://stream.binance.com:9443/ws/${ticker}@depth`)
  return ws
}