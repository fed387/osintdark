<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>OSINTDark - Public IP Intelligence</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background-color: #0a0a0a;
      color: #fff;
      text-align: center;
    }
    header {
      padding: 2rem;
      background: #111;
      font-size: 3rem;
      font-weight: bold;
      color: #0ff;
      text-shadow: 0 0 10px #0ff;
    }
    .container {
      padding: 2rem;
    }
    input, button {
      padding: 0.8rem;
      margin: 0.5rem;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
    }
    input {
      width: 300px;
    }
    button {
      background: #0ff;
      color: #000;
      cursor: pointer;
      font-weight: bold;
      transition: 0.2s;
    }
    button:hover {
      background: #09c;
      color: #fff;
    }
    .result, .admin-panel {
      margin-top: 2rem;
      padding: 1.5rem;
      background: #111;
      border-radius: 10px;
      box-shadow: 0 0 15px rgba(0,255,255,0.3);
      display: none;
      text-align: left;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }
    .admin-panel h2 {
      color: #0ff;
    }
  </style>
</head>
<body>
  <header>OSINTDark</header>
  
  <div class="container">
    <h2>🔎 Search Public IP Info</h2>
    <input type="text" id="ipInput" placeholder="Enter IP address">
    <button onclick="lookupIP()">Search</button>
    <div id="result" class="result"></div>

    <h2>⚙️ Admin Login</h2>
    <input type="password" id="adminPass" placeholder="Enter admin password">
    <button onclick="loginAdmin()">Login</button>
    <div id="adminPanel" class="admin-panel">
      <h2>Admin Panel</h2>
      <input type="text" id="dbKey" placeholder="Key">
      <input type="text" id="dbValue" placeholder="Value">
      <button onclick="addDatabase()">Add to Database</button>
      <h3>Database Entries:</h3>
      <pre id="dbEntries"></pre>
    </div>
  </div>

  <script>
    async function lookupIP() {
      const ip = document.getElementById("ipInput").value.trim();
      if (!ip) {
        alert("Enter an IP address");
        return;
      }
      const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,city,isp,org,as,query`);
      const data = await res.json();
      const resultDiv = document.getElementById("result");
      if (data.status === "fail") {
        resultDiv.innerHTML = `<b>Error:</b> ${data.message}`;
      } else {
        resultDiv.innerHTML = `
          <b>IP:</b> ${data.query}<br>
          <b>Country:</b> ${data.country}<br>
          <b>City:</b> ${data.city}<br>
          <b>ISP:</b> ${data.isp}<br>
          <b>Org:</b> ${data.org}<br>
          <b>ASN:</b> ${data.as}
        `;
      }
      resultDiv.style.display = "block";
    }

    function loginAdmin() {
      const pass = document.getElementById("adminPass").value;
      if (pass === "osintdark123") { // change password here
        document.getElementById("adminPanel").style.display = "block";
      } else {
        alert("Wrong password!");
      }
    }

    function addDatabase() {
      const key = document.getElementById("dbKey").value;
      const value = document.getElementById("dbValue").value;
      if (!key || !value) return alert("Fill both fields");
      let db = JSON.parse(localStorage.getItem("osintDB") || "{}");
      db[key] = value;
      localStorage.setItem("osintDB", JSON.stringify(db));
      showDatabase();
    }

    function showDatabase() {
      let db = JSON.parse(localStorage.getItem("osintDB") || "{}");
      document.getElementById("dbEntries").textContent = JSON.stringify(db, null, 2);
    }

    showDatabase();
  </script>
</body>
</html>
