import { useState } from 'react'

function App() {
  // 1. STATE (The Memory)
  const [userCode, setUserCode] = useState("");
  const [roast, setRoast] = useState("");

  // 2. LOGIC (The Action)
  const handleRoast = async () => {
    // Show a loading message
    setRoast("⏳ AI is analyzing your trash code...");

    const payload = { code: userCode, language: "python" };

    try {
      const response = await fetch("http://localhost:8000/roast", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Server rejected us!");
      const data = await response.json();
      setRoast(data.roast);
    }
    catch (error) {
      console.log("Server failed, switching to Mock mode...");
      setTimeout(() => {
        setRoast("⚠️ [MOCK MODE] Server is dead, but here is a fake roast: Your code is dryer than a Popeyes biscuit.");
      }, 1000);
    }
  };

  // 3. UI (The Visuals)
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>🌶️ GitRoasted</h1>

      {/* Input Box */}
      <textarea
        style={styles.textarea}
        placeholder="Paste your code here..."
        value={userCode}
        onChange={(e) => setUserCode(e.target.value)}
      />

      {/* Button */}
      <button style={styles.button} onClick={handleRoast}>
        ROAST ME 💀
      </button>

      {/* Output Box (Only shows if there is a roast) */}
      {roast && (
        <div style={styles.resultBox}>
          <p>{roast}</p>
        </div>
      )}
    </div>
  )
}

// 4. STYLES (Simple CSS in JS)
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#121212", // Dark Mode
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "50px",
    fontFamily: "monospace"
  },
  header: {
    fontSize: "3rem",
    marginBottom: "20px"
  },
  textarea: {
    width: "80%",
    maxWidth: "800px",
    height: "300px",
    backgroundColor: "#1e1e1e",
    color: "#00ff00", // Hacker Green
    border: "1px solid #333",
    padding: "20px",
    fontSize: "16px",
    borderRadius: "10px",
    outline: "none"
  },
  button: {
    marginTop: "20px",
    padding: "15px 30px",
    fontSize: "20px",
    backgroundColor: "#e11d48",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },
  resultBox: {
    marginTop: "30px",
    padding: "20px",
    border: "2px solid #e11d48",
    borderRadius: "10px",
    backgroundColor: "#2a1215",
    width: "80%",
    maxWidth: "800px"
  }
}

export default App