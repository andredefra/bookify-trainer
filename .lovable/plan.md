### `src/utils/mockGymInvites.ts` — `buildOnboardingUrl`
Rilevare se l'origine corrente è un dominio Lovable interno (preview/editor) e sostituirlo col dominio pubblico pubblicato `https://bookify-trainer.lovable.app`. In produzione usa `window.location.origin`.

### `src/components/trainer/dashboard/tabs/settings/sections/MyGymsSection.tsx`
Aggiungere nota sotto al box "Invite link generated": *"Il link è pubblico e funziona solo sul sito pubblicato (non sull'anteprima Lovable)."*