"""Approved India demo rates and availability stay isolated from other markets."""
import json
import unittest
from pathlib import Path


class IndiaMarketplaceRules(unittest.TestCase):
    def test_approved_records(self):
        records = json.loads((Path(__file__).resolve().parents[1] / 'src/data/indiaMarketplaceData.json').read_text())
        expected = [
            ('Rohan Mehta', 'Andheri West, Mumbai', 'Strength & muscle gain · gym floor trainer', 1500, 4.8, 62, 'Available today'),
            ('Priya Sharma', 'Bandra West, Mumbai', 'Weight loss & HIIT', 1800, 4.9, 118, 'Available tomorrow'),
            ('Arjun Iyer', 'Powai, Mumbai', 'Performance & running', 2000, 4.7, 41, 'Available this week'),
            ('Kavya Nair', 'Lower Parel, Mumbai', 'Pre & post-natal fitness', 2200, 4.9, 57, 'Available this week'),
            ('Vikram Singh', 'Juhu, Mumbai', 'Functional training & mobility', 1200, 4.6, 33, 'Available today'),
            ('Sana Qureshi', 'Colaba, Mumbai', 'Yoga & flexibility', 1000, 4.8, 74, 'Available tomorrow'),
        ]
        self.assertEqual(len(records), 6)
        for record, values in zip(records, expected):
            with self.subTest(trainer=values[0]):
                self.assertEqual(tuple(record[k] for k in ('name', 'location', 'title', 'hourlyRate', 'rating', 'reviews', 'availableLabel')), values)


if __name__ == '__main__':
    unittest.main()