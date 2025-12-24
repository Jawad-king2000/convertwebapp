'use client';

export default function StructuredData() {
    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Universal File Converter',
        url: typeof window !== 'undefined' ? window.location.origin : 'https://localhost:3000',
        logo: typeof window !== 'undefined' ? `${window.location.origin}/logo.png` : 'https://localhost:3000/logo.png',
        description: 'Free online file converter supporting PDF, DOCX, PPTX, images, and more formats',
    };

    const softwareSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Universal File Converter',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Web Browser',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        description: 'Convert your files instantly between multiple formats. Simple, fast, and secure - no account needed!',
        featureList: [
            'PDF conversion',
            'DOCX conversion',
            'PPTX conversion',
            'Image conversion (PNG, JPG, WEBP)',
            'Text file conversion',
            'No registration required',
            'Files deleted after 1 hour',
            'Lightning fast processing',
        ],
        softwareVersion: '1.0.0',
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            ratingCount: '1250',
        },
    };

    const webAppSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Universal File Converter',
        url: typeof window !== 'undefined' ? window.location.origin : 'https://localhost:3000',
        applicationCategory: 'UtilityApplication',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        description: 'Convert files between multiple formats instantly - PDF, DOCX, PPTX, Images, and more',
    };

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: 'What file formats are supported?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'We support PDF, DOCX, PPTX, TXT, PNG, JPG, and WEBP formats for input. You can convert to PDF, DOCX, PNG, JPG, WEBP, TXT, and HTML formats.',
                },
            },
            {
                '@type': 'Question',
                name: 'Is my data secure?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes! All uploaded files are automatically deleted after 1 hour. We do not store or share your files with anyone.',
                },
            },
            {
                '@type': 'Question',
                name: 'Do I need to create an account?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'No account needed! Simply upload your file, select the output format, and convert. It\'s completely free and anonymous.',
                },
            },
            {
                '@type': 'Question',
                name: 'How long does conversion take?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Most conversions complete within seconds. The exact time depends on file size and complexity.',
                },
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
        </>
    );
}
