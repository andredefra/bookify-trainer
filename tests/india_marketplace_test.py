"""Approved India demo rates, portraits and badge rules stay isolated from other markets."""
import json
import unittest
from pathlib import Path


class IndiaMarketplaceRules(unittest.TestCase):
    def setUp(self):
        self.records = json.loads((Path(__file__).resolve().parents[1] / 'src/data/indiaMarketplaceData.json').read_text())

    def test_approved_records(self):
        expected = [
            ('Rohan Mehta', 'Andheri West, Mumbai', 'Strength & muscle gain · gym floor trainer', 1500, 4.8, 62, 'Available today'),
            ('Priya Sharma', 'Bandra West, Mumbai', 'Weight loss & HIIT', 1800, 4.9, 118, 'Available tomorrow'),
            ('Arjun Iyer', 'Powai, Mumbai', 'Performance & running', 2000, 4.7, 41, 'Available this week'),
            ('Kavya Nair', 'Lower Parel, Mumbai', 'Pre & post-natal fitness', 2200, 4.9, 57, 'Available this week'),
            ('Vikram Singh', 'Juhu, Mumbai', 'Functional training & mobility', 1200, 4.6, 33, 'Available today'),
            ('Sana Qureshi', 'Colaba, Mumbai', 'Yoga & flexibility', 1000, 4.8, 74, 'Available tomorrow'),
        ]
        self.assertEqual(len(self.records), 6)
        for record, values in zip(self.records, expected):
            with self.subTest(trainer=values[0]):
                self.assertEqual(tuple(record[k] for k in ('name', 'location', 'title', 'hourlyRate', 'rating', 'reviews', 'availableLabel')), values)

    def test_portraits_are_dedicated_india_files(self):
        for record in self.records:
            with self.subTest(trainer=record['name']):
                expected_image = f"/marketplace/in/in-trainer-{record['name'].lower().replace(' ', '-')}.jpg"
                self.assertEqual(record['image'], expected_image)
                self.assertNotIn('portraitIndex', record)

    def test_badge_rules(self):
        specialty_by_name = {
            'Rohan Mehta': 'strength',
            'Priya Sharma': 'hiit',
            'Arjun Iyer': 'running',
            'Kavya Nair': 'prenatal',
            'Vikram Singh': 'mobility',
            'Sana Qureshi': 'yoga',
        }
        for record in self.records:
            with self.subTest(trainer=record['name']):
                credentials = record['credentials']
                self.assertIn('certified', credentials)
                self.assertIn('verified', credentials)
                self.assertIn('topRated', credentials)
                self.assertNotIn('nutrition', credentials)
                self.assertEqual(credentials.count(specialty_by_name[record['name']]), 1)
                self.assertEqual(len([c for c in credentials if c not in ('certified', 'verified', 'topRated')]), 1)


if __name__ == '__main__':
    unittest.main()
