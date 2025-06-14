CREATE DATABASE week6DB;
use week6DB;

show tables;
select * from articles;
select * from journalist;
select * from category;
describe articles;
describe journalist;
describe category;

create table journalist(
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255),
    bio TEXT
);
CREATE TABLE category(
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255)
);
create table articles(
	id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    content TEXT,
    journalistId INT,
    categoryId INT,
	FOREIGN KEY (journalistId) REFERENCES journalist(id),
    FOREIGN KEY (categoryId) REFERENCES category(id)
);

INSERT INTO category(name)
VALUES
	('FUTURE'),
	('TECH'),
	('AI');
    
INSERT INTO journalist (name, email, bio)
VALUES 
  ('Ronan', 'ronan@example.com', 'Tech and future trends journalist.'),
  ('Kosal', 'kosal@example.com', 'Covers AI and technology innovation.'),
  ('Vuthy', 'vuthy@example.com', 'Focuses on environmental and science reporting.'),
  ('Sokha', 'sokha@example.com', 'Writes about AI and machine learning advancements.'),
  ('Makara', 'makara@example.com', 'Reports on future trends in education and technology.');

INSERT INTO articles (title, content, journalistId, categoryId)
VALUES 
  ('The Future of Work', 'Exploring how AI and automation will change jobs.', 1, 1),
  ('Next-Gen AI Models', 'A deep dive into large language models and their impacts.', 2, 3),
  ('Sustainable Tech Trends', 'Innovations helping the environment through technology.', 3, 2),
  ('AI-Powered Healthcare', 'How machine learning is improving diagnosis.', 4, 3),
  ('Education in 2040', 'What classrooms of the future might look like.', 5, 1),
  ('Quantum Tech Explained', 'An introduction to quantum computing for the public.', 1, 2),
  ('Climate and AI', 'Using artificial intelligence to model climate change.', 3, 3),
  ('Smart Cities Rising', 'Urban innovation driven by smart technologies.', 5, 2);
  
  