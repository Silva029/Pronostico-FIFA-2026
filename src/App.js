import React, { useState, useEffect } from 'react'; const FIFA2026PoolApp = () => { const [currentUser, setCurrentUser] = useState(null); const [view, setView] = useState('login'); const [users, setUsers] = useState([]); const [matches, setMatches] = useState([]); const [loginForm, setLoginForm] = useState({ username: '', password: '' }); const [registerForm, setRegisterForm] = useState({ username: '', password: '', confirmPassword: '' }); // Initialize app useEffect(() => { const saved = localStorage.getItem('fifa2026Data'); if (saved) { const data = JSON.parse(saved); setUsers(data.users || []); setMatches(data.matches || []); } else { initializeData(); } const loggedIn = localStorage.getItem('currentUser'); if (loggedIn) { setCurrentUser(loggedIn); setView('dashboard'); } }, []); const initializeData = () => { const initialMatches = [ { id: 1, home: 'Argentina', away: 'Morocco', group: 'A', date: '2026-06-12', homeScore: null, awayScore: null }, { id: 2, home: 'France', away: 'Denmark', group: 'A', date: '2026-06-12', homeScore: null, awayScore: null }, { id: 3, home: 'England', away: 'Netherlands', group: 'B', date: '2026-06-13', homeScore: null, awayScore: null }, { id: 4, home: 'Spain', away: 'Germany', group: 'B', date: '2026-06-13', homeScore: null, awayScore: null }, { id: 5, home: 'Brazil', away: 'Serbia', group: 'C', date: '2026-06-14', homeScore: null, awayScore: null }, { id: 6, home: 'Mexico', away: 'Japan', group: 'C', date: '2026-06-14', homeScore: null, awayScore: null }, { id: 7, home: 'Italy', away: 'Uruguay', group: 'D', date: '2026-06-15', homeScore: null, awayScore: null }, { id: 8, home: 'Belgium', away: 'Canada', group: 'D', date: '2026-06-15', homeScore: null, awayScore: null }, ]; setMatches(initialMatches); localStorage.setItem('fifa2026Data', JSON.stringify({ users: [], matches: initialMatches })); }; const handleRegister = (e) => { e.preventDefault(); if (registerForm.password !== registerForm.confirmPassword) { alert('Las contraseñas no coinciden'); return; } if (users.some(u => u.username === registerForm.username)) { alert('El usuario ya existe'); return; } const newUser = { id: Date.now(), username: registerForm.username, password: registerForm.password, predictions: {}, joinDate: new Date().toLocaleDateString('es-ES') }; const updatedUsers = [...users, newUser]; setUsers(updatedUsers); localStorage.setItem('fifa2026Data', JSON.stringify({ users: updatedUsers, matches })); localStorage.setItem('currentUser', registerForm.username); setCurrentUser(registerForm.username); setView('dashboard'); setRegisterForm({ username: '', password: '', confirmPassword: '' }); }; const handleLogin = (e) => { e.preventDefault(); const user = users.find(u => u.username === loginForm.username && u.password === loginForm.password); if (user) { localStorage.setItem('currentUser', loginForm.username); setCurrentUser(loginForm.username); setView('dashboard'); setLoginForm({ username: '', password: '' }); } else { alert('Usuario o contraseña incorrectos'); } }; const handleLogout = () => { localStorage.removeItem('currentUser'); setCurrentUser(null); setView('login'); }; const handlePrediction = (matchId, homeScore, awayScore) => { const user = users.find(u => u.username === currentUser); if (user) { user.predictions[matchId] = { home: parseInt(homeScore), away: parseInt(awayScore) }; const updatedUsers = users.map(u => u.username === currentUser ? user : u); setUsers(updatedUsers); localStorage.setItem('fifa2026Data', JSON.stringify({ users: updatedUsers, matches })); } }; const calculatePoints = (prediction, match) => { if (!prediction || match.homeScore === null) return 0; let points = 0; if (prediction.home === match.homeScore && prediction.away === match.awayScore) { points = 5; } else if ((prediction.home > prediction.away && match.homeScore > match.awayScore) || (prediction.home < prediction.away && match.homeScore < match.awayScore) || (prediction.home === prediction.away && match.homeScore === match.awayScore)) { points = 3; } else if ((prediction.home === match.homeScore) || (prediction.away === match.awayScore)) { points = 1; } return points; }; const getLeaderboard = () => { return users.map(user => { let totalPoints = 0; Object.keys(user.predictions).forEach(matchId => { const match = matches.find(m => m.id === parseInt(matchId)); if (match) { totalPoints += calculatePoints(user.predictions[matchId], match); } }); return { ...user, totalPoints }; }).sort((a, b) => b.totalPoints - a.totalPoints); }; if (view === 'login') { return (
Pronóstico 2026
Predictor de Copa Mundial FIFA

setView('login')} style={{ flex: 1, padding: '10px', background: view === 'login' ? 'var(--color-background-secondary)' : 'transparent', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>Ingresar setView('register')} style={{ flex: 1, padding: '10px', background: view === 'register' ? 'var(--color-background-secondary)' : 'transparent', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>Registrarse
{view === 'login' ? (
{loginForm.username}
 setLoginForm({ ...loginForm, username: e.target.value })} required style={{ padding: '10px 12px', borderRadius: 'var(--border-radius-md)', border: '0.5px solid var(--color-border-tertiary)', fontSize: '14px' }} /> 
••••••••••••••••••••
 setLoginForm({ ...loginForm, password: e.target.value })} required style={{ padding: '10px 12px', borderRadius: 'var(--border-radius-md)', border: '0.5px solid var(--color-border-tertiary)', fontSize: '14px' }} /> Ingresar
) : (
{registerForm.username}
 setRegisterForm({ ...registerForm, username: e.target.value })} required style={{ padding: '10px 12px', borderRadius: 'var(--border-radius-md)', border: '0.5px solid var(--color-border-tertiary)', fontSize: '14px' }} /> 
•••••••••••••••••••••••
 setRegisterForm({ ...registerForm, password: e.target.value })} required style={{ padding: '10px 12px', borderRadius: 'var(--border-radius-md)', border: '0.5px solid var(--color-border-tertiary)', fontSize: '14px' }} /> 
••••••••••••••••••••••••••••••
 setRegisterForm({ ...registerForm, confirmPassword: e.target.value })} required style={{ padding: '10px 12px', borderRadius: 'var(--border-radius-md)', border: '0.5px solid var(--color-border-tertiary)', fontSize: '14px' }} /> Registrarse
)}
); } if (view === 'dashboard') { const leaderboard = getLeaderboard(); const currentUserRank = leaderboard.findIndex(u => u.username === currentUser) + 1; return (
Pronóstico 2026
Bienvenido, {currentUser}

Salir
Tu posición

#{currentUserRank}

Tu puntuación

{leaderboard.find(u => u.username === currentUser)?.totalPoints || 0}

Participantes

{users.length}

setView('predictions')} style={{ padding: '8px 12px', background: view
