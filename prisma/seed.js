import bcrypt from 'bcrypt';
import 'dotenv/config';
import prisma from '../src/config/db.js';

try {
  await prisma.$queryRaw`TRUNCATE films, comments, reviews, users RESTART IDENTITY CASCADE;`;

 const usersData = [
    { email: 'magik@xmen.com', password: 'soulsword' },
    { email: 'cyclops@xmen.com', password: 'rubyquartz' },
    { email: 'ororo@xmen.com', password: 'windrider', role: 'ADMIN' },
  ];

  const userArray= [];

  for (const userData of usersData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

     const user = await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        role: userData.role || 'USER',
      },
    });
    userArray[user.email] = user;

} 


  const reviews = [
    {
      title: 'X-Men Last Stand',
      content: 'This movie is horrible',
      rating: 1,
      reviewerId : userArray['cyclops@xmen.com'].id,
    },

    {
      title: 'New Mutants',
      content: 'This movie could have been better',
      rating: 3,
      reviewerId : userArray['magik@xmen.com'].id,
    },

    {
      title: 'X-Men Days of Future Past',
      content: 'This film was absolutely brilliant',
      rating: 5,
      reviewerId : userArray['ororo@xmen.com'].id,
    },
  ];

  console.log(reviews);
await prisma.review.createMany({
  data: reviews,
  skipDuplicates: true,
});

const comments =[
  { reviewId:1, 
    content: 'I thought it was good', 
    reviewerId: userArray['magik@xmen.com'].id },
  { reviewId:2, 
    content: 'Yeah I got to agree, could have been better', 
    reviewerId:userArray['cyclops@xmen.com'].id},
  { reviewId:3, 
    content: 'Yeah this one was pretty good', 
    reviewerId:userArray['cyclops@xmen.com'].id },

];
console.log(comments);
await prisma.comment.createMany({
  data: comments,
  skipDuplicates: true,
});

const films= [
  {title:'New Mutants', genre:'Action-Horror ', director:'Josh Boone', releaseYear:2020, adminId:userArray['ororo@xmen.com'].id},
  {title:'X-men Last Stand', genre:'Action', director:'Brett Ratner', releaseYear:2006,adminId:userArray['ororo@xmen.com'].id},
  {title:'X-men Days of Future Past', genre:'Action', director:'Bryan Singer', releaseYear:2014,adminId:userArray['ororo@xmen.com'].id}
];
console.log(films);
await prisma.film.createMany({
  data: films,
  skipDuplicates: true,
});

}catch(error){
    console.error('Seed failed', error)
}finally {
  await prisma.$disconnect();
}
