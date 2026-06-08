import { Helmet } from 'react-helmet-async'
import { SITE_CONFIG } from '../../config/site'

type SEOProps = {
  pageKey?: keyof typeof SITE_CONFIG.pageMetadata
  title?: string
  description?: string
  ogTitle?: string
  ogDescription?: string
}

export const SEO = ({ pageKey, title, description, ogTitle, ogDescription }: SEOProps) => {
  let meta = SITE_CONFIG.pageMetadata.default
  if (pageKey && SITE_CONFIG.pageMetadata[pageKey]) {
    meta = SITE_CONFIG.pageMetadata[pageKey]
  }

  const finalTitle = title || meta.title
  const finalDescription = description || meta.description
  const finalOgTitle = ogTitle || meta.ogTitle
  const finalOgDescription = ogDescription || meta.ogDescription

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:type" content="website" />
    </Helmet>
  )
}
