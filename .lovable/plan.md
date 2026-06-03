Hide the "Expand to Studio" upsell block for basic accounts in `MembershipSection.tsx`.

Wrap the entire block (lines 125–173) in `{planTier !== "basic" && ( ... )}` so it stays for essential/pro but is removed from the basic dashboard view. No other changes.