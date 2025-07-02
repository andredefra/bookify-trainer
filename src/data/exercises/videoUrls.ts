
// YouTube video URLs for exercise demonstrations
export const exerciseVideoUrls: { [exerciseId: string]: string } = {
  // Basic exercises
  "1": "https://www.youtube.com/watch?v=IODxDxX7oi4", // Push-up
  "2": "https://www.youtube.com/watch?v=C_VtOYc6j5c", // Squat
  "3": "https://www.youtube.com/watch?v=pSHjTRCQxIw", // Plank
  "4": "https://www.youtube.com/watch?v=QOVaHwm-Q6U", // Lunges
  "5": "https://www.youtube.com/watch?v=TU8QYVW0gDU", // Burpees
  "6": "https://www.youtube.com/watch?v=kLh-uczlPLg", // Mountain Climbers
  "7": "https://www.youtube.com/watch?v=c4DAnQ6DtF8", // Jumping Jacks
  "8": "https://www.youtube.com/watch?v=6kALZikXxLc", // Tricep Dips
  "9": "https://www.youtube.com/watch?v=Xyd_fa5zoEU", // Crunches
  "10": "https://www.youtube.com/watch?v=OUgsJ8-Vi0E", // High Knees
  
  // Weight training
  "11": "https://www.youtube.com/watch?v=rT7DgCr-3pg", // Bench Press
  "12": "https://www.youtube.com/watch?v=op9kVnSso6Q", // Deadlift
  "13": "https://www.youtube.com/watch?v=eGo4IYlbE5g", // Pull-ups
  "14": "https://www.youtube.com/watch?v=2yjwXTZQDDI", // Overhead Press
  "15": "https://www.youtube.com/watch?v=UCXxvVItLoM", // Rows
  "16": "https://www.youtube.com/watch?v=ykJmrZ5v0Oo", // Dumbbell Curls
  "17": "https://www.youtube.com/watch?v=IZxyjW7MPJQ", // Leg Press
  "18": "https://www.youtube.com/watch?v=CAwf7n6Luuc", // Lat Pulldown
  "19": "https://www.youtube.com/watch?v=ELOCsoDSmrg", // Leg Curls
  "20": "https://www.youtube.com/watch?v=gwLzBJYoWlI", // Calf Raises
  
  // Advanced exercises
  "21": "https://www.youtube.com/watch?v=DbFgADa2PL8", // Incline Bench Press
  "22": "https://www.youtube.com/watch?v=LfyQBUKR8SE", // Decline Bench Press
  "23": "https://www.youtube.com/watch?v=eozdVDA78K0", // Dumbbell Flyes
  "24": "https://www.youtube.com/watch?v=cJRVVxmytaM", // Shoulder Shrugs
  "25": "https://www.youtube.com/watch?v=3VcKaXpzqRo", // Lateral Raises
  "26": "https://www.youtube.com/watch?v=qEwKCR5JCog", // Front Raises
  "27": "https://www.youtube.com/watch?v=t7MzA-yny_s", // Rear Delt Flyes
  "28": "https://www.youtube.com/watch?v=YbX7Wd8jQ-Q", // Tricep Extensions
  "29": "https://www.youtube.com/watch?v=zC3nLlEvin4", // Hammer Curls
  "30": "https://www.youtube.com/watch?v=fIWP-FRFNU0", // Preacher Curls
  
  // Functional and compound movements
  "40": "https://www.youtube.com/watch?v=CN_7cz3P-1U", // Romanian Deadlifts
  "41": "https://www.youtube.com/watch?v=LGIS9vs65Sk", // Sumo Deadlifts
  "42": "https://www.youtube.com/watch?v=nEQQle9-0NA", // Front Squats
  "43": "https://www.youtube.com/watch?v=ultWZbUMPL8", // Back Squats
  "44": "https://www.youtube.com/watch?v=EdtaJRBqrus", // Hack Squats
  "45": "https://www.youtube.com/watch?v=2C-uNgKwPLE", // Bulgarian Split Squats
  
  // Core exercises
  "61": "https://www.youtube.com/watch?v=wkD8rjkodUI", // Russian Twists
  "62": "https://www.youtube.com/watch?v=9FGilxCbdz8", // Bicycle Crunches
  "63": "https://www.youtube.com/watch?v=g_BYB0R-4Ws", // Dead Bug
  "64": "https://www.youtube.com/watch?v=wiFNA3sqjCA", // Bird Dog
  "65": "https://www.youtube.com/watch?v=cc6UVRS7PW4", // Superman
  "66": "https://www.youtube.com/watch?v=XeN4pEUtR-U", // Side Plank
  "67": "https://www.youtube.com/watch?v=LlDNef_Ztsc", // Hollow Hold
  "68": "https://www.youtube.com/watch?v=7UVgs18Y1P4", // V-Ups
  "69": "https://www.youtube.com/watch?v=JB2oyawG9KI", // Leg Raises
  "70": "https://www.youtube.com/watch?v=hdng3Nm1x_E", // Hanging Leg Raises
  
  // Kettlebell exercises
  "81": "https://www.youtube.com/watch?v=cKx8xE8jJZs", // Kettlebell Swings
  "82": "https://www.youtube.com/watch?v=MeIiIdhvXT4", // Kettlebell Goblet Squats
  "83": "https://www.youtube.com/watch?v=0bWRPC49-KI", // Kettlebell Turkish Get-Up
  "84": "https://www.youtube.com/watch?v=OlyWp6yoUzE", // Kettlebell Clean and Press
  "85": "https://www.youtube.com/watch?v=GYHbu2LRqD0", // Kettlebell Snatches
  
  // Cardio and conditioning
  "86": "https://www.youtube.com/watch?v=w8ZdJ2JaGQs", // Battle Ropes
  "87": "https://www.youtube.com/watch?v=QxjJCSbfg-s", // Medicine Ball Slams
  "88": "https://www.youtube.com/watch?v=LjBGIgGHqzk", // Medicine Ball Wall Throws
  "89": "https://www.youtube.com/watch?v=5MYWLvabdWU", // Box Step-Ups
  "90": "https://www.youtube.com/watch?v=94Q6iz2HObY", // Broad Jumps
  
  // Plyometric exercises
  "91": "https://www.youtube.com/watch?v=yAV7tONRPmQ", // Lateral Bounds
  "92": "https://www.youtube.com/watch?v=XmGWfrWWlnQ", // Single-Leg Hops
  "93": "https://www.youtube.com/watch?v=NBY9-kTuHEk", // Depth Jumps
  "94": "https://www.youtube.com/watch?v=tJrdJBWBu08", // Tuck Jumps
  "95": "https://www.youtube.com/watch?v=i7WPX2BPzdc", // Split Jump Lunges
  "96": "https://www.youtube.com/watch?v=uP7H5amjqiY", // Skater Hops
  
  // Complex movements
  "97": "https://www.youtube.com/watch?v=8_SJ3UPLiNE", // Burpee Box Jumps
  "98": "https://www.youtube.com/watch?v=Qy90ckCQzZU", // Thrusters
  "99": "https://www.youtube.com/watch?v=4bIcXGFSRdM", // Man Makers
  "100": "https://www.youtube.com/watch?v=pN1Y4wjdVLY", // Renegade Rows
  "101": "https://www.youtube.com/watch?v=1hAJJSJLDUs", // Devil's Press
  "102": "https://www.youtube.com/watch?v=fpUD0mcFp_0", // Wall Balls
  
  // Cardio machines
  "103": "https://www.youtube.com/watch?v=IrLhgLr1r6Q", // Assault Bike
  "104": "https://www.youtube.com/watch?v=RQU8wZPbioA", // Rowing Machine
  "105": "https://www.youtube.com/watch?v=_kGESn8ArrU", // Treadmill Running
  "106": "https://www.youtube.com/watch?v=7MHQR0RqAmY", // Elliptical
  "107": "https://www.youtube.com/watch?v=SYzpqRVKl-w", // Stationary Bike
  "108": "https://www.youtube.com/watch?v=t5q9HYqXfQE", // Stair Climber
  "109": "https://www.youtube.com/watch?v=CeZz0rJz0Y8", // Jacob's Ladder
  "110": "https://www.youtube.com/watch?v=JTgTvfgskmg", // Ski Erg
  
  // Recovery and flexibility
  "111": "https://www.youtube.com/watch?v=fXfJHSzqzMI", // Swimming
  "112": "https://www.youtube.com/watch?v=EJWnJNOhXVk", // Water Aerobics
  "113": "https://www.youtube.com/watch?v=4vTJHUDB5ak", // Yoga Flow
  "114": "https://www.youtube.com/watch?v=9k9LzVmQ2r4", // Pilates
  "115": "https://www.youtube.com/watch?v=4wbdJhsJYjs", // Tai Chi
  "116": "https://www.youtube.com/watch?v=_5f8WI8SJpM", // Foam Rolling
  "117": "https://www.youtube.com/watch?v=1kTmh0VgqNs", // Dynamic Warm-up
  "118": "https://www.youtube.com/watch?v=1RjQkzKjtiA", // Static Stretching
  "119": "https://www.youtube.com/watch?v=VGvJOlWzZbc", // Mobility Work
  "120": "https://www.youtube.com/watch?v=7MHQR0RqAmY", // Balance Training
  
  // Leg exercises
  "171": "https://www.youtube.com/watch?v=IZxyjW7MPJQ" // Angled leg press
};

// Function to get video URL for an exercise
export const getExerciseVideoUrl = (exerciseId: string): string | undefined => {
  return exerciseVideoUrls[exerciseId];
};
