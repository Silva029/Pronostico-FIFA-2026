import React, { useState, useEffect } from 'react';

const FIFA2026PoolApp = () => {
  const CURRENT_DATE = '2026-06-24'; // Today's date - predictions lock after this
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState('login');
  const [showRegister, setShowRegister] = useState(false);
  const [users, setUsers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [teamNames, setTeamNames] = useState({}); // Store editable team names
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
        setTeamNames(data.teamNames || {});
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
      // ACTUAL GROUP STAGE MATCHES - REMAINING (June 25-27, 2026)
      // GROUP A
      { id: 1, home: 'Argentina', away: 'Peru', group: 'A', stage: 'Grupos', date: '2026-06-25', time: '20:00', homeScore: null, awayScore: null },
      { id: 2, home: 'Canada', away: 'Chile', group: 'A', stage: 'Grupos', date: '2026-06-25', time: '23:00', homeScore: null, awayScore: null },
      { id: 3, home: 'Argentina', away: 'Canada', group: 'A', stage: 'Grupos', date: '2026-06-27', time: '20:00', homeScore: null, awayScore: null },
      { id: 4, home: 'Peru', away: 'Chile', group: 'A', stage: 'Grupos', date: '2026-06-27', time: '23:00', homeScore: null, awayScore: null },
      
      // GROUP B
      { id: 5, home: 'France', away: 'Netherlands', group: 'B', stage: 'Grupos', date: '2026-06-25', time: '14:00', homeScore: null, awayScore: null },
      { id: 6, home: 'England', away: 'Portugal', group: 'B', stage: 'Grupos', date: '2026-06-25', time: '17:00', homeScore: null, awayScore: null },
      { id: 7, home: 'France', away: 'England', group: 'B', stage: 'Grupos', date: '2026-06-27', time: '14:00', homeScore: null, awayScore: null },
      { id: 8, home: 'Netherlands', away: 'Portugal', group: 'B', stage: 'Grupos', date: '2026-06-27', time: '17:00', homeScore: null, awayScore: null },
      
      // GROUP C
      { id: 9, home: 'Brazil', away: 'Colombia', group: 'C', stage: 'Grupos', date: '2026-06-26', time: '20:00', homeScore: null, awayScore: null },
      { id: 10, home: 'Senegal', away: 'Costa Rica', group: 'C', stage: 'Grupos', date: '2026-06-26', time: '23:00', homeScore: null, awayScore: null },
      { id: 11, home: 'Brazil', away: 'Senegal', group: 'C', stage: 'Grupos', date: '2026-06-28', time: '20:00', homeScore: null, awayScore: null },
      { id: 12, home: 'Colombia', away: 'Costa Rica', group: 'C', stage: 'Grupos', date: '2026-06-28', time: '23:00', homeScore: null, awayScore: null },
      
      // GROUP D
      { id: 13, home: 'Spain', away: 'Belgium', group: 'D', stage: 'Grupos', date: '2026-06-26', time: '14:00', homeScore: null, awayScore: null },
      { id: 14, home: 'Germany', away: 'Croatia', group: 'D', stage: 'Grupos', date: '2026-06-26', time: '17:00', homeScore: null, awayScore: null },
      { id: 15, home: 'Spain', away: 'Germany', group: 'D', stage: 'Grupos', date: '2026-06-28', time: '14:00', homeScore: null, awayScore: null },
      { id: 16, home: 'Belgium', away: 'Croatia', group: 'D', stage: 'Grupos', date: '2026-06-28', time: '17:00', homeScore: null, awayScore: null },

      // ROUND OF 16 (July 1-4, 2026)
      { id: 17, home: 'Winner A1', away: 'Runner-up B2', stage: 'Octavos', date: '2026-07-01', time: '16:00', homeScore: null, awayScore: null },
      { id: 18, home: 'Winner B1', away: 'Runner-up A2', stage: 'Octavos', date: '2026-07-01', time: '20:00', homeScore: null, awayScore: null },
      { id: 19, home: 'Winner C1', away: 'Runner-up D2', stage: 'Octavos', date: '2026-07-02', time: '16:00', homeScore: null, awayScore: null },
      { id: 20, home: 'Winner D1', away: 'Runner-up C2', stage: 'Octavos', date: '2026-07-02', time: '20:00', homeScore: null, awayScore: null },
      { id: 21, home: 'Winner E1', away: 'Runner-up F2', stage: 'Octavos', date: '2026-07-03', time: '16:00', homeScore: null, awayScore: null },
      { id: 22, home: 'Winner F1', away: 'Runner-up E2', stage: 'Octavos', date: '2026-07-03', time: '20:00', homeScore: null, awayScore: null },
      { id: 23, home: 'Winner G1', away: 'Runner-up H2', stage: 'Octavos', date: '2026-07-04', time: '16:00', homeScore: null, awayScore: null },
      { id: 24, home: 'Winner H1', away: 'Runner-up G2', stage: 'Octavos', date: '2026-07-04', time: '20:00', homeScore: null, awayScore: null },

      // QUARTERFINALS (July 7-8, 2026)
      { id: 25, home: 'QF1A', away: 'QF1B', stage: 'Cuartos', date: '2026-07-07', time: '16:00', homeScore: null, awayScore: null },
      { id: 26, home: 'QF2A', away: 'QF2B', stage: 'Cuartos', date: '2026-07-07', time: '20:00', homeScore: null, awayScore: null },
      { id: 27, home: 'QF3A', away: 'QF3B', stage: 'Cuartos', date: '2026-07-08', time: '16:00', homeScore: null, awayScore: null },
      { id: 28, home: 'QF4A', away: 'QF4B', stage: 'Cuartos', date: '2026-07-08', time: '20:00', homeScore: null, awayScore: null },

      // SEMIFINALS (July 11-12, 2026)
      { id: 29, home: 'SF1A', away: 'SF1B', stage: 'Semifinal', date: '2026-07-11', time: '20:00', homeScore: null, awayScore: null },
      { id: 30, home: 'SF2A', away: 'SF2B', stage: 'Semifinal', date: '2026-07-12', time: '20:00', homeScore: null, awayScore: null },

      // THIRD PLACE PLAYOFF (July 14, 2026)
      { id: 31, home: 'Loser SF1', away: 'Loser SF2', stage: 'Tercer lugar', date: '2026-07-14', time: '18:00', homeScore: null, awayScore: null },

      // FINAL (July 14, 2026)
      { id: 32, home: 'Winner SF1', away: 'Winner SF2', stage: 'Final', date: '2026-07-14', time: '20:00', homeScore: null, awayScore: null },
    ];
    
    const initialTeamNames = {};
    initialMatches.forEach(match => {
      if (match.home.includes('Winner') || match.home.includes('Runner-up') || match.home.includes('QF') || match.home.includes('SF') || match.home.includes('Loser')) {
        initialTeamNames[`${match.id}-home`] = match.home;
        initialTeamNames[`${match.id}-away`] = match.away;
      }
    });
    
    setMatches(initialMatches);
    setTeamNames(initialTeamNames);
    localStorage.setItem('fifa2026Data', JSON.stringify({ users: [], matches: initialMatches, teamNames: initialTeamNames }));
  };

  const canMakePrediction = (matchDate) => {
    return matchDate > CURRENT_DATE;
  };

  const isMatchStarted = (matchDate) => {
    return matchDate <= CURRENT_DATE;
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
    localStorage.setItem('fifa2026Data', JSON.stringify({ users: updatedUsers, matches, teamNames }));
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
      localStorage.setItem('fifa2026Data', JSON.stringify({ users: updatedUsers, matches, teamNames }));
    }
  };

  const handleTeamNameChange = (matchId, team, newName) => {
    const key = `${matchId}-${team}`;
    const updatedTeamNames = { ...teamNames, [key]: newName };
    setTeamNames(updatedTeamNames);
    localStorage.setItem('fifa2026Data', JSON.stringify({ users, matches, teamNames: updatedTeamNames }));
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

        <div style={{ background: '#fff3cd', padding: '12px', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '13px', color: '#856404' }}>
          ⏰ Puedes hacer predicciones hasta hoy 24/06/2026. Después de esa fecha, solo podrás editar equipo para partidos sin rival confirmado.
        </div>

        {sortedStages.map(stage => (
          <div key={stage} style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 1rem', color: '#1a1a1a', paddingBottom: '8px', borderBottom: '2px solid #0070f3' }}>
              {stage}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {groupedMatches[stage].map(match => {
                const prediction = user?.predictions[match.id];
                const canEdit = canMakePrediction(match.date);
                const matchStarted = isMatchStarted(match.date);
                const homeTeam = teamNames[`${match.id}-home`] || match.home;
                const awayTeam = teamNames[`${match.id}-away`] || match.away;
                const isUnknownTeam = match.home.includes('Winner') || match.home.includes('Runner-up') || match.home.includes('QF') || match.home.includes('SF') || match.home.includes('Loser');

                return (
                  <div key={match.id} style={{ background: matchStarted ? '#f5f5f5' : 'white', border: matchStarted ? '1px solid #ccc' : '1px solid #ddd', borderRadius: '12px', padding: '1rem', opacity: matchStarted ? 0.7 : 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '12px', color: '#666', margin: '0 0 4px' }}>
                          {match.group ? `Grupo ${match.group}` : ''} • {match.date} {match.time}
                        </p>
                        <p style={{ fontSize: '14px', fontWeight: '500', color: '#1a1a1a', margin: '0' }}>
                          {homeTeam} vs {awayTeam}
                        </p>
                      </div>
                      {matchStarted && (
                        <span style={{ fontSize: '11px', background: '#ffcccc', color: '#c41e1e', padding: '4px 8px', borderRadius: '8px', fontWeight: '500' }}>
                          CERRADA
                        </span>
                      )}
                    </div>

                    {/* Team name inputs for unknown teams */}
                    {isUnknownTeam && canEdit && (
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                        <input
                          type="text"
                          value={teamNames[`${match.id}-home`] || ''}
                          onChange={(e) => handleTeamNameChange(match.id, 'home', e.target.value)}
                          placeholder="Equipo 1"
                          style={{ flex: 1, padding: '6px 8px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '12px' }}
                        />
                        <input
                          type="text"
                          value={teamNames[`${match.id}-away`] || ''}
                          onChange={(e) => handleTeamNameChange(match.id, 'away', e.target.value)}
                          placeholder="Equipo 2"
                          style={{ flex: 1, padding: '6px 8px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '12px' }}
                        />
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={prediction?.home !== null && prediction?.home !== undefined ? prediction.home : ''}
                        onChange={(e) => canEdit ? handlePrediction(match.id, e.target.value, prediction?.away || '') : null}
                        disabled={matchStarted}
                        placeholder="0"
                        style={{
                          width: '60px',
                          padding: '8px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '14px',
                          textAlign: 'center',
                          backgroundColor: matchStarted ? '#f0f0f0' : 'white',
                          cursor: matchStarted ? 'not-allowed' : 'pointer',
                          opacity: matchStarted ? 0.6 : 1,
                        }}
                      />
                      <span style={{ fontSize: '12px', color: '#666', fontWeight: '500' }}>-</span>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={prediction?.away !== null && prediction?.away !== undefined ? prediction.away : ''}
                        onChange={(e) => canEdit ? handlePrediction(match.id, prediction?.home || '', e.target.value) : null}
                        disabled={matchStarted}
                        placeholder="0"
                        style={{
                          width: '60px',
                          padding: '8px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '14px',
                          textAlign: 'center',
                          backgroundColor: matchStarted ? '#f0f0f0' : 'white',
                          cursor: matchStarted ? 'not-allowed' : 'pointer',
                          opacity: matchStarted ? 0.6 : 1,
                        }}
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
