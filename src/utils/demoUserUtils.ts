
// Utility functions for demo user management
export function generateDemoUserId(email: string): string {
  // Create a consistent but unique ID based on email
  const hash = email.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  return `demo-user-${Math.abs(hash).toString(36)}`;
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
    const userData = JSON.parse(demoUser);
    return userData.id || generateDemoUserId(userData.email || 'default@demo.com');
  }
  return 'demo-user-default';
}
