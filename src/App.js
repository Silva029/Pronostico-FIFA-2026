import React, { useState, useEffect } from 'react';

const FIFA2026PoolApp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState('login');
  const [users, setUsers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ username: '', password: '', confirmPassword: '' });

  // Initialize app
  useEffect(() => {
    const saved = localStorage.getItem('fifa2026Data');
    if (saved) {
      const data = JSON.parse(saved);
      setUsers(data.users || []);
      setMatches(data.matches || []);
    } else {
      initializeData();
    }

    const loggedIn = localStorage.getItem('currentUser');
    if (loggedIn) {
      setCurrentUser(loggedIn);
      setView('dashboard');
    }
  }, []);

  const initializeData = () => {
    const initialMatches = [
      { id: 1, home: 'Argentina', away: 'Morocco', group: 'A', date: '2026-06-12', homeScore: null, awayScore: null },
      { id: 2, home: 'France', away: 'Denmark', group: 'A', date: '2026-06-12', homeScore: null, awayScore: null },
      { id: 3, home: 'England', away: 'Netherlands', group: 'B', date: '2026-06-13', homeScore: null, awayScore: null },
      { id: 4, home: 'Spain', away: 'Germany', group: 'B', date: '2026-06-13', homeScore: null, awayScore: null },
      { id: 5, home: 'Brazil', away: 'Serbia', group: 'C', date: '2026-06-14', homeScore: null, awayScore: null },
      { id: 6, home: 'Mexico', away: 'Japan', group: 'C', date: '2026-06-14', homeScore: null, awayScore: null },
      { id: 7, home: 'Italy', away: 'Uruguay', group: 'D', date: '2026-06-15', homeScore: null, awayScore: null },
      { id: 8, home: 'Belgium', away: 'Canada', group: 'D', date: '2026-06-15', homeScore: null, awayScore: null },
    ];
    setMatches(initialMatches);
    localStorage.setItem('fifa2026Data', JSON.stringify({ users: [], matches: initialMatches }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    if (users.some(u => u.username === registerForm.username)) {
      alert('El usuario ya existe');
      return;
    }

    const newUser = {
      id: Date.now(),
      username: registerForm.username,
      password: registerForm.password,
      predictions: {},
      joinDate: new Date().toLocaleDateString('es-ES'),
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('fifa2026Data', JSON.stringify({ users: updatedUsers, matches }));
    localStorage.setItem('currentUser', registerForm.username);
    setCurrentUser(registerForm.username);
    setView('dashboard');
    setRegisterForm({ username: '', password: '', confirmPassword: '' });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(u => u.username === loginForm.username && u.password === loginForm.password);
    if (user) {
      localStorage.setItem('currentUser', loginForm.username);
      setCurrentUser(loginForm.username);
      setView('dashboard');
      setLoginForm({ username: '', password: '' });
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setView('login');
  };

  const handlePrediction = (matchId, homeScore, awayScore) => {
    const user = users.find(u => u.username === currentUser);
    if (user) {
      user.predictions[matchId] = { home: parseInt(homeScore), away: parseInt(awayScore) };
      const updatedUsers = users.map(u => u.username === currentUser ? user : u);
      setUsers(updatedUsers);
      localStorage.setItem('fifa2026Data', JSON.stringify({ users: updatedUsers, matches }));
    }
  };

  const calculatePoints = (prediction, match) => {
    if (!prediction || match.homeScore === null) return 0;

    let points = 0;
    if (prediction.home === match.homeScore && prediction.away === match.awayScore) {
      points = 5;
    } else if ((prediction.home > prediction.away && match.homeScore > match.awayScore) ||
               (prediction.home < prediction.away && match.homeScore < match.awayScore) ||
               (prediction.home === prediction.away && match.homeScore === match.awayScore)) {
      points = 3;
    } else if ((prediction.home === match.homeScore) || (prediction.away === match.awayScore)) {
      points = 1;
    }
    return points;
  };

  const getLeaderboard = () => {
    return users.map(user => {
      let totalPoints = 0;
      Object.keys(user.predictions).forEach(matchId => {
        const match = matches.find(m => m.id === parseInt(matchId));
        if (match) {
          totalPoints += calculatePoints(user.predictions[matchId], match);
        }
      });
      return { ...user, totalPoints };
    }).sort((a, b) => b.totalPoints - a.totalPoints);
  };

  if (view === 'login') {
    return (
      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '500', margin: '0 0 8px', color: '#1a1a1a' }}>Pronóstico 2026</h1>
          <p style={{ color: '#666', margin: '0', fontSize: '14px' }}>Predictor de Copa Mundial FIFA</p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button onClick={() => setView('login')} style={{ flex: 1, padding: '10px', background: view === 'login' ? '#f0f0f0' : 'transparent', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>Ingresar</button>
          <button onClick={() => setView('register')} style={{ flex: 1, padding: '10px', background: view === 'register' ? '#f0f0f0' : 'transparent', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>Registrarse</button>
        </div>

        {view === 'login' ? (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input type="text" placeholder="Usuario" value={loginForm.username} onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })} required style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }} />
            <input type="password" placeholder="Contraseña" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} required style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }} />
            <button type="submit" style={{ padding: '10px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>Ingresar</button>
          </form>
        ) : (
          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input type="text" placeholder="Nombre de usuario" value={registerForm.username} onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })} required style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }} />
            <input type="password" placeholder="Contraseña" value={registerForm.password} onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })} required style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }} />
            <input type="password" placeholder="Confirmar contraseña" value={registerForm.confirmPassword} onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })} required style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }} />
            <button type="submit" style={{ padding: '10px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>Registrarse</button>
          </form>
        )}
      </div>
    );
  }

  if (view === 'dashboard') {
    const leaderboard = getLeaderboard();
    const currentUserRank = leaderboard.findIndex(u => u.username === currentUser) + 1;

    return (
      <div style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '500', margin: '0', color: '#1a1a1a' }}>Pronóstico 2026</h1>
            <p style={{ fontSize: '13px', color: '#666', margin: '4px 0 0' }}>Bienvenido, {currentUser}</p>
          </div>
          <button onClick={handleLogout} style={{ padding: '8px 12px', background: 'transparent', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>Salir</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '2rem' }}>
          <div style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '8px' }}>
            <p style={{ fontSize: '12px', color: '#666', margin: '0 0 8px' }}>Tu posición</p>
            <p style={{ fontSize: '20px', fontWeight: '500', color: '#1a1a1a', margin: '0' }}>#{currentUserRank}</p>
          </div>
          <div style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '8px' }}>
            <p style={{ fontSize: '12px', color: '#666', margin: '0 0 8px' }}>Tu puntuación</p>
            <p style={{ fontSize: '20px', fontWeight: '500', color: '#1a1a1a', margin: '0' }}>{leaderboard.find(u => u.username === currentUser)?.totalPoints || 0}</p>
          </div>
          <div style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '8px' }}>
            <p style={{ fontSize: '12px', color: '#666', margin: '0 0 8px' }}>Participantes</p>
            <p style={{ fontSize: '20px', fontWeight: '500', color: '#1a1a1a', margin: '0' }}>{users.length}</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '2rem', borderBottom: '1px solid #ddd', paddingBottom: '12px' }}>
          <button onClick={() => setView('predictions')} style={{ padding: '8px 12px', background: view === 'predictions' ? '#f0f0f0' : 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}>Mis predicciones</button>
          <button onClick={() => setView('dashboard')} style={{ padding: '8px 12px', background: view === 'dashboard' ? '#f0f0f0' : 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}>Tabla de posiciones</button>
        </div>

        <div>
          <h2 style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 1rem', color: '#1a1a1a' }}>Tabla de posiciones</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {leaderboard.map((user, idx) => (
              <div key={user.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: user.username === currentUser ? '#f0f0f0' : 'transparent', borderRadius: '8px', border: '1px solid #ddd' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '500', color: '#666', minWidth: '20px' }}>#{idx + 1}</span>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#1a1a1a' }}>{user.username}</span>
                </div>
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#0070f3' }}>{user.totalPoints} pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (view === 'predictions') {
    const user = users.find(u => u.username === currentUser);

    return (
      <div style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '500', margin: '0', color: '#1a1a1a' }}>Mis predicciones</h1>
          <button onClick={() => setView('dashboard')} style={{ padding: '8px 12px', background: 'transparent', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>← Volver</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {matches.map(match => {
            const prediction = user?.predictions[match.id];
            return (
              <div key={match.id} style={{ background: 'white', border: '1px solid #ddd', borderRadius: '12px', padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <p style={{ fontSize: '12px', color: '#666', margin: '0 0 4px' }}>Grupo {match.group} • {match.date}</p>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#1a1a1a', margin: '0' }}>{match.home} vs {match.away}</p>
                  </div>
                  <span style={{ fontSize: '12px', background: '#f0f0f0', padding: '4px 8px', borderRadius: '8px', color: '#666' }}>Grupo {match.group}</span>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input type="number" min="0" max="10" value={prediction?.home || ''} onChange={(e) => handlePrediction(match.id, e.target.value, prediction?.away || '')} placeholder="0" style={{ width: '60px', padding: '8px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', textAlign: 'center' }} />
                  <span style={{ fontSize: '12px', color: '#666', fontWeight: '500' }}>-</span>
                  <input type="number" min="0" max="10" value={prediction?.away || ''} onChange={(e) => handlePrediction(match.id, prediction?.home || '', e.target.value)} placeholder="0" style={{ width: '60px', padding: '8px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', textAlign: 'center' }} />
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: '2rem', padding: '1rem', background: '#f0f0f0', borderRadius: '12px', fontSize: '13px', color: '#666' }}>
          <p style={{ margin: '0 0 8px', fontWeight: '500' }}>Sistema de puntuación:</p>
          <p style={{ margin: '0 0 4px' }}>✓ Resultado exacto: 5 puntos</p>
          <p style={{ margin: '0 0 4px' }}>✓ Ganador correcto: 3 puntos</p>
          <p style={{ margin: '0' }}>✓ Un gol correcto: 1 punto</p>
        </div>
      </div>
    );
  }
};

export default FIFA2026PoolApp;
