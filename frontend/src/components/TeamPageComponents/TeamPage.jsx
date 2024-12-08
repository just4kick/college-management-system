import React from 'react';
import { Card } from "@/components/ui/card";
import { Github, Instagram, Linkedin, Phone } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: "Akash Yadav",
    role: "Lead Developer",
    image: "/sher.jpg",
    bio: "Full-stack developer with 5 years of experience in web technologies.",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      instagram: "https://instagram.com",
      
    }
  },
  {
    id: 2,
    name: "Suraj Das",
    role: "UX Designer",
    image: "/sher3.jpg",
    bio: "Passionate about creating intuitive and beautiful user experiences.",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      instagram: "https://instagram.com",
     
    }
  },
  {
    id: 3,
    name: "Ankhi Dey",
    role: "Product Manager",
    image: "/sherni.jpg",
    bio: "Strategic thinker with a focus on user-centered product development.",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      instagram: "https://instagram.com",
    }
  },
  {
    id: 4,
    name: "Sumit Sharma",
    role: "Product Manager",
    image: "/sher2.jpg",
    bio: "Specialized in building scalable and efficient server-side solutions.",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      instagram: "https://instagram.com",
    }
  }
];

const TeamMemberCard = ({ member }) => (
  <Card className="relative overflow-hidden group cursor-pointer transition-all duration-300 ease-in-out transform hover:-translate-y-2">
    <div className="aspect-square relative">
      <img
        src={member.image}
        alt={member.name}
        className="object-cover w-full h-full transition-transform group-hover:scale-105"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
        <h4 className="text-lg font-semibold text-white">{member.name}</h4>
        <p className="text-sm text-gray-300">{member.role}</p>
        <p className="text-xs text-gray-400 mt-1 line-clamp-2">{member.bio}</p>
        <div className="flex space-x-4 mt-2">
          {Object.entries(member.social).map(([key, value]) => (
            <a
              key={key}
              href={value}
              className="text-gray-300 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {key === 'linkedin' && <Linkedin className="h-4 w-4" />}
              {key === 'github' && <Github className="h-4 w-4" />}
              {key === 'instagram' && <Instagram className="h-4 w-4" />}
             
            </a>
          ))}
        </div>
      </div>
    </div>
  </Card>
);


const SmallCard = ({ color, top, left, right }) => (
  <div 
    className={`absolute w-12 h-12 rounded-lg bg-${color} shadow-lg`}
    style={{ top, left, right }}
  ></div>
);

const TeamPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 relative overflow-hidden">
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-primary text-lg font-semibold mb-2">Meet Our Team</h2>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Bringing sher<br />and Sherni
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Welcome to our team page, where you get a glimpse into the heart and soul of our
          organization. We are a diverse group of individuals, each bringing unique talents,
          perspectives, and passions to the table.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>

    </div>
  );
};

export default TeamPage;