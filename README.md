# QuickFlow

A web application that helps developers analyze the contents of a React project, determine incomplete components, and generate a list of tasks with detailed descriptions and estimated time for completion. The app uses the GitHub API (via Octokit) and OpenAI to offer AI-powered insights and an optimal task workflow.

## Features

- **GitHub Repository Input**: Users input a GitHub repository URL containing a React project.
- **Code Analysis**: The app uses Octokit to fetch files from the repo and passes them to the OpenAI API to analyze React components.
- **Task Generation**: If a component appears incomplete, the AI generates tasks that include:
  - Task ID
  - Task Name
  - Description
  - Estimated completion time (in hours)
- **Optimized Workflow**: Tasks are displayed to the user in an optimized sequence for better efficiency.

## Tech Stack

- **Frontend**: React (Next.js)
- **APIs**: 
  - [Octokit](https://github.com/octokit/octokit.js) for GitHub API integration
  - [OpenAI API](https://beta.openai.com/docs/) for AI-powered analysis

## How It Works

1. **Input Repository**: The user inputs a GitHub repo URL.
2. **Fetch & Analyze**: The app fetches all the files in the repository using Octokit and sends them to OpenAI for analysis.
3. **Task Generation**: If the AI detects incomplete React components, it generates tasks for each component with the following details:
   - Task ID
   - Task Name
   - Description
   - Estimated time to complete (in hours)
4. **View Tasks**: The user is redirected to a task page where tasks are listed in an optimal workflow, making it easy to prioritize work.

## Installation

1. Clone this repository:
    ```bash
    git clone https://github.com/yourusername/repo-name.git
    cd repo-name
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env.local` file and add the necessary API keys for OpenAI and GitHub OAuth.
    ```env
    NEXT_PUBLIC_OPENAI_API=your-openai-api
    NEXT_PUBLIC_GITHUB_TOKEN=your-github-token
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

1. **Input GitHub Repository**: Enter the URL of a GitHub repository containing a React project.
2. **Analyze Files**: The app will analyze the files and generate a list of tasks for incomplete components.
3. **View Tasks**: View tasks in the optimized workflow.

## Team Members

Aditya Kulkarni : https://github.com/Ad1tya-007
Jung-Hyun Andrew Kim : https://github.com/JH-A-Kim

## Conclusion

This was a crazy project from the both of us. We made this in 7 hours during SFU Fallhacks'24!


