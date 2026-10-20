<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep homepage-specific gallery and quote interactions in HomeShowcase; the quote form remains presentational until delivery is connected, and must never claim a request was sent.
- Keep generated portfolio imagery explicitly identified as illustrations until verified project photography replaces it; never invent client reviews or business credentials.

- Use LanguageProvider and the shared Arabic dictionary for all public copy; apply document language and direction after hydration to preserve SSR consistency.
- Keep Moroccan Tamazight interface translations in the shared zgh dictionary, translate fixed gallery labels separately from counts, and preserve user-entered content and banking identifiers verbatim; this avoids missing dynamic keys and altering real data.
- Bundle brand images (logo, architect photo) as regular Vite imports exposed via `src/lib/brand-assets.ts`; Lovable CDN `/__l5e/` URLs do not resolve on external hosts like Vercel.
- Admin access is granted only via public.user_roles rows (role 'admin') inserted manually; public sign-up is disabled, so never add a sign-up UI. Why: owner wants admins provisioned by UID directly in the database.
- Project images live in a private storage bucket and are shown via signed URLs from src/lib/projects.ts. Why: the workspace blocks public buckets.
- Shared office phone and WhatsApp links are rendered by OfficeContactLinks in SiteLayout and reused on the homepage and contact page, keeping destinations consistent.
