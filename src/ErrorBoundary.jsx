import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("App crashed:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24, fontFamily: "system-ui", color: "#fff", background: "#0b0b0c", minHeight: "100vh" }}>
          <h1 style={{ fontSize: 18, marginBottom: 8 }}>App failed to render</h1>
          <pre style={{ whiteSpace: "pre-wrap", color: "#f87171", fontSize: 13 }}>
            {String(this.state.error?.stack || this.state.error)}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

