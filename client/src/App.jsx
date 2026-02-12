import { useState } from 'react'
//ttok a break and now i dont understand my own code T_T
function App() {
  // 1. STATE (The Memory)
  const [userCode, setUserCode] = useState("");
  const [roast, setRoast] = useState("");
  const [fixedCode, setFixedCode] = useState("");
  const [copySuccess, setcopySuccess] = useState(false);

  // 2. LOGIC (The Action)
  const handleRoast = async () => {
    // Show a loading message
    setRoast("⏳ AI is analyzing your trash code...");
    setFixedCode(""); // Clear previous fixes

    const payload = { code: userCode };

    try {
      const response = await fetch("http://localhost:8000/roast", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Server rejected us!");
      const data = await response.json();
      setRoast(data.roast);
      setFixedCode(data.fixed_code); //matching withe server variable
    }
    catch (error) {
      console.log("Server failed, switching to Mock mode...");
      setTimeout(() => {
        setRoast("⚠️ [MOCK MODE] Server is dead, but here is a fake roast: Your code is dryer than a Popeyes biscuit.");
      }, 1000);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fixedCode);
      setcopySuccess(true);
      setTimeout(() => {
        setcopySuccess(false);
      }, 2000);
    }
    catch (e) {
      console.log("failed to copy", e);
    }
  };

  // 3. UI (The Visuals)
  // INSIDE App() FUNCTION...

  return (
    <div style={styles.container}>
      <h1 style={styles.mainHeader}>🌶️ GitRoasted</h1>

      {/* INPUT SECTION */}
      <textarea
        style={styles.textarea}
        placeholder="Paste your trash code here..."
        value={userCode}
        onChange={(e) => setUserCode(e.target.value)}
      />

      <button style={styles.button} onClick={handleRoast}>
        {roast ? "ROAST IT AGAIN 🔥" : "ROAST ME 💀"}
      </button>

      {/* OUTPUT SECTION - NEON EDITION */}
      {roast && (
        <div style={styles.outputContainer}>

          {/* 🔴 THE ROAST */}
          <div style={styles.roastBox}>
            <div style={styles.boxHeader}>
              <span style={{ fontSize: '1.5rem' }}>💀</span>
              <span>SYSTEM_VERDICT</span>
            </div>
            <p style={styles.text}>{roast}</p>
          </div>

          {/* 🟢 THE FIX (With Copy Button) */}
          {fixedCode && (
            <div style={styles.fixBox}>

              {/* Header Row with Button */}
              <div style={styles.headerRow}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.5rem' }}>🩹</span>
                  <span>PATCH_APPLIED</span>
                </div>

                {/* THE NEW COPY BUTTON */}
                <button
                  onClick={handleCopy}
                  style={copySuccess ? styles.copyButtonSuccess : styles.copyButton}
                >
                  {copySuccess ? "✅ COPIED!" : "📋 COPY CODE"}
                </button>
              </div>

              <pre style={styles.codeBlock}>{fixedCode}</pre>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

// 4. STYLES (Simple CSS in JS)
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#050505", // Almost black
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "50px",
    fontFamily: "'Courier New', monospace", // Hacker font
    paddingBottom: "50px"
  },
  mainHeader: {
    fontSize: "3rem",
    marginBottom: "20px",
    textShadow: "0 0 10px #e11d48" // Glowing title
  },
  textarea: {
    width: "80%",
    maxWidth: "800px",
    height: "200px",
    backgroundColor: "#111",
    color: "#0f0", // Matrix Green text
    border: "1px solid #333",
    padding: "20px",
    fontSize: "14px",
    borderRadius: "10px",
    outline: "none",
    fontFamily: "monospace",
    marginBottom: "20px"
  },
  button: {
    padding: "15px 40px",
    fontSize: "18px",
    backgroundColor: "#e11d48",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    letterSpacing: "2px",
    boxShadow: "0 0 15px rgba(225, 29, 72, 0.6)", // Button Glow
    transition: "transform 0.1s"
  },

  // --- NEW STYLES BELOW ---
  outputContainer: {
    width: "80%",
    maxWidth: "800px",
    marginTop: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    animation: "fadeIn 0.5s ease-out" // Make sure to add @keyframes in CSS if you want smooth entry
  },
  boxHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    paddingBottom: "10px",
    marginBottom: "10px",
    fontWeight: "bold",
    letterSpacing: "1px"
  },
  roastBox: {
    backgroundColor: "rgba(40, 10, 10, 0.95)",
    border: "1px solid #ff0000",
    boxShadow: "0 0 20px rgba(255, 0, 0, 0.2)", // Red Neon
    borderRadius: "8px",
    padding: "20px",
    color: "#ffcccc"
  },
  fixBox: {
    backgroundColor: "rgba(5, 25, 10, 0.95)",
    border: "1px solid #00ff00",
    boxShadow: "0 0 20px rgba(0, 255, 0, 0.2)", // Green Neon
    borderRadius: "8px",
    padding: "20px",
    color: "#ccffcc"
  },
  text: {
    fontSize: "1.1rem",
    lineHeight: "1.6"
  },
  codeBlock: {
    backgroundColor: "#000",
    padding: "15px",
    borderRadius: "5px",
    overflowX: "auto",
    fontFamily: "monospace",
    border: "1px dashed #004400",
    color: "#4ade80" // Bright green code
  },
  // ... inside const styles = { ...

  headerRow: {
    display: "flex",
    justifyContent: "space-between", // Pushes button to the right
    alignItems: "center",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    paddingBottom: "10px",
    marginBottom: "10px",
    fontWeight: "bold",
    letterSpacing: "1px"
  },
  copyButton: {
    backgroundColor: "transparent",
    border: "1px solid #00ff00",
    color: "#00ff00",
    padding: "5px 15px",
    borderRadius: "4px",
    cursor: "pointer",
    fontFamily: "monospace",
    fontSize: "0.8rem",
    transition: "all 0.2s",
    textTransform: "uppercase"
  },
  copyButtonSuccess: {
    backgroundColor: "#00ff00", // Fill it green when clicked
    border: "1px solid #00ff00",
    color: "black",
    padding: "5px 15px",
    borderRadius: "4px",
    cursor: "default",
    fontFamily: "monospace",
    fontSize: "0.8rem",
    fontWeight: "bold"
  }
};

export default App