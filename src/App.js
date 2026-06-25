import React, { useState, useEffect } from 'react';

const FIFA2026PoolApp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState('login');
  const [showRegister, setShowRegister] = useState(false);
  const [users, setUsers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ username: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  // Initialize app
  useEffect(() => {
    console.log('App initializing...');
    const saved = localStorage.getItem('fifa2026Data');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setUsers(data.users || []);
        setMatches(data.matches || []);
        console.log('Data loaded from storage');
      } catch (e) {
        console.error('Error loading data:', e);
        initializeData();
      }
    } else {
      initializeData();
    }

    const loggedIn = localStorage.getItem('currentUser');
    if (loggedIn) {
      setCurrentUser(loggedIn);
      setView('dashboard');
      console.log('User logged in:', loggedIn);
    }
  }, []);

  const initializeData = () => {
    console.log('Initializing data...');
    const initialMatches = [
      // GROUP STAGE - REMAINING MATCHES (June 25-27, 2026)
      { id: 1, home: 'Uruguay', away: 'Canada', group: 'A', stage: 'Grupos', date: '2026-06-25', homeScore: null, awayScore: null },
      { id: 2, home: 'Denmark', away: 'Morocco', group: 'A', stage: 'Grupos', date: '2026-06-25', homeScore: null, awayScore: null },
      { id: 3, home: 'Japan', away: 'Spain', group: 'B', stage: 'Grupos', date: '2026-06-25', homeScore: null, awayScore: null },
      { id: 4, home: 'Germany', away: 'Costa Rica', group: 'B', stage: 'Grupos', date: '2026-06-25', homeScore: null, awayScore: null },
      { id: 5, home: 'Belgium', away: 'Morocco', group: 'C', stage: 'Grupos', date: '2026-06-26', homeScore: null, awayScore: null },
      { id: 6, home: 'Croatia', away: 'Canada', group: 'C', stage: 'Grupos', date: '2026-06-26', homeScore: null, awayScore: null },
      { id: 7, home: 'France', away: 'Poland', group: 'D', stage: 'Grupos', date: '2026-06-26', homeScore: null, awayScore: null },
      { id: 8, home: 'Argentina', away: 'Mexico', group: 'D', stage: 'Grupos', date: '2026-06-26', homeScore: null, awayScore: null },
      
      { id: 9, home: 'Morocco', away: 'Canada', group: 'A', stage: 'Grupos', date: '2026-06-27', homeScore: null, awayScore: null },
      { id: 10, home: 'Uruguay', away: 'Denmark', group: 'A', stage: 'Grupos', date: '2026-06-27', homeScore: null, awayScore: null },
      { id: 11, home: 'Costa Rica', away: 'Japan', group: 'B', stage: 'Grupos', date: '2026-06-27', homeScore: null, awayScore: null },
      { id: 12, home: 'Spain', away: 'Germany', group: 'B', stage: 'Grupos', date: '2026-06-27', homeScore: null, awayScore: null },
      { id: 13, home: 'Canada', away: 'Belgium', group: 'C', stage: 'Grupos', date: '2026-06-27', homeScore: null, awayScore: null },
      { id: 14, home: 'Morocco', away: 'Croatia', group: 'C', stage: 'Grupos', date: '2026-06-27', homeScore: null, awayScore: null },
      { id: 15, home: 'Poland', away: 'Argentina', group: 'D', stage: 'Grupos', date: '2026-06-27', homeScore: null, awayScore: null },
      { id: 16, home: 'Mexico', away: 'France', group: 'D', stage: 'Grupos', date: '2026-06-27', homeScore: null, awayScore: null },

      // ROUND OF 16 (June 29 - July 4, 2026)
      { id: 17, home: 'Winner A', away: 'Runner-up B', stage: 'Octavos', date: '2026-06-29', homeScore: null, awayScore: null },
      { id: 18, home: 'Winner B', away: 'Runner-up A', stage: 'Octavos', date: '2026-06-29', homeScore: null, awayScore: null },
      { id: 19, home: 'Winner C', away: 'Runner-up D', stage: 'Octavos', date: '2026-06-30', homeScore: null, awayScore: null },
      { id: 20, home: 'Winner D', away: 'Runner-up C', stage: 'Octavos', date: '2026-06-30', homeScore: null, awayScore: null },
      { id: 21, home: 'Winner E', away: 'Runner-up F', stage: 'Octavos', date: '2026-07-01', homeScore: null, awayScore: null },
      { id: 22, home: 'Winner F', away: 'Runner-up E', stage: 'Octavos', date: '2026-07-01', homeScore: null, awayScore: null },
      { id: 23, home: 'Winner G', away: 'Runner-up H', stage: 'Octavos', date: '2026-07-02', homeScore: null, awayScore: null },
      { id: 24, home: 'Winner H', away: 'Runner-up G', stage: 'Octavos', date: '2026-07-02', homeScore: null, awayScore: null },

      // QUARTERFINALS (July 4-5, 2026)
      { id: 25, home: 'QF1', away: 'QF2', stage: 'Cuartos', date: '2026-07-04', homeScore: null, awayScore: null },
      { id: 26, home: 'QF3', away: 'QF4', stage: 'Cuartos', date: '2026-07-04', homeScore: null, awayScore: null },
      { id: 27, home: 'QF5', away: 'QF6', stage: 'Cuartos', date: '2026-07-05', homeScore: null, awayScore: null },
      { id: 28, home: 'QF7', away: 'QF8', stage: 'Cuartos', date: '2026-07-05', homeScore: null, awayScore: null },

      // SEMIFINALS (July 8-9, 2026)
      { id: 29, home: 'SF1', away: 'SF2', stage: 'Semifinal', date: '2026-07-08', homeScore: null, awayScore: null },
      { id: 30, home: 'SF3', away: 'SF4', stage: 'Semifinal', date: '2026-07-09', homeScore: null, awayScore: null },

      // THIRD PLACE PLAYOFF (July 11, 2026)
      { id: 31, home: 'Loser SF1', away: 'Loser SF2', stage: 'Tercer lugar', date: '2026-07-11', homeScore: null, awayScore: null },

      // FINAL (July 12, 2026)
      { id: 32, home: 'Winner SF1', away: 'Winner SF2', stage: 'Final', date: '2026-07-12', homeScore: null, awayScore: null },
    ];
    setMatches(initialMatches);
    localStorage.setItem('fifa2026Data', JSON.stringify({ users: [], matches: initialMatches }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Register attempt:', registerForm.username);
    setError('');

    if (!registerForm.username || !registerForm.password) {
      setError('Por favor completa todos los campos');
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (users.some(u => u.username === registerForm.username)) {
      setError('El usuario ya existe');
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
    setShowRegister(false);
    console.log('User registered successfully');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login attempt:', loginForm.username);
    setError('');

    if (!loginForm.username || !loginForm.password) {
      setError('Por favor completa usuario y contraseña');
      return;
    }

    const user = users.find(u => u.username === loginForm.username && u.password === loginForm.password);
    if (user) {
      localStorage.setItem('currentUser', loginForm.username);
      setCurrentUser(loginForm.username);
      setView('dashboard');
      setLoginForm({ username: '', password: '' });
      console.log('Login successful');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setView('login');
    setShowRegister(false);
    setError('');
    console.log('User logged out');
  };

  const handlePrediction = (matchId, homeScore, awayScore) => {
    const userIndex = users.findIndex(u => u.username === currentUser);
    if (userIndex !== -1) {
      const updatedUsers = [...users];
      updatedUsers[userIndex].predictions[matchId] = {
        home: homeScore === '' ? null : parseInt(homeScore),
        away: awayScore === '' ? null : parseInt(awayScore),
      };
      setUsers(updatedUsers);
      localStorage.setItem('fifa2026Data', JSON.stringify({ users: updatedUsers, matches }));
    }
  };

  const calculatePoints = (prediction, match) => {
    if (!prediction || prediction.home === null || prediction.away === null || match.homeScore === null) return 0;

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

  // LOGIN VIEW
  if (view === 'login') {
    return (
      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem 1rem', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '500', margin: '0 0 8px', color: '#1a1a1a' }}>Pronóstico 2026</h1>
          <p style={{ color: '#666', margin: '0', fontSize: '14px' }}>Predictor de Copa Mundial FIFA</p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button
            onClick={() => { setShowRegister(false); setError(''); }}
            style={{
              flex: 1,
              padding: '10px',
              background: !showRegister ? '#0070f3' : '#f0f0f0',
              color: !showRegister ? 'white' : '#1a1a1a',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            Ingresar
          </button>
          <button
            onClick={() => { setShowRegister(true); setError(''); }}
            style={{
              flex: 1,
              padding: '10px',
              background: showRegister ? '#0070f3' : '#f0f0f0',
              color: showRegister ? 'white' : '#1a1a1a',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            Registrarse
          </button>
        </div>

        {error && (
          <div style={{ background: '#ffe0e0', color: '#c41e1e', padding: '12px', borderRadius: '8px', marginBottom: '1rem', fontSize: '13px' }}>
            {error}
          </div>
        )}

        {!showRegister ? (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              type="text"
              placeholder="Usuario"
              value={loginForm.username}
              onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
              required
              style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              required
              style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }}
            />
            <button type="submit" style={{ padding: '10px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
              Ingresar
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={registerForm.username}
              onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
              required
              style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={registerForm.password}
              onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
              required
              style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }}
            />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={registerForm.confirmPassword}
              onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
              required
              style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }}
            />
            <button type="submit" style={{ padding: '10px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
              Registrarse
            </button>
          </form>
        )}
      </div>
    );
  }

  // DASHBOARD VIEW
  if (view === 'dashboard') {
    const leaderboard = getLeaderboard();
    const currentUserRank = leaderboard.findIndex(u => u.username === currentUser) + 1;

    return (
      <div style={{ padding: '1rem', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '500', margin: '0', color: '#1a1a1a' }}>Pronóstico 2026</h1>
            <p style={{ fontSize: '13px', color: '#666', margin: '4px 0 0' }}>Bienvenido, {currentUser}</p>
          </div>
          <button onClick={handleLogout} style={{ padding: '8px 12px', background: 'transparent', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
            Salir
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '2rem' }}>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #ddd' }}>
            <p style={{ fontSize: '12px', color: '#666', margin: '0 0 8px' }}>Tu posición</p>
            <p style={{ fontSize: '20px', fontWeight: '500', color: '#1a1a1a', margin: '0' }}>#{currentUserRank}</p>
          </div>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #ddd' }}>
            <p style={{ fontSize: '12px', color: '#666', margin: '0 0 8px' }}>Tu puntuación</p>
            <p style={{ fontSize: '20px', fontWeight: '500', color: '#1a1a1a', margin: '0' }}>
              {leaderboard.find(u => u.username === currentUser)?.totalPoints || 0}
            </p>
          </div>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #ddd' }}>
            <p style={{ fontSize: '12px', color: '#666', margin: '0 0 8px' }}>Participantes</p>
            <p style={{ fontSize: '20px', fontWeight: '500', color: '#1a1a1a', margin: '0' }}>{users.length}</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '2rem', borderBottom: '1px solid #ddd', paddingBottom: '12px' }}>
          <button
            onClick={() => setView('predictions')}
            style={{
              padding: '8px 12px',
              background: view === 'predictions' ? '#0070f3' : '#f0f0f0',
              color: view === 'predictions' ? 'white' : '#1a1a1a',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '500',
            }}
          >
            Mis predicciones
          </button>
          <button
            onClick={() => setView('dashboard')}
            style={{
              padding: '8px 12px',
              background: view === 'dashboard' ? '#0070f3' : '#f0f0f0',
              color: view === 'dashboard' ? 'white' : '#1a1a1a',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '500',
            }}
          >
            Tabla de posiciones
          </button>
        </div>

        <div>
          <h2 style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 1rem', color: '#1a1a1a' }}>Tabla de posiciones</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {leaderboard.length === 0 ? (
              <p style={{ color: '#666', fontSize: '14px' }}>No hay participantes aún</p>
            ) : (
              leaderboard.map((user, idx) => (
                <div key={user.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: user.username === currentUser ? '#e3f2fd' : 'white', borderRadius: '8px', border: '1px solid #ddd' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '500', color: '#666', minWidth: '20px' }}>#{idx + 1}</span>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#1a1a1a' }}>{user.username}</span>
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#0070f3' }}>{user.totalPoints} pts</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  // PREDICTIONS VIEW
  if (view === 'predictions') {
    const user = users.find(u => u.username === currentUser);
    
    // Group matches by stage
    const groupedMatches = {};
    matches.forEach(match => {
      if (!groupedMatches[match.stage]) {
        groupedMatches[match.stage] = [];
      }
      groupedMatches[match.stage].push(match);
    });

    const stageOrder = ['Grupos', 'Octavos', 'Cuartos', 'Semifinal', 'Tercer lugar', 'Final'];
    const sortedStages = Object.keys(groupedMatches).sort((a, b) => 
      stageOrder.indexOf(a) - stageOrder.indexOf(b)
    );

    return (
      <div style={{ padding: '1rem', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '500', margin: '0', color: '#1a1a1a' }}>Mis predicciones</h1>
          <button onClick={() => setView('dashboard')} style={{ padding: '8px 12px', background: 'transparent', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
            ← Volver
          </button>
        </div>

        {sortedStages.map(stage => (
          <div key={stage} style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 1rem', color: '#1a1a1a', paddingBottom: '8px', borderBottom: '2px solid #0070f3' }}>
              {stage}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {groupedMatches[stage].map(match => {
                const prediction = user?.predictions[match.id];
                return (
                  <div key={match.id} style={{ background: 'white', border: '1px solid #ddd', borderRadius: '12px', padding: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <div>
                        <p style={{ fontSize: '12px', color: '#666', margin: '0 0 4px' }}>
                          {match.group ? `Grupo ${match.group}` : ''} • {match.date}
                        </p>
                        <p style={{ fontSize: '14px', fontWeight: '500', color: '#1a1a1a', margin: '0' }}>
                          {match.home} vs {match.away}
                        </p>
                      </div>
                      {match.group && (
                        <span style={{ fontSize: '12px', background: '#f0f0f0', padding: '4px 8px', borderRadius: '8px', color: '#666' }}>
                          Grupo {match.group}
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={prediction?.home !== null && prediction?.home !== undefined ? prediction.home : ''}
                        onChange={(e) => handlePrediction(match.id, e.target.value, prediction?.away || '')}
                        placeholder="0"
                        style={{ width: '60px', padding: '8px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', textAlign: 'center' }}
                      />
                      <span style={{ fontSize: '12px', color: '#666', fontWeight: '500' }}>-</span>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={prediction?.away !== null && prediction?.away !== undefined ? prediction.away : ''}
                        onChange={(e) => handlePrediction(match.id, prediction?.home || '', e.target.value)}
                        placeholder="0"
                        style={{ width: '60px', padding: '8px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', textAlign: 'center' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div style={{ marginBottom: '2rem', padding: '1rem', background: 'white', borderRadius: '12px', border: '1px solid #ddd', fontSize: '13px', color: '#666' }}>
          <p style={{ margin: '0 0 8px', fontWeight: '500', color: '#1a1a1a' }}>Sistema de puntuación:</p>
          <p style={{ margin: '0 0 4px' }}>✓ Resultado exacto: 5 puntos</p>
          <p style={{ margin: '0 0 4px' }}>✓ Ganador correcto: 3 puntos</p>
          <p style={{ margin: '0' }}>✓ Un gol correcto: 1 punto</p>
        </div>
      </div>
    );
  }
};

export default FIFA2026PoolApp;
