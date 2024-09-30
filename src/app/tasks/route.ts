/* eslint-disable @typescript-eslint/no-explicit-any */
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
});

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API,
});

// Recursive function to fetch all files and folders in a repo
async function fetchFiles(owner: string, repo: string, path: string) {
  const contents: { name: string; content: string | null }[] = [];

  // Fetch repository contents
  const { data }: any = await octokit.rest.repos.getContent({
    owner,
    repo,
    path,
  });

  for (const item of data) {
    if (item.type === 'file') {
      if (item.name.includes('.md') || item.name.includes('.tsx')) {
        // Fetch the file content
        const fileResponse = await octokit.rest.repos.getContent({
          owner,
          repo,
          path: item.path,
        });

        // Decode the base64 content for text-based files
        const content = Buffer.from(
          fileResponse.data.content,
          'base64'
        ).toString('utf-8');

        if (content.length < 4000) {
          contents.push({
            name: item.name,
            content,
          });
        }
      }
    } else if (item.type === 'dir') {
      // If it's a directory, recursively fetch its contents
      const folderContents = await fetchFiles(owner, repo, item.path);
      contents.push(...folderContents); // Add folder contents to the array
    }
  }

  return contents;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const repoUrl = searchParams.get('repoUrl');

    if (!repoUrl) {
      return new Response(
        JSON.stringify({ error: 'GitHub repo URL is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Extract owner and repo from the provided URL
    const regex = /github\.com\/([^/]+)\/([^/]+)/;
    const match = repoUrl.match(regex);

    if (!match) {
      return new Response(
        JSON.stringify({ error: 'Invalid GitHub repo URL' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const owner = match[1];
    const repo = match[2];

    // Fetch all files and folders
    const contents = await fetchFiles(owner, repo, ''); // Start from the root

    try {
      // const { prompt } = await request.json(); // Extracting the prompt from the request body
      const prompt = JSON.stringify(contents);

      // Call OpenAI API using the new syntax
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo', // You can change the model if needed
        messages: [
          {
            role: 'user',
            content: `${prompt} Take this information and generate a list of tasks that need to be done to finish each component that has been provided. Return a list of objects. Where each object has variables id, name, description (keep it small), and time (in hours) to complete the task. Do not generate any other content other than the list. Return the tasks in this form. Sort these tasks according to the optimum workflow.`,
          },
        ],
      });

      // Return the generated text in the response
      return new Response(response.choices[0].message.content, {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
