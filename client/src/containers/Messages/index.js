export const Messages = ({messages}) => {
  return (
    <ul id="messages">
      {messages && messages.map((msg, i) => <li key={i}>{msg}</li>)}
    </ul>
  )
}
