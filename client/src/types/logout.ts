// Util function, not a component
const logout = (): void => {
    // Clear user session/token
    localStorage.removeItem('userToken'); // Assuming you use localStorage
    // Redirect to home or login page
    window.location.href = '/';
  };
  
  // Call the logout function
  logout();
  