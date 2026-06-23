import { links } from "@/config";

export const navItems = [
  { name: "About", link: "#about" },
  { name: "Education", link: "#education" },
  { name: "Projects", link: "#projects" },
  { name: "Contact", link: "#contact" },
] as const;

export const education = [
  {
    id: 1,
    period: "In progress",
    school: "University of Girona",
    degree: "B.Sc. in Computer Engineering",
    description:
      "3rd year of the degree. Training in software development, data structures, and computer engineering.",
    icon: "cap",
    tags: ["Software Engineering", "Algorithms", "Informatics"],
  },
  {
    id: 2,
    period: "2020 — 2022",
    school: "Escola Ginebrò",
    degree: "Higher Diploma in Web and Mobile Application Development (DAAM)",
    description:
      "Training in web and mobile development, application design, and databases.",
    icon: "book",
    tags: ["Web Development", "Mobile Apps", "Databases"],
  },
  {
    id: 3,
    period: "2018 — 2020",
    school: "Escola Ginebrò",
    degree: "Higher Diploma in Microcomputer Systems and Networks (SMX)",
    description:
      "Configuration of computer systems, networks, and technical support in business environments.",
    icon: "flask",
    tags: ["Networks", "Systems", "IT Support"],
  },
] as const;

export const gridItems = [
  {
    id: 1,
    title: "About Me",
    description:
      "My name is Marcel and I'm 23 years old. I'm currently in my 3rd year of Computer Engineering at the University of Girona. I'm looking for a role that lets me balance my studies with work. I'm extroverted, responsible, and a fast learner, with immediate availability.",
    title2: "Languages",
    description2: "Catalan: native · Spanish: native · English: basic",
    description3: "Llinars del Vallès, Barcelona · Class B driving license",
    className: "lg:col-span-3 md:col-span-3 md:row-span-1",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/grid.svg",
    spareImg: "",
  },

  {
    id: 4,
    title: "Technical Skills",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "",
  },
] as const;

export const projects = [
  {
    id: 1,
    title: "TanyaAi - Mobile App",
    des: "An AI-powered mobile app for answering questions, providing insights, and assisting with various tasks.",
    img: "/tanyaai.png",
    iconLists: ["/java.svg"],
    link: "",
    sourceCode: "",
  },
  {
    id: 2,
    title: "Student Graduation Web",
    des: "A student graduation web displays graduation details, student achievements, event schedules, and certificates.",
    img: "/lulus.png",
    iconLists: ["/mysql.svg", "/php.svg", "/laravel.svg"],
    link: "",
    sourceCode: "",
  },
  {
    id: 3,
    title: "Semarang City FLS3N Submission and Evaluation Portal",
    des: "A platform for submitting and evaluating student works in the FLS3N (National Student Art Festival and Competition)",
    img: "/fls.png",
    iconLists: ["/mysql.svg", "/php.svg", "/laravel.svg"],
    link: "",
    sourceCode: "",
  },
  {
    id: 4,
    title: "Financial Record System for Coffee Shop",
    des: "A system for tracking a coffee shop's income, expenses, and transactions.",
    img: "/cof.png",
    iconLists: ["/mysql.svg", "/php.svg", "/laravel.svg"],
    link: "",
    sourceCode: "",
  },
  {
    id: 5,
    title: "Coffeeshop Landing Page",
    des: "A coffeeshop landing page introduces the brand, showcases the menu, promotions, location, and simplifies ordering.",
    img: "/gcc.png",
    iconLists: ["/tailwind.svg", "/php.svg"],
    link: "",
    sourceCode: "",
  },
  {
    id: 6,
    title: "Portofolio Design Graphic",
    des: "A showcase of design works, creativity, and skills to highlight expertise and experience.",
    img: "/graphic.png",
    iconLists: ["/illustrator.svg", "/photoshop.svg"],
    link: "",
    sourceCode: "",
  },
] as const;

export const testimonials = [
  {
    quote: `Collaborating with ${links.ownerName} was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. ${links.ownerName}'s enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, ${links.ownerName} is the ideal partner.`,
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote: `Collaborating with ${links.ownerName} was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. ${links.ownerName}'s enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, ${links.ownerName} is the ideal partner.`,
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote: `Collaborating with ${links.ownerName} was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. ${links.ownerName}'s enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, ${links.ownerName} is the ideal partner.`,
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote: `Collaborating with ${links.ownerName} was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. ${links.ownerName}'s enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, ${links.ownerName} is the ideal partner.`,
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote: `Collaborating with ${links.ownerName} was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. ${links.ownerName}'s enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, ${links.ownerName} is the ideal partner.`,
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
] as const;

export const companies = [
  {
    id: 1,
    name: "WordPress",
    img: "/php.svg",
    nameImg: "/cloudName.svg",
  },
  {
    id: 2,
    name: "MySQL",
    img: "/mysql.svg",
    nameImg: "/streamName.svg",
  },
  {
    id: 3,
    name: "Next.js",
    img: "/nextjs.svg",
    nameImg: "/hostName.svg",
  },
  {
    id: 4,
    name: "TypeScript",
    img: "/brandtypescript.svg",
    nameImg: "/dockerName.svg",
  },
  {
    id: 5,
    name: "Tailwind",
    img: "/tailwind.svg",
    nameImg: "/dockerName.svg",
  },
  {
    id: 6,
    name: "React",
    img: "/re.svg",
    nameImg: "/dockerName.svg",
  },
] as const;

export const socialMedia = [
  {
    name: "Instagram",
    img: "/insta.svg",
    link: "",
  },
  {
    name: "LinkedIn",
    img: "/link.svg",
    link: "",
  },
  {
    name: "GitHub",
    img: "/git.svg",
    link: "",
  },
  {
    name: "Behance",
    img: "/behance.svg",
    link: "",
  },
] as const;

export const techStack = {
  stack1: ["WordPress", "Web Development", "Networks"],
  stack2: ["Team Leadership", "IT Systems", "Customer Service"],
} as const;
