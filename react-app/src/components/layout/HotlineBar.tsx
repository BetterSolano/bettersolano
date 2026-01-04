export default function HotlineBar() {
  return (
    <div className="hotline-bar">
      <div className="container">
        <div className="hotline-inner">
          <div className="hotline-items">
            <a href="tel:09274008033" className="hotline-item">
              <i className="bi bi-shield-fill" aria-hidden="true"></i>
              <span>Police: 0927 400 8033</span>
            </a>
            <a href="tel:09162840885" className="hotline-item">
              <i className="bi bi-heart-fill" aria-hidden="true"></i>
              <span>MSWDO: 0916 284 0885</span>
            </a>
            <a href="tel:09360620305" className="hotline-item">
              <i className="bi bi-fire" aria-hidden="true"></i>
              <span>Fire: 0936 062 0305</span>
            </a>
            <a href="tel:0906188086" className="hotline-item">
              <i className="bi bi-building" aria-hidden="true"></i>
              <span>DILG: 0906 188 086</span>
            </a>
            <a href="tel:09263833744" className="hotline-item">
              <i className="bi bi-exclamation-triangle-fill" aria-hidden="true"></i>
              <span>MDRRMO: 0926 383 3744</span>
            </a>
            <a href="tel:09068195569" className="hotline-item">
              <i className="bi bi-truck" aria-hidden="true"></i>
              <span>R2TMC: 0906 819 5569</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
