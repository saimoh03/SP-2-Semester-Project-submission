export function mapListFormToApi(list) {
  const endsAtISO = new Date(list.endsAt).toISOString();
  return {
    title: list.title.trim(),

    description: list.description.trim(),

    tags: list.tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t),

    media: list.urls
      .split(",")
      .map((url) => url.trim())
      .filter((url) => url)
      .map((url) => ({
        url: url,
        alt: list.title.trim() || "media image",
      })),

    endsAt: endsAtISO,
  };
}

export function mapUpdateListFormToApi(list) {
  return {
    title: list.title.trim(),

    description: list.description.trim(),

    tags: list.tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t),

    media: list.urls
      .split(",")
      .map((url) => url.trim())
      .filter((url) => url)
      .map((url) => ({
        url: url,
        alt: list.title.trim() || "media image",
      })),
  };
}
