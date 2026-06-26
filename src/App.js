import React, { useState, useEffect } from 'react';

const FIFA2026PoolApp = () => {
  const ADMIN_PASSWORD = 'admin2026';
  const TIMEZONE = 'America/Denver'; // Mountain Time
  
  // Get current time in Mountain Time
  const getCurrentTimeInMT = () => {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: TIMEZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    
    const parts = formatter.formatToParts(now);
    const values = {};
    parts.forEach(part => {
      values[part.type] = part.value;
    });
    
    return {
      date: `${values.year}-${values.month}-${values.day}`,
      time: `${values.hour}:${values.minute}:${values.second}`,
      fullDate: new Date(`${values.year}-${values.month}-${values.day}T${values.hour}:${values.minute}:${values.second}`),
      display: `${values.hour}:${values.minute}`
    };
  };
  
  // Check if prediction is still open (1 hour BEFORE match starts)
  const canMakePrediction = (matchDate, matchTime) => {
    try {
      const currentMT = getCurrentTimeInMT();
      
      // Parse match date and time
      const [matchYear, matchMonth, matchDay] = matchDate.split('-');
      const [matchHour, matchMinute] = matchTime.split(':');
      
      // Create match datetime in Mountain Time
      const matchDateTime = new Date(`${matchYear}-${matchMonth}-${matchDay}T${matchHour}:${matchMinute}:00`);
      
      // Lock time is 1 hour BEFORE match
      const lockTime = new Date(matchDateTime.getTime() - (60 * 60 * 1000));
      
      // Current time must be BEFORE lock time to allow edits
      return currentMT.fullDate < lockTime;
    } catch (e) {
      console.error('Error checking prediction:', e);
      return false;
    }
  };

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
  const [currentMTTime, setCurrentMTTime] = useState(getCurrentTimeInMT());

  // Footer Component
  const Footer = () => (
    <div style={{ textAlign: 'center', padding: '2rem 1rem', borderTop: '1px solid rgba(0,0,0,0.1)', marginTop: '2rem', background: 'rgba(255,255,255,0.5)', color: '#64748b', fontSize: '12px', fontWeight: '500' }}>
      <p style={{ margin: '0' }}>⚽ Made by Edi for fun purposes | Enjoy the Mundial in Peace! 🌍 | Nothing Else Matters 🎵</p>
    </div>
  );

  // Initialize app and update time every second
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

    // Update time every second
    const timer = setInterval(() => {
      setCurrentMTTime(getCurrentTimeInMT());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const initializeData = () => {
    const initialMatches = [
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
      { id: 19, home: 'Winner A', away: 'Runner-up B', stage: 'Ronda 32', date: '2026-06-28', time: '15:00', homeScore: null, awayScore: null },
      { id: 20, home: 'Winner C', away: 'Runner-up F', stage: 'Ronda 32', date: '2026-06-29', time: '13:00', homeScore: null, awayScore: null },
      { id: 21, home: 'Winner E', away: 'Best 3rd', stage: 'Ronda 32', date: '2026-06-29', time: '16:30', homeScore: null, awayScore: null },
      { id: 22, home: 'Winner F', away: 'Runner-up C', stage: 'Ronda 32', date: '2026-06-29', time: '21:00', homeScore: null, awayScore: null },
      { id: 23, home: 'Winner G', away: 'Best 3rd', stage: 'Ronda 32', date: '2026-07-01', time: '12:00', homeScore: null, awayScore: null },
      { id: 24, home: 'Winner D', away: 'Best 3rd', stage: 'Ronda 32', date: '2026-07-01', time: '20:00', homeScore: null, awayScore: null },
      { id: 25, home: 'Winner H', away: 'Runner-up J', stage: 'Ronda 32', date: '2026-07-02', time: '15:00', homeScore: null, awayScore: null },
      { id: 26, home: 'Winner K', away: 'Best 3rd', stage: 'Ronda 32', date: '2026-07-03', time: '21:30', homeScore: null, awayScore: null },
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

  if (view === 'login') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #0ea5e9 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <div style={{ maxWidth: '500px', width: '100%', background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '48px', marginBottom: '1rem' }}>⚽</div>
            <h1 style={{ fontSize: '32px', fontWeight: '700', margin: '0 0 8px', color: '#1e3a8a' }}>Pronóstico 2026</h1>
            <p style={{ color: '#64748b', margin: '0', fontSize: '14px' }}>🏆 Copa Mundial FIFA</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <button onClick={() => { setShowRegister(false); setError(''); }} style={{ flex: 1, padding: '12px', background: !showRegister ? 'linear-gradient(135deg, #0070f3, #3b82f6)' : '#f1f5f9', color: !showRegister ? 'white' : '#1e3a8a', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>Ingresar</button>
            <button onClick={() => { setShowRegister(true); setError(''); }} style={{ flex: 1, padding: '12px', background: showRegister ? 'linear-gradient(135deg, #0070f3, #3b82f6)' : '#f1f5f9', color: showRegister ? 'white' : '#1e3a8a', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>Registrarse</button>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '2rem' }}>
            <button onClick={() => { setView('adminLogin'); setError(''); }} style={{ flex: 1, padding: '12px', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>👨‍💼 Admin</button>
          </div>
          {error && <div style={{ background: '#fecaca', color: '#991b1b', padding: '12px', borderRadius: '8px', marginBottom: '1rem', fontSize: '13px', borderLeft: '4px solid #dc2626' }}>⚠️ {error}</div>}
          {!showRegister ? (
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" placeholder="Usuario" value={loginForm.username} onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })} required style={{ padding: '12px', borderRadius: '8px', border: '2px solid #e2e8f0', fontSize: '14px' }} />
              <input type="password" placeholder="Contraseña" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} required style={{ padding: '12px', borderRadius: '8px', border: '2px solid #e2e8f0', fontSize: '14px' }} />
              <button type="submit" style={{ padding: '12px', background: 'linear-gradient(135deg, #0070f3, #3b82f6)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', marginTop: '8px' }}>Ingresar</button>
            </form>
          ) : (
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" placeholder="Nombre de usuario" value={registerForm.username} onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })} required style={{ padding: '12px', borderRadius: '8px', border: '2px solid #e2e8f0', fontSize: '14px' }} />
              <input type="password" placeholder="Contraseña" value={registerForm.password} onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })} required style={{ padding: '12px', borderRadius: '8px', border: '2px solid #e2e8f0', fontSize: '14px' }} />
              <input type="password" placeholder="Confirmar contraseña" value={registerForm.confirmPassword} onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })} required style={{ padding: '12px', borderRadius: '8px', border: '2px solid #e2e8f0', fontSize: '14px' }} />
              <button type="submit" style={{ padding: '12px', background: 'linear-gradient(135deg, #0070f3, #3b82f6)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', marginTop: '8px' }}>Registrarse</button>
            </form>
          )}
        </div>
        <Footer />
      </div>
    );
  }

  if (view === 'adminLogin') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #0ea5e9 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <div style={{ maxWidth: '400px', width: '100%', background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '40px', marginBottom: '1rem' }}>🔐</div>
            <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0', color: '#1e3a8a' }}>Panel Admin</h1>
          </div>
          {error && <div style={{ background: '#fecaca', color: '#991b1b', padding: '12px', borderRadius: '8px', marginBottom: '1rem', fontSize: '13px' }}>⚠️ {error}</div>}
          <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input type="password" placeholder="Contraseña de Administrador" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} required style={{ padding: '12px', borderRadius: '8px', border: '2px solid #e2e8f0', fontSize: '14px' }} />
            <button type="submit" style={{ padding: '12px', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>Ingresar</button>
          </form>
          <button onClick={() => setView('login')} style={{ width: '100%', marginTop: '1rem', padding: '12px', background: 'transparent', color: '#0070f3', border: '2px solid #0070f3', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>← Volver</button>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isAdmin && view === 'dashboard') {
    const leaderboard = getLeaderboard();
    const currentUserRank = leaderboard.findIndex(u => u.username === currentUser) + 1;
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #f0f9ff, #e0f2fe)', paddingBottom: '2rem' }}>
        <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', color: 'white', padding: '1.5rem', marginBottom: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 4px' }}>⚽ Pronóstico 2026</h1>
              <p style={{ fontSize: '14px', margin: '0', opacity: '0.9' }}>Bienvenido, {currentUser}!</p>
              <p style={{ fontSize: '12px', margin: '4px 0 0', opacity: '0.8' }}>🕐 Hora Mountain Time: {currentMTTime.display}</p>
            </div>
            <button onClick={handleLogout} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>Salir</button>
          </div>
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '2rem' }}>
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderTop: '4px solid #0070f3', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>🏆</div>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px' }}>Tu Posición</p>
              <p style={{ fontSize: '24px', fontWeight: '700', color: '#0070f3', margin: '0' }}>#{currentUserRank}</p>
            </div>
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderTop: '4px solid #10b981', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>⭐</div>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px' }}>Puntuación</p>
              <p style={{ fontSize: '24px', fontWeight: '700', color: '#10b981', margin: '0' }}>{leaderboard.find(u => u.username === currentUser)?.totalPoints || 0}</p>
            </div>
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderTop: '4px solid #f59e0b', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>👥</div>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px' }}>Jugadores</p>
              <p style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b', margin: '0' }}>{users.length}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '8px' }}>
            <button onClick={() => setView('dashboard')} style={{ padding: '10px 16px', background: 'linear-gradient(135deg, #0070f3, #3b82f6)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', whiteSpace: 'nowrap' }}>🏆 Posiciones</button>
            <button onClick={() => setView('predictions')} style={{ padding: '10px 16px', background: 'white', color: '#1e3a8a', border: '2px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', whiteSpace: 'nowrap' }}>⚽ Predicciones</button>
            <button onClick={() => setView('nextMatches')} style={{ padding: '10px 16px', background: 'white', color: '#1e3a8a', border: '2px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', whiteSpace: 'nowrap' }}>📅 Próximos</button>
            <button onClick={() => setView('stats')} style={{ padding: '10px 16px', background: 'white', color: '#1e3a8a', border: '2px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', whiteSpace: 'nowrap' }}>📊 Estadísticas</button>
          </div>
          <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 1rem', color: '#1e3a8a' }}>🏅 Tabla de Posiciones</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {leaderboard.slice(0, 10).map((user, idx) => (
                <div key={user.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: user.username === currentUser ? 'linear-gradient(135deg, #dbeafe, #bfdbfe)' : '#f8fafc', borderRadius: '8px', border: user.username === currentUser ? '2px solid #0070f3' : '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                    <span style={{ fontSize: '16px', fontWeight: '700', minWidth: '24px', color: '#64748b' }}>#{idx + 1}</span>
                    {idx === 0 && <span style={{ fontSize: '18px' }}>🥇</span>}
                    {idx === 1 && <span style={{ fontSize: '18px' }}>🥈</span>}
                    {idx === 2 && <span style={{ fontSize: '18px' }}>🥉</span>}
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e3a8a' }}>{user.username}</span>
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#0070f3', background: 'white', padding: '4px 12px', borderRadius: '20px' }}>⭐ {user.totalPoints} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isAdmin && view === 'stats') {
    const stats = getUserStats(currentUser);
    if (!stats) return null;
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #f0f9ff, #e0f2fe)', paddingBottom: '2rem' }}>
        <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', color: 'white', padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0' }}>📊 Mis Estadísticas</h1>
            <button onClick={() => setView('dashboard')} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>← Volver</button>
          </div>
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '2rem' }}>
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderTop: '4px solid #0070f3', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>🏆</div>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px' }}>Posición</p>
              <p style={{ fontSize: '24px', fontWeight: '700', color: '#0070f3', margin: '0' }}>#{stats.rank}</p>
            </div>
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderTop: '4px solid #10b981', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>⭐</div>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px' }}>Puntos</p>
              <p style={{ fontSize: '24px', fontWeight: '700', color: '#10b981', margin: '0' }}>{stats.totalPoints}</p>
            </div>
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderTop: '4px solid #f59e0b', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>🎯</div>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px' }}>Exactos</p>
              <p style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b', margin: '0' }}>{stats.correctResults}</p>
            </div>
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderTop: '4px solid #ec4899', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>🏅</div>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px' }}>Ganadores</p>
              <p style={{ fontSize: '24px', fontWeight: '700', color: '#ec4899', margin: '0' }}>{stats.correctWinners}</p>
            </div>
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderTop: '4px solid #8b5cf6', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>📈</div>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px' }}>Precisión</p>
              <p style={{ fontSize: '24px', fontWeight: '700', color: '#8b5cf6', margin: '0' }}>{stats.accuracy}%</p>
            </div>
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderTop: '4px solid #06b6d4', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>🎮</div>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px' }}>Partidos</p>
              <p style={{ fontSize: '24px', fontWeight: '700', color: '#06b6d4', margin: '0' }}>{stats.totalMatches}</p>
            </div>
          </div>
          <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 1rem', color: '#1e3a8a' }}>📋 Historial de Predicciones</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {stats.pastPredictions.slice(0, 15).map((pred, idx) => (
                <div key={idx} style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
                  <p style={{ margin: '0 0 6px', fontWeight: '600', color: '#1e3a8a', fontSize: '13px' }}>⚽ {pred.match}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                    <div>
                      <p style={{ margin: '0 0 2px', fontSize: '12px', color: '#64748b' }}>Tu predicción: <span style={{ fontWeight: '600', color: '#0070f3' }}>{pred.prediction}</span></p>
                      <p style={{ margin: '0', fontSize: '12px', color: '#64748b' }}>Resultado: <span style={{ fontWeight: '600', color: '#1e3a8a' }}>{pred.result}</span></p>
                    </div>
                    <span style={{ background: '#d1fae5', color: '#047857', padding: '6px 12px', borderRadius: '6px', fontWeight: '600', fontSize: '13px', whiteSpace: 'nowrap' }}>+{pred.points} pts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isAdmin && view === 'nextMatches') {
    const nextMatches = getNextMatches();
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #f0f9ff, #e0f2fe)', paddingBottom: '2rem' }}>
        <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', color: 'white', padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0' }}>📅 Próximos Partidos</h1>
            <button onClick={() => setView('dashboard')} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>← Volver</button>
          </div>
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {nextMatches.map(match => {
              const homeTeam = teamNames[`${match.id}-home`] || match.home;
              const awayTeam = teamNames[`${match.id}-away`] || match.away;
              const user = users.find(u => u.username === currentUser);
              const prediction = user?.predictions[match.id];
              return (
                <div key={match.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderLeft: '4px solid #0070f3' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: '0', fontWeight: '600' }}>📍 {match.date} • {match.time} MT</p>
                    {!canMakePrediction(match.date, match.time) && <span style={{ fontSize: '11px', background: '#fee2e2', color: '#991b1b', padding: '4px 8px', borderRadius: '4px', fontWeight: '600' }}>🔒 BLOQUEADA</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                    <div style={{ textAlign: 'center', flex: 1 }}>
                      <p style={{ fontSize: '16px', fontWeight: '700', color: '#1e3a8a', margin: '0' }}>{homeTeam}</p>
                    </div>
                    <p style={{ fontSize: '24px', fontWeight: '700', color: '#0070f3', margin: '0' }}>⚽</p>
                    <div style={{ textAlign: 'center', flex: 1 }}>
                      <p style={{ fontSize: '16px', fontWeight: '700', color: '#1e3a8a', margin: '0' }}>{awayTeam}</p>
                    </div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Tu predicción:</span>
                    {prediction ? (
                      <span style={{ fontSize: '14px', fontWeight: '700', color: '#0070f3', background: 'white', padding: '4px 12px', borderRadius: '6px' }}>
                        {prediction.home} - {prediction.away}
                      </span>
                    ) : (
                      <span style={{ fontSize: '12px', color: '#cbd5e1', fontStyle: 'italic' }}>Sin predicción</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #f0f9ff, #e0f2fe)', paddingBottom: '2rem' }}>
        <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', color: 'white', padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0' }}>⚽ Mis Predicciones</h1>
            <button onClick={() => setView('dashboard')} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>← Volver</button>
          </div>
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          {sortedStages.map(stage => (
            <div key={stage} style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 1rem', color: '#1e3a8a', paddingBottom: '8px', borderBottom: '3px solid #0070f3' }}>
                {stage === 'Grupos' && '🏟️ Fase de Grupos'}
                {stage === 'Ronda 32' && '🎯 Ronda de 32'}
                {stage === 'Octavos' && '⚽ Octavos de Final'}
                {stage === 'Cuartos' && '🏅 Cuartos de Final'}
                {stage === 'Semifinal' && '🏆 Semifinales'}
                {stage === 'Tercer lugar' && '🥉 Tercer Lugar'}
                {stage === 'Final' && '👑 Final'}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {groupedMatches[stage].map(match => {
                  const prediction = user?.predictions[match.id];
                  const canEdit = canMakePrediction(match.date, match.time);
                  const homeTeam = teamNames[`${match.id}-home`] || match.home;
                  const awayTeam = teamNames[`${match.id}-away`] || match.away;
                  return (
                    <div key={match.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderLeft: '4px solid ' + (canEdit ? '#0070f3' : '#ef4444') }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <p style={{ fontSize: '12px', color: '#64748b', margin: '0', fontWeight: '600' }}>📍 {match.date} • {match.time} MT</p>
                        {!canEdit && <span style={{ fontSize: '11px', background: '#fee2e2', color: '#991b1b', padding: '4px 8px', borderRadius: '4px', fontWeight: '600' }}>🔒 BLOQUEADA</span>}
                        {canEdit && <span style={{ fontSize: '11px', background: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '4px', fontWeight: '600' }}>✅ ABIERTA</span>}
                      </div>
                      {!canEdit && <p style={{ fontSize: '11px', color: '#dc2626', margin: '0 0 12px', fontWeight: '600' }}>⏰ Predicción cerrada. El partido comienza en breve.</p>}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                        <div style={{ textAlign: 'center', flex: 1 }}>
                          <p style={{ fontSize: '14px', fontWeight: '700', color: '#1e3a8a', margin: '0' }}>{homeTeam}</p>
                        </div>
                        <p style={{ fontSize: '20px', fontWeight: '700', color: '#0070f3', margin: '0' }}>⚽</p>
                        <div style={{ textAlign: 'center', flex: 1 }}>
                          <p style={{ fontSize: '14px', fontWeight: '700', color: '#1e3a8a', margin: '0' }}>{awayTeam}</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', opacity: canEdit ? 1 : 0.6 }}>
                        <input type="number" min="0" max="10" value={prediction?.home !== null && prediction?.home !== undefined ? prediction.home : ''} onChange={(e) => canEdit ? handlePrediction(match.id, e.target.value, prediction?.away || '') : null} disabled={!canEdit} placeholder="0" style={{ width: '60px', padding: '10px', border: '2px solid ' + (canEdit ? '#0070f3' : '#fca5a5'), borderRadius: '8px', fontSize: '16px', textAlign: 'center', fontWeight: '700', backgroundColor: !canEdit ? '#f1f5f9' : 'white', cursor: canEdit ? 'pointer' : 'not-allowed', color: canEdit ? '#000' : '#999' }} />
                        <span style={{ fontSize: '16px', fontWeight: '700', color: '#0070f3' }}>-</span>
                        <input type="number" min="0" max="10" value={prediction?.away !== null && prediction?.away !== undefined ? prediction.away : ''} onChange={(e) => canEdit ? handlePrediction(match.id, prediction?.home || '', e.target.value) : null} disabled={!canEdit} placeholder="0" style={{ width: '60px', padding: '10px', border: '2px solid ' + (canEdit ? '#0070f3' : '#fca5a5'), borderRadius: '8px', fontSize: '16px', textAlign: 'center', fontWeight: '700', backgroundColor: !canEdit ? '#f1f5f9' : 'white', cursor: canEdit ? 'pointer' : 'not-allowed', color: canEdit ? '#000' : '#999' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    );
  }

  if (isAdmin && view === 'adminDashboard') {
    const leaderboard = getLeaderboard();
    const nextMatches = getNextMatches();
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #f0f9ff, #e0f2fe)', paddingBottom: '2rem' }}>
        <div style={{ background: 'linear-gradient(135deg, #065f46 0%, #10b981 100%)', color: 'white', padding: '1.5rem', marginBottom: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0' }}>👨‍💼 Panel de Administrador</h1>
            <button onClick={handleLogout} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>Salir</button>
          </div>
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '2rem', overflowX: 'auto' }}>
            <button onClick={() => setView('adminDashboard')} style={{ padding: '10px 16px', background: 'linear-gradient(135deg, #10b981, #34d399)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>📊 Dashboard</button>
            <button onClick={() => setView('adminMatches')} style={{ padding: '10px 16px', background: 'white', color: '#065f46', border: '2px solid #10b981', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>✏️ Editar Equipos</button>
            <button onClick={() => setView('adminResults')} style={{ padding: '10px 16px', background: 'white', color: '#065f46', border: '2px solid #10b981', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>📝 Resultados</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 1rem', color: '#065f46' }}>📅 Próximos 5 Partidos</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {nextMatches.slice(0, 5).map(match => (
                  <div key={match.id} style={{ padding: '8px', background: '#f0fdf4', borderRadius: '6px', fontSize: '12px', borderLeft: '3px solid #10b981' }}>
                    <p style={{ margin: '0 0 2px', fontWeight: '600', color: '#065f46' }}>{match.home} vs {match.away}</p>
                    <p style={{ margin: '0', color: '#64748b', fontSize: '11px' }}>{match.date} {match.time}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 1rem', color: '#065f46' }}>🏆 Top 5 Jugadores</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {leaderboard.slice(0, 5).map((user, idx) => (
                  <div key={user.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: '#f0fdf4', borderRadius: '6px', fontSize: '12px', borderLeft: '3px solid ' + (idx === 0 ? '#FFD700' : idx === 1 ? '#C0C0C0' : '#CD7F32') }}>
                    <span style={{ fontWeight: '600', color: '#065f46' }}>#{idx + 1} {user.username}</span>
                    <span style={{ fontWeight: '700', color: '#10b981' }}>{user.totalPoints} pts</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 1rem', color: '#065f46' }}>📊 Estadísticas</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: '#f0fdf4', borderRadius: '6px' }}>
                  <span style={{ fontSize: '13px', color: '#64748b' }}>Total Jugadores:</span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#065f46' }}>{users.length}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: '#f0fdf4', borderRadius: '6px' }}>
                  <span style={{ fontSize: '13px', color: '#64748b' }}>Partidos Totales:</span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#065f46' }}>{matches.length}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: '#f0fdf4', borderRadius: '6px' }}>
                  <span style={{ fontSize: '13px', color: '#64748b' }}>Resultados Ingresados:</span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#065f46' }}>{matches.filter(m => m.homeScore !== null).length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isAdmin && (view === 'adminMatches' || view === 'adminResults')) {
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
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #f0f9ff, #e0f2fe)', paddingBottom: '2rem' }}>
        <div style={{ background: 'linear-gradient(135deg, #065f46 0%, #10b981 100%)', color: 'white', padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0' }}>{view === 'adminMatches' ? '✏️ Editar Equipos' : '📝 Ingresar Resultados'}</h1>
            <button onClick={() => setView('adminDashboard')} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>← Volver</button>
          </div>
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          {sortedStages.map(stage => (
            <div key={stage} style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 1rem', color: '#065f46', paddingBottom: '8px', borderBottom: '3px solid #10b981' }}>{stage}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {groupedMatches[stage].map(match => {
                  const homeTeam = teamNames[`${match.id}-home`] || match.home;
                  const awayTeam = teamNames[`${match.id}-away`] || match.away;
                  const hasResult = match.homeScore !== null;
                  return (
                    <div key={match.id} style={{ background: hasResult ? '#dcfce7' : 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderLeft: '4px solid ' + (hasResult ? '#10b981' : '#0070f3') }}>
                      <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 12px', fontWeight: '600' }}>📍 {match.date} • {match.time}</p>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        {view === 'adminMatches' ? (
                          <>
                            <input type="text" value={homeTeam} onChange={(e) => updateTeamName(match.id, 'home', e.target.value)} placeholder="Equipo 1" style={{ flex: 1, padding: '10px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '13px' }} />
                            <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>vs</span>
                            <input type="text" value={awayTeam} onChange={(e) => updateTeamName(match.id, 'away', e.target.value)} placeholder="Equipo 2" style={{ flex: 1, padding: '10px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '13px' }} />
                          </>
                        ) : (
                          <>
                            <span style={{ flex: 1, fontSize: '14px', fontWeight: '600', color: '#065f46' }}>{homeTeam}</span>
                            <input type="number" min="0" max="10" value={match.homeScore !== null ? match.homeScore : ''} onChange={(e) => updateMatchResult(match.id, e.target.value || 0, match.awayScore || 0)} placeholder="0" style={{ width: '50px', padding: '8px', border: '2px solid #10b981', borderRadius: '6px', fontSize: '16px', textAlign: 'center', fontWeight: '700', background: hasResult ? '#dcfce7' : 'white' }} />
                            <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>-</span>
                            <input type="number" min="0" max="10" value={match.awayScore !== null ? match.awayScore : ''} onChange={(e) => updateMatchResult(match.id, match.homeScore || 0, e.target.value || 0)} placeholder="0" style={{ width: '50px', padding: '8px', border: '2px solid #10b981', borderRadius: '6px', fontSize: '16px', textAlign: 'center', fontWeight: '700', background: hasResult ? '#dcfce7' : 'white' }} />
                            <span style={{ flex: 1, textAlign: 'right', fontSize: '14px', fontWeight: '600', color: '#065f46' }}>{awayTeam}</span>
                            {hasResult && <span style={{ fontSize: '13px', color: '#10b981', fontWeight: '700' }}>✓</span>}
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    );
  }
};

export default FIFA2026PoolApp;
