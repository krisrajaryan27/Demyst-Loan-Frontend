# Demyst Loan Frontend

This is the frontend application for the Demyst Loan system, built using React JS, React Router, Axios, and Material UI. It provides a user-friendly interface for users to interact with the loan application system. The backend server URL is configured in `constants.js`.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your development machine.
- The Demyst Loan Backend server is running and accessible.

## Installation

1. Clone the repository:

   git clone https://github.com/krisrajaryan27/demyst-loan-frontend.git

2. Navigate to the project directory:

   cd demyst-loan-frontend

3. Install the dependencies:

   npm install

## Configuration

Open the `src/utils/constants.js` file and update the `SERVER_URL` variable with the URL of your Demyst Loan Backend server.

const SERVER_URL = 'http://localhost:4000'; // Replace with your backend server URL

## Running the Application

To start the application, run the following command:

npm start

This will start the development server and make the application accessible at `http://localhost:3000` by default. If you configured a different URL for the backend server, ensure it matches the URL in `constants.js`.

## Usage

You can now access the Demyst Loan frontend by opening your web browser and navigating to `http://localhost:3000` (or the configured URL). Use the application to interact with the loan system.