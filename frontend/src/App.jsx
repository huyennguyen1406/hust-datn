import { useEffect, useState } from "react";

const API = "http://localhost:8080";

// read a cookie by name
function readCookie(name) {
  const match = document.cookie.match(new RegExp("(^|; )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

async function getCsrf() {
  const r = await fetch(`${API}/api/csrf`, { credentials: "include" });
  return r.ok ? await r.json() : null; // { headerName, token }
}


export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/user`, {
        credentials: "include",
      });
      if (!res.ok) {
        setUser(null);
      } else {
        setUser(await res.json());
      }
    } catch (err) {
      console.error("fetchUser error:", err);
      setUser(null);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  function login() {
    window.location.href = `${API}/oauth2/authorization/google`;
  }

  

async function logout() {
  const csrf = await getCsrf();
  const headerName = csrf?.headerName || "X-XSRF-TOKEN";
  const token = csrf?.token || "";
  const res = await fetch(`${API}/api/logout`, {
    method: "POST",
    credentials: "include",
    headers: { [headerName]: token }
  });

  if (!res.ok) console.error("Logout failed", res.status);
  else window.location.href = "/";
}


  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;

  if (!user || !user.authenticated) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Please Login</h2>
        <button onClick={login}>Login with Google</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Hello, {user.attributes.name}</h2>

      <img
        src={user.attributes.picture}
        width={80}
        style={{ borderRadius: 8 }}
      />

      <pre
        style={{
          padding: 12,
          background: "#f4f4f4",
          borderRadius: 6,
          marginTop: 20,
        }}
      >
        {JSON.stringify(user.attributes, null, 2)}
      </pre>

      <button onClick={logout}>Logout</button>
    </div>
  );
}
