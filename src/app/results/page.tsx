/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function Component() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const repoUrl = searchParams.get('repoUrl');
  const [tasks, setTasks] = useState([]);
  const fetchTasksRef = useRef(false); // Use ref to avoid multiple fetches

  useEffect(() => {
    if (fetchTasksRef.current) return; // Prevent multiple fetches
    fetchTasksRef.current = true;

    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tasks', {
          params: { repoUrl: repoUrl }, // Ensure `repoUrl` is passed as a query param
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [repoUrl]); // Only run the effect if `repoUrl` changes

  useEffect(() => {
    const createStars = () => {
      const starryBackground = document.createElement('div');
      starryBackground.className = 'fixed inset-0 pointer-events-none';
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'absolute rounded-full bg-white';
        star.style.width = `${Math.random() * 2 + 1}px`;
        star.style.height = star.style.width;
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.opacity = `${Math.random()}`;
        star.style.animation = `twinkle ${Math.random() * 5 + 5}s infinite`;
        starryBackground.appendChild(star);
      }
      document.body.appendChild(starryBackground);
    };

    createStars();

    return () => {
      const starryBackground = document.querySelector(
        '.fixed.inset-0.pointer-events-none'
      );
      if (starryBackground) {
        starryBackground.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 p-4">
      <style jsx global>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Project Analysis Results
        </h1>
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tasks?.map((task: any) => (
              <Card
                key={task.id}
                className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 transition-colors duration-200">
                <CardHeader>
                  <CardTitle className="text-lg">{task.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-2">{task.description}</p>
                  <p className="text-sm text-blue-300">
                    Estimated time: {task.time}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
        <div className="mt-6 flex justify-center">
          <Button
            className="bg-blue-600 hover:bg-blue-700 transition-all duration-300"
            onClick={() => router.push('/')}>
            Analyze New Repo
          </Button>
        </div>
      </div>
    </div>
  );
}
