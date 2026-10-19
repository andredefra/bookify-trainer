"""Public consumer demo actions never open trainer profiles or imply real contact."""
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
        for route, profile, contact, title, back, signup in [
            ('/user-find-trainer', 'Vedi il profilo', 'Contattalo', 'Questo profilo è dimostrativo', 'Torna ai profili', 'Registrati, è gratis'),
            ('/user-find-trainer-en', 'View profile', 'Contact them', 'This profile is a demo', 'Back to the profiles', "Sign up, it's free"),
        ]:
            await page.goto('http://localhost:8080' + route)
            await page.locator('[data-trainer-card]').first.wait_for()
            assert await page.locator('[data-trainer-card]').count() == 6
            for action in [profile, contact]:
                for card in await page.locator('[data-trainer-card]').all():
                    await card.get_by_role('button', name=action, exact=True).click()
                    dialog = page.get_by_role('dialog')
                    await dialog.get_by_role('heading', name=title, exact=True).wait_for()
                    assert page.url == 'http://localhost:8080' + route
                    assert await dialog.get_by_role('link', name=signup, exact=True).get_attribute('href') == '/user-register'
                    await dialog.get_by_role('button', name=back, exact=True).click()
                    await dialog.wait_for(state='hidden')
            await page.locator('[data-trainer-card]').first.get_by_role('button', name=contact, exact=True).click()
            await page.get_by_role('dialog').get_by_role('link', name=signup, exact=True).click()
            await page.wait_for_url('**/user-register')
            print(route + ': all twelve demo gates and signup destination passed')
        assert not errors, errors
        await browser.close()

if __name__ == '__main__':
    asyncio.run(check())
