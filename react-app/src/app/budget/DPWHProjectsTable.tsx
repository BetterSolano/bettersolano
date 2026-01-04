'use client';

import { useState, useMemo } from 'react';

// Import DPWH projects data
const dpwhData = {
    summary: {
        totalProjects: 63,
        totalCost: 409494730.55,
        completedProjects: 60,
        ongoingProjects: 3,
    },
    projects: [
        { id: '17BI0035', name: 'Rehabilitation/Improvement of Curifang Flood Control', location: 'Brgy. Curifang, Solano', category: 'Flood Control and Drainage', contractor: 'Jann-Norris Construction', cost: 43463616.27, status: 100, date: '2018-01-31' },
        { id: '17BI0037', name: 'Rehabilitation/Improvement of Bangar Flood Control', location: 'Brgy. Bangar, Solano', category: 'Flood Control and Drainage', contractor: 'Jann-Norris Construction', cost: 43592806.92, status: 100, date: '2018-02-15' },
        { id: '17BI0036', name: 'Rehabilitation/Improvement of Dadap Flood Control', location: 'Brgy. Dadap, Solano', category: 'Flood Control and Drainage', contractor: 'Jann-Norris Construction', cost: 43374131.72, status: 100, date: '2018-01-29' },
        { id: '18BI0068', name: 'Daang Maharlika Road Widening K0272-K0273', location: 'Solano, Nueva Vizcaya', category: 'Roads', contractor: 'R.O. Builders Corp.', cost: 39750749.86, status: 100, date: '2019-03-25' },
        { id: '18BI0028', name: 'Construction of Multi-Purpose Building (Pasalubong Center)', location: 'Poblacion, Solano', category: 'Buildings', contractor: 'E S De Guzman Construction', cost: 4748316.66, status: 100, date: '2018-08-13' },
        { id: '19BI0028', name: 'Construction of Multi-Purpose Building (Completion)', location: 'Brgy. Quezon, Solano', category: 'Buildings', contractor: 'E S De Guzman Construction', cost: 19800000.00, status: 100, date: '2019-11-21' },
        { id: '16BI0006', name: "Bascaran Nat'l High School", location: 'Solano, Nueva Vizcaya', category: 'Buildings', contractor: 'E S De Guzman Construction', cost: 15913526.14, status: 100, date: '2017-04-23' },
        { id: '16BI0007', name: "Uddiawan Nat'l High School", location: 'Solano, Nueva Vizcaya', category: 'Buildings', contractor: 'BRG Construction', cost: 12808288.53, status: 100, date: '2017-01-28' },
        { id: '17BI0117', name: 'Solano North ES', location: 'Solano, Nueva Vizcaya', category: 'Buildings', contractor: 'Jovic Construction', cost: 2985000.00, status: 100, date: '2018-04-20' },
        { id: '22BI0078', name: 'Concreting of Brgy. Communal FMR', location: 'Brgy. Communal, Solano', category: 'Roads', contractor: 'Dricholiu Construction', cost: 11940000.00, status: 100, date: '2022-11-13' },
        { id: '21BI0004', name: 'Concreting of Wacal-Bangaan Road', location: 'Solano, Nueva Vizcaya', category: 'Roads', contractor: 'Framada Construction', cost: 4949771.92, status: 100, date: '2021-05-28' },
        { id: '21BI0013', name: 'Concreting of Road in Purok 5, Bagahabag', location: 'Brgy. Bagahabag, Solano', category: 'Roads', contractor: 'Q.C.D. Construction', cost: 4950000.00, status: 100, date: '2021-09-11' },
        { id: '23BI0006', name: 'Construction of Solar Water System', location: 'Solano, Nueva Vizcaya', category: 'Water Supply', contractor: 'Mighty Construction', cost: 9800000.00, status: 100, date: '2024-03-08' },
        { id: '23BI0044', name: 'MPB Uddiawan National High School', location: 'Brgy. Uddiawan, Solano', category: 'Buildings', contractor: 'BRG Construction', cost: 5370984.13, status: 59.86, date: null },
        { id: '25BI0058', name: 'Construction of MPB, San Luis', location: 'Brgy. San Luis, Solano', category: 'Buildings', contractor: 'Tamrhey Construction', cost: 5376247.97, status: 50.43, date: null },
        { id: '25BI0071', name: 'Completion of MPB, Uddiawan', location: 'Brgy. Uddiawan, Solano', category: 'Buildings', contractor: 'Tamrhey Construction', cost: 5361050.00, status: 84.66, date: null },
    ],
};

type FilterType = 'all' | 'buildings' | 'roads' | 'flood' | 'water';

export function DPWHProjectsTable() {
    const [filter, setFilter] = useState<FilterType>('all');
    const [showAll, setShowAll] = useState(false);

    const filteredProjects = useMemo(() => {
        if (filter === 'all') return dpwhData.projects;
        return dpwhData.projects.filter(p => {
            if (filter === 'buildings') return p.category.includes('Buildings');
            if (filter === 'roads') return p.category.includes('Roads');
            if (filter === 'flood') return p.category.includes('Flood');
            if (filter === 'water') return p.category.includes('Water');
            return true;
        });
    }, [filter]);

    const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 8);

    const counts = {
        all: dpwhData.projects.length,
        buildings: dpwhData.projects.filter(p => p.category.includes('Buildings')).length,
        roads: dpwhData.projects.filter(p => p.category.includes('Roads')).length,
        flood: dpwhData.projects.filter(p => p.category.includes('Flood')).length,
        water: dpwhData.projects.filter(p => p.category.includes('Water')).length,
    };

    const formatCurrency = (amount: number) =>
        '₱' + amount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return '—';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const getCategoryClass = (category: string) => {
        if (category.includes('Flood')) return 'flood';
        if (category.includes('Roads')) return 'roads';
        if (category.includes('Water')) return 'water';
        return 'buildings';
    };

    const getCategoryLabel = (category: string) => {
        if (category.includes('Flood')) return 'Flood Control';
        if (category.includes('Roads')) return 'Roads';
        if (category.includes('Water')) return 'Water';
        return 'Buildings';
    };

    return (
        <div className="dpwh-section">
            {/* Summary Bar */}
            <div className="dpwh-summary-bar">
                <div className="dpwh-summary-item">
                    <span className="dpwh-summary-value">{dpwhData.summary.totalProjects}</span>
                    <span className="dpwh-summary-label">Projects</span>
                </div>
                <div className="dpwh-summary-item">
                    <span className="dpwh-summary-value">₱{(dpwhData.summary.totalCost / 1000000).toFixed(1)}M</span>
                    <span className="dpwh-summary-label">Total Investment</span>
                </div>
                <div className="dpwh-summary-item">
                    <span className="dpwh-summary-value">{dpwhData.summary.completedProjects}</span>
                    <span className="dpwh-summary-label">Completed</span>
                </div>
                <div className="dpwh-summary-item">
                    <span className="dpwh-summary-value">{dpwhData.summary.ongoingProjects}</span>
                    <span className="dpwh-summary-label">Ongoing</span>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="dpwh-controls">
                <div className="dpwh-filter-group" role="tablist">
                    {(['all', 'buildings', 'roads', 'flood', 'water'] as FilterType[]).map((f) => (
                        <button
                            key={f}
                            className={`dpwh-tab ${filter === f ? 'active' : ''}`}
                            onClick={() => { setFilter(f); setShowAll(false); }}
                            role="tab"
                            aria-selected={filter === f}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                            <span className="dpwh-tab-count">{counts[f]}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Projects Table */}
            <div className="dpwh-table-wrap">
                <table className="dpwh-table" role="table">
                    <thead>
                        <tr>
                            <th scope="col" className="col-desc">Contract Description</th>
                            <th scope="col" className="col-contractor">Contractor</th>
                            <th scope="col" className="col-cost">Cost</th>
                            <th scope="col" className="col-status">Status</th>
                            <th scope="col" className="col-date">Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedProjects.map((p) => (
                            <tr key={p.id} className="dpwh-row">
                                <td className="col-desc">
                                    <div className="dpwh-desc-wrap">
                                        <span className="dpwh-proj-id">{p.id}</span>
                                        <span className={`dpwh-cat-badge ${getCategoryClass(p.category)}`}>
                                            {getCategoryLabel(p.category)}
                                        </span>
                                    </div>
                                    <span className="dpwh-proj-title">{p.name}</span>
                                    <span className="dpwh-proj-location">
                                        <i className="bi bi-geo-alt"></i> {p.location}
                                    </span>
                                </td>
                                <td className="col-contractor">
                                    <span className="dpwh-contractor">{p.contractor}</span>
                                </td>
                                <td className="col-cost">{formatCurrency(p.cost)}</td>
                                <td className="col-status">
                                    {p.status === 100 ? (
                                        <span className="dpwh-badge complete">Completed</span>
                                    ) : (
                                        <span className="dpwh-badge ongoing">{p.status.toFixed(0)}%</span>
                                    )}
                                </td>
                                <td className="col-date">{formatDate(p.date)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Load More */}
            {filteredProjects.length > 8 && !showAll && (
                <div className="dpwh-load-more">
                    <button className="dpwh-load-btn" onClick={() => setShowAll(true)}>
                        Load More <span className="dpwh-remaining">({filteredProjects.length - 8} remaining)</span>
                    </button>
                </div>
            )}
            {showAll && (
                <div className="dpwh-load-more">
                    <span className="dpwh-end-msg">Showing all {filteredProjects.length} projects</span>
                </div>
            )}
        </div>
    );
}
