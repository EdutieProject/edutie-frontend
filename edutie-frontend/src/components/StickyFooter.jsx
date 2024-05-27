export default function StickyFooter({ children }) {
  return (
    <footer style={{ position: "fixed", bottom: 50, marginRight: 100 }}>
      {children}
    </footer>
  );
}
