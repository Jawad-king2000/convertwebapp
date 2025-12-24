import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // Define valid conversion pairs (should match the source of truth)
    const conversionPairs = [
        'pdf-to-docx',
        'docx-to-pdf',
        'jpg-to-pdf',
        'png-to-pdf',
        'pdf-to-png',
        'pdf-to-jpg',
        'docx-to-html',
        'pptx-to-pdf',
    ];

    const toolsUrls = conversionPairs.map((slug) => ({
        url: `${baseUrl}/tools/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        ...toolsUrls,
    ];
}
