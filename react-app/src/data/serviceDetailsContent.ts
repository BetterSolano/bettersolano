// Service Details Content Data
// Full content for each service detail page matching original HTML

export interface QuickStat {
    icon: string;
    label: string;
    value: string;
}

export interface ProcessStep {
    title: string;
    description: string;
    isFinal?: boolean;
}

export interface RequirementGroup {
    title: string;
    icon: string;
    items: string[];
}

export interface FAQ {
    question: string;
    answer: string;
}

export interface OfficeInfo {
    name: string;
    location: string;
    phone: string;
    hours: string;
}

export interface RelatedService {
    title: string;
    link: string;
}

export interface ServiceDetail {
    id: string;
    title: string;
    fullTitle: string;
    category: string;
    categoryLink: string;
    badgeText: string;
    badgeIcon: string;
    description: string;
    quickStats: QuickStat[];
    processSteps: ProcessStep[];
    requirements: RequirementGroup[];
    faqs: FAQ[];
    office: OfficeInfo;
    relatedServices: RelatedService[];
}

export const serviceDetailsContent: ServiceDetail[] = [
    {
        id: 'birth-certificate',
        title: 'Birth Certificate',
        fullTitle: 'Birth Certificate (Local Copy)',
        category: 'Certificates',
        categoryLink: '/services/certificates',
        badgeText: 'Certificates',
        badgeIcon: 'bi-file-earmark-text',
        description: 'Official certified copy of birth certificate registered in Solano',
        quickStats: [
            { icon: 'bi-clock', label: 'Processing', value: '15-30 Minutes' },
            { icon: 'bi-cash', label: 'Fee', value: '₱150/copy' },
            { icon: 'bi-person-check', label: 'Who Can Apply', value: 'Owner/Representative' },
            { icon: 'bi-calendar-check', label: 'Appointment', value: 'Walk-in' },
        ],
        processSteps: [
            { title: 'Check Eligibility', description: 'You can request if you are the owner, parent/guardian, or authorized representative with proper authorization letter.' },
            { title: 'Prepare Documents', description: 'Bring valid government-issued ID. If representative: authorization letter and IDs of both owner and representative.' },
            { title: 'Visit Civil Registrar', description: 'Go to the Local Civil Registrar Office at 2nd Floor, Municipal Hall. Office hours: Mon-Fri, 8AM-5PM.' },
            { title: 'Fill Out Request Form', description: 'Complete the request form with full name, date of birth, place of birth, parents\' names, and purpose.' },
            { title: 'Pay the Fee', description: 'Pay ₱150 per certified copy at the Municipal Treasurer\'s Office (same building).' },
            { title: 'Claim Certificate', description: 'Return to Civil Registrar with official receipt. Certificate released within 15-30 minutes if record is available.', isFinal: true },
        ],
        requirements: [
            { title: 'If You Are the Owner', icon: 'bi-person', items: ['Valid government-issued ID (original + photocopy)', 'Payment: ₱150 cash per copy'] },
            { title: 'If You Are a Representative', icon: 'bi-people', items: ['Authorization letter signed by the owner', 'Valid ID of the owner (photocopy)', 'Valid ID of the representative (original + photocopy)', 'Payment: ₱150 cash per copy'] },
        ],
        faqs: [
            { question: 'Can I get a birth certificate registered in another municipality?', answer: 'No. The Solano Civil Registrar only has records for births registered in Solano. For other municipalities, request from that municipality\'s Civil Registrar or from PSA.' },
            { question: 'What if I don\'t know the exact date of birth?', answer: 'Provide an approximate year and month. The staff will help search the records, but this may take longer.' },
            { question: 'Can I request through email or online?', answer: 'Currently, requests must be made in person. Online services are being planned for the future.' },
            { question: 'What\'s the difference between local copy and PSA copy?', answer: 'Both are certified true copies. PSA copies are nationally-recognized and required for passport/visa applications. Local copies are accepted for most local transactions and school enrollment.' },
        ],
        office: { name: 'Local Civil Registrar', location: 'Municipal Hall, 2nd Floor, Solano, Nueva Vizcaya', phone: '(078) 326-5001', hours: 'Mon-Fri: 8AM - 5PM' },
        relatedServices: [
            { title: 'Marriage Certificate', link: '/service-details/marriage-certificate' },
            { title: 'Death Certificate', link: '/service-details/death-certificate' },
            { title: 'Barangay Clearance', link: '/services/certificates' },
        ],
    },
    {
        id: 'marriage-certificate',
        title: 'Marriage Certificate',
        fullTitle: 'Marriage Certificate Registration & Copy',
        category: 'Certificates',
        categoryLink: '/services/certificates',
        badgeText: 'Certificates',
        badgeIcon: 'bi-heart',
        description: 'Register or request certified true copy of marriage certificate',
        quickStats: [
            { icon: 'bi-clock', label: 'Processing', value: '5-10 Minutes' },
            { icon: 'bi-cash', label: 'Fee', value: 'Free (Registration)' },
            { icon: 'bi-person-check', label: 'Who Can Apply', value: 'Spouses/Representative' },
            { icon: 'bi-calendar-check', label: 'Appointment', value: 'Walk-in' },
        ],
        processSteps: [
            { title: 'Gather Documents', description: 'Prepare marriage certificate from solemnizing officer and valid IDs.' },
            { title: 'Visit Civil Registrar', description: 'Go to the Civil Registrar Office, 2nd Floor, Municipal Hall.' },
            { title: 'Submit Documents', description: 'Submit marriage certificate and supporting documents for registration.' },
            { title: 'Verification', description: 'Staff verifies document authenticity and completeness.' },
            { title: 'Registration', description: 'Marriage is officially registered in the civil registry.' },
            { title: 'Claim Certificate', description: 'Receive certified copy of registered marriage certificate.', isFinal: true },
        ],
        requirements: [
            { title: 'For Registration', icon: 'bi-file-text', items: ['Original marriage certificate from solemnizing officer', 'Valid IDs of both spouses', 'Marriage license (if applicable)'] },
            { title: 'For Copy Request', icon: 'bi-files', items: ['Valid ID of spouse or authorized representative', 'Authorization letter (if representative)', 'Payment: ₱150 per copy'] },
        ],
        faqs: [
            { question: 'How soon after the wedding should I register?', answer: 'Within 30 days of the marriage ceremony. Late registration may require additional documents.' },
            { question: 'Can I get a copy if I was married elsewhere?', answer: 'Only marriages registered in Solano are available. Request from the municipality where you were married or from PSA.' },
        ],
        office: { name: 'Local Civil Registrar', location: 'Municipal Hall, 2nd Floor, Solano, Nueva Vizcaya', phone: '(078) 326-5001', hours: 'Mon-Fri: 8AM - 5PM' },
        relatedServices: [
            { title: 'Birth Certificate', link: '/service-details/birth-certificate' },
            { title: 'CENOMAR', link: '/services/certificates' },
        ],
    },
    {
        id: 'death-certificate',
        title: 'Death Certificate',
        fullTitle: 'Death Certificate Registration & Burial Permit',
        category: 'Certificates',
        categoryLink: '/services/certificates',
        badgeText: 'Certificates',
        badgeIcon: 'bi-file-earmark-x',
        description: 'Register death certificate and obtain burial/transfer permit',
        quickStats: [
            { icon: 'bi-clock', label: 'Processing', value: '~1.5 Hours' },
            { icon: 'bi-cash', label: 'Fee', value: '₱50-150' },
            { icon: 'bi-person-check', label: 'Who Can Apply', value: 'Immediate Family' },
            { icon: 'bi-calendar-check', label: 'Appointment', value: 'Walk-in' },
        ],
        processSteps: [
            { title: 'Obtain Medical Certificate', description: 'Get certificate of death from attending physician or hospital.' },
            { title: 'Visit Civil Registrar', description: 'Go to Civil Registrar with death certificate within 48 hours.' },
            { title: 'Complete Registry', description: 'Staff registers death in civil registry.' },
            { title: 'Pay Fees', description: 'Pay registration and burial permit fees at Treasurer\'s Office.' },
            { title: 'Claim Permits', description: 'Receive burial permit and certified death certificate.', isFinal: true },
        ],
        requirements: [
            { title: 'Required Documents', icon: 'bi-file-text', items: ['Certificate of death from physician', 'Valid ID of informant', 'Valid ID of deceased (if available)', 'Payment for burial permit'] },
        ],
        faqs: [
            { question: 'How soon must death be registered?', answer: 'Within 48 hours of death. Late registration requires additional documents and fees.' },
            { question: 'Do I need a burial permit?', answer: 'Yes, burial permit is required before interment in any cemetery.' },
        ],
        office: { name: 'Local Civil Registrar', location: 'Municipal Hall, 2nd Floor, Solano, Nueva Vizcaya', phone: '(078) 326-5001', hours: 'Mon-Fri: 8AM - 5PM' },
        relatedServices: [
            { title: 'Birth Certificate', link: '/service-details/birth-certificate' },
            { title: 'MSWDO Services', link: '/service-details/mswdo-services' },
        ],
    },
    {
        id: 'municipal-civil-registrar',
        title: 'Municipal Civil Registrar',
        fullTitle: 'Municipal Civil Registrar Office',
        category: 'Certificates',
        categoryLink: '/services/certificates',
        badgeText: 'Office',
        badgeIcon: 'bi-building',
        description: 'Birth, death, marriage registration, corrections, and certified copies',
        quickStats: [
            { icon: 'bi-clock', label: 'Office Hours', value: 'Mon-Fri 8AM-5PM' },
            { icon: 'bi-telephone', label: 'Contact', value: '(078) 326-5001' },
            { icon: 'bi-geo-alt', label: 'Location', value: '2nd Floor, Municipal Hall' },
            { icon: 'bi-calendar-check', label: 'Appointment', value: 'Walk-in' },
        ],
        processSteps: [
            { title: 'Identify Service', description: 'Determine what civil registry service you need.' },
            { title: 'Prepare Documents', description: 'Gather all required documents for your transaction.' },
            { title: 'Visit Office', description: 'Go to Civil Registrar, 2nd Floor of Municipal Hall.' },
            { title: 'Submit Application', description: 'Submit documents and pay applicable fees.' },
            { title: 'Claim Documents', description: 'Return to claim processed documents.', isFinal: true },
        ],
        requirements: [
            { title: 'General Requirements', icon: 'bi-file-text', items: ['Valid government-issued ID', 'Accomplished request form', 'Payment of applicable fees'] },
        ],
        faqs: [
            { question: 'What services are offered?', answer: 'Birth, death, marriage registration; certified copies; corrections; late registration; legitimation; and other civil registry services.' },
        ],
        office: { name: 'Local Civil Registrar', location: 'Municipal Hall, 2nd Floor, Solano, Nueva Vizcaya', phone: '(078) 326-5001', hours: 'Mon-Fri: 8AM - 5PM' },
        relatedServices: [
            { title: 'Birth Certificate', link: '/service-details/birth-certificate' },
            { title: 'Marriage Certificate', link: '/service-details/marriage-certificate' },
            { title: 'Death Certificate', link: '/service-details/death-certificate' },
        ],
    },
    {
        id: 'business-permits-licensing',
        title: 'Business Permits & Licensing',
        fullTitle: 'Business Permits & Licensing Office',
        category: 'Business',
        categoryLink: '/services/business',
        badgeText: 'Business',
        badgeIcon: 'bi-shop',
        description: 'Business permits, Mayor\'s clearance, and licensing services',
        quickStats: [
            { icon: 'bi-clock', label: 'Processing', value: '1-3 Days' },
            { icon: 'bi-cash', label: 'Fee', value: 'Varies by Business' },
            { icon: 'bi-person-check', label: 'Who Can Apply', value: 'Business Owner' },
            { icon: 'bi-calendar-check', label: 'Appointment', value: 'Walk-in' },
        ],
        processSteps: [
            { title: 'Secure Barangay Clearance', description: 'Get business clearance from the barangay where your business is located.' },
            { title: 'Prepare Documents', description: 'Gather DTI/SEC registration, lease contract, and other requirements.' },
            { title: 'Submit Application', description: 'Go to BPLO and submit application with required documents.' },
            { title: 'Pay Fees', description: 'Pay business taxes and fees at Treasurer\'s Office.' },
            { title: 'Claim Permit', description: 'Return to BPLO to claim your business permit.', isFinal: true },
        ],
        requirements: [
            { title: 'New Business', icon: 'bi-shop', items: ['DTI/SEC Registration', 'Barangay Business Clearance', 'Contract of Lease or Land Title', 'Fire Safety Certificate', 'Sanitary Permit', 'Valid ID'] },
            { title: 'Renewal', icon: 'bi-arrow-repeat', items: ['Previous Business Permit', 'Community Tax Certificate (Cedula)', 'Barangay Business Clearance', 'Updated Fire Safety Certificate'] },
        ],
        faqs: [
            { question: 'When should I renew my business permit?', answer: 'Before January 20 of each year to avoid penalties.' },
            { question: 'What are the penalties for late renewal?', answer: 'A surcharge of 25% plus 2% interest per month on unpaid taxes.' },
        ],
        office: { name: 'Business Permits & Licensing Office', location: 'Municipal Hall, Ground Floor', phone: '(078) 326-5001', hours: 'Mon-Fri: 8AM - 5PM' },
        relatedServices: [
            { title: 'Municipal Treasurer', link: '/service-details/municipal-treasurer' },
            { title: 'Fire Safety Certificate', link: '/services/business' },
        ],
    },
    {
        id: 'municipal-treasurer',
        title: 'Municipal Treasurer\'s Office',
        fullTitle: 'Municipal Treasurer\'s Office',
        category: 'Taxation',
        categoryLink: '/services/tax-payments',
        badgeText: 'Taxation',
        badgeIcon: 'bi-cash-coin',
        description: 'Tax payments, revenue collection, and tax clearances',
        quickStats: [
            { icon: 'bi-clock', label: 'Processing', value: '15-30 Minutes' },
            { icon: 'bi-cash', label: 'Payment Methods', value: 'Cash/Check' },
            { icon: 'bi-calendar', label: 'Deadline', value: 'Jan 31 (RPT)' },
            { icon: 'bi-percent', label: 'Discount', value: '10% if paid early' },
        ],
        processSteps: [
            { title: 'Get Tax Bill', description: 'Request your tax bill or assessment from the office.' },
            { title: 'Verify Amount', description: 'Check the details and amount due.' },
            { title: 'Make Payment', description: 'Pay at the cashier window.' },
            { title: 'Claim Receipt', description: 'Keep official receipt for your records.', isFinal: true },
        ],
        requirements: [
            { title: 'For Real Property Tax', icon: 'bi-house', items: ['Tax Declaration Number', 'Previous Official Receipt', 'Valid ID'] },
            { title: 'For Business Tax', icon: 'bi-shop', items: ['Business Permit', 'Assessment from BPLO', 'Valid ID'] },
        ],
        faqs: [
            { question: 'Is there a discount for early payment?', answer: 'Yes, 10% discount for RPT paid in full before January 31.' },
            { question: 'Can I pay quarterly?', answer: 'Yes, RPT can be paid quarterly without discount.' },
        ],
        office: { name: 'Municipal Treasurer\'s Office', location: 'Municipal Hall, Ground Floor', phone: '(078) 326-5001', hours: 'Mon-Fri: 8AM - 5PM' },
        relatedServices: [
            { title: 'Property Declaration', link: '/service-details/property-declaration' },
            { title: 'Municipal Assessor', link: '/service-details/municipal-assessor' },
        ],
    },
    {
        id: 'municipal-assessor',
        title: 'Municipal Assessor\'s Office',
        fullTitle: 'Municipal Assessor\'s Office',
        category: 'Taxation',
        categoryLink: '/services/tax-payments',
        badgeText: 'Taxation',
        badgeIcon: 'bi-house-door',
        description: 'Property assessment, tax declarations, and land records',
        quickStats: [
            { icon: 'bi-clock', label: 'Processing', value: '1-5 Days' },
            { icon: 'bi-file-text', label: 'Records', value: 'Property Info' },
            { icon: 'bi-geo-alt', label: 'Location', value: 'Ground Floor' },
            { icon: 'bi-calendar-check', label: 'Appointment', value: 'Walk-in' },
        ],
        processSteps: [
            { title: 'Identify Transaction', description: 'Determine if you need transfer, update, or new declaration.' },
            { title: 'Submit Documents', description: 'Submit deed of sale, title, or other supporting documents.' },
            { title: 'Pay Fees', description: 'Pay transfer tax and processing fees.' },
            { title: 'Wait for Processing', description: 'Allow 1-5 days for assessment and approval.' },
            { title: 'Claim Declaration', description: 'Return to claim new tax declaration.', isFinal: true },
        ],
        requirements: [
            { title: 'For Transfer', icon: 'bi-arrow-left-right', items: ['Deed of Absolute Sale', 'Transfer Certificate of Title', 'Tax Clearance', 'Previous Tax Declaration', 'Valid IDs'] },
        ],
        faqs: [
            { question: 'How long is a tax declaration valid?', answer: 'Until the property is transferred or there are changes requiring reassessment.' },
        ],
        office: { name: 'Municipal Assessor\'s Office', location: 'Municipal Hall, Ground Floor', phone: '(078) 326-5001', hours: 'Mon-Fri: 8AM - 5PM' },
        relatedServices: [
            { title: 'Municipal Treasurer', link: '/service-details/municipal-treasurer' },
            { title: 'Property Declaration', link: '/service-details/property-declaration' },
        ],
    },
    {
        id: 'property-declaration',
        title: 'Property Declaration',
        fullTitle: 'Tax Declaration & Property Records',
        category: 'Taxation',
        categoryLink: '/services/tax-payments',
        badgeText: 'Taxation',
        badgeIcon: 'bi-file-text',
        description: 'Transfer or update of property tax declaration',
        quickStats: [
            { icon: 'bi-clock', label: 'Processing', value: '1-3 Days' },
            { icon: 'bi-cash', label: 'Fee', value: '₱50-100' },
            { icon: 'bi-geo-alt', label: 'Location', value: 'Assessor\'s Office' },
            { icon: 'bi-calendar-check', label: 'Appointment', value: 'Walk-in' },
        ],
        processSteps: [
            { title: 'Gather Documents', description: 'Prepare deed of sale, title, and previous tax declaration.' },
            { title: 'Submit to Assessor', description: 'Submit documents at the Municipal Assessor\'s Office.' },
            { title: 'Pay Transfer Tax', description: 'Pay at Treasurer\'s Office.' },
            { title: 'Claim New Declaration', description: 'Return to claim updated tax declaration.', isFinal: true },
        ],
        requirements: [
            { title: 'Required Documents', icon: 'bi-file-text', items: ['Notarized Deed of Sale', 'Transfer Certificate of Title', 'Tax Clearance', 'Valid IDs of buyer and seller'] },
        ],
        faqs: [
            { question: 'What is the transfer tax rate?', answer: 'Usually 0.5% to 0.75% of the selling price or zonal value, whichever is higher.' },
        ],
        office: { name: 'Municipal Assessor\'s Office', location: 'Municipal Hall, Ground Floor', phone: '(078) 326-5001', hours: 'Mon-Fri: 8AM - 5PM' },
        relatedServices: [
            { title: 'Municipal Assessor', link: '/service-details/municipal-assessor' },
            { title: 'Municipal Treasurer', link: '/service-details/municipal-treasurer' },
        ],
    },
    {
        id: 'tricycle-franchising',
        title: 'Tricycle Franchising',
        fullTitle: 'Tricycle Franchise Application',
        category: 'Business',
        categoryLink: '/services/business',
        badgeText: 'Business',
        badgeIcon: 'bi-bicycle',
        description: 'Application for tricycle-for-hire franchise',
        quickStats: [
            { icon: 'bi-clock', label: 'Processing', value: '3-5 Days' },
            { icon: 'bi-cash', label: 'Fee', value: '₱500' },
            { icon: 'bi-person-check', label: 'Who Can Apply', value: 'Owner/Operator' },
            { icon: 'bi-calendar-check', label: 'Appointment', value: 'Walk-in' },
        ],
        processSteps: [
            { title: 'Prepare Requirements', description: 'Gather vehicle registration, driver\'s license, and barangay clearance.' },
            { title: 'Submit Application', description: 'File application at the Municipal Traffic Office.' },
            { title: 'Vehicle Inspection', description: 'Have your tricycle inspected for safety compliance.' },
            { title: 'Pay Fees', description: 'Pay franchise fee at Treasurer\'s Office.' },
            { title: 'Claim Franchise', description: 'Return to claim franchise certificate.', isFinal: true },
        ],
        requirements: [
            { title: 'Required Documents', icon: 'bi-file-text', items: ['OR/CR of tricycle motorcycle', 'Valid driver\'s license', 'Barangay clearance', 'Police clearance', 'NBI clearance', '2x2 ID pictures'] },
        ],
        faqs: [
            { question: 'How long is the franchise valid?', answer: 'Usually 3 years, subject to annual renewal of registration.' },
        ],
        office: { name: 'Municipal Traffic Office', location: 'Municipal Hall', phone: '(078) 326-5001', hours: 'Mon-Fri: 8AM - 5PM' },
        relatedServices: [
            { title: 'Business Permits', link: '/service-details/business-permits-licensing' },
        ],
    },
    {
        id: 'mswdo-services',
        title: 'MSWDO Services',
        fullTitle: 'Municipal Social Welfare & Development Office',
        category: 'Social Services',
        categoryLink: '/services/social-services',
        badgeText: 'Social Services',
        badgeIcon: 'bi-people',
        description: 'Social welfare programs, IDs, and financial assistance',
        quickStats: [
            { icon: 'bi-clock', label: 'Processing', value: 'Varies' },
            { icon: 'bi-cash', label: 'Fee', value: 'Free' },
            { icon: 'bi-telephone', label: 'Hotline', value: '0916 284 0885' },
            { icon: 'bi-calendar-check', label: 'Appointment', value: 'Walk-in' },
        ],
        processSteps: [
            { title: 'Identify Program', description: 'Determine which social welfare program you need.' },
            { title: 'Prepare Documents', description: 'Gather required documents for the specific program.' },
            { title: 'Visit MSWDO', description: 'Go to MSWDO office at the Municipal Hall.' },
            { title: 'Submit Application', description: 'Submit application and documents for assessment.' },
            { title: 'Receive Assistance', description: 'If approved, receive the corresponding benefit or service.', isFinal: true },
        ],
        requirements: [
            { title: 'For Senior Citizen ID', icon: 'bi-person-vcard', items: ['Proof of age (birth certificate or valid ID)', 'Barangay certification', '1x1 ID picture'] },
            { title: 'For PWD ID', icon: 'bi-universal-access', items: ['Medical certificate of disability', 'Barangay certification', '1x1 ID picture'] },
            { title: 'For Financial Assistance', icon: 'bi-wallet2', items: ['Barangay certification of indigency', 'Valid ID', 'Case study/assessment by MSWDO'] },
        ],
        faqs: [
            { question: 'What assistance programs are available?', answer: 'Senior Citizen ID, PWD ID, Solo Parent ID, financial assistance, burial assistance, medical assistance, educational assistance, and various social welfare programs.' },
            { question: 'Who can apply for financial assistance?', answer: 'Indigent families and individuals in crisis situations.' },
        ],
        office: { name: 'MSWDO', location: 'Municipal Hall, Ground Floor', phone: '0916 284 0885', hours: 'Mon-Fri: 8AM - 5PM' },
        relatedServices: [
            { title: 'Senior Citizen Services', link: '/services/social-services' },
            { title: 'PWD Services', link: '/services/social-services' },
        ],
    },
    {
        id: 'mswdo',
        title: 'MSWDO',
        fullTitle: 'Municipal Social Welfare & Development Office',
        category: 'Social Services',
        categoryLink: '/services/social-services',
        badgeText: 'Office',
        badgeIcon: 'bi-building',
        description: 'Social welfare programs and community development',
        quickStats: [
            { icon: 'bi-clock', label: 'Office Hours', value: 'Mon-Fri 8AM-5PM' },
            { icon: 'bi-telephone', label: 'Hotline', value: '0916 284 0885' },
            { icon: 'bi-geo-alt', label: 'Location', value: 'Ground Floor' },
            { icon: 'bi-cash', label: 'Services', value: 'Free' },
        ],
        processSteps: [
            { title: 'Visit Office', description: 'Go to MSWDO at Municipal Hall ground floor.' },
            { title: 'State Your Concern', description: 'Inform staff of the assistance or service you need.' },
            { title: 'Assessment', description: 'MSWDO staff will assess your situation.' },
            { title: 'Receive Assistance', description: 'Get appropriate assistance based on assessment.', isFinal: true },
        ],
        requirements: [
            { title: 'General Requirements', icon: 'bi-file-text', items: ['Valid ID', 'Barangay certification', 'Supporting documents based on program'] },
        ],
        faqs: [
            { question: 'What are the office hours?', answer: 'Monday to Friday, 8:00 AM to 5:00 PM.' },
        ],
        office: { name: 'MSWDO', location: 'Municipal Hall, Ground Floor', phone: '0916 284 0885', hours: 'Mon-Fri: 8AM - 5PM' },
        relatedServices: [
            { title: 'MSWDO Services', link: '/service-details/mswdo-services' },
        ],
    },
    {
        id: 'municipal-agriculture',
        title: 'Municipal Agriculture Office',
        fullTitle: 'Municipal Agriculture Office (MAGRO)',
        category: 'Agriculture',
        categoryLink: '/services/agriculture',
        badgeText: 'Agriculture',
        badgeIcon: 'bi-tree',
        description: 'Agricultural programs, farmer registration, and assistance',
        quickStats: [
            { icon: 'bi-clock', label: 'Office Hours', value: 'Mon-Fri 8AM-5PM' },
            { icon: 'bi-telephone', label: 'Contact', value: '(078) 326-5001' },
            { icon: 'bi-geo-alt', label: 'Location', value: 'Municipal Hall' },
            { icon: 'bi-cash', label: 'Programs', value: 'Free/Subsidized' },
        ],
        processSteps: [
            { title: 'Visit MAGRO', description: 'Go to Municipal Agriculture Office at Municipal Hall.' },
            { title: 'Farmer Registration', description: 'Register under RSBSA if not yet registered.' },
            { title: 'Identify Program', description: 'Inquire about available programs and assistance.' },
            { title: 'Submit Requirements', description: 'Submit documents for the program you are applying for.' },
            { title: 'Receive Assistance', description: 'Get subsidized inputs, training, or other assistance.', isFinal: true },
        ],
        requirements: [
            { title: 'For RSBSA Registration', icon: 'bi-card-list', items: ['Valid ID', 'Barangay certification of farmer status', 'Proof of land ownership or tenant agreement', '1x1 ID picture'] },
        ],
        faqs: [
            { question: 'What is RSBSA?', answer: 'Registry System for Basic Sectors in Agriculture - a prerequisite for accessing government agricultural programs.' },
            { question: 'What assistance is available?', answer: 'Fertilizer subsidy, seeds distribution, livestock dispersal, crop insurance, and technical training.' },
        ],
        office: { name: 'Municipal Agriculture Office', location: 'Municipal Hall', phone: '(078) 326-5001', hours: 'Mon-Fri: 8AM - 5PM' },
        relatedServices: [
            { title: 'Fertilizer Assistance', link: '/services/agriculture' },
            { title: 'Crop Insurance', link: '/services/agriculture' },
        ],
    },
    {
        id: 'municipal-engineering',
        title: 'Municipal Engineering Office',
        fullTitle: 'Municipal Engineering Office',
        category: 'Infrastructure',
        categoryLink: '/services/infrastructure',
        badgeText: 'Infrastructure',
        badgeIcon: 'bi-building-gear',
        description: 'Building permits, construction, and infrastructure projects',
        quickStats: [
            { icon: 'bi-clock', label: 'Processing', value: '5-10 Days' },
            { icon: 'bi-cash', label: 'Fee', value: 'Varies' },
            { icon: 'bi-geo-alt', label: 'Location', value: 'Municipal Hall' },
            { icon: 'bi-calendar-check', label: 'Appointment', value: 'Walk-in' },
        ],
        processSteps: [
            { title: 'Secure Zoning Clearance', description: 'Get zoning clearance from Planning Office.' },
            { title: 'Prepare Plans', description: 'Prepare building plans signed by licensed engineer/architect.' },
            { title: 'Submit Application', description: 'File building permit application with requirements.' },
            { title: 'Site Inspection', description: 'Municipal engineer conducts site inspection.' },
            { title: 'Pay Fees', description: 'Pay permit fees at Treasurer\'s Office.' },
            { title: 'Claim Permit', description: 'Return to Engineering to claim building permit.', isFinal: true },
        ],
        requirements: [
            { title: 'Building Permit', icon: 'bi-building', items: ['Zoning clearance', 'Building plans (5 sets) signed by licensed professional', 'Land title or deed of sale', 'Barangay clearance', 'Fire safety evaluation clearance', 'Structural analysis (for 2+ storeys)'] },
        ],
        faqs: [
            { question: 'How long is a building permit valid?', answer: 'Usually 1 year, extendable upon request.' },
            { question: 'Do I need a permit for renovations?', answer: 'Yes, any structural modification requires a building permit.' },
        ],
        office: { name: 'Municipal Engineering Office', location: 'Municipal Hall', phone: '(078) 326-5001', hours: 'Mon-Fri: 8AM - 5PM' },
        relatedServices: [
            { title: 'Municipal Planning', link: '/service-details/municipal-planning' },
            { title: 'Fire Safety Certificate', link: '/services/infrastructure' },
        ],
    },
    {
        id: 'municipal-planning',
        title: 'Municipal Planning & Development',
        fullTitle: 'Municipal Planning & Development Office',
        category: 'Infrastructure',
        categoryLink: '/services/infrastructure',
        badgeText: 'Infrastructure',
        badgeIcon: 'bi-clipboard-data',
        description: 'Zoning, land use, and development planning',
        quickStats: [
            { icon: 'bi-clock', label: 'Processing', value: '3-5 Days' },
            { icon: 'bi-cash', label: 'Fee', value: '₱100-500' },
            { icon: 'bi-geo-alt', label: 'Location', value: 'Municipal Hall' },
            { icon: 'bi-calendar-check', label: 'Appointment', value: 'Walk-in' },
        ],
        processSteps: [
            { title: 'Submit Request', description: 'File zoning clearance request with location details.' },
            { title: 'Document Review', description: 'Planning office reviews land use compatibility.' },
            { title: 'Site Verification', description: 'Staff may conduct site visit if needed.' },
            { title: 'Pay Fees', description: 'Pay at Treasurer\'s Office.' },
            { title: 'Claim Clearance', description: 'Return to claim zoning clearance.', isFinal: true },
        ],
        requirements: [
            { title: 'Zoning Clearance', icon: 'bi-map', items: ['Tax declaration of property', 'Lot plan or sketch of location', 'Valid ID of applicant', 'Purpose of application'] },
        ],
        faqs: [
            { question: 'What is zoning clearance?', answer: 'A document certifying that your proposed use of the property is compatible with the zonal classification.' },
        ],
        office: { name: 'Municipal Planning & Development Office', location: 'Municipal Hall', phone: '(078) 326-5001', hours: 'Mon-Fri: 8AM - 5PM' },
        relatedServices: [
            { title: 'Municipal Engineering', link: '/service-details/municipal-engineering' },
        ],
    },
    {
        id: 'municipal-budget',
        title: 'Municipal Budget Office',
        fullTitle: 'Municipal Budget Office',
        category: 'Budget',
        categoryLink: '/budget',
        badgeText: 'Budget',
        badgeIcon: 'bi-wallet2',
        description: 'Budget preparation, appropriation, and financial management',
        quickStats: [
            { icon: 'bi-clock', label: 'Office Hours', value: 'Mon-Fri 8AM-5PM' },
            { icon: 'bi-telephone', label: 'Contact', value: '(078) 326-5001' },
            { icon: 'bi-geo-alt', label: 'Location', value: 'Municipal Hall' },
            { icon: 'bi-file-text', label: 'Reports', value: 'Public Access' },
        ],
        processSteps: [
            { title: 'Public Inquiry', description: 'For budget-related inquiries, visit the Budget Office.' },
            { title: 'Submit Request', description: 'Submit written request for specific budget information.' },
            { title: 'Processing', description: 'Office processes request and prepares information.' },
            { title: 'Receive Information', description: 'Receive requested budget documents.', isFinal: true },
        ],
        requirements: [
            { title: 'For Information Request', icon: 'bi-info-circle', items: ['Written request letter', 'Valid ID', 'Purpose of request'] },
        ],
        faqs: [
            { question: 'Is budget information available to the public?', answer: 'Yes, municipal budget documents are public records accessible under the Freedom of Information.' },
        ],
        office: { name: 'Municipal Budget Office', location: 'Municipal Hall', phone: '(078) 326-5001', hours: 'Mon-Fri: 8AM - 5PM' },
        relatedServices: [
            { title: 'Municipal Accounting', link: '/service-details/municipal-accounting' },
            { title: 'Budget Transparency', link: '/budget' },
        ],
    },
    {
        id: 'municipal-accounting',
        title: 'Municipal Accounting Office',
        fullTitle: 'Municipal Accounting Office',
        category: 'Budget',
        categoryLink: '/budget',
        badgeText: 'Budget',
        badgeIcon: 'bi-calculator',
        description: 'Financial transactions, payroll, and accounting records',
        quickStats: [
            { icon: 'bi-clock', label: 'Office Hours', value: 'Mon-Fri 8AM-5PM' },
            { icon: 'bi-telephone', label: 'Contact', value: '(078) 326-5001' },
            { icon: 'bi-geo-alt', label: 'Location', value: 'Municipal Hall' },
            { icon: 'bi-file-text', label: 'Records', value: 'Financial' },
        ],
        processSteps: [
            { title: 'Identify Transaction', description: 'Determine what accounting service you need.' },
            { title: 'Submit Documents', description: 'Submit required documents for processing.' },
            { title: 'Verification', description: 'Accounting staff verifies and processes documents.' },
            { title: 'Completion', description: 'Receive processed documents or certificates.', isFinal: true },
        ],
        requirements: [
            { title: 'General Requirements', icon: 'bi-file-text', items: ['Official request letter', 'Supporting documents', 'Valid ID'] },
        ],
        faqs: [
            { question: 'What services are offered?', answer: 'Financial statement verification, supplier payment processing, payroll services for LGU employees.' },
        ],
        office: { name: 'Municipal Accounting Office', location: 'Municipal Hall', phone: '(078) 326-5001', hours: 'Mon-Fri: 8AM - 5PM' },
        relatedServices: [
            { title: 'Municipal Budget', link: '/service-details/municipal-budget' },
            { title: 'Municipal Treasurer', link: '/service-details/municipal-treasurer' },
        ],
    },
    {
        id: 'human-resource-management',
        title: 'Human Resource Management',
        fullTitle: 'Human Resource Management Office',
        category: 'Certificates',
        categoryLink: '/services/certificates',
        badgeText: 'HR',
        badgeIcon: 'bi-people',
        description: 'Service records, employment certificates, and HR services for LGU employees',
        quickStats: [
            { icon: 'bi-clock', label: 'Processing', value: '1-3 Days' },
            { icon: 'bi-cash', label: 'Fee', value: 'Free (employees)' },
            { icon: 'bi-person-check', label: 'For', value: 'LGU Employees' },
            { icon: 'bi-calendar-check', label: 'Appointment', value: 'Walk-in' },
        ],
        processSteps: [
            { title: 'Submit Request', description: 'File request for the service record or certificate you need.' },
            { title: 'Verification', description: 'HRMO verifies employment records.' },
            { title: 'Processing', description: 'Staff prepares the requested document.' },
            { title: 'Claim Document', description: 'Return to claim service record or certificate.', isFinal: true },
        ],
        requirements: [
            { title: 'For Service Record', icon: 'bi-file-text', items: ['Request form', 'Valid ID', 'Previous service record (if available)'] },
        ],
        faqs: [
            { question: 'Who can request service records?', answer: 'Current and former LGU employees for their own records.' },
        ],
        office: { name: 'HRMO', location: 'Municipal Hall', phone: '(078) 326-5001', hours: 'Mon-Fri: 8AM - 5PM' },
        relatedServices: [
            { title: 'Employment Certification', link: '/services/certificates' },
        ],
    },
    {
        id: 'seedo-public-market',
        title: 'SEEDO Public Market',
        fullTitle: 'SEEDO Public Market Services',
        category: 'Economy',
        categoryLink: '/services/business',
        badgeText: 'Economy',
        badgeIcon: 'bi-shop',
        description: 'Market stall rentals and public market services',
        quickStats: [
            { icon: 'bi-clock', label: 'Market Hours', value: '5AM-6PM' },
            { icon: 'bi-telephone', label: 'Contact', value: '(078) 326-5001' },
            { icon: 'bi-geo-alt', label: 'Location', value: 'Solano Public Market' },
            { icon: 'bi-cash', label: 'Stall Rental', value: 'Varies' },
        ],
        processSteps: [
            { title: 'Inquire Availability', description: 'Check available market stalls at SEEDO office.' },
            { title: 'Submit Application', description: 'File stall rental application.' },
            { title: 'Pay Rental', description: 'Pay rental fees at Treasurer\'s Office.' },
            { title: 'Claim Contract', description: 'Receive stall assignment and contract.', isFinal: true },
        ],
        requirements: [
            { title: 'Stall Application', icon: 'bi-file-text', items: ['Valid ID', 'Barangay clearance', 'Business name (if applicable)', 'Payment of rental fees'] },
        ],
        faqs: [
            { question: 'How are stalls assigned?', answer: 'Based on availability and first-come-first-served basis.' },
        ],
        office: { name: 'SEEDO Office', location: 'Solano Public Market', phone: '(078) 326-5001', hours: 'Mon-Fri: 8AM - 5PM' },
        relatedServices: [
            { title: 'Business Permits', link: '/service-details/business-permits-licensing' },
        ],
    },
    {
        id: 'seedo-slaughterhouse',
        title: 'SEEDO Slaughterhouse',
        fullTitle: 'SEEDO Slaughterhouse Services',
        category: 'Economy',
        categoryLink: '/services/business',
        badgeText: 'Economy',
        badgeIcon: 'bi-building',
        description: 'Livestock slaughtering and meat inspection services',
        quickStats: [
            { icon: 'bi-clock', label: 'Hours', value: '4AM-8AM' },
            { icon: 'bi-telephone', label: 'Contact', value: '(078) 326-5001' },
            { icon: 'bi-geo-alt', label: 'Location', value: 'Solano Slaughterhouse' },
            { icon: 'bi-cash', label: 'Fee', value: 'Per head' },
        ],
        processSteps: [
            { title: 'Bring Livestock', description: 'Transport livestock to the slaughterhouse.' },
            { title: 'Ante-mortem Inspection', description: 'Veterinarian inspects animals before slaughter.' },
            { title: 'Slaughter Process', description: 'Animals are slaughtered following proper procedures.' },
            { title: 'Post-mortem Inspection', description: 'Meat is inspected and stamped for safety.' },
            { title: 'Claim Meat', description: 'Collect inspected and stamped meat products.', isFinal: true },
        ],
        requirements: [
            { title: 'For Slaughter', icon: 'bi-file-text', items: ['Certificate of ownership', 'Transport permit (if from other municipality)', 'Payment of slaughter fee'] },
        ],
        faqs: [
            { question: 'What time should I bring livestock?', answer: 'Animals should arrive between 4AM-6AM for morning slaughter.' },
        ],
        office: { name: 'SEEDO - Slaughterhouse', location: 'Solano Slaughterhouse', phone: '(078) 326-5001', hours: '4AM - 8AM' },
        relatedServices: [
            { title: 'Veterinary Services', link: '/services/agriculture' },
        ],
    },
    {
        id: 'municipal-general-services',
        title: 'Municipal General Services',
        fullTitle: 'Municipal General Services Office',
        category: 'Infrastructure',
        categoryLink: '/services/infrastructure',
        badgeText: 'Services',
        badgeIcon: 'bi-tools',
        description: 'Equipment rental, vehicle use, and general services',
        quickStats: [
            { icon: 'bi-clock', label: 'Office Hours', value: 'Mon-Fri 8AM-5PM' },
            { icon: 'bi-telephone', label: 'Contact', value: '(078) 326-5001' },
            { icon: 'bi-geo-alt', label: 'Location', value: 'Municipal Hall' },
            { icon: 'bi-cash', label: 'Rental', value: 'Varies' },
        ],
        processSteps: [
            { title: 'Submit Request', description: 'File equipment or vehicle use request.' },
            { title: 'Approval', description: 'Wait for approval from GSO.' },
            { title: 'Pay Fees', description: 'Pay rental fees if applicable.' },
            { title: 'Use Equipment', description: 'Use equipment/vehicle as scheduled.', isFinal: true },
        ],
        requirements: [
            { title: 'Equipment Request', icon: 'bi-file-text', items: ['Request letter', 'Purpose of use', 'Valid ID', 'Payment (if applicable)'] },
        ],
        faqs: [
            { question: 'What equipment is available?', answer: 'Heavy equipment, service vehicles, and other municipal assets for public use.' },
        ],
        office: { name: 'General Services Office', location: 'Municipal Hall', phone: '(078) 326-5001', hours: 'Mon-Fri: 8AM - 5PM' },
        relatedServices: [
            { title: 'Infrastructure', link: '/services/infrastructure' },
        ],
    },
    {
        id: 'general-services',
        title: 'General Services',
        fullTitle: 'General Municipal Services',
        category: 'Services',
        categoryLink: '/services',
        badgeText: 'Services',
        badgeIcon: 'bi-grid',
        description: 'General public services and information',
        quickStats: [
            { icon: 'bi-clock', label: 'Office Hours', value: 'Mon-Fri 8AM-5PM' },
            { icon: 'bi-telephone', label: 'Contact', value: '(078) 326-5001' },
            { icon: 'bi-geo-alt', label: 'Location', value: 'Municipal Hall' },
            { icon: 'bi-info-circle', label: 'Info Desk', value: 'Ground Floor' },
        ],
        processSteps: [
            { title: 'Visit Information Desk', description: 'Go to the ground floor information desk.' },
            { title: 'State Your Concern', description: 'Tell the staff what service you need.' },
            { title: 'Get Directions', description: 'Staff will direct you to the appropriate office.', isFinal: true },
        ],
        requirements: [
            { title: 'General Visit', icon: 'bi-person', items: ['Valid ID for most transactions'] },
        ],
        faqs: [
            { question: 'Where can I get information about services?', answer: 'Visit the Information Desk at the ground floor of Municipal Hall.' },
        ],
        office: { name: 'Information Desk', location: 'Municipal Hall, Ground Floor', phone: '(078) 326-5001', hours: 'Mon-Fri: 8AM - 5PM' },
        relatedServices: [
            { title: 'All Services', link: '/services' },
        ],
    },
];

export function getServiceDetail(slug: string): ServiceDetail | undefined {
    return serviceDetailsContent.find(s => s.id === slug);
}
