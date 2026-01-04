'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getServiceDetail } from '@/data/serviceDetailsContent';

interface Props {
    params: { slug: string };
}

export default function ServiceDetailPage({ params }: Props) {
    const service = getServiceDetail(params.slug);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    if (!service) notFound();

    return (
        <>
            {/* Breadcrumbs */}
            <div className="container">
                <nav className="breadcrumbs" aria-label="Breadcrumb">
                    <Link href="/">Home</Link>
                    <span>/</span>
                    <Link href="/services">Services</Link>
                    <span>/</span>
                    <Link href={service.categoryLink}>{service.category}</Link>
                    <span>/</span>
                    <span aria-current="page">{service.title}</span>
                </nav>
            </div>

            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <div className="page-header-content">
                        <span className="page-header-badge">
                            <i className={`bi ${service.badgeIcon}`}></i> {service.badgeText}
                        </span>
                        <h1>{service.fullTitle}</h1>
                        <p className="page-header-desc">{service.description}</p>
                    </div>
                </div>
            </section>

            {/* Quick Stats */}
            <section className="bc-section">
                <div className="container">
                    <div className="quick-stats">
                        {service.quickStats.map((stat, idx) => (
                            <div key={idx} className="stat-card">
                                <i className={`bi ${stat.icon}`}></i>
                                <h4>{stat.label}</h4>
                                <p>{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Step-by-Step Process */}
            <section className="bc-section alt-bg">
                <div className="container">
                    <div className="section-header">
                        <h2><i className="bi bi-list-ol"></i> Step-by-Step Process</h2>
                        <p>Follow these steps to complete this service</p>
                    </div>
                    <div className="process-grid">
                        {service.processSteps.map((step, idx) => (
                            <div key={idx} className={`process-card ${step.isFinal ? 'final' : ''}`}>
                                <div className="step-num">{idx + 1}</div>
                                <h4>{step.title}</h4>
                                <p>{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Requirements & Info */}
            <section className="bc-section">
                <div className="container">
                    <div className="info-grid">
                        <div>
                            {/* Requirements */}
                            <div className="section-header">
                                <h2><i className="bi bi-clipboard-check"></i> Requirements</h2>
                                <p>Documents needed for your application</p>
                            </div>
                            {service.requirements.map((req, idx) => (
                                <div key={idx} className="req-box" style={{ marginBottom: '14px' }}>
                                    <h4><i className={`bi ${req.icon}`}></i> {req.title}</h4>
                                    <ul className="req-list">
                                        {req.items.map((item, itemIdx) => (
                                            <li key={itemIdx}>
                                                <i className="bi bi-check-circle-fill"></i> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}

                            {/* FAQs */}
                            {service.faqs.length > 0 && (
                                <>
                                    <div className="section-header" style={{ marginTop: '20px' }}>
                                        <h2><i className="bi bi-question-circle"></i> Frequently Asked Questions</h2>
                                    </div>
                                    {service.faqs.map((faq, idx) => (
                                        <div key={idx} className={`faq-item ${openFaq === idx ? 'active' : ''}`}>
                                            <div
                                                className="faq-question"
                                                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                            >
                                                <span>{faq.question}</span>
                                                <i className="bi bi-chevron-down"></i>
                                            </div>
                                            <div className="faq-answer">{faq.answer}</div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div>
                            <div className="sidebar-card">
                                <h4><i className="bi bi-building"></i> Office Information</h4>
                                <p><strong>{service.office.name}</strong></p>
                                <p>{service.office.location}</p>
                                <p><i className="bi bi-telephone"></i> {service.office.phone}</p>
                                <p><i className="bi bi-clock"></i> {service.office.hours}</p>
                            </div>

                            {service.relatedServices.length > 0 && (
                                <div className="sidebar-card">
                                    <h4><i className="bi bi-link-45deg"></i> Related Services</h4>
                                    <ul className="req-list">
                                        {service.relatedServices.map((related, idx) => (
                                            <li key={idx}>
                                                <Link href={related.link}>{related.title}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="sidebar-card">
                                <h4><i className="bi bi-info-circle"></i> Need Help?</h4>
                                <p>Contact us for assistance with this service.</p>
                                <Link href="/contact" className="btn btn-primary btn-block">Contact Us</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Inline Styles for Service Detail Page */}
            <style jsx>{`
        .bc-section { padding: 40px 0; }
        .bc-section.alt-bg { background: var(--color-bg-alt, #f8f9fa); }
        .section-header { margin-bottom: 20px; }
        .section-header h2 { font-size: 1.125rem; color: var(--color-text); margin-bottom: 4px; display: flex; align-items: center; gap: 8px; }
        .section-header h2 i { color: var(--color-primary); font-size: 1rem; }
        .section-header p { color: var(--color-text-light); font-size: 0.8125rem; margin: 0; }
        .quick-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 20px; }
        .stat-card { background: white; border: 1px solid rgba(0,0,0,0.06); border-radius: 8px; padding: 12px; text-align: center; }
        .stat-card i { font-size: 1rem; color: var(--color-primary); margin-bottom: 4px; display: block; }
        .stat-card h4 { font-size: 0.625rem; color: var(--color-text-light); margin-bottom: 2px; font-weight: 500; text-transform: uppercase; }
        .stat-card p { font-size: 0.8125rem; font-weight: 600; color: var(--color-text); margin: 0; }
        .process-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .process-card { background: white; border: 1px solid rgba(0,0,0,0.06); border-radius: 8px; padding: 14px; }
        .process-card .step-num { display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; background: var(--color-primary, #0032a0); color: white; font-size: 0.625rem; font-weight: 700; border-radius: 5px; margin-bottom: 8px; }
        .process-card h4 { font-size: 0.8125rem; font-weight: 600; color: var(--color-text); margin-bottom: 4px; }
        .process-card p { font-size: 0.6875rem; color: var(--color-text-light); margin-bottom: 0; line-height: 1.4; }
        .process-card.final .step-num { background: var(--color-success, #28a745); }
        .req-box { background: white; border: 1px solid rgba(0,0,0,0.06); border-radius: 8px; padding: 14px; }
        .req-box h4 { font-size: 0.8125rem; font-weight: 600; color: var(--color-text); margin-bottom: 10px; display: flex; align-items: center; gap: 6px; }
        .req-box h4 i { color: var(--color-primary); }
        .req-list { list-style: none; padding: 0; margin: 0; }
        .req-list li { font-size: 0.75rem; color: var(--color-text); padding: 4px 0; display: flex; align-items: flex-start; gap: 6px; }
        .req-list li i { color: var(--color-primary); font-size: 0.625rem; margin-top: 3px; flex-shrink: 0; }
        .req-list li a { color: var(--color-primary); text-decoration: none; }
        .req-list li a:hover { text-decoration: underline; }
        .faq-item { background: white; border: 1px solid rgba(0,0,0,0.06); border-radius: 8px; margin-bottom: 8px; overflow: hidden; }
        .faq-question { padding: 12px 14px; cursor: pointer; display: flex; align-items: center; justify-content: space-between; font-size: 0.8125rem; font-weight: 600; color: var(--color-text); }
        .faq-question:hover { background: rgba(0,50,160,0.02); }
        .faq-question i { color: var(--color-primary); transition: transform 0.2s; }
        .faq-answer { padding: 0 14px 12px; font-size: 0.75rem; color: var(--color-text-light); display: none; }
        .faq-item.active .faq-answer { display: block; }
        .faq-item.active .faq-question i { transform: rotate(180deg); }
        .info-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 14px; }
        .sidebar-card { background: white; border: 1px solid rgba(0,0,0,0.06); border-radius: 8px; padding: 14px; margin-bottom: 10px; }
        .sidebar-card h4 { font-size: 0.8125rem; font-weight: 600; color: var(--color-text); margin-bottom: 10px; display: flex; align-items: center; gap: 6px; }
        .sidebar-card h4 i { color: var(--color-primary); }
        .sidebar-card p { font-size: 0.75rem; color: var(--color-text-light); margin: 0 0 6px; }
        .sidebar-card .btn.btn-primary { display: block; text-align: center; margin-top: 10px; text-decoration: none; color: white !important; font-weight: 500; padding: 10px 16px; border-radius: 6px; background: var(--color-primary, #0032a0); }
        .sidebar-card .btn.btn-primary:hover { background: var(--color-primary-dark, #001a80); }
        @media (max-width: 992px) { .process-grid { grid-template-columns: repeat(2, 1fr); } .info-grid { grid-template-columns: 1fr; } }
        @media (max-width: 768px) { .quick-stats { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 575px) { .process-grid, .quick-stats { grid-template-columns: 1fr; } }
      `}</style>
        </>
    );
}
