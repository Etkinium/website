import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-spotify-black py-16 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <img 
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAEsASwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUWETInGBMpGhscEI0fDhchUjNlJCKhqgwuPxJTMkKmJlcjTjpyQ0REM0V1hZWmNkZVZlcjV6e3yDhFOUhQ8gkkJkfL8XqKlqeUhKqHKvt4FHzYCqjCJkVfxRYk9BDWlCNrpJUGQ/9oADAMBAAIRAxEABVkZJ3FGk5x+CW6jjOyV9nOcf27FcZV7cqJLJn0x2B/OqsR0qZCBHE7j3VQa7UAJNT4A72jg4FbsLLCMEAu3CYOc4/SlDJaRzq8LBkVd3O8iqKmx4LDjNWDMZkqrPEcmJ0zwBnGPpnJUcE8lclLzZHQEuAA2BxR9wCPz2Zj7tPHNTkNcCgKPLYr22bHf+Zo5VaWXLT8vC4YBcggHj5e2GnPbIWRNzKRGhLhg/JAJJNABNSNvTKqQdCH6cBm5FWJa2qM/wAjLIhOPrz8o6FaTSScFQRyDyTnmnGVZx9YUe4jU+gVT6gf+PY2K9wkuM4/vLxtT1Q4o8GpApQZOSSQPU9BzTgOuauiPJLFxWJJ6+Y5OOQwjzwAO5JPTJ1F95cbuqF0NWKpXMjFMnA3DggeJJOcZ9BXKFQBZ7gF2P6vJY8WJx6gZ7mp6ckFUbAywTkZPSpaRmNAqPj25+9HtNnPUAL2JPJUAnByXJBB7gZ7iGnJtmLKCYMJp9r6c2J3H9HBFSoV6MzCU5vR+m7t7UjcnqfauTQFGBbnqTwGJJqLhGLfQnvgQU3FsVKgckU4nMEiHpXFxj6g4H9aa8SGJGA/G8/8yP8AWqnKc/gNlAQMx4x6Z/2kzjjA7XnCNGbBGGjlBHYocfy+tQrh6P4B/9k="
                alt="ETKİNİUM Logo"
                className="w-8 h-8 object-contain"
              />
            </div>
            <span className="text-2xl font-bold">ETKİNİUM</span>
          </div>
          <p className="text-lg text-gray-400">
            Sanatın ve Eğlencenin Yeni Nesil Sahnesi
          </p>
          <div className="mt-12 pt-8 border-t border-gray-800">
            <p className="text-gray-400">
              © 2025 ETKİNİUM. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
