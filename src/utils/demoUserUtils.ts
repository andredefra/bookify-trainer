
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
  const userId = generateDemoUserId(email);
  
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
