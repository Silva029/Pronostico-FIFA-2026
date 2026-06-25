import React, { useState, useEffect } from 'react';

const FIFA2026PoolApp = () => {
  const ADMIN_PASSWORD = 'FastM1nd2026'; // Change this to your admin password
  const CURRENT_DATE = '2026-06-24';
  
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [view, setView] = useState('login');
  const [showRegister, setShowRegister] = useState(false);
  const [users, setUsers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [teamNames, setTeamNames] = useState({});
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ username: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  // Initialize app
  useEffect(() => {
    const saved = localStorage.getItem('fifa2026Data');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setUsers(data.users || []);
        setMatches(data.matches || []);
        setTeamNames(data.teamNames || {});
      } catch (e) {
        console.error('Error loading data:', e);
        initializeData();
      }
    } else {
      initializeData();
    }

    const loggedIn = localStorage.getItem('currentUser');
    const adminStatus = localStorage.getItem('isAdmin');
    if (loggedIn) {
      setCurrentUser(loggedIn);
      setIsAdmin(adminStatus === 'true');
      setView(adminStatus === 'true' ? 'adminDashboard' : 'dashboard');
    }
  }, []);

  const initializeData = () => {
    const initialMatches = [
      // Group Stage Matches
      { id: 1, home: 'Ecuador', away: 'Germany', group: 'E', stage: 'Grupos', date: '2026-06-25', time: '16:00', homeScore: null, awayScore: null },
      { id: 2, home: 'Curaçao', away: 'Ivory Coast', group: 'E', stage: 'Grupos', date: '2026-06-25', time: '16:00', homeScore: null, awayScore: null },
      { id: 3, home: 'Japan', away: 'Sweden', group: 'F', stage: 'Grupos', date: '2026-06-25', time: '19:00', homeScore: null, awayScore: null },
      { id: 4, home: 'Tunisia', away: 'Netherlands', group: 'F', stage: 'Grupos', date: '2026-06-25', time: '19:00', homeScore: null, awayScore: null },
      { id: 5, home: 'Türkiye', away: 'USA', group: 'D', stage: 'Grupos', date: '2026-06-25', time: '22:00', homeScore: null, awayScore: null },
      { id: 6, home: 'Paraguay', away: 'Australia', group: 'D', stage: 'Grupos', date: '2026-06-25', time: '22:00', homeScore: null, awayScore: null },
      { id: 7, home: 'Norway', away: 'France', group: 'I', stage: 'Grupos', date: '2026-06-26', time: '15:00', homeScore: null, awayScore: null },
      { id: 8, home: 'Senegal', away: 'Iraq', group: 'I', stage: 'Grupos', date: '2026-06-26', time: '15:00', homeScore: null, awayScore: null },
      { id: 9, home: 'Cape Verde', away: 'Saudi Arabia', group: 'H', stage: 'Grupos', date: '2026-06-26', time: '20:00', homeScore: null, awayScore: null },
      { id: 10, home: 'Uruguay', away: 'Spain', group: 'H', stage: 'Grupos', date: '2026-06-26', time: '20:00', homeScore: null, awayScore: null },
      { id: 11, home: 'Egypt', away: 'Iran', group: 'G', stage: 'Grupos', date: '2026-06-26', time: '23:00', homeScore: null, awayScore: null },
      { id: 12, home: 'New Zealand', away: 'Belgium', group: 'G', stage: 'Grupos', date: '2026-06-26', time: '23:00', homeScore: null, awayScore: null },
      { id: 13, home: 'Panama', away: 'England', group: 'L', stage: 'Grupos', date: '2026-06-27', time: '17:00', homeScore: null, awayScore: null },
      { id: 14, home: 'Croatia', away: 'Ghana', group: 'L', stage: 'Grupos', date: '2026-06-27', time: '17:00', homeScore: null, awayScore: null },
      { id: 15, home: 'Colombia', away: 'Portugal', group: 'K', stage: 'Grupos', date: '2026-06-27', time: '19:30', homeScore: null, awayScore: null },
      { id: 16, home: 'DR Congo', away: 'Uzbekistan', group: 'K', stage: 'Grupos', date: '2026-06-27', time: '19:30', homeScore: null, awayScore: null },
      { id: 17, home: 'Algeria', away: 'Austria', group: 'J', stage: 'Grupos', date: '2026-06-27', time: '22:00', homeScore: null, awayScore: null },
      { id: 18, home: 'Jordan', away: 'Argentina', group: 'J', stage: 'Grupos', date: '2026-06-27', time: '22:00', homeScore: null, awayScore: null },

      // Round of 32
      { id: 19, home: 'Winner A', away: 'Runner-up B', stage: 'Ronda 32', date: '2026-06-28', time: '15:00', homeScore: null, awayScore: null },
      { id: 20, home: 'Winner C', away: 'Runner-up F', stage: 'Ronda 32', date: '2026-06-29', time: '13:00', homeScore: null, awayScore: null },
      { id: 21, home: 'Winner E', away: 'Best 3rd', stage: 'Ronda 32', date: '2026-06-29', time: '16:30', homeScore: null, awayScore: null },
      { id: 22, home: 'Winner F', away: 'Runner-up C', stage: 'Ronda 32', date: '2026-06-29', time: '21:00', homeScore: null, awayScore: null },
      { id: 23, home: 'Winner G', away: 'Best 3rd', stage: 'Ronda 32', date: '2026-07-01', time: '12:00', homeScore: null, awayScore: null },
      { id: 24, home: 'Winner D', away: 'Best 3rd', stage: 'Ronda 32', date: '2026-07-01', time: '20:00', homeScore: null, awayScore: null },
      { id: 25, home: 'Winner H', away: 'Runner-up J', stage: 'Ronda 32', date: '2026-07-02', time: '15:00', homeScore: null, awayScore: null },
      { id: 26, home: 'Winner K', away: 'Best 3rd', stage: 'Ronda 32', date: '2026-07-03', time: '21:30', homeScore: null, awayScore: null },

      // Knockout rounds
      { id: 27, home: 'QF1', away: 'QF2', stage: 'Octavos', date: '2026-07-04', time: '13:00', homeScore: null, awayScore: null },
      { id: 28, home: 'QF3', away: 'QF4', stage: 'Octavos', date: '2026-07-04', time: '17:00', homeScore: null, awayScore: null },
      { id: 29, home: 'QF5', away: 'QF6', stage: 'Octavos', date: '2026-07-05', time: '16:00', homeScore: null, awayScore: null },
      { id: 30, home: 'QF7', away: 'QF8', stage: 'Octavos', date: '2026-07-05', time: '20:00', homeScore: null, awayScore: null },
      { id: 31, home: 'SF1', away: 'SF2', stage: 'Semifinal', date: '2026-07-13', time: '20:00', homeScore: null, awayScore: null },
      { id: 32, home: 'SF3', away: 'SF4', stage: 'Semifinal', date: '2026-07-14', time: '20:00', homeScore: null, awayScore: null },
      { id: 33, home: 'Loser SF1', away: 'Loser SF2', stage: 'Tercer lugar', date: '2026-07-17', time: '18:00', homeScore: null, awayScore: null },
      { id: 34, home: 'Winner SF1', away: 'Winner SF2', stage: 'Final', date: '2026-07-19', time: '19:00', homeScore: null, awayScore: null },
    ];
    
    setMatches(initialMatches);
    setTeamNames({});
    localStorage.setItem('fifa2026Data', JSON.stringify({ users: [], matches: initialMatches, teamNames: {} }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!loginForm.username || !loginForm.password) {
      setError('Por favor completa usuario y contraseña');
      return;
    }

    const user = users.find(u => u.username === loginForm.username && u.password === loginForm.password);
    if (user) {
      localStorage.setItem('currentUser', loginForm.username);
      localStorage.setItem('isAdmin', 'false');
      setCurrentUser(loginForm.username);
      setIsAdmin(false);
      setView('dashboard');
      setLoginForm({ username: '', password: '' });
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === ADMIN_PASSWORD) {
      localStorage.setItem('currentUser', 'admin');
      localStorage.setItem('isAdmin', 'true');
      setCurrentUser('admin');
      setIsAdmin(true);
      setView('adminDashboard');
      setAdminPassword('');
      setError('');
    } else {
      setError('Contraseña de administrador incorrecta');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAdmin');
    setCurrentUser(null);
    setIsAdmin(false);
    setView('login');
    setShowRegister(false);
    setError('');
  };

  const handleRegister = (e) => {
    e.preventDefault();
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
    localStorage.setItem('fifa2026Data', JSON.stringify({ users: updatedUsers, matches, teamNames }));
    localStorage.setItem('currentUser', registerForm.username);
    localStorage.setItem('isAdmin', 'false');
    setCurrentUser(registerForm.username);
    setIsAdmin(false);
    setView('dashboard');
    setRegisterForm({ username: '', password: '', confirmPassword: '' });
    setShowRegister(false);
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
      localStorage.setItem('fifa2026Data', JSON.stringify({ users: updatedUsers, matches, teamNames }));
    }
  };

  const updateTeamName = (matchId, team, newName) => {
    const key = `${matchId}-${team}`;
    const updatedTeamNames = { ...teamNames, [key]: newName };
    setTeamNames(updatedTeamNames);
    localStorage.setItem('fifa2026Data', JSON.stringify({ users, matches, teamNames: updatedTeamNames }));
  };

  const updateMatchResult = (matchId, homeScore, awayScore) => {
    const updatedMatches = matches.map(m =>
      m.id === matchId ? { ...m, homeScore: parseInt(homeScore), awayScore: parseInt(awayScore) } : m
    );
    setMatches(updatedMatches);
    localStorage.setItem('fifa2026Data', JSON.stringify({ users, matches: updatedMatches, teamNames }));
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

  const getUserStats = (username) => {
    const user = users.find(u => u.username === username);
    if (!user) return null;

    let totalMatches = 0;
    let correctResults = 0;
    let correctWinners = 0;
    let totalPoints = 0;
    const pastPredictions = [];

    Object.keys(user.predictions).forEach(matchId => {
      const match = matches.find(m => m.id === parseInt(matchId));
      if (match && match.homeScore !== null) {
        totalMatches++;
        const prediction = user.predictions[matchId];
        const points = calculatePoints(prediction, match);
        totalPoints += points;

        if (prediction.home === match.homeScore && prediction.away === match.awayScore) {
          correctResults++;
        } else if ((prediction.home > prediction.away && match.homeScore > match.awayScore) ||
                   (prediction.home < prediction.away && match.homeScore < match.awayScore) ||
                   (prediction.home === prediction.away && match.homeScore === match.awayScore)) {
          correctWinners++;
        }

        pastPredictions.push({
          match: `${match.home} vs ${match.away}`,
          prediction: `${prediction.home} - ${prediction.away}`,
          result: `${match.homeScore} - ${match.awayScore}`,
          points,
        });
      }
    });

    const leaderboard = getLeaderboard();
    const rank = leaderboard.findIndex(u => u.username === username) + 1;

    return {
      totalMatches,
      correctResults,
      correctWinners,
      totalPoints,
      rank,
      accuracy: totalMatches > 0 ? Math.round((correctResults / totalMatches) * 100) : 0,
      pastPredictions,
    };
  };

  const getNextMatches = () => {
    return matches.filter(m => m.homeScore === null).sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 10);
  };

  const canMakePrediction = (matchDate) => {
    return matchDate > CURRENT_DATE;
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
          <button onClick={() => { setShowRegister(false); setError(''); }} style={{ flex: 1, padding: '10px', background: !showRegister ? '#0070f3' : '#f0f0f0', color: !showRegister ? 'white' : '#1a1a1a', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>Ingresar</button>
          <button onClick={() => { setShowRegister(true); setError(''); }} style={{ flex: 1, padding: '10px', background: showRegister ? '#0070f3' : '#f0f0f0', color: showRegister ? 'white' : '#1a1a1a', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>Registrarse</button>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '2rem' }}>
          <button onClick={() => { setView('adminLogin'); setError(''); }} style={{ flex: 1, padding: '10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>Admin</button>
        </div>

        {error && <div style={{ background: '#ffe0e0', color: '#c41e1e', padding: '12px', borderRadius: '8px', marginBottom: '1rem', fontSize: '13px' }}>{error}</div>}

        {!showRegister ? (
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

  // ADMIN LOGIN
  if (view === 'adminLogin') {
    return (
      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem 1rem', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '500', margin: '0 0 8px', color: '#1a1a1a' }}>Panel de Administrador</h1>
        </div>

        {error && <div style={{ background: '#ffe0e0', color: '#c41e1e', padding: '12px', borderRadius: '8px', marginBottom: '1rem', fontSize: '13px' }}>{error}</div>}

        <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input type="password" placeholder="Contraseña de Administrador" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} required style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }} />
          <button type="submit" style={{ padding: '10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>Ingresar</button>
        </form>

        <button onClick={() => setView('login')} style={{ width: '100%', marginTop: '1rem', padding: '10px', background: 'transparent', color: '#0070f3', border: '1px solid #0070f3', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>Volver al Inicio</button>
      </div>
    );
  }

  // ADMIN DASHBOARD
  if (isAdmin && view === 'adminDashboard') {
    const leaderboard = getLeaderboard();
    const nextMatches = getNextMatches();

    return (
      <div style={{ padding: '1rem', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '500', margin: '0', color: '#1a1a1a' }}>Panel de Administrador</h1>
          <button onClick={handleLogout} style={{ padding: '8px 12px', background: 'transparent', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>Salir</button>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '2rem', borderBottom: '1px solid #ddd', paddingBottom: '12px' }}>
          <button onClick={() => setView('adminDashboard')} style={{ padding: '8px 12px', background: view === 'adminDashboard' ? '#28a745' : '#f0f0f0', color: view === 'adminDashboard' ? 'white' : '#1a1a1a', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}>Inicio</button>
          <button onClick={() => setView('adminMatches')} style={{ padding: '8px 12px', background: view === 'adminMatches' ? '#28a745' : '#f0f0f0', color: view === 'adminMatches' ? 'white' : '#1a1a1a', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}>Editar Partidos</button>
          <button onClick={() => setView('adminResults')} style={{ padding: '8px 12px', background: view === 'adminResults' ? '#28a745' : '#f0f0f0', color: view === 'adminResults' ? 'white' : '#1a1a1a', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}>Ingresar Resultados</button>
        </div>

        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 1rem', color: '#1a1a1a' }}>Próximos Partidos</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '2rem' }}>
            {nextMatches.map(match => (
              <div key={match.id} style={{ background: 'white', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '13px' }}>
                <p style={{ margin: '0 0 4px', fontWeight: '500' }}>{match.home} vs {match.away}</p>
                <p style={{ margin: '0', color: '#666', fontSize: '12px' }}>{match.date} {match.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 1rem', color: '#1a1a1a' }}>Tabla de Posiciones</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {leaderboard.slice(0, 10).map((user, idx) => (
              <div key={user.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'white', borderRadius: '8px', border: '1px solid #ddd', fontSize: '13px' }}>
                <span>#{idx + 1} {user.username}</span>
                <span style={{ fontWeight: '500', color: '#28a745' }}>{user.totalPoints} pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ADMIN MATCHES
  if (isAdmin && view === 'adminMatches') {
    const groupedMatches = {};
    matches.forEach(match => {
      if (!groupedMatches[match.stage]) {
        groupedMatches[match.stage] = [];
      }
      groupedMatches[match.stage].push(match);
    });

    const stageOrder = ['Grupos', 'Ronda 32', 'Octavos', 'Cuartos', 'Semifinal', 'Tercer lugar', 'Final'];
    const sortedStages = Object.keys(groupedMatches).sort((a, b) => stageOrder.indexOf(a) - stageOrder.indexOf(b));

    return (
      <div style={{ padding: '1rem', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '500', margin: '0', color: '#1a1a1a' }}>Editar Nombres de Equipos</h1>
          <button onClick={() => setView('adminDashboard')} style={{ padding: '8px 12px', background: 'transparent', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>← Volver</button>
        </div>

        {sortedStages.map(stage => (
          <div key={stage} style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 1rem', color: '#1a1a1a' }}>{stage}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {groupedMatches[stage].map(match => {
                const homeTeam = teamNames[`${match.id}-home`] || match.home;
                const awayTeam = teamNames[`${match.id}-away`] || match.away;

                return (
                  <div key={match.id} style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #ddd' }}>
                    <p style={{ fontSize: '12px', color: '#666', margin: '0 0 8px' }}>{match.date} {match.time}</p>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input type="text" value={homeTeam} onChange={(e) => updateTeamName(match.id, 'home', e.target.value)} style={{ flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '13px' }} />
                      <span style={{ fontSize: '12px', fontWeight: '500' }}>vs</span>
                      <input type="text" value={awayTeam} onChange={(e) => updateTeamName(match.id, 'away', e.target.value)} style={{ flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '13px' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ADMIN RESULTS
  if (isAdmin && view === 'adminResults') {
    const groupedMatches = {};
    matches.forEach(match => {
      if (!groupedMatches[match.stage]) {
        groupedMatches[match.stage] = [];
      }
      groupedMatches[match.stage].push(match);
    });

    const stageOrder = ['Grupos', 'Ronda 32', 'Octavos', 'Cuartos', 'Semifinal', 'Tercer lugar', 'Final'];
    const sortedStages = Object.keys(groupedMatches).sort((a, b) => stageOrder.indexOf(a) - stageOrder.indexOf(b));

    return (
      <div style={{ padding: '1rem', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '500', margin: '0', color: '#1a1a1a' }}>Ingresar Resultados</h1>
          <button onClick={() => setView('adminDashboard')} style={{ padding: '8px 12px', background: 'transparent', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>← Volver</button>
        </div>

        {sortedStages.map(stage => (
          <div key={stage} style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 1rem', color: '#1a1a1a' }}>{stage}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {groupedMatches[stage].map(match => {
                const homeTeam = teamNames[`${match.id}-home`] || match.home;
                const awayTeam = teamNames[`${match.id}-away`] || match.away;
                const hasResult = match.homeScore !== null;

                return (
                  <div key={match.id} style={{ background: hasResult ? '#e8f5e9' : 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #ddd' }}>
                    <p style={{ fontSize: '12px', color: '#666', margin: '0 0 8px' }}>{match.date} {match.time}</p>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ flex: 1, fontSize: '13px', fontWeight: '500' }}>{homeTeam}</span>
                      <input type="number" min="0" max="10" value={match.homeScore !== null ? match.homeScore : ''} onChange={(e) => updateMatchResult(match.id, e.target.value || 0, match.awayScore || 0)} placeholder="0" style={{ width: '50px', padding: '6px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '13px', textAlign: 'center' }} />
                      <span style={{ fontSize: '12px', fontWeight: '500' }}>-</span>
                      <input type="number" min="0" max="10" value={match.awayScore !== null ? match.awayScore : ''} onChange={(e) => updateMatchResult(match.id, match.homeScore || 0, e.target.value || 0)} placeholder="0" style={{ width: '50px', padding: '6px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '13px', textAlign: 'center' }} />
                      <span style={{ flex: 1, textAlign: 'right', fontSize: '13px', fontWeight: '500' }}>{awayTeam}</span>
                    </div>
                    {hasResult && <p style={{ margin: '8px 0 0', fontSize: '11px', color: '#28a745', fontWeight: '500' }}>✓ Resultado ingresado</p>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // USER DASHBOARD
  if (!isAdmin && view === 'dashboard') {
    const leaderboard = getLeaderboard();
    const currentUserRank = leaderboard.findIndex(u => u.username === currentUser) + 1;

    return (
      <div style={{ padding: '1rem', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '500', margin: '0', color: '#1a1a1a' }}>Pronóstico 2026</h1>
            <p style={{ fontSize: '13px', color: '#666', margin: '4px 0 0' }}>Bienvenido, {currentUser}</p>
          </div>
          <button onClick={handleLogout} style={{ padding: '8px 12px', background: 'transparent', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>Salir</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '2rem' }}>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #ddd' }}>
            <p style={{ fontSize: '12px', color: '#666', margin: '0 0 8px' }}>Tu posición</p>
            <p style={{ fontSize: '20px', fontWeight: '500', color: '#1a1a1a', margin: '0' }}>#{currentUserRank}</p>
          </div>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #ddd' }}>
            <p style={{ fontSize: '12px', color: '#666', margin: '0 0 8px' }}>Tu puntuación</p>
            <p style={{ fontSize: '20px', fontWeight: '500', color: '#1a1a1a', margin: '0' }}>{leaderboard.find(u => u.username === currentUser)?.totalPoints || 0}</p>
          </div>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #ddd' }}>
            <p style={{ fontSize: '12px', color: '#666', margin: '0 0 8px' }}>Participantes</p>
            <p style={{ fontSize: '20px', fontWeight: '500', color: '#1a1a1a', margin: '0' }}>{users.length}</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '2rem', borderBottom: '1px solid #ddd', paddingBottom: '12px' }}>
          <button onClick={() => setView('dashboard')} style={{ padding: '8px 12px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}>Posiciones</button>
          <button onClick={() => setView('predictions')} style={{ padding: '8px 12px', background: '#f0f0f0', color: '#1a1a1a', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}>Predicciones</button>
          <button onClick={() => setView('nextMatches')} style={{ padding: '8px 12px', background: '#f0f0f0', color: '#1a1a1a', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}>Próximos</button>
          <button onClick={() => setView('stats')} style={{ padding: '8px 12px', background: '#f0f0f0', color: '#1a1a1a', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}>Estadísticas</button>
        </div>

        <div>
          <h2 style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 1rem', color: '#1a1a1a' }}>TOP 10</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {leaderboard.slice(0, 10).map((user, idx) => (
              <div key={user.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: user.username === currentUser ? '#e3f2fd' : 'white', borderRadius: '8px', border: '1px solid #ddd' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '500', color: '#666' }}>#{idx + 1}</span>
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

  // STATS VIEW
  if (!isAdmin && view === 'stats') {
    const stats = getUserStats(currentUser);
    if (!stats) return null;

    return (
      <div style={{ padding: '1rem', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '500', margin: '0', color: '#1a1a1a' }}>Mis Estadísticas</h1>
          <button onClick={() => setView('dashboard')} style={{ padding: '8px 12px', background: 'transparent', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>← Volver</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '2rem' }}>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #ddd' }}>
            <p style={{ fontSize: '12px', color: '#666', margin: '0 0 8px' }}>Posición</p>
            <p style={{ fontSize: '20px', fontWeight: '500', color: '#1a1a1a', margin: '0' }}>#{stats.rank}</p>
          </div>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #ddd' }}>
            <p style={{ fontSize: '12px', color: '#666', margin: '0 0 8px' }}>Puntos Total</p>
            <p style={{ fontSize: '20px', fontWeight: '500', color: '#0070f3', margin: '0' }}>{stats.totalPoints}</p>
          </div>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #ddd' }}>
            <p style={{ fontSize: '12px', color: '#666', margin: '0 0 8px' }}>Exactos</p>
            <p style={{ fontSize: '20px', fontWeight: '500', color: '#28a745', margin: '0' }}>{stats.correctResults}</p>
          </div>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #ddd' }}>
            <p style={{ fontSize: '12px', color: '#666', margin: '0 0 8px' }}>Ganadores</p>
            <p style={{ fontSize: '20px', fontWeight: '500', color: '#28a745', margin: '0' }}>{stats.correctWinners}</p>
          </div>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #ddd' }}>
            <p style={{ fontSize: '12px', color: '#666', margin: '0 0 8px' }}>Precisión</p>
            <p style={{ fontSize: '20px', fontWeight: '500', color: '#1a1a1a', margin: '0' }}>{stats.accuracy}%</p>
          </div>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #ddd' }}>
            <p style={{ fontSize: '12px', color: '#666', margin: '0 0 8px' }}>Partidos Jugados</p>
            <p style={{ fontSize: '20px', fontWeight: '500', color: '#1a1a1a', margin: '0' }}>{stats.totalMatches}</p>
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 1rem', color: '#1a1a1a' }}>Historial de Predicciones</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {stats.pastPredictions.map((pred, idx) => (
              <div key={idx} style={{ background: 'white', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '13px' }}>
                <p style={{ margin: '0 0 4px', fontWeight: '500' }}>{pred.match}</p>
                <p style={{ margin: '0 0 4px', color: '#666', fontSize: '12px' }}>Tu predicción: {pred.prediction}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ margin: '0', color: '#666', fontSize: '12px' }}>Resultado: {pred.result}</p>
                  <span style={{ background: '#e8f5e9', color: '#28a745', padding: '4px 8px', borderRadius: '4px', fontWeight: '500', fontSize: '12px' }}>+{pred.points} pts</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // NEXT MATCHES VIEW
  if (!isAdmin && view === 'nextMatches') {
    const nextMatches = getNextMatches();

    return (
      <div style={{ padding: '1rem', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '500', margin: '0', color: '#1a1a1a' }}>Próximos Partidos</h1>
          <button onClick={() => setView('dashboard')} style={{ padding: '8px 12px', background: 'transparent', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>← Volver</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {nextMatches.map(match => {
            const homeTeam = teamNames[`${match.id}-home`] || match.home;
            const awayTeam = teamNames[`${match.id}-away`] || match.away;
            const user = users.find(u => u.username === currentUser);
            const prediction = user?.predictions[match.id];

            return (
              <div key={match.id} style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #ddd' }}>
                <p style={{ fontSize: '12px', color: '#666', margin: '0 0 4px' }}>{match.date} {match.time}</p>
                <p style={{ fontSize: '14px', fontWeight: '500', margin: '0 0 8px', color: '#1a1a1a' }}>{homeTeam} vs {awayTeam}</p>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#666' }}>Tu predicción:</span>
                  {prediction && <span style={{ fontSize: '14px', fontWeight: '500', color: '#0070f3' }}>{prediction.home} - {prediction.away}</span>}
                  {!prediction && <span style={{ fontSize: '12px', color: '#999' }}>Sin predicción</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // PREDICTIONS VIEW
  if (!isAdmin && view === 'predictions') {
    const user = users.find(u => u.username === currentUser);
    const groupedMatches = {};
    matches.forEach(match => {
      if (!groupedMatches[match.stage]) {
        groupedMatches[match.stage] = [];
      }
      groupedMatches[match.stage].push(match);
    });

    const stageOrder = ['Grupos', 'Ronda 32', 'Octavos', 'Cuartos', 'Semifinal', 'Tercer lugar', 'Final'];
    const sortedStages = Object.keys(groupedMatches).sort((a, b) => stageOrder.indexOf(a) - stageOrder.indexOf(b));

    return (
      <div style={{ padding: '1rem', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '500', margin: '0', color: '#1a1a1a' }}>Mis Predicciones</h1>
          <button onClick={() => setView('dashboard')} style={{ padding: '8px 12px', background: 'transparent', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>← Volver</button>
        </div>

        {sortedStages.map(stage => (
          <div key={stage} style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '14px', fontWeight: '500', margin: '0 0 1rem', color: '#1a1a1a', paddingBottom: '8px', borderBottom: '2px solid #0070f3' }}>{stage}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {groupedMatches[stage].map(match => {
                const prediction = user?.predictions[match.id];
                const canEdit = canMakePrediction(match.date);
                const homeTeam = teamNames[`${match.id}-home`] || match.home;
                const awayTeam = teamNames[`${match.id}-away`] || match.away;

                return (
                  <div key={match.id} style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #ddd' }}>
                    <p style={{ fontSize: '12px', color: '#666', margin: '0 0 4px' }}>{match.date} {match.time}</p>
                    <p style={{ fontSize: '14px', fontWeight: '500', margin: '0 0 8px', color: '#1a1a1a' }}>{homeTeam} vs {awayTeam}</p>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input type="number" min="0" max="10" value={prediction?.home !== null && prediction?.home !== undefined ? prediction.home : ''} onChange={(e) => canEdit ? handlePrediction(match.id, e.target.value, prediction?.away || '') : null} disabled={!canEdit} placeholder="0" style={{ width: '60px', padding: '8px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', textAlign: 'center', backgroundColor: !canEdit ? '#f0f0f0' : 'white', cursor: canEdit ? 'text' : 'not-allowed', opacity: !canEdit ? 0.6 : 1 }} />
                      <span style={{ fontSize: '12px', fontWeight: '500' }}>-</span>
                      <input type="number" min="0" max="10" value={prediction?.away !== null && prediction?.away !== undefined ? prediction.away : ''} onChange={(e) => canEdit ? handlePrediction(match.id, prediction?.home || '', e.target.value) : null} disabled={!canEdit} placeholder="0" style={{ width: '60px', padding: '8px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', textAlign: 'center', backgroundColor: !canEdit ? '#f0f0f0' : 'white', cursor: canEdit ? 'text' : 'not-allowed', opacity: !canEdit ? 0.6 : 1 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default FIFA2026PoolApp;
