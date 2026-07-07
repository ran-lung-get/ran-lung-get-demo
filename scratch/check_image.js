import fs from 'fs';
import path from 'path';

const filePath = 'public/thai_food_hero.png';

if (!fs.existsSync(filePath)) {
  console.log("File does not exist!");
} else {
  const stats = fs.statSync(filePath);
  console.log("File exists!");
  console.log("Size in bytes:", stats.size);

  const buffer = Buffer.alloc(8);
  const fd = fs.openSync(filePath, 'r');
  fs.readSync(fd, buffer, 0, 8, 0);
  fs.closeSync(fd);

  console.log("Magic bytes:", buffer.toString('hex').toUpperCase());
  
  // A valid PNG starts with 89504E470D0A1A0A
  if (buffer.toString('hex').toUpperCase() === '89504E470D0A1A0A') {
    console.log("Valid PNG header!");
  } else {
    console.log("Invalid PNG header!");
  }
}
