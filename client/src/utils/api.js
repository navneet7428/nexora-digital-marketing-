import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('nexora_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401 && window.location.pathname.startsWith('/admin')) {
      localStorage.removeItem('nexora_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(err);
  }
);

// ── STATIC FALLBACK DATA (used when server is unreachable) ──
export const FALLBACK_SERVICES = [
  { id:'s1', icon:'trending-up', title:'SEO Intelligence',  description:'AI-driven search dominance. We engineer content ecosystems that compound over time.', tag:'ORGANIC',      bullets:['Technical SEO architecture','AI content frameworks','Entity & topical authority','Zero-click optimization'], fullDescription:'Search engine dominance isn\'t luck — it\'s engineering. We build content ecosystems that compound over time, turning your domain into an authority machine.' },
  { id:'s2', icon:'zap',         title:'AI Marketing',      description:'Predictive campaigns powered by machine learning. Every impression is precision-targeted.', tag:'INTELLIGENCE', bullets:['Real-time bid optimization','Predictive audience modeling','Automated creative iteration','Cross-channel attribution'], fullDescription:'Predictive intelligence that anticipates market shifts before they happen. Our AI engine processes 2.4B data points daily.' },
  { id:'s3', icon:'layers',      title:'Brand Engineering', description:'Identity systems built for the digital age. Not logos — weapons of perception.', tag:'IDENTITY',     bullets:['Brand identity systems','Voice & tone architecture','Visual identity design','Brand activation strategy'], fullDescription:'In a world of infinite content, perception is the product. We engineer brand systems that create immediate recognition and lasting emotional resonance.' },
  { id:'s4', icon:'globe',       title:'Social Dominance',  description:'Platform-native strategies that build communities and command attention at scale.', tag:'GROWTH',       bullets:['Platform content strategy','Community architecture','Influencer network activation','Viral campaign systems'], fullDescription:'Social media is a battlefield. We give you the weapons to win: content systems, community playbooks, and algorithmic amplification.' },
  { id:'s5', icon:'bar-chart',   title:'Paid Media',        description:'Maximum ROAS through algorithmic optimization. We eliminate wasted spend, amplify winners.', tag:'PERFORMANCE',  bullets:['Multi-platform campaign management','Creative testing frameworks','Full-funnel optimization','ROAS maximization'], fullDescription:'Maximum return on every dollar. Algorithmic optimization identifies winners and eliminates waste at machine speed.' },
  { id:'s6', icon:'code',        title:'Web Development',   description:'Digital experiences engineered to convert. Speed, design, and intelligence combined.', tag:'TECHNOLOGY',   bullets:['React & Next.js development','Performance optimization','Conversion rate engineering','CMS & headless architecture'], fullDescription:'Your website is your best sales rep. We build digital experiences that are fast, beautiful, and engineered to convert at every touchpoint.' },
];

export const FALLBACK_CASES = [
  { id:'c1', client:'TechVault',      industry:'B2B SaaS',   result:'+340%', metric:'Organic Traffic',    color:'#00D9FF', detail:'From 8K to 35K monthly sessions in 9 months through AI content strategy and technical SEO overhaul.' },
  { id:'c2', client:'Aether Finance', industry:'FinTech',    result:'$180M', metric:'Pipeline Generated', color:'#8B5CF6', detail:'Precision ABM campaigns targeting 500 enterprise accounts. 23% meeting rate, $180M in qualified pipeline.' },
  { id:'c3', client:'Nexus Health',   industry:'HealthTech', result:'4.2M',  metric:'App Downloads',      color:'#FF7A00', detail:'Full-stack launch: brand, web, performance media. Zero to 4.2M downloads in 6 months.' },
];

export const FALLBACK_STATS = [
  { id:'st1', value:500, suffix:'+',  label:'Projects Delivered',  decimals:0 },
  { id:'st2', value:2.4, prefix:'$', suffix:'B', label:'Revenue Generated', decimals:1 },
  { id:'st3', value:98,  suffix:'%', label:'Client Retention',     decimals:0 },
  { id:'st4', value:12,  suffix:'+', label:'Years Dominating',     decimals:0 },
];

// ── API CALLS WITH FALLBACK ──
export const fetchServices = () =>
  api.get('/services').then(r => r.data).catch(() => FALLBACK_SERVICES);

export const fetchCases = () =>
  api.get('/cases').then(r => r.data).catch(() => FALLBACK_CASES);

export const fetchStats = () =>
  api.get('/stats').then(r => r.data).catch(() => FALLBACK_STATS);

export const submitContact = (data) =>
  api.post('/contact', data).then(r => r.data);

// Admin (no fallback — must have server)
export const adminLogin     = (creds)     => api.post('/admin/login', creds).then(r => r.data);
export const verifyToken    = ()          => api.get('/admin/verify').then(r => r.data);
export const fetchDashboard = ()          => api.get('/admin/dashboard').then(r => r.data);
export const fetchContacts  = (params)    => api.get('/contact', { params }).then(r => r.data);
export const updateContact  = (id, data)  => api.patch(`/contact/${id}`, data).then(r => r.data);
export const deleteContact  = (id)        => api.delete(`/contact/${id}`).then(r => r.data);
export const createService  = (data)      => api.post('/services', data).then(r => r.data);
export const updateService  = (id, data)  => api.put(`/services/${id}`, data).then(r => r.data);
export const deleteService  = (id)        => api.delete(`/services/${id}`).then(r => r.data);
export const createCase     = (data)      => api.post('/cases', data).then(r => r.data);
export const updateCase     = (id, data)  => api.put(`/cases/${id}`, data).then(r => r.data);
export const deleteCase     = (id)        => api.delete(`/cases/${id}`).then(r => r.data);
export const updateStat     = (id, data)  => api.put(`/stats/${id}`, data).then(r => r.data);

export default api;
