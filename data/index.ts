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
    period: "2022 — Present",
    school: "Stikubank University, Semarang",
    degree: "B.Sc. in Informatics Engineering",
    description:
      "Specializing in software engineering, data structures, and forensic computing. Every project handled with discipline, precision, and a relentless eye for detail.",
    icon: "cap",
    tags: ["Software Eng.", "Forensic Computing", "Algorithms"],
  },
  {
    id: 2,
    period: "2020 — 2022",
    school: "Miami Metro Forensics Institute",
    degree: "Certification in Blood Spatter Analysis",
    description:
      "Advanced training in pattern analysis, crime-scene reconstruction, and meticulous evidence handling. Order, method, and a clean process above all.",
    icon: "drop",
    tags: ["Pattern Analysis", "Lab Work"],
  },
  {
    id: 3,
    period: "2017 — 2020",
    school: "Harrison Senior High School",
    degree: "Science & Mathematics Track",
    description:
      "Laid the foundations of analytical thinking, structured problem solving, and the quiet patience that precision demands.",
    icon: "book",
    tags: ["Mathematics", "Biology"],
  },
] as const;

export const gridItems = [
  {
    id: 1,
    title: "About Me",
description: "I am Dexter Morgan, a blood spatter analyst by day and a meticulous observer of human behavior. With a sharp eye for detail and a disciplined mindset, I maintain order in both my professional work and personal code. I value precision, control, and structure, always striving to keep things clean, efficient, and... balanced.",
    title2: "Education",
    description2: "2022 - Present \u00A0\u00A0 Stikubank University, Semarang",
    description3: "Informatics Engineering",
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
    name: "Photosop",
    img: "/photoshop.svg",
    nameImg: "/cloudName.svg",
  },
  {
    id: 2,
    name: "illustrator",
    img: "/illustrator.svg",
    nameImg: "/appName.svg",
  },
  {
    id: 3,
    name: "Laravel",
    img: "/laravel.svg",
    nameImg: "/hostName.svg",
  },
  {
    id: 4,
    name: "Sql",
    img: "/mysql.svg",
    nameImg: "/streamName.svg",
  },
  {
    id: 5,
    name: "Ts",
    img: "/three.svg",
    nameImg: "/dockerName.svg",
  },

  {
    id: 6,
    name: "three",
    img: "/brandtypescript.svg",
    nameImg: "/dockerName.svg",
  },

  {
    id: 7,
    name: "next",
    img: "/nextjs.svg",
    nameImg: "/dockerName.svg",
  },
  {
    id: 8,
    name: "next",
    img: "/blender.svg",
    nameImg: "/dockerName.svg",
  },
  {
    id: 9,
    name: "next",
    img: "/php.svg",
    nameImg: "/dockerName.svg",
  },
  {
    id: 10,
    name: "next",
    img: "/java.svg",
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
  stack1: ["React.js", "Next.js", "Typescript"],
  stack2: ["Vue.js", "AWS", "MongoDB"],
} as const;
