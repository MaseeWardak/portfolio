export default function DatasheetBanner() {
  return (
    <div className="ds-banner font-mono">
      {/* Inner container aligned with nav's max-w-6xl mx-auto px-6 */}
      <div className="ds-banner-inner">
        {/* Column A — identity */}
        <div className="ds-banner-col">
          <div className="ds-banner-primary">WARDAK, M.</div>
          <div className="ds-banner-secondary">University of Waterloo</div>
        </div>

        {/* Divider */}
        <div className="ds-banner-divider" aria-hidden="true" />

        {/* Column B — classification */}
        <div className="ds-banner-col">
          <div className="ds-banner-primary">ELECTRICAL ENGINEERING STUDENT</div>
          <div className="ds-banner-secondary">Rev.&nbsp;1.0&nbsp;&mdash;&nbsp;2026</div>
        </div>

        {/* Divider */}
        <div className="ds-banner-divider" aria-hidden="true" />

        {/* Column C — document info */}
        <div className="ds-banner-col ds-banner-col--right">
          <div className="ds-banner-primary">
            DOC:&nbsp;<span style={{ color: 'var(--accent)' }}>MW-EE-2026-001</span>
          </div>
          <div className="ds-banner-secondary">
            STATUS:&nbsp;
            <span style={{ color: '#22c55e', letterSpacing: '0.1em' }}>AVAILABLE</span>
          </div>
        </div>
      </div>
    </div>
  )
}
