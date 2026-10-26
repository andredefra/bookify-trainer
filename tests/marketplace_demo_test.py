"""Client demo discovery keeps each identity and gates contact with locale-specific forms."""
import asyncio
import json
from pathlib import Path
from playwright.async_api import async_playwright

async def check():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1280, "height": 1800})
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        india = json.loads((Path(__file__).resolve().parents[1] / 'src/data/indiaMarketplaceData.json').read_text())
        italian = [('giulia-ferrero', 'Giulia Ferrero'), ('matteo-bianchi', 'Matteo Bianchi'), ('sara-moretti', 'Sara Moretti'), ('lorenzo-greco', 'Lorenzo Greco'), ('chiara-rinaldi', 'Chiara Rinaldi'), ('davide-ferrara', 'Davide Ferrara')]
        for route, lang, records, form in [
            ('/user-find-trainer', 'it', italian, 'https://forms.gle/nYVczZnFfG3MW7Ei6'),
            ('/user-find-trainer-en', 'en', italian, 'https://forms.gle/TT4YvuZ5kHpznmHT6'),
            ('/in-find-trainer', 'in', [(r['id'], r['name']) for r in india], 'https://forms.gle/88sqSryMHUtWveDW9'),
        ]:
            profile = 'Vedi il profilo' if lang == 'it' else 'View profile'
            contact = 'Contattalo' if lang == 'it' else 'Contact them'
            book = 'Prenota una seduta' if lang == 'it' else 'Book a session'
            message = 'Scrivi un messaggio' if lang == 'it' else 'Send a message'
            for index, (slug, name) in enumerate(records):
                await page.goto('http://localhost:8080' + route)
                card = page.locator('[data-trainer-card]').nth(index)
                await card.get_by_role('link', name=profile, exact=True).click()
                await page.wait_for_url('**/trainer/' + slug + '?from=user&lang=' + lang)
                await page.get_by_role('heading', name=name, exact=True).wait_for()
                assert await page.locator('footer a').first.get_attribute('href') == {'it': '/user', 'en': '/user-en', 'in': '/in-user'}[lang]
                assert await page.get_by_role('heading').filter(has_text='How MyPersonal helps').count() == 0
                for action in [book, message]:
                    await page.get_by_role('button', name=action, exact=True).first.click()
                    dialog = page.get_by_role('dialog')
                    await dialog.wait_for()
                    assert await dialog.get_by_role('link').get_attribute('href') == form
                    await dialog.get_by_role('button').last.click()
                if lang == 'in':
                    record = india[index]
                    assert await page.locator('.public-profile-photo').get_attribute('src') == record['image']
                    assert f"₹{record['hourlyRate']:,}" in await page.locator('.public-profile-rate').inner_text()
            await page.goto('http://localhost:8080' + route)
            await page.locator('[data-trainer-card]').first.get_by_role('button', name=contact, exact=True).click()
            assert await page.get_by_role('dialog').get_by_role('link').get_attribute('href') == form
            print(route + ': six distinct profiles, contact gates and locale forms passed')
        assert not errors, errors
        await browser.close()

if __name__ == '__main__':
    asyncio.run(check())
