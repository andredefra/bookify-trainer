# Architecture rules
- Keep public trainer brand styling opt-in through scoped tokens and font aliases; shared consumer/admin/dashboard styling must not inherit trainer-only changes.
- The shared language selector accepts an opt-in trainer theme, including its portalled menu, so both public audiences keep one language implementation.
- Keep the trainer hero preview self-contained in components/hero with scoped semantic CSS tokens; use one visibility observer and respect reduced motion so the illustration never affects live dashboard state.
- Store complete marketplace demo records separately from the legacy Trainer adapter so the marketplace can use structured credentials and history without changing the existing profile rendering.
- Keep marketplace-only presentation scoped under trainer-market and reuse public brand tokens to isolate other pages.
- Keep PublicHeader presentation scoped to public trainer profiles, with active tab state owned by the page and optional tabs derived from trainer records, so future tab bodies can reuse the same selection without changing lookup logic.
- Keep package/class bodies in PublicOfferTabs using structured trainer records and computed seat states; carry offer context through page-owned selection into the shared booking dialog so registration does not discard it.
