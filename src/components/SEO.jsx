import { useEffect } from 'react';

const DEFAULT_TITLE = 'RK Nuotykiai';
const DEFAULT_DESCRIPTION = 'RK Nuotykiai – žygių ir nuotykių organizatorius Lietuvoje.';

function SEO({ title, description }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;
    const desc = description || DEFAULT_DESCRIPTION;
    const url = window.location.href;

    document.title = fullTitle;
    updateMeta('description', desc);
    updateMeta('og:title', fullTitle, true);
    updateMeta('og:description', desc, true);
    updateMeta('og:type', 'website', true);
    updateMeta('og:url', url, true);
    updateCanonical(url);
  }, [title, description]);

  return null;
}

function updateMeta(name, content, isProperty = false) {
  const selector = isProperty ? `meta[property='${name}']` : `meta[name='${name}']`;
  let meta = document.querySelector(selector);
  if (!meta) {
    meta = document.createElement('meta');
    if (isProperty) {
      meta.setAttribute('property', name);
    } else {
      meta.setAttribute('name', name);
    }
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function updateCanonical(url) {
  let link = document.querySelector("link[rel='canonical']");
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

export default SEO;
