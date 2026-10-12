export interface DeveloperContact {
  name: string;
  role: string;
  education: string;
  university: string;
  country: string;
  linkedin: string;
  instagram: string;
  email: string;
  biography: string;
  technologies: string[];
  areasOfExploration: string[];
  credits: {
    developer: string;
    project: string;
  };
}

export const developerContact: DeveloperContact = {
  name: "Khawaja Ahmed Azaz",
  role: "Software Development Enthusiast",
  education: "Software Engineering",
  university: "Riphah International University, Faculty of Computing",
  country: "Pakistan",
  linkedin: "https://www.linkedin.com/in/khawaja-ahmed-azaz/",
  instagram: "https://instagram.com/4ezuu_?mdxt=MW85cHQ2ZndlcGdnZQ%3D%3D",
  email: "khawajaahmed704@gmail.com",
  biography:
    "Hi! I'm Khawaja Ahmed Azaz, a software development enthusiast studying Software Engineering at Riphah International University, Faculty of Computing. I enjoy exploring different areas of software development and turning my ideas into working projects. From developing games and building web applications to creating desktop applications, working with databases, and solving programming problems, I like experimenting with different technologies and learning how things work. I've worked with programming languages such as C++, Java, JavaScript, Python, and SQL. I'm always looking for opportunities to improve my skills, explore new ideas, and build projects that are both useful and enjoyable to use. For me, development is about learning, experimenting, solving problems, and bringing ideas to life, one project at a time.",
  technologies: [
    "C++",
    "Java",
    "JavaScript",
    "Python",
    "SQL",
    "Software Development Tools",
  ],
  areasOfExploration: [
    "Game Development",
    "Web Development",
    "Application Development",
    "Database Systems",
    "Programming",
    "Software Engineering",
    "Exploring New Technologies",
  ],
  credits: {
    developer: "Khawaja Ahmed Azaz",
    project: "Web Development & Database Systems",
  },
};
