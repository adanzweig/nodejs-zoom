# Zoom API Integration Project

This project provides a Node.js application for integrating with the Zoom API. It consists of two main parts: an Express.js server (`server.js`) for handling OAuth authorization to receive an access token from Zoom, and an API client (`index.js`) for interacting with Zoom, such as retrieving and creating meetings.

## Prerequisites

- Node.js and npm (Node Package Manager)
- Zoom account with Developer privileges
- Registered Zoom OAuth app with Client ID and Secret

## Setup

1. **Clone/Download the Project**:
   - If the project is hosted on a version control system like GitHub, clone it to your local machine. Otherwise, download and extract the project files.

2. **Install Dependencies**:
   - Navigate to the project directory and run the following command to install necessary Node.js packages:
     ```bash
     npm install
     ```

3. **Environment Variables**:
   - Create a `.env` file in the project root with the following variables:
     ```
     ZOOM_API_KEY=your_zoom_client_id
     ZOOM_API_SECRET=your_zoom_client_secret
     REDIRECT_URI=http://localhost:3000
     TOKEN=your_zoom_oauth_token
     ```
   - `ZOOM_API_KEY` and `ZOOM_API_SECRET` are obtained from your Zoom OAuth App.
   - `REDIRECT_URI` should match the redirect URI set in your Zoom App.
   - `TOKEN` will be your Zoom OAuth token, obtained after running the OAuth flow.

## Running the Server

- Start the Express server to handle OAuth:
  ```bash
  node server.js
  ```
- This will start a server on `http://localhost:3000`. Use this URL for the Zoom OAuth redirect.

## Usage

### OAuth Token Generation

- Access `http://localhost:3000` and complete the OAuth flow to generate an access token. This token is then used in subsequent API calls.

### API Client

- The `index.js` file contains functions to interact with the Zoom API:
  - `getMeetings()`: Retrieves a list of meetings for the authenticated user.
  - `createMeeting(...)`: Creates a new meeting with specified parameters.

- To use these functions:
  - Ensure that the `TOKEN` in your `.env` file is set with a valid OAuth token.
  - Run `index.js`:
    ```bash
    node index.js
    ```

## Security Notes

- Never commit sensitive data like `ZOOM_API_KEY`, `ZOOM_API_SECRET`, or `TOKEN` to version control. Always use environment variables.
- In a production environment, ensure secure handling of OAuth tokens and client secrets.

## License

- Specify your licensing terms here, or state if the project is open-source and free to use.