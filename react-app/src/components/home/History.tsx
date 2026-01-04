'use client';

interface TimelineItem {
  year: string;
  content: string;
}

const timeline: TimelineItem[] = [
  { year: '1760', content: 'The original name of the town was Bintauan, then a Gaddang settlement.' },
  { year: '1767', content: 'The town was formally founded by Father Alejandro Vidal, a Dominican priest.' },
  { year: '1768', content: 'Named Lungabang, from the Gaddang word for cave, lungab.' },
  { year: '1851', content: 'Governor General Antonio Urbiztondo declared Lumabang a barrio of Bayombong.' },
  { year: '1853', content: 'The first Ilocanos arrived, brought by Don Diego Lumicao.' },
  { year: '1889', content: 'Renamed Solano in honor of Governor General Ramon Solano y Llanderal.' },
  { year: '1957', content: 'The barrios of Ibung and Bintawan were separated to form Villaverde.' },
];

export default function History() {
  return (
    <section className="section history-section">
      <div className="container">
        <div className="home-stats-v2-header">
          <h2><i className="bi bi-book" aria-hidden="true" /> Brief History of Solano</h2>
        </div>
        <div className="history-content">
          <div className="history-timeline">
            {timeline.map((item) => (
              <div key={item.year} className="timeline-item" data-year={item.year}>
                <div className="timeline-marker" />
                <div className="timeline-content">
                  <span className="timeline-year">{item.year}</span>
                  <p>{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
