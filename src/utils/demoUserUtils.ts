
// Utility functions for demo user management
export function generateDemoUserId(email: string): string {
  // Create a consistent UUID-like string based on email
  const hash = email.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const hashString = Math.abs(hash).toString(16).padStart(12, '0');
  // Create a valid UUID v4 format for demo users
  return `${hashString.slice(0,8)}-${hashString.slice(8,12)}-4${hashString.slice(0,3)}-a${hashString.slice(3,6)}-${hashString}`.slice(0, 36);
}

export function getDemoUserData(email: string, name: string, type: string) {
  // Use consistent UUIDs for specific demo users
  let userId: string;
  
  if (type === 'gym' && email === 'gym@demo.com') {
    userId = '11111111-1111-1111-1111-111111111111';
  } else if (type === 'trainer' && email === 'trainer1@demo.com') {
    userId = '22222222-2222-2222-2222-222222222222';
  } else if (type === 'trainer' && email === 'trainer2@demo.com') {
    userId = '33333333-3333-3333-3333-333333333333';
  } else if (type === 'client' && email === 'client1@demo.com') {
    userId = '44444444-4444-4444-4444-444444444444';
  } else if (type === 'client' && email === 'client2@demo.com') {
    userId = '55555555-5555-5555-5555-555555555555';
  } else if (type === 'client' && email === 'client3@demo.com') {
    userId = '66666666-6666-6666-6666-666666666666';
  } else {
    userId = generateDemoUserId(email);
  }
  
  return {
    id: userId,
    name,
    email,
    type,
    profileImage: getDefaultProfileImage()
  };
}

export function getDefaultProfileImage(): string {
  return "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80";
}

export function getCurrentDemoUserId(): string {
  const demoUser = localStorage.getItem('demo-user');
  if (demoUser) {
    try {
      const userData = JSON.parse(demoUser);
      
      // For gym type users, use the consistent demo gym UUID
      if (userData.type === 'gym') {
        return '11111111-1111-1111-1111-111111111111';
      }
      
      // Check if the ID is already a valid UUID format
      if (userData.id && userData.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
        return userData.id;
      }
      // If not a valid UUID, generate one from the email
      return generateDemoUserId(userData.email || 'default@demo.com');
    } catch (error) {
      console.error('Error parsing demo user data:', error);
    }
  }
  // Return a valid UUID format for demo users
  return generateDemoUserId('default@demo.com');
}
