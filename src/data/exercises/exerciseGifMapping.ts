/**
 * Dynamic exercise GIF mapping system
 * Maps exercise keywords/IDs to specific GIF URLs for visual variety
 */

// Map exercise keywords/IDs to specific GIF URLs
// Using real fitness GIFs from public sources
export const exerciseGifMapping: Record<string, string> = {
  // Core/Static Exercises
  'plank': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHl6OXd5NG5xdXN1NnBhMWpqZzY2OXI0OWRmczFhNjNybDZkMTh5NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oriNYQX2lC6dfW2Ji/giphy.gif',
  'side-plank': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGFiMzE0YjE3NmU2MzZkMWUzNTQ2YmYxNGQ5NmU4YzU4YjMwZWI5ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlBO7eyXzSZkJri/giphy.gif',
  'dead-bug': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWRjZGQ4YzQwNzJiMGY0NTBiYzM1YWZhNzE2MWE2NDA4ZDU0YmZlYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUPGcjQ6dJEjH5uwMw/giphy.gif',
  
  // Squat Variations
  'squat': 'https://media.giphy.com/media/1qfKN8Dt0CRdCRxz9q/giphy.gif',
  'barbell-squat': 'https://media.giphy.com/media/1qfKN8Dt0CRdCRxz9q/giphy.gif',
  'goblet-squat': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGZlYTM5OWE1YzE0MjM1MDRjYmQ3NTA4ZjdkM2YxZjQ0NWE0ZjFhYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l4FGGafcOHmrlQxG0/giphy.gif',
  'front-squat': 'https://media.giphy.com/media/1qfKN8Dt0CRdCRxz9q/giphy.gif',
  'split-squat': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzY5OGE5ZWYxNzMxNTcyZDk4NzI5NTI4ZjQ0MzI1YjA5YjZhYTgyMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKTDn976rzVgky4/giphy.gif',
  
  // Push-up Variations
  'push-up': 'https://media.giphy.com/media/Kajba1ISxQZuU/giphy.gif',
  'pushup': 'https://media.giphy.com/media/Kajba1ISxQZuU/giphy.gif',
  'diamond-push-up': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDQxMjlhZWE3YjQ2ZDQ1MDI2MTk3NmM5YmM4NjU3NjI5NjQ2ZGZkNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEjHGr1Fhz0kyv8Ig/giphy.gif',
  'incline-push-up': 'https://media.giphy.com/media/Kajba1ISxQZuU/giphy.gif',
  
  // Rotational Movements
  'russian-twist': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDI4Njk4MDk5NWI3NjI4ODQ4MzYwMjMwNGI3YTIzNDE0NzQ2MDEzYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlQGlLzO2kpwZdS/giphy.gif',
  'woodchop': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWJjNGMzMTc5YWI1MzAyYzQ5MmY2NTczNDc5NzE0NjlhOGRjNDg5OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0MYGb1LuZ3n7dRnO/giphy.gif',
  
  // Leg Press & Leg Machines
  'leg-press': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzQyNjQ5MDk2ZTQ2NzE2MDY0YTgyODg1MmFmM2M2ZjA4NjE2MWI3YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26FPpSuhgHvYo9Kyk/giphy.gif',
  'leg-extension': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjE5NDA1OTg2MjQ0OWE2NWI4MWI1NmNhM2I3ZjU5MTEwZGEwMzI3NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT1R9VR4jmml8GTENW/giphy.gif',
  'leg-curl': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDc2NTQzMjg5ZjQ5NDIyNzIwOGI5MjA4MzMwNzc2ZDI4M2I5ODM5YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT1R9VR4jmml8GTENW/giphy.gif',
  
  // Deadlifts
  'deadlift': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmQxMDJhNDc0ODIxMGEzZDU1MTJlOTE0NDIyOGQ1OGU5NDMxNjA3ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6wNKfzEIvXGJSlcQ/giphy.gif',
  'romanian-deadlift': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjc4NTQ2NzI3ODQ2YjcyOTQ4MjM3ZWFhZDQ5YzQ4ZjIzNTQ5MTc4ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEjHGr1Fhz0kyv8Ig/giphy.gif',
  'sumo-deadlift': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmQxMDJhNDc0ODIxMGEzZDU1MTJlOTE0NDIyOGQ1OGU5NDMxNjA3ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6wNKfzEIvXGJSlcQ/giphy.gif',
  
  // Bench Press
  'bench-press': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzgwODM3ODI0MWI1NDI1MzEwNDcwNjgxNTU3YzM2Y2I3MzYxNjY1YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ICOgUNjpvO0PC/giphy.gif',
  'incline-bench': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzgwODM3ODI0MWI1NDI1MzEwNDcwNjgxNTU3YzM2Y2I3MzYxNjY1YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ICOgUNjpvO0PC/giphy.gif',
  'decline-bench': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzgwODM3ODI0MWI1NDI1MzEwNDcwNjgxNTU3YzM2Y2I3MzYxNjY1YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ICOgUNjpvO0PC/giphy.gif',
  'dumbbell-press': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzgwODM3ODI0MWI1NDI1MzEwNDcwNjgxNTU3YzM2Y2I3MzYxNjY1YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ICOgUNjpvO0PC/giphy.gif',
  
  // Rows
  'row': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDI5MjM0MjY1NTQ1MTY3NjI4NzIzNjM0NTM0NzQ4MzI3NTQzMjM0NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26FPqAHtgCBzKG9mo/giphy.gif',
  'bent-over-row': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDI5MjM0MjY1NTQ1MTY3NjI4NzIzNjM0NTM0NzQ4MzI3NTQzMjM0NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26FPqAHtgCBzKG9mo/giphy.gif',
  'cable-row': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDI5MjM0MjY1NTQ1MTY3NjI4NzIzNjM0NTM0NzQ4MzI3NTQzMjM0NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26FPqAHtgCBzKG9mo/giphy.gif',
  'dumbbell-row': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDI5MjM0MjY1NTQ1MTY3NjI4NzIzNjM0NTM0NzQ4MzI3NTQzMjM0NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26FPqAHtgCBzKG9mo/giphy.gif',
  
  // Curls
  'curl': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT8qB308txoPb36xz2/giphy.gif',
  'bicep-curl': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT8qB308txoPb36xz2/giphy.gif',
  'hammer-curl': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT8qB308txoPb36xz2/giphy.gif',
  'preacher-curl': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT8qB308txoPb36xz2/giphy.gif',
  
  // Lunges
  'lunge': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzQzNjQxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oriNSf2iLjMVO7dao/giphy.gif',
  'walking-lunge': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzQzNjQxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oriNSf2iLjMVO7dao/giphy.gif',
  'reverse-lunge': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzQzNjQxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oriNSf2iLjMVO7dao/giphy.gif',
  
  // Shoulder Press
  'shoulder-press': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlNQ03J5JxX6lva/giphy.gif',
  'overhead-press': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlNQ03J5JxX6lva/giphy.gif',
  'military-press': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlNQ03J5JxX6lva/giphy.gif',
  'arnold-press': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlNQ03J5JxX6lva/giphy.gif',
  
  // Pull-ups
  'pull-up': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzZXAmY3Q9Zw/l0HlxJMw7rkPTN8sg/giphy.gif',
  'chin-up': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzZXAmY3Q9Zw/l0HlxJMw7rkPTN8sg/giphy.gif',
  'lat-pulldown': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzZXAmY3Q9Zw/l0HlxJMw7rkPTN8sg/giphy.gif',
  
  // Dips
  'dip': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTZlcCZjdD1n/3oEjHV0z8S7WM4MwnK/giphy.gif',
  'tricep-dip': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTZlcCZjdD1n/3oEjHV0z8S7WM4MwnK/giphy.gif',
  'bench-dip': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTZlcCZjdD1n/3oEjHV0z8S7WM4MwnK/giphy.gif',
  
  // Calf Raises
  'calf-raise': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2N2VwJmN0PWc/l0MYGb1LuZ3n7dRnO/giphy.gif',
  'standing-calf-raise': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2N2VwJmN0PWc/l0MYGb1LuZ3n7dRnO/giphy.gif',
  'seated-calf-raise': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2N2VwJmN0PWc/l0MYGb1LuZ3n7dRnO/giphy.gif',
  
  // Hip Thrust
  'hip-thrust': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTBlcCZjdD1n/l0HlQ7LRalQqdWfao/giphy.gif',
  'glute-bridge': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTBlcCZjdD1n/l0HlQ7LRalQqdWfao/giphy.gif',
  
  // Tricep Extensions
  'tricep-extension': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODlwJmN0PWc/3oEjI1erPMTMBFmNHi/giphy.gif',
  'skull-crusher': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODlwJmN0PWc/3oEjI1erPMTMBFmNHi/giphy.gif',
  'tricep-pushdown': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODlwJmN0PWc/3oEjI1erPMTMBFmNHi/giphy.gif',
  
  // Core/Abs
  'crunch': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDFlcCZjdD1n/3oriNYQX2lC6dfW2Ji/giphy.gif',
  'sit-up': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDFlcCZjdD1n/3oriNYQX2lC6dfW2Ji/giphy.gif',
  'mountain-climber': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWJjMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2N2VwJmN0PWc/5t9IcXiBCyw60XPpGu/giphy.gif',
  'bicycle-crunch': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDFlcCZjdD1n/3oriNYQX2lC6dfW2Ji/giphy.gif',
  
  // Fly movements
  'fly': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzZXAmY3Q9Zw/ICOgUNjpvO0PC/giphy.gif',
  'chest-fly': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzZXAmY3Q9Zw/ICOgUNjpvO0PC/giphy.gif',
  'cable-fly': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzZXAmY3Q9Zw/ICOgUNjpvO0PC/giphy.gif',
  'pec-deck': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzZXAmY3Q9Zw/ICOgUNjpvO0PC/giphy.gif',
  
  // Lateral Raises
  'lateral-raise': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjNlcCZjdD1n/l0HlNQ03J5JxX6lva/giphy.gif',
  'front-raise': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjNlcCZjdD1n/l0HlNQ03J5JxX6lva/giphy.gif',
  'rear-delt-fly': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjNlcCZjdD1n/l0HlNQ03J5JxX6lva/giphy.gif',
  
  // Burpees & Plyometrics
  'burpee': 'https://media.giphy.com/media/23hPPMRgPxbNBlPQe3/giphy.gif',
  'box-jump': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDVlcCZjdD1n/l0MYGb1LuZ3n7dRnO/giphy.gif',
  'jump-squat': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDVlcCZjdD1n/l0MYGb1LuZ3n7dRnO/giphy.gif',
  
  // Shrugs
  'shrug': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTZlcCZjdD1n/26FPqAHtgCBzKG9mo/giphy.gif',
  'barbell-shrug': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTZlcCZjdD1n/26FPqAHtgCBzKG9mo/giphy.gif',
  'dumbbell-shrug': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTZlcCZjdD1n/26FPqAHtgCBzKG9mo/giphy.gif',
};

// Category-based fallback GIFs
export const categoryFallbackGifs: Record<string, string> = {
  legs: 'https://media.giphy.com/media/1qfKN8Dt0CRdCRxz9q/giphy.gif',
  chest: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzgwODM3ODI0MWI1NDI1MzEwNDcwNjgxNTU3YzM2Y2I3MzYxNjY1YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ICOgUNjpvO0PC/giphy.gif',
  back: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDI5MjM0MjY1NTQ1MTY3NjI4NzIzNjM0NTM0NzQ4MzI3NTQzMjM0NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26FPqAHtgCBzKG9mo/giphy.gif',
  shoulders: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlNQ03J5JxX6lva/giphy.gif',
  arms: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT8qB308txoPb36xz2/giphy.gif',
  core: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHl6OXd5NG5xdXN1NnBhMWpqZzY2OXI0OWRmczFhNjNybDZkMTh5NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oriNYQX2lC6dfW2Ji/giphy.gif',
  cardio: 'https://media.giphy.com/media/23hPPMRgPxbNBlPQe3/giphy.gif',
  functional: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmQxMDJhNDc0ODIxMGEzZDU1MTJlOTE0NDIyOGQ1OGU5NDMxNjA3ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6wNKfzEIvXGJSlcQ/giphy.gif',
  flexibility: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHl6OXd5NG5xdXN1NnBhMWpqZzY2OXI0OWRmczFhNjNybDZkMTh5NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oriNYQX2lC6dfW2Ji/giphy.gif',
  plyometric: 'https://media.giphy.com/media/23hPPMRgPxbNBlPQe3/giphy.gif',
};