import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  canonical?: string;
}

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useSEO(props: SEOProps) {
  useEffect(() => {
    document.title = props.title;

    setMeta("description", props.description);
    setMeta("keywords", props.keywords);

    setMeta("og:title", props.ogTitle || props.title, "property");
    setMeta("og:description", props.ogDescription || props.description, "property");
    setMeta("og:type", props.ogType || "website", "property");
    if (props.ogImage) setMeta("og:image", props.ogImage, "property");
    if (props.ogUrl) setMeta("og:url", props.ogUrl, "property");

    setMeta("twitter:card", props.twitterCard || "summary_large_image");
    setMeta("twitter:title", props.twitterTitle || props.ogTitle || props.title);
    setMeta("twitter:description", props.twitterDescription || props.ogDescription || props.description);

    if (props.canonical) setLink("canonical", props.canonical);

    window.scrollTo(0, 0);
  }, []);
}
