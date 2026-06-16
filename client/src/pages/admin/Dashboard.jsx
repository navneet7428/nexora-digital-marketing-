import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { fetchDashboard, fetchContacts, updateContact, deleteContact } from '../../utils/api';

const STATUS_COLORS = { new: '#00D9FF', read: '#8B5CF6', replied: '#22c55e', archived: '#6B7A99' };

export default function Dashboard() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('overview');
  const [statusFilter, setStatusFilter] = useState('');

  const { data: dash, loading: dashLoading } = useFetch(fetchDashboard);
  const { data: contactData, loading: contactLoading, refetch } = useFetch(
    () => fetchContacts({ status: statusFilter, limit: 50 }), [statusFilter]
  );

  const handleStatusChange = async (id, status) => {
    await updateContact(id, { status });
    refetch();
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this submission?')) return;
    await deleteContact(id);
    refetch();
  };

  const navStyle = active => ({
    fontFamily: 'var(--mono)', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase',
    padding: '8px 20px', borderRadius: '4px', border: 'none', cursor: 'none',
    background: active ? 'rgba(0,217,255,.15)' : 'transparent',
    color: active ? 'var(--blue)' : 'var(--muted)', transition: 'all .2s'
  });

  return (
    <div style={{ minHeight: '100vh', padding: '100px 60px 60px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
        <div>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>NEXORA CONTROL PANEL</p>
          <h1 style={{ fontFamily: 'var(--heading)', fontSize: '36px', fontWeight: 700, color: '#fff', letterSpacing: '-1px' }}>Welcome, {admin?.username}</h1>
        </div>
        <button onClick={() => { logout(); navigate('/admin/login'); }} className="btn-secondary" style={{ fontSize: '12px', padding: '10px 20px' }}>LOGOUT</button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '40px', background: 'var(--surface)', padding: '6px', borderRadius: '8px', width: 'fit-content', border: '1px solid var(--glass-border)' }}>
        {['overview', 'contacts'].map(t => (
          <button key={t} style={navStyle(tab === t)} onClick={() => setTab(t)}>{t.toUpperCase()}</button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {tab === 'overview' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px', marginBottom: '48px' }}>
            {dashLoading ? Array(4).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: '120px', borderRadius: '12px' }} />) :
              [
                { label: 'Total Submissions', value: dash?.totalContacts ?? 0, color: 'var(--blue)' },
                { label: 'New Leads',          value: dash?.newContacts ?? 0,   color: 'var(--orange)' },
                { label: 'Active Services',    value: dash?.services ?? 0,      color: 'var(--purple)' },
                { label: 'Case Studies',       value: dash?.cases ?? 0,         color: '#22c55e' },
              ].map(item => (
                <div key={item.label} className="glass-card" style={{ padding: '28px' }}>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: '40px', fontWeight: 700, color: item.color, lineHeight: 1, marginBottom: '8px' }}>{item.value}</p>
                  <p style={{ fontFamily: 'var(--body-font)', fontSize: '13px', color: 'var(--muted)' }}>{item.label}</p>
                </div>
              ))
            }
          </div>

          {/* Recent contacts */}
          <div className="glass-card" style={{ padding: '32px' }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--blue)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '24px' }}>RECENT SUBMISSIONS</p>
            {dashLoading ? <div className="skeleton" style={{ height: '200px' }} /> :
              dash?.recentContacts?.map(c => (
                <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--glass-border)' }}>
                  <div>
                    <p style={{ fontFamily: 'var(--body-font)', fontSize: '15px', color: '#fff', marginBottom: '2px' }}>{c.name} — <span style={{ color: 'var(--muted)' }}>{c.company}</span></p>
                    <p style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--muted)' }}>{c.email} · {c.budget || 'No budget'}</p>
                  </div>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: STATUS_COLORS[c.status], letterSpacing: '1px', textTransform: 'uppercase', background: `${STATUS_COLORS[c.status]}15`, padding: '4px 10px', borderRadius: '4px' }}>{c.status}</span>
                </div>
              ))
            }
          </div>
        </div>
      )}

      {/* CONTACTS TAB */}
      {tab === 'contacts' && (
        <div>
          {/* Filter */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {['', 'new', 'read', 'replied', 'archived'].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', padding: '6px 16px', borderRadius: '4px', border: `1px solid ${statusFilter === s ? 'var(--blue)' : 'var(--glass-border)'}`, background: statusFilter === s ? 'rgba(0,217,255,.1)' : 'transparent', color: statusFilter === s ? 'var(--blue)' : 'var(--muted)', cursor: 'none' }}>
                {s || 'ALL'}
              </button>
            ))}
          </div>

          {contactLoading ? <div className="skeleton" style={{ height: '400px', borderRadius: '12px' }} /> :
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {contactData?.contacts?.length === 0 && (
                <p style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--muted)', padding: '40px', textAlign: 'center' }}>No submissions found.</p>
              )}
              {contactData?.contacts?.map(c => (
                <div key={c.id} className="glass-card" style={{ padding: '28px 32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <p style={{ fontFamily: 'var(--heading)', fontSize: '18px', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>{c.name}</p>
                      <p style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--muted)' }}>{c.email} · {c.company} · {c.budget || 'No budget selected'}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <select
                        value={c.status}
                        onChange={e => handleStatusChange(c.id, e.target.value)}
                        style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: STATUS_COLORS[c.status], background: `${STATUS_COLORS[c.status]}15`, border: `1px solid ${STATUS_COLORS[c.status]}40`, borderRadius: '4px', padding: '4px 8px', outline: 'none', cursor: 'pointer' }}
                      >
                        {['new','read','replied','archived'].map(s => <option key={s} value={s} style={{ background: '#080C20', color: '#fff' }}>{s.toUpperCase()}</option>)}
                      </select>
                      <button onClick={() => handleDelete(c.id)}
                        style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: '#ff6666', background: 'rgba(255,68,68,.1)', border: '1px solid rgba(255,68,68,.2)', padding: '4px 10px', borderRadius: '4px', cursor: 'none' }}>
                        DELETE
                      </button>
                    </div>
                  </div>
                  <p style={{ fontFamily: 'var(--body-font)', fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7, borderTop: '1px solid var(--glass-border)', paddingTop: '16px' }}>{c.message}</p>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--muted)', marginTop: '12px', opacity: .6 }}>
                    Submitted: {new Date(c.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          }
        </div>
      )}
    </div>
  );
}
