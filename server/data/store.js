// ══════════════════════════════════════════════
//  IN-MEMORY DATA STORE  (replaces MongoDB)
//  Data resets on server restart.
// ══════════════════════════════════════════════

let _id = 1;
const uid = () => String(_id++);

// ── SERVICES ──────────────────────────────────
const services = [
  { id:'s1', icon:'trending-up', title:'SEO Intelligence',  tag:'ORGANIC',      order:1, active:true,
    description:'AI-driven search dominance. We engineer content ecosystems that compound over time.',
    fullDescription:"Search engine dominance isn't luck — it's engineering. We build content ecosystems that compound over time, turning your domain into an authority machine.",
    bullets:['Technical SEO architecture','AI content frameworks','Entity & topical authority','Zero-click optimization'] },
  { id:'s2', icon:'zap',         title:'AI Marketing',      tag:'INTELLIGENCE', order:2, active:true,
    description:'Predictive campaigns powered by machine learning. Every impression is precision-targeted.',
    fullDescription:'Predictive intelligence that anticipates market shifts before they happen. Our AI engine processes 2.4B data points daily to optimize every campaign touchpoint in real time.',
    bullets:['Real-time bid optimization','Predictive audience modeling','Automated creative iteration','Cross-channel attribution'] },
  { id:'s3', icon:'layers',      title:'Brand Engineering', tag:'IDENTITY',     order:3, active:true,
    description:'Identity systems built for the digital age. Not logos — weapons of perception.',
    fullDescription:'In a world of infinite content, perception is the product. We engineer brand systems that create immediate recognition and lasting emotional resonance.',
    bullets:['Brand identity systems','Voice & tone architecture','Visual identity design','Brand activation strategy'] },
  { id:'s4', icon:'globe',       title:'Social Dominance',  tag:'GROWTH',       order:4, active:true,
    description:'Platform-native strategies that build communities and command attention at scale.',
    fullDescription:'Social media is a battlefield. We give you the weapons to win: content systems, community playbooks, and algorithmic amplification.',
    bullets:['Platform content strategy','Community architecture','Influencer network activation','Viral campaign systems'] },
  { id:'s5', icon:'bar-chart',   title:'Paid Media',        tag:'PERFORMANCE',  order:5, active:true,
    description:'Maximum ROAS through algorithmic optimization. We eliminate wasted spend, amplify winners.',
    fullDescription:"Maximum return on every dollar. We've eliminated the guesswork from paid media with algorithmic optimization that identifies winners at machine speed.",
    bullets:['Multi-platform campaign management','Creative testing frameworks','Full-funnel optimization','ROAS maximization algorithms'] },
  { id:'s6', icon:'code',        title:'Web Development',   tag:'TECHNOLOGY',   order:6, active:true,
    description:'Digital experiences engineered to convert. Speed, design, and intelligence combined.',
    fullDescription:'Your website is your best sales rep. We build digital experiences that are fast, beautiful, and engineered to convert at every touchpoint.',
    bullets:['React & Next.js development','Performance optimization','Conversion rate engineering','CMS & headless architecture'] },
];

// ── CASE STUDIES ──────────────────────────────
const cases = [
  { id:'c1', client:'TechVault',      industry:'B2B SaaS',   result:'+340%', metric:'Organic Traffic',    color:'#00D9FF', order:1, featured:true, detail:'From 8K to 35K monthly sessions in 9 months through AI content strategy and technical SEO overhaul.' },
  { id:'c2', client:'Aether Finance', industry:'FinTech',    result:'$180M', metric:'Pipeline Generated', color:'#8B5CF6', order:2, featured:true, detail:'Precision ABM campaigns targeting 500 enterprise accounts. 23% meeting rate, $180M in qualified pipeline.' },
  { id:'c3', client:'Nexus Health',   industry:'HealthTech', result:'4.2M',  metric:'App Downloads',      color:'#FF7A00', order:3, featured:true, detail:'Full-stack launch: brand, web, performance media. Zero to 4.2M downloads in 6 months.' },
];

// ── STATS ─────────────────────────────────────
const stats = [
  { id:'st1', value:500, prefix:'',  suffix:'+', label:'Projects Delivered', decimals:0, order:1 },
  { id:'st2', value:2.4, prefix:'$', suffix:'B', label:'Revenue Generated',  decimals:1, order:2 },
  { id:'st3', value:98,  prefix:'',  suffix:'%', label:'Client Retention',   decimals:0, order:3 },
  { id:'st4', value:12,  prefix:'',  suffix:'+', label:'Years Dominating',   decimals:0, order:4 },
];

// ── CONTACTS (in-memory, resets on restart) ───
let contacts = [];

function addContact(data) {
  const c = { id: uid(), ...data, status:'new', createdAt: new Date().toISOString(), notes:'' };
  contacts.unshift(c);
  return c;
}
function getContacts(statusFilter) {
  return statusFilter ? contacts.filter(c => c.status === statusFilter) : [...contacts];
}
function updateContactById(id, updates) {
  const i = contacts.findIndex(c => c.id === id);
  if (i === -1) return null;
  if (updates.status === 'replied') updates.repliedAt = new Date().toISOString();
  contacts[i] = { ...contacts[i], ...updates };
  return contacts[i];
}
function deleteContactById(id) {
  const before = contacts.length;
  contacts = contacts.filter(c => c.id !== id);
  return contacts.length < before;
}

// ── ADMIN CREDENTIALS ─────────────────────────
const ADMIN = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'nexora2035'
};

module.exports = { services, cases, stats, ADMIN, addContact, getContacts, updateContactById, deleteContactById };
