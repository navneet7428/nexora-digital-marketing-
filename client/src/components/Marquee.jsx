const items = ['SEO Intelligence','AI Marketing','Brand Engineering','Social Dominance','Paid Media','Web Development','Data Analytics','Growth Strategy','Content Automation','Conversion Optimization'];
const doubled = [...items, ...items];

export default function Marquee() {
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <span style={{ fontFamily: 'var(--body-font)', fontSize: '13px', fontWeight: 500, color: 'var(--muted)', letterSpacing: '2px', textTransform: 'uppercase', padding: '0 32px', whiteSpace: 'nowrap', flexShrink: 0 }}>
              {item}
            </span>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--blue)', boxShadow: '0 0 8px var(--blue)', flexShrink: 0, display: 'inline-block' }} />
          </span>
        ))}
      </div>
    </div>
  );
}
