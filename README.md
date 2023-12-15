# README for Digitalize Hub Frontend part

This is a detailed overview of the frontend application and components of the application.
I have included a screenshot of the application login interface where I asked OpenAI's DALLE-3 to create a logo for task to make it pretty!

## Features and Components

### 1. **AuthForm Component**
- A dual-purpose form for user authentication, supporting both login and registration.
- Toggles between login and registration views within the same form.
- Styled with a modern UI using CSS, featuring a white and purple color scheme.

### 2. **LoginForm and RegisterForm Components**
- Separate components for handling user login and registration.
- Include input fields for email and password (additional fields for registration).
- HTTP POST requests are made for authentication and registration, handling both success and error responses.

### 3. **User and Admin Role Handling**
- Functionality to switch between 'admin' and 'normal user' roles.
- Depending on the role, different HTTP POST requests are sent, adding `user_type` to the request body.
- UI color scheme changes (purple to blue) based on the selected role.

### 4. **Token Handling and Authentication**
- On successful login/register, a token is received and stored in the browser's local storage.
- Token payload is checked for `user_type` to redirect users to appropriate pages (user or admin).
- Token is used for maintaining session and checking authentication status on the main page.

### 5. **User Page**
- A dedicated page for normal users.
- Includes a sign-out button and functionality to fetch and display user-specific devices.
- Each device has an ID and status, with CSS styled components for a clean layout.

### 6. **Admin Page with Sidebar**
- Features a sidebar for navigation between different admin functionalities: creating new admins, viewing users, and changing system settings.
- The main content area dynamically updates to show the selected component.

### 7. **CreateAdminComponent**
- A form for creating new admin accounts, similar to the registration form.
- Styled consistently with other forms, allowing input of username, email, and password.

### 8. **ShowUsers Component**
- Displays a list of users and their associated devices.
- Includes functionality to deactivate/activate devices with HTTP requests, dynamically updating the device status.
- Styled with CSS for clarity and ease of interaction.

### 9. **SystemSettings Component**
- Fetches and displays system settings.
- For 'user_registration' setting, a toggle button is provided to activate/deactivate.
- For 'daily_registration_limit', an input field allows updating the limit.
- Debounced HTTP requests are sent to avoid rapid, unnecessary server calls while input is being entered.


You can run this application locally using `npm run dev` making sure to hooking it up with the backend server.
All the deployment intructions are mentioned on the backend repository!