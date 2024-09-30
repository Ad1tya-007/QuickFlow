'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Component() {
  const router = useRouter();

  const [repoUrl, setRepoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement repo analysis logic here
    setTimeout(() => {
      setIsLoading(false);
      router.push(`/results?repoUrl=${encodeURIComponent(repoUrl)}`);
    }, 2000);
  };

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
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 flex items-center justify-center p-4">
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
      <Card className="w-full max-w-md bg-gray-900 text-white border-blue-500 border-opacity-50">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Faster Than Light
          </CardTitle>
          <CardDescription className="text-center text-gray-300">
            Enter your GitHub repo to generate tasks and an optimal workflow.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="url"
              placeholder="https://github.com/username/repo"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              required
            />
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 relative overflow-hidden group"
              disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Analyze Repo
                  <div className="absolute inset-0 h-full w-full scale-0 rounded-full bg-white/30 transition-all duration-300 group-hover:scale-100" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="w-1 h-32 bg-blue-500 animate-pulse" />
          <div className="w-1 h-32 bg-blue-500 animate-pulse ml-2" />
          <div className="w-1 h-32 bg-blue-500 animate-pulse ml-2" />
        </div>
      )}
    </div>
  );
}
